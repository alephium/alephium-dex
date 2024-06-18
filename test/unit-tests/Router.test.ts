import { ContractState, DUST_AMOUNT, web3 } from '@alephium/web3'
import { expectAssertionError } from '@alephium/web3-test'
import { Router, TokenPairTypes } from '../../artifacts/ts'
import {
  createRouter,
  createTokenPair,
  defaultGasFee,
  expectAssetsEqual,
  getContractState,
  mint,
  oneAlph,
  randomP2PKHAddress,
  randomTokenPair
} from './fixtures/DexFixture'

describe('test router', () => {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973')

  test('addLiquidity_', async () => {
    const routerFixture = createRouter()
    async function test(
      reserve0: bigint,
      reserve1: bigint,
      amount0Desired: bigint,
      amount1Desired: bigint,
      amount0Min: bigint,
      amount1Min: bigint
    ): Promise<[bigint, bigint]> {
      const result = await Router.tests.addLiquidity_({
        address: routerFixture.address,
        existingContracts: routerFixture.dependencies,
        testArgs: {
          reserve0: reserve0,
          reserve1: reserve1,
          amount0Desired: amount0Desired,
          amount1Desired: amount1Desired,
          amount0Min: amount0Min,
          amount1Min: amount1Min
        }
      })
      return result.returns
    }

    expect(await test(0n, 0n, 100n, 200n, 80n, 160n)).toEqual([100n, 200n])
    expect(await test(1000n, 3000n, 1000n, 3000n, 1000n, 3000n)).toEqual([1000n, 3000n])
    await expectAssertionError(
      test(1000n, 3000n, 500n, 3000n, 500n, 2000n),
      routerFixture.address,
      Number(Router.consts.ErrorCodes.InsufficientToken1Amount)
    )
    expect(await test(1000n, 3000n, 500n, 3000n, 500n, 1500n)).toEqual([500n, 1500n])
    expect(await test(1000n, 3000n, 500n, 3000n, 500n, 1000n)).toEqual([500n, 1500n])
    await expectAssertionError(
      test(1000n, 3000n, 1000n, 2000n, 800n, 2000n),
      routerFixture.address,
      Number(Router.consts.ErrorCodes.InsufficientToken0Amount)
    )
    expect(await test(1000n, 3000n, 1000n, 2000n, 500n, 2000n)).toEqual([666n, 2000n])
    expect(await test(1000n, 3000n, 1000n, 2000n, 500n, 1000n)).toEqual([666n, 2000n])
  }, 20000)

  test('addLiquidity', async () => {
    const sender = randomP2PKHAddress()
    const routerFixture = createRouter()

    async function testAddLiquidity(
      tokenPairState: ContractState<TokenPairTypes.Fields>,
      amount0Desired: bigint,
      amount1Desired: bigint,
      amount0Min: bigint,
      amount1Min: bigint,
      deadline: bigint
    ) {
      return Router.tests.addLiquidity({
        address: routerFixture.address,
        testArgs: {
          tokenPair: tokenPairState.contractId,
          sender: sender,
          amount0Desired: amount0Desired,
          amount1Desired: amount1Desired,
          amount0Min: amount0Min,
          amount1Min: amount1Min,
          deadline: deadline
        },
        existingContracts: routerFixture.states().concat([tokenPairState]),
        inputAssets: [
          {
            address: sender,
            asset: {
              alphAmount: oneAlph,
              tokens: [
                { id: token0Id, amount: amount0Desired },
                { id: token1Id, amount: amount1Desired }
              ]
            }
          }
        ]
      })
    }

    const [token0Id, token1Id] = randomTokenPair()
    const tokenPairFixture = createTokenPair(token0Id, token1Id)
    const { contractState } = await mint(tokenPairFixture, sender, 1000n, 30000n)
    const now = Date.now()

    await expectAssertionError(
      testAddLiquidity(contractState, 500n, 15000n, 500n, 15000n, BigInt(now - 60000)),
      routerFixture.address,
      Number(Router.consts.ErrorCodes.Expired)
    )
    const result = await testAddLiquidity(contractState, 500n, 15000n, 500n, 15000n, BigInt(now + 60000))
    const tokenPairState = getContractState<TokenPairTypes.Fields>(result.contracts, tokenPairFixture.contractId)
    expect(tokenPairState.fields.reserve0).toEqual(1500n)
    expect(tokenPairState.fields.reserve1).toEqual(45000n)
    expect(tokenPairState.fields.totalSupply).toEqual(8215n)
    expect(result.returns).toEqual([500n, 15000n, 2738n])
    const assetOutputs = result.txOutputs.filter((c) => c.address === sender)
    expectAssetsEqual(assetOutputs, [
      { alphAmount: DUST_AMOUNT, tokens: [{ id: tokenPairFixture.contractId, amount: 2738n }] },
      { alphAmount: oneAlph - defaultGasFee - DUST_AMOUNT, tokens: [] }
    ])
  })

  test('removeLiquidity', async () => {
    const sender = randomP2PKHAddress()
    const routerFixture = createRouter()

    async function testRemoveLiquidity(
      tokenPairState: ContractState,
      liquidity: bigint,
      amount0Min: bigint,
      amount1Min: bigint,
      deadline: bigint
    ) {
      return Router.tests.removeLiquidity({
        address: routerFixture.address,
        testArgs: {
          tokenPairId: tokenPairState.contractId,
          sender: sender,
          liquidity: liquidity,
          amount0Min: amount0Min,
          amount1Min: amount1Min,
          deadline: deadline
        },
        existingContracts: routerFixture.states().concat([tokenPairState]),
        inputAssets: [
          {
            address: sender,
            asset: {
              alphAmount: oneAlph,
              tokens: [{ id: tokenPairState.contractId, amount: liquidity }]
            }
          }
        ]
      })
    }

    const [token0Id, token1Id] = randomTokenPair()
    const tokenPairFixture = createTokenPair(token0Id, token1Id)
    const { contractState } = await mint(tokenPairFixture, sender, 1000n, 30000n)
    const now = Date.now()

    await expectAssertionError(
      testRemoveLiquidity(contractState, 2738n, 0n, 0n, BigInt(now - 60000)),
      routerFixture.address,
      Number(Router.consts.ErrorCodes.Expired)
    )
    const result = await testRemoveLiquidity(contractState, 2738n, 499n, 14997n, BigInt(now + 60000))
    const tokenPairState = getContractState<TokenPairTypes.Fields>(result.contracts, tokenPairFixture.contractId)
    expect(tokenPairState.fields.reserve0).toEqual(501n)
    expect(tokenPairState.fields.reserve1).toEqual(15003n)
    expect(tokenPairState.fields.totalSupply).toEqual(2739n)
    expect(result.returns).toEqual([499n, 14997n])
    const assetOutputs = result.txOutputs.filter((c) => c.address === sender)
    expectAssetsEqual(assetOutputs, [
      { alphAmount: DUST_AMOUNT, tokens: [{ id: token0Id, amount: 499n }] },
      { alphAmount: DUST_AMOUNT, tokens: [{ id: token1Id, amount: 14997n }] },
      { alphAmount: oneAlph - defaultGasFee - DUST_AMOUNT * 2n, tokens: [] }
    ])

    await expectAssertionError(
      testRemoveLiquidity(contractState, 2738n, 500n, 14997n, BigInt(now + 60000)),
      routerFixture.address,
      Number(Router.consts.ErrorCodes.InsufficientToken0Amount)
    )
    await expectAssertionError(
      testRemoveLiquidity(contractState, 2738n, 499n, 14998n, BigInt(now + 60000)),
      routerFixture.address,
      Number(Router.consts.ErrorCodes.InsufficientToken1Amount)
    )
  })

  test('getReserveInAndReserveOut', async () => {
    const sender = randomP2PKHAddress()
    const routerFixture = createRouter()
    const [token0Id, token1Id] = randomTokenPair()
    const tokenPairFixture = createTokenPair(token0Id, token1Id)
    const { contractState } = await mint(tokenPairFixture, sender, 1000n, 30000n)

    async function testGetReserveInAndReserveOut(tokenPairState: ContractState, tokenInId: string) {
      return Router.tests.getReserveInAndReserveOut({
        address: routerFixture.address,
        testArgs: { tokenPair: tokenPairState.contractId, tokenInId: tokenInId },
        existingContracts: routerFixture.dependencies.concat([tokenPairState])
      })
    }

    const result0 = await testGetReserveInAndReserveOut(contractState, token0Id)
    expect(result0.returns).toEqual([1000n, 30000n])
    const result1 = await testGetReserveInAndReserveOut(contractState, token1Id)
    expect(result1.returns).toEqual([30000n, 1000n])
  })

  test('swapExactTokenForToken', async () => {
    const sender = randomP2PKHAddress()
    const routerFixture = createRouter()

    async function testSwapExactTokenForToken(
      tokenPairState: ContractState,
      tokenInId: string,
      amountIn: bigint,
      amountOutMin: bigint,
      deadline: bigint
    ) {
      return Router.tests.swapExactTokenForToken({
        address: routerFixture.address,
        testArgs: {
          tokenPair: tokenPairState.contractId,
          sender: sender,
          tokenInId: tokenInId,
          amountIn: amountIn,
          amountOutMin: amountOutMin,
          to: sender,
          deadline: deadline
        },
        existingContracts: routerFixture.dependencies.concat([tokenPairState]),
        inputAssets: [
          {
            address: sender,
            asset: {
              alphAmount: oneAlph,
              tokens: [{ id: tokenInId, amount: amountIn }]
            }
          }
        ]
      })
    }

    const [token0Id, token1Id] = randomTokenPair()
    const tokenPairFixture = createTokenPair(token0Id, token1Id)
    const { contractState } = await mint(tokenPairFixture, sender, 1000n, 30000n)
    const now = Date.now()

    await expectAssertionError(
      testSwapExactTokenForToken(contractState, token1Id, 15000n, 332n, BigInt(now - 60000)),
      routerFixture.address,
      Number(Router.consts.ErrorCodes.Expired)
    )
    const result = await testSwapExactTokenForToken(contractState, token1Id, 15000n, 332n, BigInt(now + 60000))
    const tokenPairState = getContractState<TokenPairTypes.Fields>(result.contracts, tokenPairFixture.contractId)
    expect(tokenPairState.fields.reserve0).toEqual(668n)
    expect(tokenPairState.fields.reserve1).toEqual(45000n)
    expect(tokenPairState.fields.totalSupply).toEqual(5477n)
    const assetOutputs = result.txOutputs.filter((c) => c.address === sender)
    expectAssetsEqual(assetOutputs, [
      { alphAmount: DUST_AMOUNT, tokens: [{ id: token0Id, amount: 332n }] },
      { alphAmount: oneAlph - defaultGasFee - DUST_AMOUNT, tokens: [] }
    ])

    await expectAssertionError(
      testSwapExactTokenForToken(contractState, token1Id, 15000n, 333n, BigInt(now + 60000)),
      routerFixture.address,
      Number(Router.consts.ErrorCodes.InsufficientOutputAmount)
    )
  })

  test('swapTokenForExactToken', async () => {
    const sender = randomP2PKHAddress()
    const routerFixture = createRouter()

    async function testSwapTokenForExactToken(
      tokenPairState: ContractState,
      tokenInId: string,
      amountInMax: bigint,
      amountOut: bigint,
      deadline: bigint
    ) {
      return Router.tests.swapTokenForExactToken({
        address: routerFixture.address,
        testArgs: {
          tokenPair: tokenPairState.contractId,
          sender: sender,
          tokenInId: tokenInId,
          amountInMax: amountInMax,
          amountOut: amountOut,
          to: sender,
          deadline: deadline
        },
        existingContracts: routerFixture.dependencies.concat([tokenPairState]),
        inputAssets: [
          {
            address: sender,
            asset: {
              alphAmount: oneAlph,
              tokens: [{ id: tokenInId, amount: amountInMax }]
            }
          }
        ]
      })
    }

    const [token0Id, token1Id] = randomTokenPair()
    const tokenPairFixture = createTokenPair(token0Id, token1Id)
    const { contractState } = await mint(tokenPairFixture, sender, 1000n, 30000n)
    const now = Date.now()

    await expectAssertionError(
      testSwapTokenForExactToken(contractState, token0Id, 1004n, 15000n, BigInt(now - 60000)),
      routerFixture.address,
      Number(Router.consts.ErrorCodes.Expired)
    )
    const result = await testSwapTokenForExactToken(contractState, token0Id, 1004n, 15000n, BigInt(now + 60000))
    const tokenPairState = getContractState<TokenPairTypes.Fields>(result.contracts, tokenPairFixture.contractId)
    expect(tokenPairState.fields.reserve0).toEqual(2004n)
    expect(tokenPairState.fields.reserve1).toEqual(15000n)
    expect(tokenPairState.fields.totalSupply).toEqual(5477n)
    const assetOutputs = result.txOutputs.filter((c) => c.address === sender)
    expectAssetsEqual(assetOutputs, [
      { alphAmount: DUST_AMOUNT, tokens: [{ id: token1Id, amount: 15000n }] },
      { alphAmount: oneAlph - defaultGasFee - DUST_AMOUNT, tokens: [] }
    ])

    await expectAssertionError(
      testSwapTokenForExactToken(contractState, token0Id, 1003n, 15000n, BigInt(now + 60000)),
      routerFixture.address,
      Number(Router.consts.ErrorCodes.InsufficientInputAmount)
    )
  })
})
