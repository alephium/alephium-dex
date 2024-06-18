import {
  DUST_AMOUNT,
  groupOfAddress,
  ONE_ALPH,
  sleep,
  subContractId,
  web3,
  addressFromContractId,
  Contract,
  ContractEvent,
  HexString,
  Address
} from '@alephium/web3'
import {
  contractBalanceOf,
  randomP2PKHAddress,
  expandTo18Decimals,
  encodePrice,
  minimumLiquidity,
  sortTokens
} from '../unit-tests/fixtures/DexFixture'
import { testAddress, testPrivateKey, expectAssertionError } from '@alephium/web3-test'
import { getContractByCodeHash } from '../../artifacts/ts/contracts'
import {
  Burn,
  CollectFee,
  CreatePair,
  EnableFeeCollector,
  FeeCollectorFactoryImpl,
  FeeCollectorPerTokenPairImpl,
  GetToken,
  Mint,
  SetFeeCollectorFactory,
  Swap,
  TestToken,
  TokenPair,
  TokenPairFactory,
  TokenPairFactoryInstance,
  TokenPairInstance,
  TokenPairTypes
} from '../../artifacts/ts'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import { waitTxConfirmed as _waitTxConfirmed } from '../../scripts/utils'

web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
const signer = new PrivateKeyWallet({ privateKey: testPrivateKey })

async function waitTxConfirmed<T extends { txId: string }>(promise: Promise<T>): Promise<T> {
  const result = await promise
  await _waitTxConfirmed(web3.getCurrentNodeProvider(), result.txId, 1)
  return result
}

async function deployTokenPairTemplate() {
  return await waitTxConfirmed(TokenPair.deploy(signer, {
    initialFields: {
      tokenPairFactory: '',
      token0Id: '',
      token1Id: '',
      reserve0: 0n,
      reserve1: 0n,
      blockTimeStampLast: 0n,
      price0CumulativeLast: 0n,
      price1CumulativeLast: 0n,
      totalSupply: 0n,
      kLast: 0n,
      feeCollectorId: ''
    }
  }))
}

async function deployFeeCollectorTemplate() {
  return await waitTxConfirmed(FeeCollectorPerTokenPairImpl.deploy(signer, {
    initialFields: {
      tokenPairFactory: '',
      tokenPair: ''
    }
  }))
}

async function deployFeeCollectorFactory(tokenPairFactoryId: HexString) {
  const feeCollectorTemplate = await deployFeeCollectorTemplate()
  return await waitTxConfirmed(FeeCollectorFactoryImpl.deploy(signer, {
    initialFields: {
      feeCollectorPerTokenPairTemplateId: feeCollectorTemplate.contractInstance.contractId,
      tokenPairFactory: tokenPairFactoryId
    }
  }))
}

async function deployTokenPairFactory() {
  const tokenPairTemplate = await deployTokenPairTemplate()
  const result = await waitTxConfirmed(TokenPairFactory.deploy(signer, {
    initialFields: {
      pairTemplateId: tokenPairTemplate.contractInstance.contractId,
      pairSize: 0n,
      feeSetter: testAddress,
      feeCollectorFactory: '',
    }
  }))
  const feeCollectorFactory = await deployFeeCollectorFactory(result.contractInstance.contractId)
  await waitTxConfirmed(SetFeeCollectorFactory.execute(signer, {
    initialFields: {
      tokenPairFactory: result.contractInstance.contractId,
      feeCollectorFactory: feeCollectorFactory.contractInstance.contractId
    }
  }))
  return result
}

async function createTokenPair(tokenPairFactory: TokenPairFactoryInstance, token0Id: string, token1Id: string) {
  await waitTxConfirmed(CreatePair.execute(signer, {
    initialFields: {
      payer: testAddress,
      factory: tokenPairFactory.contractId,
      alphAmount: ONE_ALPH,
      tokenAId: token0Id,
      tokenBId: token1Id,
    },
    attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 3n,
    tokens: [
      { id: token0Id, amount: 1n },
      { id: token1Id, amount: 1n }
    ]
  }))
  const tokenPairId = subContractId(tokenPairFactory.contractId, token0Id + token1Id, groupOfAddress(testAddress))
  return TokenPair.at(addressFromContractId(tokenPairId))
}

async function enableFeeCollector(tokenPairFactory: TokenPairFactoryInstance, tokenPair: TokenPairInstance) {
  await waitTxConfirmed(EnableFeeCollector.execute(signer, {
    initialFields: {
      tokenPairFactory: tokenPairFactory.contractId,
      tokenPair: tokenPair.contractId
    },
    attoAlphAmount: ONE_ALPH + DUST_AMOUNT
  }))
}

