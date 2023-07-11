/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, ContractFactory } from "@alephium/web3";
import {
  Router,
  TokenPair,
  TokenPairFactory,
  ExampleOracleSimple,
  FeeCollectorFactoryImpl,
  FeeCollectorPerTokenPairImpl,
  FullMathTest,
  MathTest,
  TestToken,
} from ".";

let contracts: ContractFactory<any>[] | undefined = undefined;
export function getContractByCodeHash(codeHash: string): Contract {
  if (contracts === undefined) {
    contracts = [
      Router,
      TokenPair,
      TokenPairFactory,
      ExampleOracleSimple,
      FeeCollectorFactoryImpl,
      FeeCollectorPerTokenPairImpl,
      FullMathTest,
      MathTest,
      TestToken,
    ];
  }
  const c = contracts.find(
    (c) =>
      c.contract.codeHash === codeHash || c.contract.codeHashDebug === codeHash
  );
  if (c === undefined) {
    throw new Error("Unknown code with code hash: " + codeHash);
  }
  return c.contract;
}