import {
  addressFromContractId,
  subContractId,
  SignerProvider,
  SignExecuteScriptTxResult,
  NodeProvider,
  node,
  ALPH_TOKEN_ID,
  prettifyTokenAmount,
  DUST_AMOUNT
} from "@alephium/web3"
import alephiumIcon from "../icons/alephium.svg";
import { checkTxConfirmedFrequency, network, networkName } from "./consts"
import BigNumber from "bignumber.js"
import { parseUnits } from "ethers/lib/utils";
import { SwapMaxIn, SwapMinOut, TokenPair as TokenPairContract, AddLiquidity, RemoveLiquidity, CreatePair } from "../../artifacts/ts"
import { genLogo } from "./avatar_images";
import { mainnetTokensMetadata, testnetTokensMetadata, TokenInfo } from "@alephium/token-list";
import { default as devnetTokenList } from './devnet-token-list.json'

const MINIMUM_LIQUIDITY = 1000n
export const PairTokenDecimals = 18
export const NumberRegex = new RegExp('^[0-9]*[.]?[0-9]*$')
export const MaxPriceImpact = 5 // 5%

export interface TokenPair {
  token0Info: TokenInfo
  token1Info: TokenInfo
  tokenPairId: string
}

export class DexTokens {
  static empty: DexTokens = new DexTokens()

  tokenInfos: TokenInfo[]
  tokenPairs: TokenPair[]
  mapping: Map<string, string[]>

  constructor(tokenInfos?: TokenInfo[], tokenPairs?: TokenPair[], mapping?: Map<string, string[]>) {
    this.tokenInfos = tokenInfos ?? []
    this.tokenPairs = tokenPairs ?? []
    this.mapping = mapping ?? new Map<string, string[]>()
  }

  addTokenInfos(tokenInfos: TokenInfo[]): DexTokens {
    const notExists = tokenInfos.filter((a) => !this.tokenInfos.some(b => a.id === b.id))
    const newTokenInfos = this.tokenInfos.concat(notExists)
    return new DexTokens(newTokenInfos, this.tokenPairs, this.mapping)
  }

  addTokenPairs(tokenPairs: TokenPair[]): DexTokens {
    const notExists = tokenPairs.filter((a) => !this.tokenPairs.some(b => a.tokenPairId === b.tokenPairId))
    const newTokenPairs = this.tokenPairs.concat(notExists)
    return new DexTokens(this.tokenInfos, newTokenPairs, this.mapping)
  }

  addMappings(pairs: Array<[string, string[]]>): DexTokens {
    const newMapping = new Map(this.mapping.entries())
    pairs.forEach(([key, values]) => {
      const current = newMapping.get(key)
      if (current === undefined) {
        newMapping.set(key, values)
      } else {
        newMapping.set(key, current.concat(values))
      }
    })
    return new DexTokens(this.tokenInfos, this.tokenPairs, newMapping)
  }

  getAllowedTokenInfos(tokenId: string | undefined): TokenInfo[] {
    if (tokenId === undefined) return this.tokenInfos
    const allowed = this.mapping.get(tokenId)
    if (allowed === undefined) return []
    return this.tokenInfos.filter((tokenInfo) => allowed.includes(tokenInfo.id))
  }
}

export function sortTokens(tokenAId: string, tokenBId: string): [string, string] {
  const tokenA = BigInt('0x' + tokenAId)
  const tokenB = BigInt('0x' + tokenBId)
  return tokenA < tokenB ? [tokenAId, tokenBId] : [tokenBId, tokenAId]
}

export interface TokenPairState {
  tokenPairId: string
  reserve0: bigint
  reserve1: bigint
  token0Info: TokenInfo,
  token1Info: TokenInfo,
  totalSupply: bigint
}

export async function getTokenPairState(tokenAInfo: TokenInfo, tokenBInfo: TokenInfo): Promise<TokenPairState> {
  const factoryId = network.factoryId
  const groupIndex = network.groupIndex
  const [token0Id, token1Id] = sortTokens(tokenAInfo.id, tokenBInfo.id)
  const path = token0Id + token1Id
  const pairContractId = subContractId(factoryId, path, groupIndex)
  const contractAddress = addressFromContractId(pairContractId)
  const tokenPair = TokenPairContract.at(contractAddress)
  try {
    const state = await tokenPair.fetchState()
    return {
      tokenPairId: pairContractId,
      reserve0: state.fields.reserve0,
      reserve1: state.fields.reserve1,
      token0Info: token0Id === tokenAInfo.id ? tokenAInfo : tokenBInfo,
      token1Info: token1Id === tokenBInfo.id ? tokenBInfo : tokenAInfo,
      totalSupply: state.fields.totalSupply
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      throw new Error('Token pair does not exist')
    }
    throw error
  }
}