async function collectFeeManually(feeCollectorId: HexString, signerProvider = signer) {
  await waitTxConfirmed(CollectFee.execute(signerProvider, {
    initialFields: { feeCollector: feeCollectorId }
  }))
}

async function deployFeeCollector(tokenPairFactoryId: HexString, tokenPairId: HexString) {
  return await waitTxConfirmed(FeeCollectorPerTokenPairImpl.deploy(signer, {
    initialFields: {
      tokenPair: tokenPairId,
      tokenPairFactory: tokenPairFactoryId
    }
  }))
}

async function deployTestToken(): Promise<string> {
  const result = await waitTxConfirmed(TestToken.deploy(signer, {
    initialFields: {
      symbol: '',
      name: '',
      decimals: 18n,
      totalSupply: 1n << 255n,
    },
    issueTokenAmount: 1n << 255n
  }))
  await waitTxConfirmed(GetToken.execute(signer, {
    initialFields: {
      token: result.contractInstance.contractId,
      sender: testAddress,
      amount: 1n << 255n
    },
    attoAlphAmount: DUST_AMOUNT * 2n
  }))
  return result.contractInstance.contractId
}

async function balanceOf(tokenId: string, address = testAddress): Promise<bigint> {
  const balances = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(address)
  const balance = balances.tokenBalances?.find((t) => t.id === tokenId)
  return balance === undefined ? 0n : BigInt(balance.amount)
}

async function transferAlphTo(to: Address, amount: bigint) {
  return await waitTxConfirmed(signer.signAndSubmitTransferTx({
    signerAddress: testAddress,
    destinations: [{ address: to, attoAlphAmount: amount }]
  }))
}

class Fixture {
  token0Id: string
  token1Id: string
  tokenPair: TokenPairInstance
  tokenPairFactory: TokenPairFactoryInstance

  constructor(token0Id: string, token1Id: string, tokenPair: TokenPairInstance, tokenPairFactory: TokenPairFactoryInstance) {
    this.token0Id = token0Id
    this.token1Id = token1Id
    this.tokenPair = tokenPair
    this.tokenPairFactory = tokenPairFactory
  }

  static async create(): Promise<Fixture> {
    const tokenAId = await deployTestToken()
    const tokenBId = await deployTestToken()
    const [token0Id, token1Id] = sortTokens(tokenAId, tokenBId)
    const tokenPairFactory = (await deployTokenPairFactory()).contractInstance
    const tokenPair = await createTokenPair(tokenPairFactory, token0Id, token1Id)
    return new Fixture(token0Id, token1Id, tokenPair, tokenPairFactory)
  }

  async mint(amount0: bigint, amount1: bigint) {
    return waitTxConfirmed(Mint.execute(signer, {
      initialFields: {
        tokenPair: this.tokenPair.contractId,
        sender: testAddress,
        amount0: amount0,
        amount1: amount1
      },
      attoAlphAmount: DUST_AMOUNT * 4n,
      tokens: [
        {id: this.token0Id, amount: amount0},
        {id: this.token1Id, amount: amount1}
      ]
    }))
  }

  async swap(amount0In: bigint, amount1In: bigint, amount0Out: bigint, amount1Out: bigint, toAddress = testAddress, signerProvider = signer) {
    const tokenList = amount0In === 0n
      ? [{ id: this.token1Id, amount: amount1In }]
      : amount1In === 0n
      ? [{ id: this.token0Id, amount: amount0In }]
      : [{ id: this.token0Id, amount: amount0In }, { id: this.token1Id, amount: amount1In }]
    const senderAddress = signerProvider.address
    return waitTxConfirmed(Swap.execute(signerProvider, {
      initialFields: {
        tokenPair: this.tokenPair.contractId,
        sender: senderAddress,
        to: toAddress,
        amount0In,
        amount1In,
        amount0Out,
        amount1Out
      },
      attoAlphAmount: DUST_AMOUNT * 3n + (toAddress === senderAddress ? 0n : DUST_AMOUNT),
      tokens: tokenList
    }))
  }

  async burn(liquidity: bigint) {
    return waitTxConfirmed(Burn.execute(signer, {
      initialFields: {
        tokenPair: this.tokenPair.contractId,
        sender: testAddress,
        liquidity: liquidity
      },
      attoAlphAmount: DUST_AMOUNT * 3n,
      tokens: [{ id: this.tokenPair.contractId, amount: liquidity }]
    }))
  }

