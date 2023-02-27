import {
  addressFromContractId,
  subContractId,
  SignerProvider,
  SignExecuteScriptTxResult,
  NodeProvider,
  node,
  web3,
  ALPH_TOKEN_ID,
  fromApiVal,
  isHexString
} from "@alephium/web3"
import alephiumIcon from "../icons/alephium.svg";
import { network } from "./consts"
import BigNumber from "bignumber.js"
import { parseUnits, formatUnits } from "ethers/lib/utils";
import { SwapMaxIn, SwapMinOut, TokenPair as TokenPairContract, AddLiquidity, RemoveLiquidity, CreatePair } from "../contracts/ts"
import { genLogo } from "./avatar_images";

const MINIMUM_LIQUIDITY = 1000n
const DEFAULT_TTL = 60 * 60 * 1000 // one hour in millis
export const PairTokenDecimals = 18

export interface TokenPair {
  token0Id: string
  token1Id: string
  token0Address: string
  token1Address: string
  tokenPairId: string
}

// TODO: load from config
export interface TokenInfo {
  tokenId: string
  tokenAddress: string
  name: string
  symbol: string
  decimals: number
  logo: string
}

export class DexTokens {
  tokenInfos: TokenInfo[]
  tokenPairs: TokenPair[]
  mapping: Map<string, string[]>

  constructor(tokenInfos?: TokenInfo[], tokenPairs?: TokenPair[], mapping?: Map<string, string[]>) {
    this.tokenInfos = tokenInfos ?? []
    this.tokenPairs = tokenPairs ?? []
    this.mapping = mapping ?? new Map<string, string[]>()
  }

