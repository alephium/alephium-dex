import { ALPH_TOKEN_ID, Asset, number256ToBigint, Token, web3 } from '@alephium/web3'
import {
  buildProject,
  ContractFixture,
  createTokenPair,
  createTokenPairFactory,
  defaultGasFee,
  dustAmount,
  ErrorCodes,
  expectAssetsEqual,
  expectTokensEqual,
  getContractState,
  oneAlph,
  randomP2PKHAddress,
  randomTokenId,
  randomTokenPair
} from './fixtures/DexFixture'
import BigNumber from 'bignumber.js'
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

  function calcLiquidity(
    amount0: bigint,
    amount1: bigint,
    reserve0: bigint,
    reserve1: bigint,
    totalSupply: bigint
  ): bigint {
    if (totalSupply === 0n) {
      const liquidity = BigInt(
        BigNumber((amount0 * amount1).toString())
          .sqrt()
          .toFixed(0, BigNumber.ROUND_DOWN)
      )
      return liquidity - MinimumLiquidity
    }

    const liquidity0 = (amount0 * totalSupply) / reserve0
    const liquidity1 = (amount1 * totalSupply) / reserve1
    return liquidity0 < liquidity1 ? liquidity0 : liquidity1
  }

  function calcCumulativePrice(
    price0: bigint,
    price1: bigint,
    reserve0: bigint,
    reserve1: bigint,
    timeElapsed: bigint
  ): [bigint, bigint] {
    const factor = 1n << 112n
    const newPrice0 = ((reserve1 * factor) / reserve0) * timeElapsed + price0
    const newPrice1 = ((reserve0 * factor) / reserve1) * timeElapsed + price1
    return [newPrice0, newPrice1]
  }

  test('mint', async () => {
    await buildProject()

    const sender = randomP2PKHAddress()

    async function testMint(
      tokenPairFixture: ContractFixture<TokenPairTypes.Fields>,
      amount0: bigint,
      amount1: bigint,
      initialFields?: TokenPairTypes.Fields,
      initialAsset?: Asset
    ) {
      const token0Id = tokenPairFixture.selfState.fields.token0Id
      const token1Id = tokenPairFixture.selfState.fields.token1Id
      const initFields = initialFields ?? tokenPairFixture.selfState.fields
      const initAsset = initialAsset ?? tokenPairFixture.selfState.asset
      const {
        testResult,
        contractState,
        reserve0: currentReserve0,
        reserve1: currentReserve1,
        totalSupply: currentTotalSupply
      } = await mint(tokenPairFixture, sender, amount0, amount1, initialFields, initAsset)

      const previousReserve0 = initFields.reserve0
      const previousReserve1 = initFields.reserve1
      const previousTotalSupply = initFields.totalSupply

      expect(contractState.fields.reserve0).toEqual(currentReserve0)
      expect(contractState.fields.reserve1).toEqual(currentReserve1)
      expect(contractState.fields.totalSupply).toEqual(currentTotalSupply)

      if (previousReserve0 === 0n && previousReserve1 === 0n) {
        expect(contractState.fields.price0CumulativeLast).toEqual(0n)
        expect(contractState.fields.price1CumulativeLast).toEqual(0n)
      } else {
        const previousBlockTimeStamp = initFields.blockTimeStampLast
        const currentBlockTimeStamp = contractState.fields.blockTimeStampLast
        const timeElapsed = currentBlockTimeStamp - previousBlockTimeStamp
        const previousPrice0 = initFields.price0CumulativeLast
        const previousPrice1 = initFields.price1CumulativeLast
        const [currentPrice0, currentPrice1] = calcCumulativePrice(
          previousPrice0,
          previousPrice1,
          previousReserve0,
          previousReserve1,
          timeElapsed
        )
        expect(contractState.fields.price0CumulativeLast).toEqual(currentPrice0)
        expect(contractState.fields.price1CumulativeLast).toEqual(currentPrice1)
      }

      const liquidity = calcLiquidity(amount0, amount1, previousReserve0, previousReserve1, previousTotalSupply)
      expect(contractState.fields.totalSupply).toEqual(currentTotalSupply)

      const assetOutputs = testResult.txOutputs.filter((o) => o.address === sender)
      expectAssetsEqual(assetOutputs, [
        { alphAmount: dustAmount, tokens: [{ id: tokenPairFixture.contractId, amount: liquidity }] },
        { alphAmount: oneAlph - defaultGasFee - dustAmount, tokens: [] }
      ])
      if (token0Id === ALPH_TOKEN_ID) {
        expect(contractState.asset.alphAmount).toEqual(amount0 + number256ToBigint(initAsset.alphAmount))
        expectTokensEqual(contractState.asset.tokens!, [
          { id: token1Id, amount: currentReserve1 },
          { id: tokenPairFixture.contractId, amount: (1n << 255n) - currentTotalSupply }
        ])
      } else {
        expect(contractState.asset.alphAmount).toEqual(initAsset.alphAmount)
        expectTokensEqual(contractState.asset.tokens!, [
          { id: token0Id, amount: currentReserve0 },
          { id: token1Id, amount: currentReserve1 },
          { id: tokenPairFixture.contractId, amount: (1n << 255n) - currentTotalSupply }
        ])
      }

      expect(testResult.events.length).toEqual(1)
      expect(testResult.events[0].fields).toEqual({
        sender: sender,
        amount0: amount0,
        amount1: amount1,
        liquidity: liquidity
      })
      return contractState
    }

    async function test(token0Id: string, token1Id: string) {
      const fixture = createTokenPair(createTokenPairFactory(), token0Id, token1Id)
      await expectAssertionError(testMint(fixture, 100n, 5000n), fixture.address, 1)
      const contractState0 = await testMint(fixture, 1000n, 30000n)
      const contractState1 = await testMint(fixture, 1000n, 30000n, contractState0.fields, contractState0.asset)
      const contractState2 = await testMint(fixture, 1000n, 20000n, contractState1.fields, contractState1.asset)
      const contractState3 = await testMint(fixture, 30000n, 1000n, contractState2.fields, contractState2.asset)
      await testMint(fixture, 1000n, 30000n, contractState3.fields, contractState3.asset)
    }

    const [token0Id, token1Id] = randomTokenPair()
    await test(token0Id, token1Id)
    await test(ALPH_TOKEN_ID, token1Id)
  }, 20000)

  test('burn', async () => {
    await buildProject()

    const sender = randomP2PKHAddress()

    async function testBurn(
      tokenPairFixture: ContractFixture<TokenPairTypes.Fields>,
      liquidity: bigint,
      initialFields: TokenPairTypes.Fields,
      initialAsset: Asset
    ) {
      const token0Id = initialFields.token0Id
      const token1Id = initialFields.token1Id
      const totalSupply = initialFields.totalSupply
      const reserve0 = initialFields.reserve0
      const reserve1 = initialFields.reserve1

      const inputAssets = [
        {
          address: sender,
          asset: { alphAmount: oneAlph, tokens: [{ id: tokenPairFixture.contractId, amount: liquidity }] }
        }
      ]
      const testResult = await TokenPair.testBurnMethod({
        initialFields: initialFields,
        initialAsset: initialAsset,
        address: tokenPairFixture.address,
        existingContracts: tokenPairFixture.dependencies,
        testArgs: { sender: sender, liquidity: liquidity },
        inputAssets: inputAssets
      })

      const remainTokens = (1n << 255n) - totalSupply
      const contractState = getContractState<TokenPairTypes.Fields>(testResult.contracts, tokenPairFixture.contractId)
      const amount0Out = (liquidity * reserve0) / totalSupply
      const amount1Out = (liquidity * reserve1) / totalSupply

      expect(contractState.fields.reserve0).toEqual(reserve0 - amount0Out)
      expect(contractState.fields.reserve1).toEqual(reserve1 - amount1Out)
      expect(contractState.fields.totalSupply).toEqual(totalSupply - liquidity)

      if (token0Id === ALPH_TOKEN_ID) {
        expect(contractState.asset.alphAmount).toEqual(number256ToBigint(initialAsset.alphAmount) - amount0Out)
        expectTokensEqual(contractState.asset.tokens!, [
          { id: tokenPairFixture.contractId, amount: remainTokens + liquidity },
          { id: token1Id, amount: reserve1 - amount1Out }
        ])
      } else {
        expect(contractState.asset.alphAmount).toEqual(initialAsset.alphAmount)
        expectTokensEqual(contractState.asset.tokens!, [
          { id: tokenPairFixture.contractId, amount: remainTokens + liquidity },
          { id: token0Id, amount: reserve0 - amount0Out },
          { id: token1Id, amount: reserve1 - amount1Out }
        ])
      }
      const assetOutputs = testResult.txOutputs.filter((o) => o.address === sender)

      if (token0Id === ALPH_TOKEN_ID) {
        expectAssetsEqual(assetOutputs, [
          { alphAmount: dustAmount, tokens: [{ id: token1Id, amount: amount1Out }] },
          { alphAmount: oneAlph - defaultGasFee + amount0Out - dustAmount, tokens: [] }
        ])
      } else {
        expectAssetsEqual(assetOutputs, [
          { alphAmount: dustAmount, tokens: [{ id: token0Id, amount: amount0Out }] },
          { alphAmount: dustAmount, tokens: [{ id: token1Id, amount: amount1Out }] },
          { alphAmount: oneAlph - defaultGasFee - dustAmount * 2n, tokens: [] }
        ])
      }
      expect(testResult.events.length).toEqual(1)
      expect(testResult.events[0].fields).toEqual({
        sender: sender,
        amount0: amount0Out,
        amount1: amount1Out,
        liquidity: liquidity
      })
    }

    async function test(token0Id: string, token1Id: string) {
      const fixture = createTokenPair(createTokenPairFactory(), token0Id, token1Id)
      const { contractState } = await mint(fixture, sender, 3333n, 8888n)
      await expectAssertionError(
        testBurn(fixture, 1n, contractState.fields, contractState.asset),
        fixture.address,
        ErrorCodes.InsufficientLiquidityBurned
      )
      await testBurn(fixture, 500n, contractState.fields, contractState.asset)
    }

    const [token0Id, token1Id] = randomTokenPair()
    await test(token0Id, token1Id)
    await test(ALPH_TOKEN_ID, token1Id)
  }, 20000)

  test('swap', async () => {
    await buildProject()

    const sender = randomP2PKHAddress()

    function getAmountOut(amountIn: bigint, reserveIn: bigint, reserveOut: bigint): bigint {
      //  fee = 0.003 * amountIn
      // ((amountIn - fee) + reserveIn) * (reserveOut - amountOut) >= reserveIn * reserveOut =>
      // amountOut <= (amountIn - fee) * reserveOut / (amountIn - fee + reserveIn)
      // amountOut <= (997 * amountIn * reserveOut) / (997 * amountIn + 1000 * reserveIn)
      const amountInExcludeFee = 997n * amountIn
      const denominator = amountInExcludeFee + reserveIn * 1000n
      const numerator = amountInExcludeFee * reserveOut
      return numerator / denominator
    }

    async function testSwap(
      tokenPairFixture: ContractFixture<TokenPairTypes.Fields>,
      tokenInId: string,
      amountIn: bigint,
      amountOut: bigint,
      initialFields: TokenPairTypes.Fields,
      initialAsset: Asset
    ) {
      const token0Id = initialFields.token0Id
      const token1Id = initialFields.token1Id
      const totalSupply = initialFields.totalSupply
      const reserve0 = initialFields.reserve0
      const reserve1 = initialFields.reserve1
      const tokenOutId = token0Id === tokenInId ? token1Id : token0Id

      const alphAmount = tokenInId === ALPH_TOKEN_ID ? oneAlph + amountIn : oneAlph
      const inputAssets = [
        {
          address: sender,
          asset: {
            alphAmount: alphAmount,
            tokens: tokenInId === ALPH_TOKEN_ID ? [] : [{ id: tokenInId, amount: amountIn }]
          }
        }
      ]
      const testResult = await TokenPair.testSwapMethod({
        initialFields: initialFields,
        initialAsset: initialAsset,
        address: tokenPairFixture.address,
        existingContracts: tokenPairFixture.dependencies,
        testArgs: {
          sender: sender,
          tokenInId: tokenInId,
          amountIn: amountIn,
          amountOut: amountOut
        },
        inputAssets: inputAssets
      })
      const newState = getContractState<TokenPairTypes.Fields>(testResult.contracts, tokenPairFixture.contractId)
      const newReserve0 = tokenInId === token0Id ? reserve0 + amountIn : reserve0 - amountOut
      const newReserve1 = tokenInId === token1Id ? reserve1 + amountIn : reserve1 - amountOut
      expect(newState.fields.reserve0).toEqual(newReserve0)
      expect(newState.fields.reserve1).toEqual(newReserve1)
      expect(newState.fields.totalSupply).toEqual(totalSupply)

      if (token0Id === ALPH_TOKEN_ID) {
        expect(newState.asset.alphAmount).toEqual(oneAlph + newReserve0)
        expectTokensEqual(newState.asset.tokens!, [
          { id: tokenPairFixture.contractId, amount: (1n << 255n) - totalSupply },
          { id: token1Id, amount: newReserve1 }
        ])
      } else {
        expect(newState.asset.alphAmount).toEqual(oneAlph)
        expectTokensEqual(newState.asset.tokens!, [
          { id: tokenPairFixture.contractId, amount: (1n << 255n) - totalSupply },
          { id: token0Id, amount: newReserve0 },
          { id: token1Id, amount: newReserve1 }
        ])
      }

      const assetOutputs = testResult.txOutputs.filter((o) => o.address === sender)
      if (tokenOutId === ALPH_TOKEN_ID) {
        expectAssetsEqual(assetOutputs, [{ alphAmount: alphAmount - defaultGasFee + amountOut, tokens: [] }])
      } else if (tokenInId === ALPH_TOKEN_ID) {
        expectAssetsEqual(assetOutputs, [
          { alphAmount: dustAmount, tokens: [{ id: tokenOutId, amount: amountOut }] },
          { alphAmount: alphAmount - defaultGasFee - dustAmount - amountIn, tokens: [] }
        ])
      } else {
        expectAssetsEqual(assetOutputs, [
          { alphAmount: dustAmount, tokens: [{ id: tokenOutId, amount: amountOut }] },
          { alphAmount: alphAmount - defaultGasFee - dustAmount, tokens: [] }
        ])
      }
      expect(testResult.events.length).toEqual(1)
      expect(testResult.events[0].fields).toEqual({
        sender: sender,
        tokenInId: tokenInId,
        amountIn: amountIn,
        amountOut: amountOut
      })
    }

    async function test(token0Id: string, token1Id: string) {
      const fixture = createTokenPair(createTokenPairFactory(), token0Id, token1Id)
      const { contractState, reserve0, reserve1 } = await mint(fixture, sender, 100n, 80000n)
      await expectAssertionError(
        testSwap(fixture, token0Id, reserve0, reserve1, contractState.fields, contractState.asset),
        fixture.address,
        ErrorCodes.InsufficientLiquidity
      )
      await expectAssertionError(
        testSwap(fixture, token1Id, reserve1, reserve0, contractState.fields, contractState.asset),
        fixture.address,
        ErrorCodes.InsufficientLiquidity
      )
      await expectAssertionError(
        testSwap(fixture, token0Id, 10n, 0n, contractState.fields, contractState.asset),
        fixture.address,
        ErrorCodes.InsufficientOutputAmount
      )
      await expectAssertionError(
        testSwap(fixture, randomTokenId(), 10n, 10n, contractState.fields, contractState.asset),
        fixture.address,
        ErrorCodes.InvalidTokenInId
      )

      const amountIn0 = 2n // token0Id
      const expectedAmountOut0 = getAmountOut(amountIn0, reserve0, reserve1)
      await expectAssertionError(
        testSwap(fixture, token0Id, amountIn0 + 1n, expectedAmountOut0, contractState.fields, contractState.asset),
        fixture.address,
        ErrorCodes.SlippageOutOfRange
      )

      const amountIn1 = 2000n // token1Id
      const expectedAmountOut1 = getAmountOut(amountIn1, reserve1, reserve0)
      await expectAssertionError(
        testSwap(fixture, token1Id, amountIn1 + 1n, expectedAmountOut1, contractState.fields, contractState.asset),
        fixture.address,
        ErrorCodes.SlippageOutOfRange
      )

      await testSwap(fixture, token0Id, amountIn0, expectedAmountOut0, contractState.fields, contractState.asset)
      await expectAssertionError(
        testSwap(fixture, token0Id, amountIn0, expectedAmountOut0 + 1n, contractState.fields, contractState.asset),
        fixture.address,
        ErrorCodes.InvalidK
      )

      await testSwap(fixture, token1Id, amountIn1, expectedAmountOut1, contractState.fields, contractState.asset)
      await expectAssertionError(
        testSwap(fixture, token1Id, amountIn1, expectedAmountOut1 + 1n, contractState.fields, contractState.asset),
        fixture.address,
        ErrorCodes.InvalidK
      )
    }

    const [token0Id, token1Id] = randomTokenPair()
    await test(token0Id, token1Id)
    await test(ALPH_TOKEN_ID, token1Id)
  }, 40000)
})
