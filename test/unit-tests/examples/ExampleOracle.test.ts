import { web3 } from "@alephium/web3"
import { expectAssertionError } from "@alephium/web3-test"
import { ExampleOracleSimple, ExampleOracleSimpleTypes } from "../../../artifacts/ts"
import {
  buildProject,
  ContractFixture,
  createTokenPair,
  encodePrice,
  expandTo18Decimals,
  getContractState,
  mint,
  randomP2PKHAddress,
  randomTokenPair
} from "../fixtures/DexFixture"
import { createExampleOracle, OracleErrorCodes } from "../fixtures/ExampleOracleFixture"

describe('test example oracle', () => {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973')

  test('update', async () => {
    await buildProject()

    const sender = randomP2PKHAddress()
    const [token0Id, token1Id] = randomTokenPair()
    const token0Amount = expandTo18Decimals(5)
    const token1Amount = expandTo18Decimals(10)

    const tokenPairFixture = createTokenPair(token0Id, token1Id)
    const { contractState } = await mint(tokenPairFixture, sender, token0Amount, token1Amount)

    async function test(fixture: ContractFixture<ExampleOracleSimpleTypes.Fields>, blockTimeStamp: number) {
      return ExampleOracleSimple.tests.update({
        blockTimeStamp: blockTimeStamp,
        address: fixture.address,
        initialFields: fixture.selfState.fields,
        existingContracts: fixture.dependencies
      })
    }

    const blockTimeStamp = contractState.fields.blockTimeStampLast
    const timestamp0 = (Number(blockTimeStamp) + 23 * 3600) * 1000 // 23 hours
    const fixture0 = createExampleOracle(contractState)
    expectAssertionError(test(fixture0, timestamp0), fixture0.address, OracleErrorCodes.PeriodNotElapsed)

    const timestamp1 = (Number(blockTimeStamp) + 24 * 3600) * 1000 // 24 hours
    const fixture1 = createExampleOracle(contractState)
    const result = await test(fixture1, timestamp1)
    const exampleOracleState = getContractState<ExampleOracleSimpleTypes.Fields>(result.contracts, fixture1.contractId)

    const expectedPrice = encodePrice(token0Amount, token1Amount)
    expect(exampleOracleState.fields.price0Average).toEqual(expectedPrice[0])
    expect(exampleOracleState.fields.price1Average).toEqual(expectedPrice[1])

    const consult0 = await ExampleOracleSimple.tests.consult({
      address: fixture1.address,
      initialFields: exampleOracleState.fields,
      existingContracts: fixture1.dependencies,
      testArgs: { tokenId: token0Id, amountIn: token0Amount }
    })
    expect(consult0.returns).toEqual(token1Amount)

    const consult1 = await ExampleOracleSimple.tests.consult({
      address: fixture1.address,
      initialFields: exampleOracleState.fields,
      existingContracts: fixture1.dependencies,
      testArgs: { tokenId: token1Id, amountIn: token1Amount }
    })
    expect(consult1.returns).toEqual(token0Amount)
  }, 10000)
})
