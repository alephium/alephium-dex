/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  EventSubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  Asset,
  ContractInstance,
  getContractEventsCurrentCount,
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  SignExecuteContractMethodParams,
  SignExecuteScriptTxResult,
  signExecuteMethod,
  addStdIdToFields,
  encodeContractFields,
  Narrow,
} from "@alephium/web3";
import { default as MathTestContractJson } from "../test/MathTest.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";

// Custom types for the contract
export namespace MathTestTypes {
  export type State = Omit<ContractState<any>, "fields">;

  export interface CallMethodTable {
    uqdiv: {
      params: CallContractParams<{ a: bigint; b: bigint }>;
      result: CallContractResult<bigint>;
    };
    sqrt: {
      params: CallContractParams<{ y: bigint }>;
      result: CallContractResult<bigint>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
  export type MulticallReturnType<Callss extends MultiCallParams[]> = {
    [index in keyof Callss]: MultiCallResults<Callss[index]>;
  };

  export interface SignExecuteMethodTable {
    uqdiv: {
      params: SignExecuteContractMethodParams<{ a: bigint; b: bigint }>;
      result: SignExecuteScriptTxResult;
    };
    sqrt: {
      params: SignExecuteContractMethodParams<{ y: bigint }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<MathTestInstance, {}> {
  encodeFields() {
    return encodeContractFields({}, this.contract.fieldsSig, []);
  }

  at(address: string): MathTestInstance {
    return new MathTestInstance(address);
  }

  tests = {
    uqdiv: async (
      params: Omit<
        TestContractParamsWithoutMaps<never, { a: bigint; b: bigint }>,
        "initialFields"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "uqdiv", params, getContractByCodeHash);
    },
    sqrt: async (
      params: Omit<
        TestContractParamsWithoutMaps<never, { y: bigint }>,
        "initialFields"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "sqrt", params, getContractByCodeHash);
    },
  };

  stateForTest(initFields: {}, asset?: Asset, address?: string) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const MathTest = new Factory(
  Contract.fromJson(
    MathTestContractJson,
    "",
    "085c8183210ec7296681e12ab74e37bebee9d495e78e24cc9b3cd1b110d6df2a",
    []
  )
);
registerContract(MathTest);

// Use this class to interact with the blockchain
export class MathTestInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<MathTestTypes.State> {
    return fetchContractState(MathTest, this);
  }

  view = {
    uqdiv: async (
      params: MathTestTypes.CallMethodParams<"uqdiv">
    ): Promise<MathTestTypes.CallMethodResult<"uqdiv">> => {
      return callMethod(MathTest, this, "uqdiv", params, getContractByCodeHash);
    },
    sqrt: async (
      params: MathTestTypes.CallMethodParams<"sqrt">
    ): Promise<MathTestTypes.CallMethodResult<"sqrt">> => {
      return callMethod(MathTest, this, "sqrt", params, getContractByCodeHash);
    },
  };

  transact = {
    uqdiv: async (
      params: MathTestTypes.SignExecuteMethodParams<"uqdiv">
    ): Promise<MathTestTypes.SignExecuteMethodResult<"uqdiv">> => {
      return signExecuteMethod(MathTest, this, "uqdiv", params);
    },
    sqrt: async (
      params: MathTestTypes.SignExecuteMethodParams<"sqrt">
    ): Promise<MathTestTypes.SignExecuteMethodResult<"sqrt">> => {
      return signExecuteMethod(MathTest, this, "sqrt", params);
    },
  };

  async multicall<Calls extends MathTestTypes.MultiCallParams>(
    calls: Calls
  ): Promise<MathTestTypes.MultiCallResults<Calls>>;
  async multicall<Callss extends MathTestTypes.MultiCallParams[]>(
    callss: Narrow<Callss>
  ): Promise<MathTestTypes.MulticallReturnType<Callss>>;
  async multicall<
    Callss extends
      | MathTestTypes.MultiCallParams
      | MathTestTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(
      MathTest,
      this,
      callss,
      getContractByCodeHash
    );
  }
}