export function getAmountIn(
  state: TokenPairState,
  tokenOutId: string,
  amountOut: bigint
): bigint {
  const [tokenOutInfo, reserveIn, reserveOut] = tokenOutId === state.token0Info.id
    ? [state.token0Info, state.reserve1, state.reserve0]
    : [state.token1Info, state.reserve0, state.reserve1]
  return _getAmountIn(amountOut, reserveIn, reserveOut, tokenOutInfo)
}

function _getAmountIn(amountOut: bigint, reserveIn: bigint, reserveOut: bigint, tokenOutInfo: TokenInfo): bigint {
  if (amountOut >= reserveOut) {
    throw new Error(`amout must less than reserve, amount: ${bigIntToString(amountOut, tokenOutInfo.decimals)}, reserve: ${bigIntToString(reserveOut, tokenOutInfo.decimals)}`)
  }
  const numerator = reserveIn * amountOut * 1000n
  const denominator = (reserveOut - amountOut) * 997n
  return (numerator / denominator) + 1n
}

export function getAmountOut(
  state: TokenPairState,
  tokenInId: string,
  amountIn: bigint
): bigint {
  if (tokenInId === state.token0Info.id) return _getAmountOut(amountIn, state.reserve0, state.reserve1)
  else return _getAmountOut(amountIn, state.reserve1, state.reserve0)
}

function _getAmountOut(amountIn: bigint, reserveIn: bigint, reserveOut: bigint): bigint {
  const amountInExcludeFee = 997n * amountIn
  const numerator = amountInExcludeFee * reserveOut
  const denominator = amountInExcludeFee + 1000n * reserveIn
  return numerator / denominator
}

function deadline(ttl: number): bigint {
  return BigInt(Date.now() + ttl * 60 * 1000)
}

async function swapMinOut(
  signer: SignerProvider,
  nodeProvider: NodeProvider,
  sender: string,
  pairId: string,
  tokenInId: string,
  amountIn: bigint,
  amountOutMin: bigint,
  ttl: number
): Promise<SignExecuteScriptTxResult> {
  const result = await SwapMinOut.execute(signer, {
    initialFields: {
      sender: sender,
      router: network.routerId,
      pair: pairId,
      tokenInId: tokenInId,
      amountIn: amountIn,
      amountOutMin: amountOutMin,
      deadline: deadline(ttl)
    },
    tokens: tokenInId !== ALPH_TOKEN_ID
      ? [{ id: ALPH_TOKEN_ID, amount: DUST_AMOUNT }, { id: tokenInId, amount: amountIn }]
      : [{ id: ALPH_TOKEN_ID, amount: amountIn + DUST_AMOUNT }]
  })
  await waitTxConfirmed(nodeProvider, result.txId, 1)
  return result
}

async function swapMaxIn(
  signer: SignerProvider,
  nodeProvider: NodeProvider,
  sender: string,
  pairId: string,
  tokenInId: string,
  amountInMax: bigint,
  amountOut: bigint,
  ttl: number
): Promise<SignExecuteScriptTxResult> {
  const result = await SwapMaxIn.execute(signer, {
    initialFields: {
      sender: sender,
      router: network.routerId,
      pair: pairId,
      tokenInId: tokenInId,
      amountInMax: amountInMax,
      amountOut: amountOut,
      deadline: deadline(ttl)
    },
    tokens: tokenInId !== ALPH_TOKEN_ID
      ? [{ id: ALPH_TOKEN_ID, amount: DUST_AMOUNT }, { id: tokenInId, amount: amountInMax }]
      : [{ id: ALPH_TOKEN_ID, amount: amountInMax + DUST_AMOUNT }]
  })
  await waitTxConfirmed(nodeProvider, result.txId, 1)
  return result
}

function checkPriceImpact(state: TokenPairState, tokenInId: string, amountIn: bigint, amountOut: bigint) {
  const [reserveIn, reserveOut] = state.token0Info.id === tokenInId
    ? [state.reserve0, state.reserve1]
    : [state.reserve1, state.reserve0]
  const left = (reserveIn + amountIn) * reserveOut * 100n
  const right = (reserveOut - amountOut) * (BigInt(MaxPriceImpact) + 100n) * reserveIn
  if (left > right) {
    throw new Error('Price impact too high')
  }
}

