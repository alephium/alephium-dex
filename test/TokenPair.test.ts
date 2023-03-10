import { ALPH_TOKEN_ID, Asset, ONE_ALPH, sleep, Token, web3 } from '@alephium/web3'
import {
  buildProject,
  contractBalanceOf,
  ContractFixture,
  createTokenPair,
  ErrorCodes,
  expectTokensEqual,
  getContractState,
  oneAlph,
  randomP2PKHAddress,
  randomTokenId,
  randomTokenPair,
  defaultGasFee,
  dustAmount
} from './fixtures/DexFixture'
import { expectAssertionError } from '@alephium/web3-test'
import { TokenPair, TokenPairTypes } from '../artifacts/ts'

const MinimumLiquidity = 1000n

export async function mint(
  tokenPairFixture: ContractFixture<TokenPairTypes.Fields>,
  sender: string,
  amount0: bigint,
  amount1: bigint,
  initialFields?: TokenPairTypes.Fields,
  initialAsset?: Asset
) {
  const token0Id = tokenPairFixture.selfState.fields.token0Id
  const token1Id = tokenPairFixture.selfState.fields.token1Id
  const initFields = initialFields ?? tokenPairFixture.selfState.fields
  const initAsset = initialAsset ?? tokenPairFixture.selfState.asset

  const tokens: Token[] = [{ id: token1Id, amount: amount1 }]
  let alphAmount: bigint = oneAlph
  if (token0Id === ALPH_TOKEN_ID) {
    alphAmount += amount0
  } else {
    tokens.push({ id: token0Id, amount: amount0 })
  }

  const inputAssets = [{ address: sender, asset: { alphAmount: alphAmount, tokens: tokens } }]
  const testResult = await TokenPair.testMintMethod({
    initialFields: initFields,
    initialAsset: initAsset,
    address: tokenPairFixture.address,
    existingContracts: tokenPairFixture.dependencies,
    testArgs: { sender: sender, amount0: amount0, amount1: amount1 },
    inputAssets: inputAssets
  })
  const contractState = getContractState<TokenPairTypes.Fields>(testResult.contracts, tokenPairFixture.contractId)
  const reserve0 = contractState.fields.reserve0
  const reserve1 = contractState.fields.reserve1
  const totalSupply = contractState.fields.totalSupply
  return { testResult: testResult, contractState, reserve0, reserve1, totalSupply }
}

