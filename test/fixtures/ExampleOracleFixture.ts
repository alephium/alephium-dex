import { ContractState } from '@alephium/web3'
import { ExampleOracleSimple, TokenPairTypes } from '../../artifacts/ts'
import { ContractFixture, randomContractAddress } from './DexFixture'

export enum OracleErrorCodes {
  FullDivOverflow  = 0,
  DivByZero        = 1,
  FractionOverflow = 2,
  PeriodNotElapsed = 3,
  InvalidToken     = 4
}

export function createExampleOracle(pairState: ContractState<TokenPairTypes.Fields>) {
  const address = randomContractAddress()
  const contractState = ExampleOracleSimple.stateForTest({
    pair: pairState.contractId,
    price0CumulativeLast: pairState.fields.price0CumulativeLast,
    price1CumulativeLast: pairState.fields.price1CumulativeLast,
    blockTimeStampLast: pairState.fields.blockTimeStampLast,
    price0Average: 0n,
    price1Average: 0n
  }, undefined, address)
  return new ContractFixture(contractState, [pairState], address)
}