export async function swap(
  type: 'ExactIn' | 'ExactOut',
  balances: Map<string, bigint>,
  signer: SignerProvider,
  nodeProvider: NodeProvider,
  sender: string,
  state: TokenPairState,
  tokenInInfo: TokenInfo,
  amountIn: bigint,
  amountOut: bigint,
  slippage: number,
  ttl: number
): Promise<SignExecuteScriptTxResult> {
  const available = balances.get(tokenInInfo.id) ?? 0n
  if (available < amountIn) {
    throw new Error(`not enough balance, available: ${bigIntToString(available, tokenInInfo.decimals)}`)
  }
  checkPriceImpact(state, tokenInInfo.id, amountIn, amountOut)

  if (type === 'ExactIn') {
    const amountOutMin = minimalAmount(amountOut, slippage)
    return swapMinOut(signer, nodeProvider, sender, state.tokenPairId, tokenInInfo.id, amountIn, amountOutMin, ttl)
  }

  const amountInMax = maximalAmount(amountIn, slippage)
  return swapMaxIn(signer, nodeProvider, sender, state.tokenPairId, tokenInInfo.id, amountInMax, amountOut, ttl)
}

function isConfirmed(txStatus: node.TxStatus): txStatus is node.Confirmed {
  return txStatus.type === 'Confirmed'
}

async function checkScriptExecutionResult(provider: NodeProvider, txId: string) {
  const details = await provider.transactions.getTransactionsDetailsTxid(txId)
  if (!details.scriptExecutionOk) {
    throw new Error('Failed to call contract')
  }
}

export async function waitTxConfirmed(
  provider: NodeProvider,
  txId: string,
  confirmations: number
): Promise<node.Confirmed> {
  const status = await provider.transactions.getTransactionsStatus({ txId: txId })
  if (isConfirmed(status) && status.chainConfirmations >= confirmations) {
    await checkScriptExecutionResult(provider, txId)
    return status
  }
  await new Promise((r) => setTimeout(r, checkTxConfirmedFrequency * 1000))
  return waitTxConfirmed(provider, txId, confirmations)
}

export interface AddLiquidityResult {
  amountA: bigint
  amountB: bigint
  shareAmount: bigint
  sharePercentage: number
}

export function getInitAddLiquidityResult(amountA: bigint, amountB: bigint): AddLiquidityResult {
  const liquidity = sqrt(amountA * amountB)
  if (liquidity <= MINIMUM_LIQUIDITY) {
    throw new Error('insufficient initial liquidity')
  }
  return {
    amountA: amountA,
    amountB: amountB,
    shareAmount: liquidity - MINIMUM_LIQUIDITY,
    sharePercentage: 100
  }
}

export function getAddLiquidityResult(state: TokenPairState, tokenId: string, amountA: bigint, type: 'TokenA' | 'TokenB'): AddLiquidityResult {
  const [reserveA, reserveB] = tokenId === state.token0Info.id
    ? [state.reserve0, state.reserve1]
    : [state.reserve1, state.reserve0]
  const amountB = amountA * reserveB / reserveA
  const liquidityA = amountA * state.totalSupply / reserveA
  const liquidityB = amountB * state.totalSupply / reserveB
  const liquidity = liquidityA < liquidityB ? liquidityA : liquidityB
  const totalSupply = state.totalSupply + liquidity
  const percentage = BigNumber((100n * liquidity).toString())
    .div(BigNumber(totalSupply.toString()))
    .toFixed(5)
  const result = {
    amountA: type === 'TokenA' ? amountA : amountB,
    amountB: type === 'TokenA' ? amountB : amountA,
    shareAmount: liquidity,
    sharePercentage: parseFloat(percentage)
  }
  return result
}

function sqrt(y: bigint): bigint {
  if (y > 3) {
    let z = y
    let x = y / 2n + 1n
    while (x < z) {
      z = x
      x = (y / x + x) / 2n
    }
    return z
  }
  return 1n
}

function floatToBigint(num: number): [bigint, bigint] {
  const parts = num.toString().split('.')
  const factor = 10n ** BigInt(parts.length === 2 ? parts[1].length : 0)
  const numBigint = BigInt(parts.length === 2 ? (parts[0] + parts[1]) : parts[0])
  return [numBigint, factor]
}

export function minimalAmount(amount: bigint, slippage: number): bigint {
  // amount / (1 + slippage / 100)
  const [slippageBigint, factor] = floatToBigint(slippage)
  return amount * 100n * factor / (100n * factor + slippageBigint)
}

