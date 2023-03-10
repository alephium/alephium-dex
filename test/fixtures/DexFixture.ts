import {
  addressFromContractId,
  Asset,
  binToHex,
  contractIdFromAddress,
  ContractState,
  Fields,
  groupOfAddress,
  number256ToBigint,
  Project,
  Token
} from '@alephium/web3'
import { randomBytes } from 'crypto'
import * as base58 from 'bs58'
import { TokenPairFactory, TokenPair, Router, TestToken, GetToken } from '../../artifacts/ts'

export const oneAlph = 10n ** 18n
export const minimalAlphInContract = oneAlph
export const maxAlphAmount = 10n ** 18n * 1000000000n
export const gasPrice = 100000000000n
export const maxGasPerTx = 625000n
export const defaultGasFee = gasPrice * maxGasPerTx

export enum ErrorCodes {
  ReserveOverflow,
  InsufficientInitLiquidity,
  InsufficientLiquidityMinted,
  InsufficientLiquidityBurned,
  InvalidToAddress,
  InsufficientLiquidity,
  InvalidTokenInId,
  InvalidCalleeId,
  InvalidK,
  InsufficientOutputAmount,
  InsufficientInputAmount,
  IdenticalTokenIds,
  Expired,
  InsufficientToken0Amount,
  InsufficientToken1Amount,
  TokenNotExist
}

export class ContractFixture<F extends Fields> {
  selfState: ContractState<F>
  dependencies: ContractState[]
  address: string
  contractId: string

  states(): ContractState[] {
    return this.dependencies.concat([this.selfState])
  }

  constructor(selfState: ContractState<F>, dependencies: ContractState[], address: string) {
    this.selfState = selfState
    this.dependencies = dependencies
    this.address = address
    this.contractId = selfState.contractId
  }
}

export async function buildProject(): Promise<void> {
  if (typeof Project.currentProject === 'undefined') {
    await Project.build({ ignoreUnusedConstantsWarnings: true })
  }
}

export function randomBigInt(min: bigint, max: bigint): bigint {
  const diff = max - min
  const length = diff.toString().length
  let multiplier = ''
  while (multiplier.length < length) {
    multiplier += Math.random().toString().split('.')[1]
  }
  multiplier = multiplier.slice(0, length)
  const num = (diff * BigInt(multiplier)) / 10n ** BigInt(length)
  return num + min
}

export function randomContractAddress(): string {
  const prefix = Buffer.from([0x03])
  const bytes = Buffer.concat([prefix, randomBytes(32)])
  return base58.encode(bytes)
}

export function randomP2PKHAddress(): string {
  const prefix = Buffer.from([0x00])
  const bytes = Buffer.concat([prefix, randomBytes(32)])
  return base58.encode(bytes)
}

export function randomTokenId(): string {
  return binToHex(randomBytes(32))
}

export function sortTokens(tokenAId: string, tokenBId: string): [string, string] {
  const left = BigInt('0x' + tokenAId)
  const right = BigInt('0x' + tokenBId)
  return left < right ? [tokenAId, tokenBId] : [tokenBId, tokenAId]
}

export function randomTokenPair(): [string, string] {
  return sortTokens(randomTokenId(), randomTokenId())
}

export function bigintToHex(num: bigint): string {
  return num.toString(16).padStart(64, '0')
}

export function createTokenPair(token0Id: string, token1Id: string, contractId?: string) {
  const address = contractId ? addressFromContractId(contractId) : randomContractAddress()
  const contractState = TokenPair.stateForTest(
    {
      token0Id: token0Id,
      token1Id: token1Id,
      reserve0: 0n,
      reserve1: 0n,
      blockTimeStampLast: 0n,
      price0CumulativeLast: 0n,
      price1CumulativeLast: 0n,
      totalSupply: 0n
    },
    {
      alphAmount: oneAlph,
      tokens: [{ id: binToHex(contractIdFromAddress(address)), amount: 1n << 255n }]
    },
    address
  )
  return new ContractFixture(contractState, [], address)
}

export function createTokenPairFactory() {
  const pairTemplate = createTokenPair(randomTokenId(), randomTokenId())
  const address = randomContractAddress()
  const contractState = TokenPairFactory.stateForTest(
    { pairTemplateId: pairTemplate.contractId, pairSize: 0n },
    { alphAmount: oneAlph },
    address
  )
  return new ContractFixture(contractState, pairTemplate.states(), address)
}

export function createRouter() {
  const address = randomContractAddress()
  const contractState = Router.stateForTest({}, { alphAmount: oneAlph }, address)
  return new ContractFixture(contractState, [], address)
}

function sameTokens(expected: Token[], have: Token[]): boolean {
  return expected.every((a) => have.some((b) => a.amount === b.amount && a.id === b.id))
}

export function contractBalanceOf(state: ContractState, tokenId: string): bigint {
  const token = state.asset.tokens?.find((t) => t.id === tokenId)
  return token === undefined ? 0n : number256ToBigint(token.amount)
}

export function expectTokensEqual(expected: Token[], have: Token[]) {
  expect(expected.length).toEqual(have.length)
  expect(sameTokens(expected, have)).toEqual(true)
}

export function expectAssetsEqual(expected: Asset[], have: Asset[]) {
  expect(expected.length).toEqual(have.length)
  expected.forEach((a) =>
    expect(have.some((b) => a.alphAmount === b.alphAmount && sameTokens(a.tokens ?? [], b.tokens ?? [])))
  )
}

export function getContractState<T extends Fields>(contracts: ContractState[], contractId: string): ContractState<T> {
  return contracts.find((c) => c.contractId === contractId)! as ContractState<T>
}