  async getEventByTxId<T extends ContractEvent>(txId: string) {
    const result = await web3.getCurrentNodeProvider().events.getEventsTxIdTxid(txId)
    return Contract.fromApiEvent(result.events[0], TokenPair.contract.codeHash, txId, getContractByCodeHash) as T
  }
}

describe('test token pair', () => {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973')

  let fixture: Fixture
  let tokenPairFactory: TokenPairFactoryInstance
  let token0Id: string
  let token1Id: string
  let tokenPair: TokenPairInstance
  beforeEach(async () => {
    fixture = await Fixture.create()
    tokenPairFactory = fixture.tokenPairFactory
    tokenPair = fixture.tokenPair
    token0Id = fixture.token0Id
    token1Id = fixture.token1Id
  })

  test('mint: initial liquidity', async () => {
    const token0Amount = expandTo18Decimals(1n)
    const token1Amount = expandTo18Decimals(4n)
    const expectedLiquidity = expandTo18Decimals(2n)

    const mintResult = await fixture.mint(token0Amount, token1Amount)
    const mintEvent = (await fixture.getEventByTxId(mintResult.txId)) as TokenPairTypes.MintEvent
    expect(mintEvent.fields).toEqual({
      sender: testAddress,
      amount0: token0Amount,
      amount1: token1Amount,
      liquidity: expectedLiquidity - minimumLiquidity
    })

    const tokenPairState = await tokenPair.fetchState()
    expect(tokenPairState.fields.totalSupply).toEqual(expectedLiquidity)
    expect(tokenPairState.fields.reserve0).toEqual(token0Amount)
    expect(tokenPairState.fields.reserve1).toEqual(token1Amount)
    expect(contractBalanceOf(tokenPairState, token0Id)).toEqual(token0Amount)
    expect(contractBalanceOf(tokenPairState, token1Id)).toEqual(token1Amount)
    expect(await balanceOf(tokenPair.contractId)).toEqual(expectedLiquidity - minimumLiquidity)
  })

  test('mint', async () => {
    const token0Amount = expandTo18Decimals(1n)
    const token1Amount = expandTo18Decimals(4n)
    await fixture.mint(token0Amount, token1Amount)

    const expectedLiquidity = expandTo18Decimals(2n)
    const mintResult = await fixture.mint(token0Amount, token1Amount)

    const mintEvent = (await fixture.getEventByTxId(mintResult.txId)) as TokenPairTypes.MintEvent
    expect(mintEvent.fields).toEqual({
      sender: testAddress,
      amount0: token0Amount,
      amount1: token1Amount,
      liquidity: expectedLiquidity
    })

    const tokenPairState = await tokenPair.fetchState()
    expect(tokenPairState.fields.totalSupply).toEqual(expectedLiquidity * 2n)
    expect(tokenPairState.fields.reserve0).toEqual(token0Amount * 2n)
    expect(tokenPairState.fields.reserve1).toEqual(token1Amount * 2n)
    expect(contractBalanceOf(tokenPairState, token0Id)).toEqual(token0Amount * 2n)
    expect(contractBalanceOf(tokenPairState, token1Id)).toEqual(token1Amount * 2n)
    expect(await balanceOf(tokenPair.contractId)).toEqual(expectedLiquidity * 2n - minimumLiquidity)
  })

  test('mint:maxReserve', async () => {
    async function test(token0Amount: bigint, token1Amount: bigint) {
      return await fixture.mint(token0Amount, token1Amount)
    }
    const maxReserve = (1n << 112n) - 1n
    await expectAssertionError(test(maxReserve + 1n, maxReserve), tokenPair.address, Number(TokenPair.consts.ErrorCodes.ReserveOverflow))
    await expectAssertionError(test(maxReserve, maxReserve + 1n), tokenPair.address, Number(TokenPair.consts.ErrorCodes.ReserveOverflow))
    await expectAssertionError(test(maxReserve + 1n, maxReserve + 1n), tokenPair.address, Number(TokenPair.consts.ErrorCodes.ReserveOverflow))
    await test(maxReserve, maxReserve)
  }, 10000)

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
      await fixture.mint(token0Amount, token1Amount)
      await expectAssertionError(fixture.swap(swapAmount, 0n, 0n, expectedOutputAmount + 1n), tokenPair.address, Number(TokenPair.consts.ErrorCodes.InvalidK))
      await fixture.swap(swapAmount, 0n, 0n, expectedOutputAmount)
    })
  })

  test('swap:token0', async () => {
    const token0Amount = expandTo18Decimals(5)
    const token1Amount = expandTo18Decimals(10)
    await fixture.mint(token0Amount, token1Amount)

    const swapAmount = expandTo18Decimals(1)
    const expectedOutputAmount = 1662497915624478906n
    const token1Balance0 = await balanceOf(token1Id)

    const swapResult = await fixture.swap(swapAmount, 0n, 0n, expectedOutputAmount)
    const swapEvent = (await fixture.getEventByTxId(swapResult.txId)) as TokenPairTypes.SwapEvent
    expect(swapEvent.fields).toEqual({
      sender: testAddress,
      to: testAddress,
      amount0In: swapAmount,
      amount1In: 0n,
      amount0Out: 0n,
      amount1Out: expectedOutputAmount
    })

    const tokenPairState = await tokenPair.fetchState()
    expect(tokenPairState.fields.reserve0).toEqual(token0Amount + swapAmount)
    expect(tokenPairState.fields.reserve1).toEqual(token1Amount - expectedOutputAmount)
    expect(contractBalanceOf(tokenPairState, token0Id)).toEqual(token0Amount + swapAmount)
    expect(contractBalanceOf(tokenPairState, token1Id)).toEqual(token1Amount - expectedOutputAmount)

    const token1Balance1 = await balanceOf(token1Id)
    expect(token1Balance1 - token1Balance0).toEqual(expectedOutputAmount)
  })

  test('swap:token1', async () => {
    const token0Amount = expandTo18Decimals(5)
    const token1Amount = expandTo18Decimals(10)
    await fixture.mint(token0Amount, token1Amount)

    const swapAmount = expandTo18Decimals(1)
    const expectedOutputAmount = 453305446940074565n
    const token0Balance0 = await balanceOf(token0Id)

    const swapResult = await fixture.swap(0n, swapAmount, expectedOutputAmount, 0n)
    const swapEvent = (await fixture.getEventByTxId(swapResult.txId)) as TokenPairTypes.SwapEvent
    expect(swapEvent.fields).toEqual({
      sender: testAddress,
      to: testAddress,
      amount0In: 0n,
      amount1In: swapAmount,
      amount0Out: expectedOutputAmount,
      amount1Out: 0n
    })

    const tokenPairState = await tokenPair.fetchState()
    expect(tokenPairState.fields.reserve0).toEqual(token0Amount - expectedOutputAmount)
    expect(tokenPairState.fields.reserve1).toEqual(token1Amount + swapAmount)
    expect(contractBalanceOf(tokenPairState, token0Id)).toEqual(token0Amount - expectedOutputAmount)
    expect(contractBalanceOf(tokenPairState, token1Id)).toEqual(token1Amount + swapAmount)

    const token0Balance1 = await balanceOf(token0Id)
    expect(token0Balance1 - token0Balance0).toEqual(expectedOutputAmount)
  })

  test('swap to another address', async () => {
    const toAddress =  randomP2PKHAddress()
    const token0Amount = expandTo18Decimals(5)
    const token1Amount = expandTo18Decimals(10)

    await fixture.mint(token0Amount, token1Amount)

    const swapAmount = expandTo18Decimals(1)
    const expectedOutputAmount = 453305446940074565n

    const swapResult = await fixture.swap(0n, swapAmount, expectedOutputAmount, 0n, toAddress)
    const swapEvent = (await fixture.getEventByTxId(swapResult.txId)) as TokenPairTypes.SwapEvent
    expect(swapEvent.fields).toEqual({
      sender: testAddress,
      to: toAddress,
      amount0In: 0n,
      amount1In: swapAmount,
      amount0Out: expectedOutputAmount,
      amount1Out: 0n
    })

    const tokenPairState = await tokenPair.fetchState()
    expect(tokenPairState.fields.reserve0).toEqual(token0Amount - expectedOutputAmount)
    expect(tokenPairState.fields.reserve1).toEqual(token1Amount + swapAmount)
    expect(contractBalanceOf(tokenPairState, token0Id)).toEqual(token0Amount - expectedOutputAmount)
    expect(contractBalanceOf(tokenPairState, token1Id)).toEqual(token1Amount + swapAmount)

    const tokenBalance = await balanceOf(token0Id, toAddress)
    expect(tokenBalance).toEqual(expectedOutputAmount)
  })

  test('swap:gas', async () => {
    const token0Amount = expandTo18Decimals(5)
    const token1Amount = expandTo18Decimals(10)
    await fixture.mint(token0Amount, token1Amount)

    const swapAmount = expandTo18Decimals(1)
    const sender = PrivateKeyWallet.Random(0)
    // use a new address to avoid choosing a different utxos for each run, which resulting in different gas
    await signer.signAndSubmitTransferTx({
      signerAddress: testAddress,
      destinations: [{
        address: sender.address,
        attoAlphAmount: ONE_ALPH,
        tokens: [{ id: token1Id, amount: swapAmount }]
      }]
    })
    const expectedOutputAmount = 453305446940074565n

    // sleep 1 second to make sure the time elapsed large than 0
    await sleep(1000)
    const swapResult = await fixture.swap(0n, swapAmount, expectedOutputAmount, 0n, sender.address, sender)
    expect(swapResult.gasAmount).toEqual(44587)
  })

  test('burn', async () => {
    const token0Amount = expandTo18Decimals(3)
    const token1Amount = expandTo18Decimals(3)
    await fixture.mint(token0Amount, token1Amount)

    const expectedLiquidity = expandTo18Decimals(3)
    const liquidity = expectedLiquidity - minimumLiquidity
    const token0Balance0 = await balanceOf(token0Id)
    const token1Balance0 = await balanceOf(token1Id)

    const burnResult = await fixture.burn(liquidity)
    const burnEvent = (await fixture.getEventByTxId(burnResult.txId)) as TokenPairTypes.BurnEvent
    expect(burnEvent.fields).toEqual({
      sender: testAddress,
      amount0: token0Amount - minimumLiquidity,
      amount1: token1Amount - minimumLiquidity,
      liquidity: liquidity
    })

    const tokenPairState = await tokenPair.fetchState()
    expect(tokenPairState.fields.totalSupply).toEqual(minimumLiquidity)
    expect(tokenPairState.fields.reserve0).toEqual(minimumLiquidity)
    expect(tokenPairState.fields.reserve1).toEqual(minimumLiquidity)
    expect(contractBalanceOf(tokenPairState, token0Id)).toEqual(minimumLiquidity)
    expect(contractBalanceOf(tokenPairState, token1Id)).toEqual(minimumLiquidity)

    const token0Balance1 = await balanceOf(token0Id)
    const token1Balance1 = await balanceOf(token1Id)
    expect(token0Balance1 - token0Balance0).toEqual(token0Amount - minimumLiquidity)
    expect(token1Balance1 - token1Balance0).toEqual(token1Amount - minimumLiquidity)
  })

  it('price{0,1}CumulativeLast', async () => {
    const token0Amount = expandTo18Decimals(3)
    const token1Amount = expandTo18Decimals(3)
    await fixture.mint(token0Amount, token1Amount)

    const blockTimeStamp0 = (await tokenPair.fetchState()).fields.blockTimeStampLast
    await sleep(1000)
    const swapAmount = expandTo18Decimals(3)
    await fixture.swap(swapAmount, 0n, 0n, expandTo18Decimals(1))

    const tokenPairState0 = await tokenPair.fetchState()
    const initialPrice = encodePrice(token0Amount, token1Amount)
    const blockTimeStamp1 = (await tokenPair.fetchState()).fields.blockTimeStampLast
    const timeElapsed0 = blockTimeStamp1 - blockTimeStamp0
    expect(tokenPairState0.fields.price0CumulativeLast).toEqual(initialPrice[0] * timeElapsed0)
    expect(tokenPairState0.fields.price1CumulativeLast).toEqual(initialPrice[1] * timeElapsed0)
    expect(tokenPairState0.fields.reserve0).toEqual(expandTo18Decimals(6))
    expect(tokenPairState0.fields.reserve1).toEqual(expandTo18Decimals(2))

    await sleep(5000)
    await fixture.swap(swapAmount * 3n, 0n, 0n, expandTo18Decimals(1))
    const newPrice0 = encodePrice(expandTo18Decimals(6), expandTo18Decimals(2))

    const tokenPairState1 = await tokenPair.fetchState()
    const blockTimeStamp2 = tokenPairState1.fields.blockTimeStampLast
    const timeElapsed1 = blockTimeStamp2 - blockTimeStamp1
    expect(tokenPairState1.fields.price0CumulativeLast).toEqual(initialPrice[0] * timeElapsed0 + newPrice0[0] * timeElapsed1)
    expect(tokenPairState1.fields.price1CumulativeLast).toEqual(initialPrice[1] * timeElapsed0 + newPrice0[1] * timeElapsed1)
    expect(tokenPairState1.fields.reserve0).toEqual(expandTo18Decimals(15))
    expect(tokenPairState1.fields.reserve1).toEqual(expandTo18Decimals(1))

    const newPrice1 = encodePrice(expandTo18Decimals(15), expandTo18Decimals(1))
    await sleep(5000)
    await fixture.mint(expandTo18Decimals(15), expandTo18Decimals(1))

    const tokenPairState2 = await tokenPair.fetchState()
    const blockTimeStamp3 = tokenPairState2.fields.blockTimeStampLast
    const timeElapsed2 = blockTimeStamp3 - blockTimeStamp2
    expect(tokenPairState2.fields.price0CumulativeLast).toEqual(initialPrice[0] * timeElapsed0 + newPrice0[0] * timeElapsed1 + newPrice1[0] * timeElapsed2)
    expect(tokenPairState2.fields.price1CumulativeLast).toEqual(initialPrice[1] * timeElapsed0 + newPrice0[1] * timeElapsed1 + newPrice1[1] * timeElapsed2)
  }, 20000)

  it('collectFeeManually', async () => {
    await enableFeeCollector(tokenPairFactory, tokenPair)
    const feeCollectorId = await tokenPair.fetchState().then((s) => s.fields.feeCollectorId)
    expect(feeCollectorId).not.toEqual('')
    const feeCollectorAddress = addressFromContractId(feeCollectorId)

    const token0Amount = expandTo18Decimals(5)
    const token1Amount = expandTo18Decimals(10)
    await fixture.mint(token0Amount, token1Amount)
    const tokenPairState0 = await tokenPair.fetchState()
    const expectedKLast0 = tokenPairState0.fields.reserve0 * tokenPairState0.fields.reserve1

    const balance0 = await balanceOf(tokenPair.contractId, feeCollectorAddress)
    expect(balance0).toEqual(0n)
    await collectFeeManually(feeCollectorId)
    const balance1 = await balanceOf(tokenPair.contractId, feeCollectorAddress)
    expect(balance1).toEqual(0n)

    const kLast0 = await tokenPair.fetchState().then((s) => s.fields.kLast)
    expect(expectedKLast0).toEqual(kLast0)

    const swapAmount = expandTo18Decimals(1)
    const expectedOutputAmount = 1662497915624478906n
    await fixture.swap(swapAmount, 0n, 0n, expectedOutputAmount)
    const tokenPairState1 = await tokenPair.fetchState()
    const expectedKLast1 = tokenPairState1.fields.reserve0 * tokenPairState1.fields.reserve1

    const balance2 = await balanceOf(tokenPair.contractId, feeCollectorAddress)
    expect(balance2).toEqual(0n)
    await collectFeeManually(feeCollectorId)
    const balance3 = await balanceOf(tokenPair.contractId, feeCollectorAddress)
    expect(balance3).toEqual(294676942923694n)

    const kLast1 = await tokenPair.fetchState().then((s) => s.fields.kLast)
    expect(expectedKLast1).toEqual(kLast1)

    await collectFeeManually(feeCollectorId)
    const balance4 = await balanceOf(tokenPair.contractId, feeCollectorAddress)
    expect(balance4).toEqual(balance3)
    const kLast2 = await tokenPair.fetchState().then((s) => s.fields.kLast)
    expect(kLast2).toEqual(kLast1)
  }, 10000)

  it('collectFeeManually:error', async () => {
    const errorCodes = TokenPair.consts.ErrorCodes
    const invalidFeeCollector = await deployFeeCollector(tokenPairFactory.contractId, tokenPair.contractId)
    await expectAssertionError(collectFeeManually(invalidFeeCollector.contractInstance.contractId), tokenPair.address, Number(errorCodes.InvalidCaller))

    await enableFeeCollector(tokenPairFactory, tokenPair)
    const feeCollectorId = await tokenPair.fetchState().then((s) => s.fields.feeCollectorId)
    const feeCollectorAddress = addressFromContractId(feeCollectorId)
    const invalidCaller = PrivateKeyWallet.Random(signer.account.group)
    await transferAlphTo(invalidCaller.address, ONE_ALPH)

    await expectAssertionError(collectFeeManually(feeCollectorId, invalidCaller), feeCollectorAddress, Number(errorCodes.InvalidCaller))
    await expectAssertionError(collectFeeManually(invalidFeeCollector.contractInstance.contractId), tokenPair.address, Number(errorCodes.InvalidCaller))
  })
})
