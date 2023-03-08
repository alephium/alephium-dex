import { Token, web3, subContractId, ALPH_TOKEN_ID } from '@alephium/web3'
import { expectAssertionError } from '@alephium/web3-test'
import {
  buildProject,
  createTokenPairFactory,
  ErrorCodes,
  getContractState,
  oneAlph,
  randomP2PKHAddress,
  randomTokenPair,
  sortTokens
} from './fixtures/DexFixture'
import { TokenPairFactory, TokenPairTypes } from '../artifacts/ts'

describe('test token pair factory', () => {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973')

  test('create pair', async () => {
    await buildProject()

    const fixture = createTokenPairFactory()
    const payer = randomP2PKHAddress()

    async function test(tokenAId: string, tokenBId: string, tokens?: Token[]) {
      const inputAssetTokens = tokens ?? [
        { id: tokenAId, amount: 1n },
        { id: tokenBId, amount: 1n }
      ]
      const testResult = await TokenPairFactory.testCreatePairMethod({
        initialFields: fixture.selfState.fields,
        address: fixture.address,
        existingContracts: fixture.dependencies,
        testArgs: { payer: payer, alphAmount: oneAlph, tokenAId: tokenAId, tokenBId: tokenBId },
        inputAssets: [{ address: payer, asset: { alphAmount: oneAlph * 2n, tokens: inputAssetTokens } }]
      })

      const [token0Id, token1Id] = sortTokens(tokenAId, tokenBId)
      const pairContractId = subContractId(fixture.contractId, token0Id + token1Id, 0)
      const pairContractState = getContractState<TokenPairTypes.Fields>(testResult.contracts, pairContractId)
      expect(pairContractState.fields).toEqual({
        token0Id: token0Id,
        token1Id: token1Id,
        reserve0: 0n,
        reserve1: 0n,
        blockTimeStampLast: 0n,
        price0CumulativeLast: 0n,
        price1CumulativeLast: 0n,
        totalSupply: 0n
      })
      expect(pairContractState.asset).toEqual({
        alphAmount: oneAlph,
        tokens: [{ id: pairContractId, amount: 1n << 255n }]
      })
    }

    const [token0Id, token1Id] = randomTokenPair()
    await expectAssertionError(
      test(token0Id, token0Id, [{ id: token0Id, amount: 1n }]),
      fixture.address,
      ErrorCodes.IdenticalTokenIds
    )

    await test(token0Id, token1Id)
    await test(token1Id, token0Id)
    await test(ALPH_TOKEN_ID, token1Id, [{ id: token1Id, amount: 1n }])
    await test(token1Id, ALPH_TOKEN_ID, [{ id: token1Id, amount: 1n }])

    await expectAssertionError(
      test(token0Id, token1Id, [
        { id: token0Id, amount: 0n },
        { id: token1Id, amount: 0n }
      ]),
      fixture.address,
      ErrorCodes.TokenNotExist
    )
  }, 10000)
})