function maximalAmount(amount: bigint, slippage: number): bigint {
  // amount * (1 + (slippage / 100))
  const [slippageBigint, factor] = floatToBigint(slippage)
  return amount * (100n * factor + slippageBigint) / (100n * factor)
}

export async function addLiquidity(
  balances: Map<string, bigint>,
  signer: SignerProvider,
  nodeProvider: NodeProvider,
  sender: string,
  tokenPairState: TokenPairState,
  tokenAInfo: TokenInfo,
  tokenBInfo: TokenInfo,
  amountADesired: bigint,
  amountBDesired: bigint,
  slippage: number,
  ttl: number
): Promise<SignExecuteScriptTxResult> {
  if (amountADesired === 0n || amountBDesired === 0n) {
    throw new Error('the input amount must be greater than 0')
  }

  const tokenAAvailable = balances.get(tokenAInfo.id) ?? 0n
  if (tokenAAvailable < amountADesired) {
    throw new Error(`not enough balance for token ${tokenAInfo.name}, available: ${bigIntToString(tokenAAvailable, tokenAInfo.decimals)}`)
  }
  const tokenBAvailable = balances.get(tokenBInfo.id) ?? 0n
  if (tokenBAvailable < amountBDesired) {
    throw new Error(`not enough balance for token ${tokenBInfo.name}, available: ${bigIntToString(tokenBAvailable, tokenBInfo.decimals)}`)
  }

  const isInitial = tokenPairState.reserve0 === 0n && tokenPairState.reserve1 === 0n
  const amountAMin = isInitial ? amountADesired : minimalAmount(amountADesired, slippage)
  const amountBMin = isInitial ? amountBDesired : minimalAmount(amountBDesired, slippage)
  const [amount0Desired, amount1Desired, amount0Min, amount1Min] = tokenAInfo.id === tokenPairState.token0Info.id
    ? [amountADesired, amountBDesired, amountAMin, amountBMin]
    : [amountBDesired, amountADesired, amountBMin, amountAMin]
  const result = await AddLiquidity.execute(signer, {
    initialFields: {
      sender: sender,
      router: network.routerId,
      pair: tokenPairState.tokenPairId,
      amount0Desired: amount0Desired,
      amount1Desired: amount1Desired,
      amount0Min: amount0Min,
      amount1Min: amount1Min,
      deadline: deadline(ttl)
    },
    tokens: [
      { id: tokenAInfo.id, amount: amountADesired },
      { id: tokenBInfo.id, amount: amountBDesired }
    ]
  })
  await waitTxConfirmed(nodeProvider, result.txId, 1)
  return result
}

export interface RemoveLiquidityResult {
  token0Id: string
  amount0: bigint
  token1Id: string
  amount1: bigint
  remainShareAmount: bigint
  remainSharePercentage: number
}

export function getRemoveLiquidityResult(
  tokenPairState: TokenPairState & { totalLiquidityAmount: bigint } , liquidity: bigint
): RemoveLiquidityResult {
  if (liquidity > tokenPairState.totalLiquidityAmount) {
    throw new Error('liquidity exceed total liquidity amount')
  }
  const amount0 = liquidity * tokenPairState.reserve0 / tokenPairState.totalSupply
  const amount1 = liquidity * tokenPairState.reserve1 / tokenPairState.totalSupply
  const remainShareAmount = tokenPairState.totalLiquidityAmount - liquidity
  const remainSupply = tokenPairState.totalSupply - liquidity
  const remainSharePercentage = BigNumber((100n * remainShareAmount).toString())
    .div(BigNumber(remainSupply.toString()))
    .toFixed(5)
  return {
    token0Id: tokenPairState.token0Info.id,
    amount0,
    token1Id: tokenPairState.token1Info.id,
    amount1,
    remainShareAmount,
    remainSharePercentage: parseFloat(remainSharePercentage)
  }
}

export async function removeLiquidity(
  signer: SignerProvider,
  nodeProvider: NodeProvider,
  sender: string,
  pairId: string,
  liquidity: bigint,
  amount0Desired: bigint,
  amount1Desired: bigint,
  slippage: number,
  ttl: number
): Promise<SignExecuteScriptTxResult> {
  const amount0Min = minimalAmount(amount0Desired, slippage)
  const amount1Min = minimalAmount(amount1Desired, slippage)
  const result = await RemoveLiquidity.execute(signer, {
    initialFields: {
      sender: sender,
      router: network.routerId,
      pairId: pairId,
      liquidity: liquidity,
      amount0Min: amount0Min,
      amount1Min: amount1Min,
      deadline: deadline(ttl)
    },
    tokens: [{ id: pairId, amount: liquidity }]
  })
  await waitTxConfirmed(nodeProvider, result.txId, 1)
  return result
}