describe('test token pair', () => {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973')

  function expandTo18Decimals(num: bigint | number): bigint {
    return BigInt(num) * (10n ** 18n)
  }

  let sender: string
  let token0Id: string
  let token1Id: string
  let fixture: ContractFixture<TokenPairTypes.Fields>
  beforeEach(async () => {
    await buildProject()

    sender = randomP2PKHAddress()
    const tokenPair = randomTokenPair()
    token0Id = tokenPair[0]
    token1Id = tokenPair[1]
    fixture = createTokenPair(token0Id, token1Id)
  })

  test('mint: initial liquidity', async () => {
    const token0Amount = expandTo18Decimals(1n)
    const token1Amount = expandTo18Decimals(4n)
    const expectedLiquidity = expandTo18Decimals(2n)
    const mintResult = await TokenPair.testMintMethod({
      initialFields: fixture.selfState.fields,
      initialAsset: fixture.selfState.asset,
      address: fixture.address,
      existingContracts: fixture.dependencies,
      testArgs: { sender: sender, amount0: token0Amount, amount1: token1Amount },
      inputAssets: [{
        address: sender,
        asset: {
          alphAmount: ONE_ALPH,
          tokens: [{ id: token0Id, amount: token0Amount }, { id: token1Id, amount: token1Amount }]
        }
      }]
    })

    expect(mintResult.events.length).toEqual(1)
    const mintEvent = mintResult.events[0] as TokenPairTypes.MintEvent
    expect(mintEvent.fields).toEqual({
      sender: sender,
      amount0: token0Amount,
      amount1: token1Amount,
      liquidity: expectedLiquidity - MinimumLiquidity
    })

    const tokenPairState = getContractState<TokenPairTypes.Fields>(mintResult.contracts, fixture.contractId)
    expect(tokenPairState.fields.totalSupply).toEqual(expectedLiquidity)
    expect(tokenPairState.fields.reserve0).toEqual(token0Amount)
    expect(tokenPairState.fields.reserve1).toEqual(token1Amount)
    expect(contractBalanceOf(tokenPairState, token0Id)).toEqual(token0Amount)
    expect(contractBalanceOf(tokenPairState, token1Id)).toEqual(token1Amount)

    const senderOutput = mintResult.txOutputs.find((o) => o.address === sender && o.tokens !== undefined && o.tokens.length > 0)!
    expect(senderOutput.tokens!).toEqual([{ id: fixture.contractId, amount: expectedLiquidity - MinimumLiquidity }])
  })

  test('mint', async () => {
    const token0Amount = expandTo18Decimals(1n)
    const token1Amount = expandTo18Decimals(4n)
    const { contractState } = await mint(fixture, sender, token0Amount, token1Amount)
    const expectedLiquidity = expandTo18Decimals(2n)
    const mintResult = await TokenPair.testMintMethod({
      initialFields: contractState.fields,
      initialAsset: contractState.asset,
      address: fixture.address,
      existingContracts: fixture.dependencies,
      testArgs: { sender: sender, amount0: token0Amount, amount1: token1Amount },
      inputAssets: [{
        address: sender,
        asset: {
          alphAmount: ONE_ALPH,
          tokens: [{ id: token0Id, amount: token0Amount }, { id: token1Id, amount: token1Amount }]
        }
      }]
    })

    expect(mintResult.events.length).toEqual(1)
    const mintEvent = mintResult.events[0] as TokenPairTypes.MintEvent
    expect(mintEvent.fields).toEqual({
      sender: sender,
      amount0: token0Amount,
      amount1: token1Amount,
      liquidity: expectedLiquidity
    })

    const tokenPairState = getContractState<TokenPairTypes.Fields>(mintResult.contracts, fixture.contractId)
    expect(tokenPairState.fields.totalSupply).toEqual(expectedLiquidity * 2n)
    expect(tokenPairState.fields.reserve0).toEqual(token0Amount * 2n)
    expect(tokenPairState.fields.reserve1).toEqual(token1Amount * 2n)
    expect(contractBalanceOf(tokenPairState, token0Id)).toEqual(token0Amount * 2n)
    expect(contractBalanceOf(tokenPairState, token1Id)).toEqual(token1Amount * 2n)

    const senderOutput = mintResult.txOutputs.find((o) => o.address === sender && o.tokens !== undefined && o.tokens.length > 0)!
    expect(senderOutput.tokens!).toEqual([{ id: fixture.contractId, amount: expectedLiquidity }])
  })

  const swapTestCases: bigint[][] = [
    [1, 5, 10, '1662497915624478906'],
    [1, 10, 5, '453305446940074565'],

    [2, 5, 10, '2851015155847869602'],
    [2, 10, 5, '831248957812239453'],

    [1, 10, 10, '906610893880149131'],
    [1, 100, 100, '987158034397061298'],
    [1, 1000, 1000, '996006981039903216']
  ].map((a) => a.map((v) => typeof v === 'string' ? BigInt(v) : expandTo18Decimals(v)))

  swapTestCases.forEach((swapTestCase, i) => {
    test(`getInputPrice: ${i}`, async () =>  {
      const [swapAmount, token0Amount, token1Amount, expectedOutputAmount] = swapTestCase
      const { contractState } = await mint(fixture, sender, token0Amount, token1Amount)
      const func = async (outputAmount: bigint) => {
        return TokenPair.testSwapMethod({
          initialFields: contractState.fields,
          initialAsset: contractState.asset,
          address: fixture.address,
          existingContracts: fixture.dependencies,
          testArgs: {
            sender: sender,
            tokenInId: token0Id,
            amountIn: swapAmount,
            amountOut: outputAmount
          },
          inputAssets: [{
            address: sender,
            asset: {
              alphAmount: ONE_ALPH,
              tokens: [{ id: token0Id, amount: swapAmount }]
            }
          }]
        })
      }
      await expectAssertionError(func(expectedOutputAmount + 1n), fixture.address, ErrorCodes.InvalidK)
      await func(expectedOutputAmount)
    })
  })

  test('swap:token0', async () => {
    const token0Amount = expandTo18Decimals(5)
    const token1Amount = expandTo18Decimals(10)
    const { contractState } = await mint(fixture, sender, token0Amount, token1Amount)

    const swapAmount = expandTo18Decimals(1)
    const expectedOutputAmount = 1662497915624478906n

    const swapResult = await TokenPair.testSwapMethod({
      initialFields: contractState.fields,
      initialAsset: contractState.asset,
      address: fixture.address,
      existingContracts: fixture.dependencies,
      testArgs: {
        sender: sender,
        tokenInId: token0Id,
        amountIn: swapAmount,
        amountOut: expectedOutputAmount
      },
      inputAssets: [{
        address: sender,
        asset: {
          alphAmount: ONE_ALPH,
          tokens: [{ id: token0Id, amount: swapAmount }]
        }
      }]
    })

    expect(swapResult.events.length).toEqual(1)
    const event = swapResult.events[0] as TokenPairTypes.SwapEvent
    expect(event.fields).toEqual({
      sender: sender,
      tokenInId: token0Id,
      amountIn: swapAmount,
      amountOut: expectedOutputAmount
    })

    const tokenPairState = getContractState<TokenPairTypes.Fields>(swapResult.contracts, fixture.contractId)
    expect(tokenPairState.fields.reserve0).toEqual(token0Amount + swapAmount)
    expect(tokenPairState.fields.reserve1).toEqual(token1Amount - expectedOutputAmount)
    expect(contractBalanceOf(tokenPairState, token0Id)).toEqual(token0Amount + swapAmount)
    expect(contractBalanceOf(tokenPairState, token1Id)).toEqual(token1Amount - expectedOutputAmount)

    const senderOutput = swapResult.txOutputs.find((o) => o.address === sender && o.tokens !== undefined && o.tokens.length > 0)!
    expect(senderOutput.tokens!).toEqual([{ id: token1Id, amount: expectedOutputAmount }])
  })

  test('swap:token1', async () => {
    const token0Amount = expandTo18Decimals(5)
    const token1Amount = expandTo18Decimals(10)
    const { contractState } = await mint(fixture, sender, token0Amount, token1Amount)

    const swapAmount = expandTo18Decimals(1)
    const expectedOutputAmount = 453305446940074565n

    const swapResult = await TokenPair.testSwapMethod({
      initialFields: contractState.fields,
      initialAsset: contractState.asset,
      address: fixture.address,
      existingContracts: fixture.dependencies,
      testArgs: {
        sender: sender,
        tokenInId: token1Id,
        amountIn: swapAmount,
        amountOut: expectedOutputAmount
      },
      inputAssets: [{
        address: sender,
        asset: {
          alphAmount: ONE_ALPH,
          tokens: [{ id: token1Id, amount: swapAmount }]
        }
      }]
    })

    expect(swapResult.events.length).toEqual(1)
    const event = swapResult.events[0] as TokenPairTypes.SwapEvent
    expect(event.fields).toEqual({
      sender: sender,
      tokenInId: token1Id,
      amountIn: swapAmount,
      amountOut: expectedOutputAmount
    })

    const tokenPairState = getContractState<TokenPairTypes.Fields>(swapResult.contracts, fixture.contractId)
    expect(tokenPairState.fields.reserve0).toEqual(token0Amount - expectedOutputAmount)
    expect(tokenPairState.fields.reserve1).toEqual(token1Amount + swapAmount)
    expect(contractBalanceOf(tokenPairState, token0Id)).toEqual(token0Amount - expectedOutputAmount)
    expect(contractBalanceOf(tokenPairState, token1Id)).toEqual(token1Amount + swapAmount)

    const senderOutput = swapResult.txOutputs.find((o) => o.address === sender && o.tokens !== undefined && o.tokens.length > 0)!
    expect(senderOutput.tokens!).toEqual([{ id: token0Id, amount: expectedOutputAmount }])
  })

  test('swap token by ALPH', async () => {
    const token0Id = ALPH_TOKEN_ID
    const token1Id = randomTokenId()
    const fixture = createTokenPair(token0Id, token1Id)

    const token0Amount = expandTo18Decimals(5)
    const token1Amount = expandTo18Decimals(10)
    const { contractState } = await mint(fixture, sender, token0Amount, token1Amount)

    const swapAmount = expandTo18Decimals(1)
    const expectedOutputAmount = 1662497915624478906n

    const swapResult = await TokenPair.testSwapMethod({
      initialFields: contractState.fields,
      initialAsset: contractState.asset,
      address: fixture.address,
      existingContracts: fixture.dependencies,
      testArgs: {
        sender: sender,
        tokenInId: ALPH_TOKEN_ID,
        amountIn: swapAmount,
        amountOut: expectedOutputAmount
      },
      inputAssets: [{
        address: sender,
        asset: { alphAmount: ONE_ALPH * 2n, }
      }]
    })

    expect(swapResult.events.length).toEqual(1)
    const event = swapResult.events[0] as TokenPairTypes.SwapEvent
    expect(event.fields).toEqual({
      sender: sender,
      tokenInId: ALPH_TOKEN_ID,
      amountIn: swapAmount,
      amountOut: expectedOutputAmount
    })

    const tokenPairState = getContractState<TokenPairTypes.Fields>(swapResult.contracts, fixture.contractId)
    expect(tokenPairState.fields.reserve0).toEqual(token0Amount + swapAmount)
    expect(tokenPairState.fields.reserve1).toEqual(token1Amount - expectedOutputAmount)
    expect(tokenPairState.asset.alphAmount).toEqual(token0Amount + swapAmount + ONE_ALPH)
    expect(contractBalanceOf(tokenPairState, token1Id)).toEqual(token1Amount - expectedOutputAmount)

    const senderTokenOutput = swapResult.txOutputs.find((o) => o.address === sender && o.tokens !== undefined && o.tokens.length > 0)!
    expect(senderTokenOutput.tokens!).toEqual([{ id: token1Id, amount: expectedOutputAmount }])
    expect(senderTokenOutput.alphAmount).toEqual(dustAmount)
    const senderALPHOutput = swapResult.txOutputs.find((o) => o.address === sender && (o.tokens === undefined || o.tokens.length === 0))!
    expect(senderALPHOutput.alphAmount).toEqual(ONE_ALPH * 2n - swapAmount - defaultGasFee - dustAmount)
  })

  test('swap ALPH by token', async () => {
    const token0Id = ALPH_TOKEN_ID
    const token1Id = randomTokenId()
    const fixture = createTokenPair(token0Id, token1Id)

    const token0Amount = expandTo18Decimals(5)
    const token1Amount = expandTo18Decimals(10)
    const { contractState } = await mint(fixture, sender, token0Amount, token1Amount)

    const swapAmount = expandTo18Decimals(1)
    const expectedOutputAmount = 453305446940074565n

    const swapResult = await TokenPair.testSwapMethod({
      initialFields: contractState.fields,
      initialAsset: contractState.asset,
      address: fixture.address,
      existingContracts: fixture.dependencies,
      testArgs: {
        sender: sender,
        tokenInId: token1Id,
        amountIn: swapAmount,
        amountOut: expectedOutputAmount
      },
      inputAssets: [{
        address: sender,
        asset: {
          alphAmount: ONE_ALPH,
          tokens: [{ id: token1Id, amount: swapAmount }]
        }
      }]
    })

    expect(swapResult.events.length).toEqual(1)
    const event = swapResult.events[0] as TokenPairTypes.SwapEvent
    expect(event.fields).toEqual({
      sender: sender,
      tokenInId: token1Id,
      amountIn: swapAmount,
      amountOut: expectedOutputAmount
    })

    const tokenPairState = getContractState<TokenPairTypes.Fields>(swapResult.contracts, fixture.contractId)
    expect(tokenPairState.fields.reserve0).toEqual(token0Amount - expectedOutputAmount)
    expect(tokenPairState.fields.reserve1).toEqual(token1Amount + swapAmount)
    expect(tokenPairState.asset.alphAmount).toEqual(token0Amount - expectedOutputAmount + ONE_ALPH)
    expect(contractBalanceOf(tokenPairState, token1Id)).toEqual(token1Amount + swapAmount)

    const senderALPHOutput = swapResult.txOutputs.find((o) => o.address === sender)!
    expect(senderALPHOutput.alphAmount).toEqual(ONE_ALPH + expectedOutputAmount - defaultGasFee)
  })

  test('swap:gas', async () => {
    const token0Amount = expandTo18Decimals(5)
    const token1Amount = expandTo18Decimals(10)
    const { contractState } = await mint(fixture, sender, token0Amount, token1Amount)

    // sleep 1 second to avoid `timeElapsed` less than 1 second
    await sleep(1000)

    const swapAmount = expandTo18Decimals(1)
    const expectedOutputAmount = 453305446940074565n

    const swapResult = await TokenPair.testSwapMethod({
      initialFields: contractState.fields,
      initialAsset: contractState.asset,
      address: fixture.address,
      existingContracts: fixture.dependencies,
      testArgs: {
        sender: sender,
        tokenInId: token1Id,
        amountIn: swapAmount,
        amountOut: expectedOutputAmount
      },
      inputAssets: [{
        address: sender,
        asset: {
          alphAmount: ONE_ALPH,
          tokens: [{ id: token1Id, amount: swapAmount }]
        }
      }]
    })

    expect(swapResult.gasUsed).toEqual(23223)
  })

  test('burn', async () => {
    const token0Amount = expandTo18Decimals(3)
    const token1Amount = expandTo18Decimals(3)
    const { contractState } = await mint(fixture, sender, token0Amount, token1Amount)

    const expectedLiquidity = expandTo18Decimals(3)
    const liquidity = expectedLiquidity - MinimumLiquidity
    const burnResult = await TokenPair.testBurnMethod({
      initialFields: contractState.fields,
      initialAsset: contractState.asset,
      address: fixture.address,
      existingContracts: fixture.dependencies,
      testArgs: { sender: sender, liquidity: liquidity },
      inputAssets: [{
        address: sender,
        asset: {
          alphAmount: ONE_ALPH,
          tokens: [{ id: fixture.contractId, amount: liquidity }]
        }
      }]
    })

    expect(burnResult.events.length).toEqual(1)
    const event = burnResult.events[0] as TokenPairTypes.BurnEvent
    expect(event.fields).toEqual({
      sender: sender,
      amount0: token0Amount - MinimumLiquidity,
      amount1: token1Amount - MinimumLiquidity,
      liquidity: liquidity
    })

    const tokenPairState = getContractState<TokenPairTypes.Fields>(burnResult.contracts, fixture.contractId)
    expect(tokenPairState.fields.totalSupply).toEqual(MinimumLiquidity)
    expect(tokenPairState.fields.reserve0).toEqual(MinimumLiquidity)
    expect(tokenPairState.fields.reserve1).toEqual(MinimumLiquidity)
    expect(contractBalanceOf(tokenPairState, token0Id)).toEqual(MinimumLiquidity)
    expect(contractBalanceOf(tokenPairState, token1Id)).toEqual(MinimumLiquidity)

    const senderOutputs = burnResult.txOutputs.filter((o) => o.address === sender && o.tokens !== undefined && o.tokens.length > 0)
    expect(senderOutputs.length).toEqual(2)
    const senderTokens = [...senderOutputs[0].tokens!, ...senderOutputs[1].tokens!]
    expectTokensEqual(senderTokens, [
      { id: token0Id, amount: token0Amount - MinimumLiquidity },
      { id: token1Id, amount: token1Amount - MinimumLiquidity },
    ])
  })

  it('price{0,1}CumulativeLast', async () => {
    function encodePrice(reserve0: bigint, reserve1: bigint) {
      return [(reserve1 * (2n ** 112n)) / reserve0, (reserve0 * (2n ** 112n)) / reserve1]
    }

    const token0Amount = expandTo18Decimals(3)
    const token1Amount = expandTo18Decimals(3)
    const { contractState } = await mint(fixture, sender, token0Amount, token1Amount)

    const blockTimestamp = contractState.fields.blockTimeStampLast
    await sleep(2000)

    const result0 = await TokenPair.testUpdateMethod({
      initialFields: contractState.fields,
      initialAsset: contractState.asset,
      address: fixture.address,
      existingContracts: fixture.dependencies,
      testArgs: { newReserve0: contractState.fields.reserve0, newReserve1: contractState.fields.reserve1 }
    })

    const tokenPairState0 = getContractState<TokenPairTypes.Fields>(result0.contracts, fixture.contractId)
    const initialPrice = encodePrice(token0Amount, token1Amount)
    expect(tokenPairState0.fields.price0CumulativeLast >= initialPrice[0] * 2n).toEqual(true)
    expect(tokenPairState0.fields.price1CumulativeLast >= initialPrice[1] * 2n).toEqual(true)
    expect(tokenPairState0.fields.blockTimeStampLast >= blockTimestamp + 2n).toEqual(true)

    const swapAmount = expandTo18Decimals(3)
    await sleep(2000)
    const diff = BigInt(Math.floor(Date.now() / 1000)) - tokenPairState0.fields.blockTimeStampLast + 2n
    const result1 = await TokenPair.testSwapMethod({
      initialFields: tokenPairState0.fields,
      initialAsset: tokenPairState0.asset,
      address: fixture.address,
      existingContracts: fixture.dependencies,
      testArgs: {
        sender: sender,
        tokenInId: token0Id,
        amountIn: swapAmount,
        amountOut: expandTo18Decimals(1)
      },
      inputAssets: [{
        address: sender,
        asset: {
          alphAmount: ONE_ALPH,
          tokens: [{ id: token0Id, amount: swapAmount }]
        }
      }]
    })

    const tokenPairState1 = getContractState<TokenPairTypes.Fields>(result1.contracts, fixture.contractId)
    expect(tokenPairState1.fields.price0CumulativeLast >= initialPrice[0] * diff).toEqual(true)
    expect(tokenPairState1.fields.price1CumulativeLast >= initialPrice[1] * diff).toEqual(true)
    expect(tokenPairState1.fields.blockTimeStampLast >= blockTimestamp + diff).toEqual(true)
    expect(tokenPairState1.fields.reserve0).toEqual(expandTo18Decimals(6))
    expect(tokenPairState1.fields.reserve1).toEqual(expandTo18Decimals(2))

    await sleep(2000)
    const newPrice = encodePrice(expandTo18Decimals(6), expandTo18Decimals(2))
    const result2 = await TokenPair.testUpdateMethod({
      initialFields: tokenPairState1.fields,
      initialAsset: tokenPairState1.asset,
      address: fixture.address,
      existingContracts: fixture.dependencies,
      testArgs: { newReserve0: tokenPairState1.fields.reserve0, newReserve1: tokenPairState1.fields.reserve1 }
    })

    const tokenPairState2 = getContractState<TokenPairTypes.Fields>(result2.contracts, fixture.contractId)
    expect(tokenPairState2.fields.price0CumulativeLast >= tokenPairState1.fields.price0CumulativeLast + newPrice[0] * 2n).toEqual(true)
    expect(tokenPairState2.fields.price1CumulativeLast >= tokenPairState1.fields.price1CumulativeLast + newPrice[1] * 2n).toEqual(true)
    expect(tokenPairState2.fields.blockTimeStampLast >= tokenPairState1.fields.blockTimeStampLast + 2n).toEqual(true)
  }, 20000)
})