  addTokenInfos(tokenInfos: TokenInfo[]): DexTokens {
    const notExists = tokenInfos.filter((a) => !this.tokenInfos.some(b => a.tokenId === b.tokenId))
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

  getAllowedTokenInfos(tokenAddress: string | undefined): TokenInfo[] {
    if (tokenAddress === undefined) return this.tokenInfos
    const allowed = this.mapping.get(tokenAddress)
    if (allowed === undefined) return []
    return this.tokenInfos.filter((tokenInfo) => allowed.includes(tokenInfo.tokenAddress))
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
  token0Id: string
  token1Id: string
  totalSupply: bigint
}

export async function getTokenPairState(tokenAId: string, tokenBId: string): Promise<TokenPairState> {
  const factoryId = network.factoryId
  const groupIndex = network.groupIndex
  const [token0Id, token1Id] = sortTokens(tokenAId, tokenBId)
  const path = token0Id + token1Id
  const pairContractId = subContractId(factoryId, path, groupIndex)
  const contractAddress = addressFromContractId(pairContractId)
  const tokenPair = TokenPairContract.at(contractAddress)
  const state = await tokenPair.fetchState()
  return {
    tokenPairId: pairContractId,
    reserve0: state.fields.reserve0,
    reserve1: state.fields.reserve1,
    token0Id: state.fields.token0Id,
    token1Id: state.fields.token1Id,
    totalSupply: state.fields.totalSupply
  }
}

export function getAmountIn(
  state: TokenPairState,
  tokenOutId: string,
  amountOut: bigint
): bigint {
  if (tokenOutId === state.token0Id) return _getAmountIn(amountOut, state.reserve1, state.reserve0)
  else return _getAmountIn(amountOut, state.reserve0, state.reserve1)
}

function _getAmountIn(amountOut: bigint, reserveIn: bigint, reserveOut: bigint): bigint {
  if (amountOut >= reserveOut) {
    throw new Error(`amountOut must less than reserveOut, amountOut: ${amountOut}, reserveOut: ${reserveOut}`)
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
  if (tokenInId === state.token0Id) return _getAmountOut(amountIn, state.reserve0, state.reserve1)
  else return _getAmountOut(amountIn, state.reserve1, state.reserve0)
}

function _getAmountOut(amountIn: bigint, reserveIn: bigint, reserveOut: bigint): bigint {
  const amountInExcludeFee = 997n * amountIn
  const numerator = amountInExcludeFee * reserveOut
  const denominator = amountInExcludeFee + 1000n * reserveIn
  return numerator / denominator
}

async function swapMinOut(
  signer: SignerProvider,
  sender: string,
  pairId: string,
  tokenInId: string,
  amountIn: bigint,
  amountOutMin: bigint
): Promise<SignExecuteScriptTxResult> {
  const result = await SwapMinOut.execute(signer, {
    initialFields: {
      sender: sender,
      router: network.routerId,
      pair: pairId,
      tokenInId: tokenInId,
      amountIn: amountIn,
      amountOutMin: amountOutMin,
      deadline: BigInt(Date.now() + DEFAULT_TTL)
    },
    tokens: [{ id: tokenInId, amount: amountIn }]
  })
  await waitTxConfirmed(web3.getCurrentNodeProvider(), result.txId, 1)
  return result
}

async function swapMaxIn(
  signer: SignerProvider,
  sender: string,
  pairId: string,
  tokenInId: string,
  amountInMax: bigint,
  amountOut: bigint
): Promise<SignExecuteScriptTxResult> {
  const result = await SwapMaxIn.execute(signer, {
    initialFields: {
      sender: sender,
      router: network.routerId,
      pair: pairId,
      tokenInId: tokenInId,
      amountInMax: amountInMax,
      amountOut: amountOut,
      deadline: BigInt(Date.now() + DEFAULT_TTL)
    },
    tokens: [{ id: tokenInId, amount: amountInMax }]
  })
  await waitTxConfirmed(web3.getCurrentNodeProvider(), result.txId, 1)
  return result
}

export async function swap(
  type: 'ExactInput' | 'ExactOutput',
  signer: SignerProvider,
  sender: string,
  pairId: string,
  tokenInInfo: TokenInfo,
  amountIn: bigint,
  amountOut: bigint
): Promise<SignExecuteScriptTxResult> {
  const balances = await getBalance(sender)
  const available = balances.get(tokenInInfo.tokenId) ?? 0n
  if (available < amountIn) {
    throw new Error(`not enough balance, available: ${bigIntToString(available, tokenInInfo.decimals)}`)
  }

  if (type === 'ExactInput') {
    const amountOutMin = (amountOut * 995n) / 1000n
    return swapMinOut(signer, sender, pairId, tokenInInfo.tokenId, amountIn, amountOutMin)
  }

  const amountInMax = (amountIn * 1005n) / 1000n
  return swapMaxIn(signer, sender, pairId, tokenInInfo.tokenId, amountInMax, amountOut)
}

function isConfirmed(txStatus: node.TxStatus): txStatus is node.Confirmed {
  return txStatus.type === 'Confirmed'
}

export async function waitTxConfirmed(
  provider: NodeProvider,
  txId: string,
  confirmations: number
): Promise<node.Confirmed> {
  const status = await provider.transactions.getTransactionsStatus({ txId: txId })
  if (isConfirmed(status) && status.chainConfirmations >= confirmations) {
    return status
  }
  await new Promise((r) => setTimeout(r, 1000))
  return waitTxConfirmed(provider, txId, confirmations)
}

export interface AddLiquidityResult {
  amountA: bigint
  amountB: bigint
  shareAmount: bigint
  sharePercentage: number
}

export function formatAddLiquidityResult(result: AddLiquidityResult): string {
  const amount = bigIntToString(result.shareAmount, PairTokenDecimals)
  return `Share amount: ${amount.toString()}, share percentage: ${result.sharePercentage}%`
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
  const [reserveA, reserveB] = tokenId === state.token0Id
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

function calcSlippageAmount(amount: bigint, isInitial: boolean): bigint {
  return isInitial ? amount : (amount * 995n) / 1000n
}

export async function addLiquidity(
  signer: SignerProvider,
  sender: string,
  tokenPairState: TokenPairState,
  tokenAInfo: TokenInfo,
  tokenBInfo: TokenInfo,
  amountADesired: bigint,
  amountBDesired: bigint
): Promise<SignExecuteScriptTxResult> {
  const balances = await getBalance(sender)
  const tokenAAvailable = balances.get(tokenAInfo.tokenId) ?? 0n
  if (tokenAAvailable < amountADesired) {
    throw new Error(`not enough balance for token ${tokenAInfo.name}, available: ${bigIntToString(tokenAAvailable, tokenAInfo.decimals)}`)
  }
  const tokenBAvailable = balances.get(tokenBInfo.tokenId) ?? 0n
  if (tokenBAvailable < amountBDesired) {
    throw new Error(`not enough balance for token ${tokenBInfo.name}, available: ${bigIntToString(tokenBAvailable, tokenBInfo.decimals)}`)
  }

  const isInitial = tokenPairState.reserve0 === 0n && tokenPairState.reserve1 === 0n
  const amountAMin = calcSlippageAmount(amountADesired, isInitial)
  const amountBMin = calcSlippageAmount(amountBDesired, isInitial)
  const deadline = BigInt(Date.now() + DEFAULT_TTL)
  const [amount0Desired, amount1Desired, amount0Min, amount1Min] = tokenAInfo.tokenId === tokenPairState.token0Id
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
      deadline: deadline
    },
    tokens: [
      { id: tokenAInfo.tokenId, amount: amountADesired },
      { id: tokenBInfo.tokenId, amount: amountBDesired }
    ]
  })
  await waitTxConfirmed(web3.getCurrentNodeProvider(), result.txId, 1)
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
    token0Id: tokenPairState.token0Id,
    amount0,
    token1Id: tokenPairState.token1Id,
    amount1,
    remainShareAmount,
    remainSharePercentage: parseFloat(remainSharePercentage)
  }
}

