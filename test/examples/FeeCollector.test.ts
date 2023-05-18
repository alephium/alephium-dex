import { Address, addressFromContractId, ContractState, ONE_ALPH, subContractId, web3 } from '@alephium/web3'
import {
  FeeCollectorImpl,
  FeeCollectorFactoryImpl,
  TokenPairTypes,
  TokenPair,
  FeeCollectorFactoryImplTypes,
  FeeCollectorImplTypes,
  TokenPairFactoryTypes,
  TokenPairFactory
} from '../../artifacts/ts'
import {
  buildProject,
  contractBalanceOf,
  ContractFixture,
  createTokenPair,
  createTokenPairFactory,
  expandTo18Decimals,
  getContractState,
  minimumLiquidity,
  mint,
  randomP2PKHAddress,
  randomTokenPair
} from '../fixtures/DexFixture'
import { randomContractAddress, randomContractId } from '@alephium/web3-test'

function createFeeCollectorTemplate() {
  const address = randomContractAddress()
  const contractState = FeeCollectorImpl.stateForTest(
    {
      tokenPairFactory: '',
      tokenPairId: ''
    },
    { alphAmount: ONE_ALPH },
    address
  )
  return new ContractFixture(contractState, [], address)
}

function createFeeCollectorFactory(tokenPairFactoryId: string, contractId: string) {
  const feeCollectorTemplate = createFeeCollectorTemplate()
  const address = addressFromContractId(contractId)
  const contractState = FeeCollectorFactoryImpl.stateForTest(
    {
      feeCollectorTemplateId: feeCollectorTemplate.contractId,
      tokenPairFactory: tokenPairFactoryId
    },
    { alphAmount: ONE_ALPH },
    address
  )
  return new ContractFixture(contractState, feeCollectorTemplate.states(), address)
}

describe('test fee collector', () => {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973')

  let sender: string
  let token0Id: string
  let token1Id: string
  let tokenPairFactoryFixture: ContractFixture<TokenPairFactoryTypes.Fields>
  let feeCollectorFactoryFixture: ContractFixture<FeeCollectorFactoryImplTypes.Fields>
  let tokenPairFixture: ContractFixture<TokenPairTypes.Fields>
  beforeEach(async () => {
    await buildProject()

    sender = randomP2PKHAddress()
    const tokenPair = randomTokenPair()
    token0Id = tokenPair[0]
    token1Id = tokenPair[1]
    const feeCollectorFactoryId = randomContractId()
    tokenPairFactoryFixture = createTokenPairFactory(sender, feeCollectorFactoryId)
    feeCollectorFactoryFixture = createFeeCollectorFactory(tokenPairFactoryFixture.contractId, feeCollectorFactoryId)
    tokenPairFactoryFixture.dependencies.push(...feeCollectorFactoryFixture.states())
    tokenPairFixture = createTokenPair(token0Id, token1Id, undefined, tokenPairFactoryFixture)
  })

  async function mintAndSwap(tokenPairState: ContractState<TokenPairTypes.Fields>) {
    const token0Amount = expandTo18Decimals(1000)
    const token1Amount = expandTo18Decimals(1000)
    const { contractState } = await mint(tokenPairFixture, sender, token0Amount, token1Amount, tokenPairState.fields, tokenPairState.asset)

    const swapAmount = expandTo18Decimals(1)
    const expectedOutputAmount = 996006981039903216n

    const swapResult = await TokenPair.tests.swap({
      initialFields: contractState.fields,
      initialAsset: contractState.asset,
      address: tokenPairFixture.address,
      existingContracts: tokenPairFixture.dependencies,
      testArgs: {
        sender: sender,
        amount0In: 0n,
        amount1In: swapAmount,
        amount0Out: expectedOutputAmount,
        amount1Out: 0n,
        to: sender
      },
      inputAssets: [{
        address: sender,
        asset: {
          alphAmount: ONE_ALPH,
          tokens: [{ id: token1Id, amount: swapAmount }]
        }
      }]
    })
    return getContractState<TokenPairTypes.Fields>(swapResult.contracts, tokenPairFixture.contractId)
  }

  test("feeTo:off", async () => {
    const contractState0 = await mintAndSwap(tokenPairFixture.selfState)
    const expectedLiquidity = expandTo18Decimals(1000)
    const burnLiquidity = expectedLiquidity - minimumLiquidity

    const burnResult = await TokenPair.tests.burn({
      initialFields: contractState0.fields,
      initialAsset: contractState0.asset,
      address: tokenPairFixture.address,
      existingContracts: tokenPairFixture.dependencies,
      testArgs: { sender: sender, liquidity: burnLiquidity },
      inputAssets: [{
        address: sender,
        asset: {
          alphAmount: ONE_ALPH,
          tokens: [{ id: tokenPairFixture.contractId, amount: burnLiquidity }]
        }
      }]
    })

    const contractState1 = getContractState<TokenPairTypes.Fields>(burnResult.contracts, tokenPairFixture.contractId)
    expect(contractState1.fields.totalSupply).toEqual(minimumLiquidity)
  })

  test("feeTo:on", async () => {
    const enableFeeCollectorResult = await TokenPairFactory.tests.enableFeeCollector({
      initialFields: tokenPairFactoryFixture.selfState.fields,
      initialAsset: tokenPairFactoryFixture.selfState.asset,
      address: tokenPairFactoryFixture.address,
      existingContracts: tokenPairFactoryFixture.dependencies.concat(tokenPairFixture.selfState),
      testArgs: { tokenPair: tokenPairFixture.contractId, alphAmount: ONE_ALPH },
      inputAssets: [{
        address: sender,
        asset: { alphAmount: ONE_ALPH * 2n }
      }]
    })
    const contractState0 = getContractState<TokenPairTypes.Fields>(enableFeeCollectorResult.contracts, tokenPairFixture.contractId)
    const feeCollectorId = subContractId(feeCollectorFactoryFixture.contractId, tokenPairFixture.contractId, 0)
    const feeCollectorState = getContractState<FeeCollectorImplTypes.Fields>(enableFeeCollectorResult.contracts, feeCollectorId)
    tokenPairFixture.dependencies.push(feeCollectorState)

    const contractState1 = await mintAndSwap(contractState0)
    const expectedLiquidity = expandTo18Decimals(1000)
    const burnLiquidity = expectedLiquidity - minimumLiquidity

    const burnResult = await TokenPair.tests.burn({
      initialFields: contractState1.fields,
      initialAsset: contractState1.asset,
      address: tokenPairFixture.address,
      existingContracts: tokenPairFixture.dependencies.concat([feeCollectorState]),
      testArgs: { sender: sender, liquidity: burnLiquidity },
      inputAssets: [{
        address: sender,
        asset: {
          alphAmount: ONE_ALPH,
          tokens: [{ id: tokenPairFixture.contractId, amount: burnLiquidity }]
        }
      }]
    })
    const contractState2 = getContractState<TokenPairTypes.Fields>(burnResult.contracts, tokenPairFixture.contractId)
    expect(contractState2.fields.totalSupply).toEqual(minimumLiquidity + 249750499251388n)
    expect(contractBalanceOf(contractState2, token0Id)).toEqual(1000n + 249501683697445n)
    expect(contractBalanceOf(contractState2, token1Id)).toEqual(1000n + 250000187312969n)

    const newFeeCollectorState = getContractState<FeeCollectorImplTypes.Fields>(burnResult.contracts, feeCollectorId)
    expect(contractBalanceOf(newFeeCollectorState, tokenPairFixture.contractId)).toEqual(249750499251388n)
  })
})