export async function tokenPairExist(nodeProvider: NodeProvider, tokenAId: string, tokenBId: string): Promise<boolean> {
  const factoryId = network.factoryId
  const groupIndex = network.groupIndex
  const [token0Id, token1Id] = sortTokens(tokenAId, tokenBId)
  const path = token0Id + token1Id
  const pairContractId = subContractId(factoryId, path, groupIndex)
  const contractAddress = addressFromContractId(pairContractId)
  return nodeProvider
      .addresses
      .getAddressesAddressGroup(contractAddress)
      .then(_ => true)
      .catch((e: any) => {
        if (e instanceof Error && e.message.indexOf("Group not found") !== -1) {
          return false
        }
        throw e
      })
}

export async function createTokenPair(
  signer: SignerProvider,
  nodeProvider: NodeProvider,
  sender: string,
  tokenAId: string,
  tokenBId: string
): Promise<SignExecuteScriptTxResult & { tokenPairId: string }> {
  const groupIndex = network.groupIndex
  const [token0Id, token1Id] = sortTokens(tokenAId, tokenBId)
  const path = token0Id + token1Id
  const pairContractId = subContractId(network.factoryId, path, groupIndex)
  const result = await CreatePair.execute(signer, {
    initialFields: {
      payer: sender,
      factory: network.factoryId,
      alphAmount: 10n ** 18n,
      tokenAId: tokenAId,
      tokenBId: tokenBId
    },
    attoAlphAmount: 10n ** 18n,
    tokens: [
      { id: tokenAId, amount: 1n },
      { id: tokenBId, amount: 1n },
    ]
  })
  await waitTxConfirmed(nodeProvider, result.txId, 1)
  return { ...result, tokenPairId: pairContractId }
}

export const ALPHTokenInfo: TokenInfo = {
  id: ALPH_TOKEN_ID,
  name: 'ALPH',
  symbol: 'ALPH',
  decimals: 18,
  logoURI: alephiumIcon
}

export const TokenList = getTokenInfos()

export function getTokenInfo(tokenId: string): TokenInfo | undefined {
  return TokenList.find((t) => t.id.toLowerCase() === tokenId )
}

export function getTokenInfos(): TokenInfo[] {
  if (networkName === 'mainnet') {
    return [ALPHTokenInfo, ...mainnetTokensMetadata.tokens]
  }
  if (networkName === 'testnet') {
    return [ALPHTokenInfo, ...testnetTokensMetadata.tokens]
  }
  return (devnetTokenList as TokenInfo[]).map<TokenInfo>((tokenInfo) => {
    return {
      ...tokenInfo,
      logoURI: genLogo(tokenInfo.name)
    }
  }).concat([ALPHTokenInfo])
}

// This is only used for user inputs
export function stringToBigInt(amount: string, decimals: number): bigint {
  try {
    return parseUnits(amount, decimals).toBigInt()
  } catch (error) {
    throw new Error(`Invalid amount: ${amount}, decimals: ${decimals}`)
  }
}

export function tryStringToBigInt(amount: string | undefined, decimals: number | undefined): bigint | undefined {
  if (amount === undefined || decimals === undefined) {
    return undefined
  }
  return stringToBigInt(amount, decimals)
}

export function bigIntToString(amount: bigint, decimals: number): string {
  const str = prettifyTokenAmount(amount, decimals)
  if (str === undefined) {
    throw new Error(`Invalid amount: ${amount}, decimals: ${decimals}`)
  }
  return str
}

export function tryBigIntToString(amount: bigint | undefined, decimals: number | undefined): string | undefined {
  if (amount === undefined || decimals === undefined) {
    return undefined
  }
  return bigIntToString(amount, decimals)
}

export function tryGetBalance(balances: Map<string, bigint> | undefined, tokenInfo: TokenInfo | undefined): string | undefined {
  if (balances === undefined || tokenInfo === undefined) {
    return undefined
  }
  const balance = balances.get(tokenInfo.id)
  return balance === undefined ? '0' : bigIntToString(balance, tokenInfo.decimals)
}

export function tokenPairMatch(tokenPairState: TokenPairState | undefined, token0Info: TokenInfo | undefined, token1Info: TokenInfo | undefined) {
  return (tokenPairState?.token0Info.id === token0Info?.id && tokenPairState?.token1Info.id === token1Info?.id) ||
    (tokenPairState?.token1Info.id === token0Info?.id && tokenPairState?.token0Info.id === token1Info?.id)
}