export async function removeLiquidity(
  signer: SignerProvider,
  sender: string,
  pairId: string,
  liquidity: bigint,
  amount0Desired: bigint,
  amount1Desired: bigint
): Promise<SignExecuteScriptTxResult> {
  const amount0Min = calcSlippageAmount(amount0Desired, false)
  const amount1Min = calcSlippageAmount(amount1Desired, false)
  const deadline = BigInt(Date.now() + DEFAULT_TTL)
  const result = await RemoveLiquidity.execute(signer, {
    initialFields: {
      sender: sender,
      router: network.routerId,
      pairId: pairId,
      liquidity: liquidity,
      amount0Min: amount0Min,
      amount1Min: amount1Min,
      deadline: deadline
    },
    tokens: [{ id: pairId, amount: liquidity }]
  })
  await waitTxConfirmed(web3.getCurrentNodeProvider(), result.txId, 1)
  return result
}

export async function getBalanceByTokenId(tokenId: string, address: string): Promise<bigint> {
  const balances = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(address)
  const balance = BigInt(balances.tokenBalances?.find((balance) => balance.id === tokenId)?.amount ?? '0')
  const locked = BigInt(balances.lockedTokenBalances?.find((balance) => balance.id === tokenId)?.amount ?? '0')
  return balance - locked
}

export async function tokenPairExist(tokenAId: string, tokenBId: string): Promise<boolean> {
  const factoryId = network.factoryId
  const groupIndex = network.groupIndex
  const [token0Id, token1Id] = sortTokens(tokenAId, tokenBId)
  const path = token0Id + token1Id
  const pairContractId = subContractId(factoryId, path, groupIndex)
  const contractAddress = addressFromContractId(pairContractId)
  return web3.getCurrentNodeProvider()
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
  await waitTxConfirmed(web3.getCurrentNodeProvider(), result.txId, 1)
  return { ...result, tokenPairId: pairContractId }
}

export const ALPHTokenInfo: TokenInfo = {
  tokenId: ALPH_TOKEN_ID,
  tokenAddress: addressFromContractId(ALPH_TOKEN_ID),
  name: 'ALPH',
  symbol: 'ALPH',
  decimals: 18,
  logo: alephiumIcon
}

export async function getTokenInfo(nodeProvider: NodeProvider, tokenId: string): Promise<TokenInfo | undefined> {
  if (tokenId === ALPH_TOKEN_ID) {
    return ALPHTokenInfo
  }

  const groupIndex = parseInt(tokenId.slice(-2), 16)
  const contractAddress = addressFromContractId(tokenId)
  const callData: node.CallContract = {
    group: groupIndex,
    address: contractAddress,
    methodIndex: 0
  }
  const getSymbolResult = await nodeProvider.contracts.postContractsCallContract(callData)
  const getNameResult = await nodeProvider.contracts.postContractsCallContract({ ...callData, methodIndex: 1 })
  const getDecimalsResult = await nodeProvider.contracts.postContractsCallContract({ ...callData, methodIndex: 2 })

  if (
    getSymbolResult.returns.length !== 1 ||
    getNameResult.returns.length !== 1 ||
    getDecimalsResult.returns.length !== 1
  ) {
    return undefined
  }

  const symbolHex = fromApiVal(getSymbolResult.returns[0], 'ByteVec') as string
  const nameHex = fromApiVal(getNameResult.returns[0], 'ByteVec') as string
  const decimals = fromApiVal(getDecimalsResult.returns[0], 'U256') as bigint
  const name = Buffer.from(nameHex, 'hex').toString('utf8')
  return {
    tokenId: tokenId,
    tokenAddress: contractAddress,
    symbol: Buffer.from(symbolHex, 'hex').toString('utf8'),
    name: name,
    decimals: Number(decimals),
    logo: genLogo(name)  // TODO: load logo from configs
  }
}

export function stringToBigInt(amount: string, decimals: number): bigint {
  const result = parseUnits(amount, decimals).toBigInt()
  if (result < 0n) {
    throw new Error(`Invalid amount ${amount}`)
  }
  return result
}

export function bigIntToString(amount: bigint, decimals: number, fractionDigits: number = 6): string {
  const parts = formatUnits(amount, decimals).split('.')
  if (parts.length === 1) {
    return parts[1]
  }
  const fraction = parseFloat('0.' + parts[1].slice(0, fractionDigits)).toString().slice(1)
  return parts[0] + fraction
}

async function getBalance(address: string): Promise<Map<string, bigint>> {
  const balances = new Map<string, bigint>()
  const result = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(address)
  const alphAmount = BigInt(result.balance) - BigInt(result.lockedBalance)
  balances.set(ALPH_TOKEN_ID, alphAmount)
  const tokens: node.Token[] = result.tokenBalances ?? []
  for (const token of tokens) {
    const locked = BigInt(result.lockedTokenBalances?.find((t) => t.id === token.id)?.amount ?? '0')
    const tokenAmount = BigInt(token.amount) - locked
    balances.set(token.id, tokenAmount)
  }
  return balances
}

export function checkContractId(contractId: string) {
  if (!isHexString(contractId) || contractId.length !== 64) {
    throw new Error(`invalid token id: ${shortString(contractId)}, expected length 64 hex-string`)
  }
}

function shortString(str: string) {
  if (str.length <= 8) return str
  return `${str.slice(0, 8)}...`
}
