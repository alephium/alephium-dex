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
import { default as TestTokenContractJson } from "../test/TestToken.ral.json";
import { getContractByCodeHash, registerContract } from "./contracts";

// Custom types for the contract
export namespace TestTokenTypes {
  export type Fields = {
    symbol: HexString;
    name: HexString;
    decimals: bigint;
    totalSupply: bigint;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    getSymbol: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getName: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getDecimals: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getTotalSupply: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getToken: {
      params: CallContractParams<{ sender: Address; amount: bigint }>;
      result: CallContractResult<null>;
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
    getSymbol: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getName: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getDecimals: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getTotalSupply: {
      params: Omit<SignExecuteContractMethodParams<{}>, "args">;
      result: SignExecuteScriptTxResult;
    };
    getToken: {
      params: SignExecuteContractMethodParams<{
        sender: Address;
        amount: bigint;
      }>;
      result: SignExecuteScriptTxResult;
    };
  }
  export type SignExecuteMethodParams<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["params"];
  export type SignExecuteMethodResult<T extends keyof SignExecuteMethodTable> =
    SignExecuteMethodTable[T]["result"];
}

class Factory extends ContractFactory<
  TestTokenInstance,
  TestTokenTypes.Fields
> {
  encodeFields(fields: TestTokenTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      []
    );
  }

  at(address: string): TestTokenInstance {
    return new TestTokenInstance(address);
  }

  tests = {
    getSymbol: async (
      params: Omit<
        TestContractParamsWithoutMaps<TestTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getSymbol", params, getContractByCodeHash);
    },
    getName: async (
      params: Omit<
        TestContractParamsWithoutMaps<TestTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<HexString>> => {
      return testMethod(this, "getName", params, getContractByCodeHash);
    },
    getDecimals: async (
      params: Omit<
        TestContractParamsWithoutMaps<TestTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getDecimals", params, getContractByCodeHash);
    },
    getTotalSupply: async (
      params: Omit<
        TestContractParamsWithoutMaps<TestTokenTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<bigint>> => {
      return testMethod(this, "getTotalSupply", params, getContractByCodeHash);
    },
    getToken: async (
      params: TestContractParamsWithoutMaps<
        TestTokenTypes.Fields,
        { sender: Address; amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "getToken", params, getContractByCodeHash);
    },
  };

  stateForTest(
    initFields: TestTokenTypes.Fields,
    asset?: Asset,
    address?: string
  ) {
    return this.stateForTest_(initFields, asset, address, undefined);
  }
}

// Use this object to test and deploy the contract
export const TestToken = new Factory(
  Contract.fromJson(
    TestTokenContractJson,
    "",
    "0831d766037e7873066276e891997881e8787f4fb4bd9d154925d80869efa129",
    []
  )
);
registerContract(TestToken);

// Use this class to interact with the blockchain
export class TestTokenInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<TestTokenTypes.State> {
    return fetchContractState(TestToken, this);
  }

  view = {
    getSymbol: async (
      params?: TestTokenTypes.CallMethodParams<"getSymbol">
    ): Promise<TestTokenTypes.CallMethodResult<"getSymbol">> => {
      return callMethod(
        TestToken,
        this,
        "getSymbol",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getName: async (
      params?: TestTokenTypes.CallMethodParams<"getName">
    ): Promise<TestTokenTypes.CallMethodResult<"getName">> => {
      return callMethod(
        TestToken,
        this,
        "getName",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getDecimals: async (
      params?: TestTokenTypes.CallMethodParams<"getDecimals">
    ): Promise<TestTokenTypes.CallMethodResult<"getDecimals">> => {
      return callMethod(
        TestToken,
        this,
        "getDecimals",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTotalSupply: async (
      params?: TestTokenTypes.CallMethodParams<"getTotalSupply">
    ): Promise<TestTokenTypes.CallMethodResult<"getTotalSupply">> => {
      return callMethod(
        TestToken,
        this,
        "getTotalSupply",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getToken: async (
      params: TestTokenTypes.CallMethodParams<"getToken">
    ): Promise<TestTokenTypes.CallMethodResult<"getToken">> => {
      return callMethod(
        TestToken,
        this,
        "getToken",
        params,
        getContractByCodeHash
      );
    },
  };

  transact = {
    getSymbol: async (
      params: TestTokenTypes.SignExecuteMethodParams<"getSymbol">
    ): Promise<TestTokenTypes.SignExecuteMethodResult<"getSymbol">> => {
      return signExecuteMethod(TestToken, this, "getSymbol", params);
    },
    getName: async (
      params: TestTokenTypes.SignExecuteMethodParams<"getName">
    ): Promise<TestTokenTypes.SignExecuteMethodResult<"getName">> => {
      return signExecuteMethod(TestToken, this, "getName", params);
    },
    getDecimals: async (
      params: TestTokenTypes.SignExecuteMethodParams<"getDecimals">
    ): Promise<TestTokenTypes.SignExecuteMethodResult<"getDecimals">> => {
      return signExecuteMethod(TestToken, this, "getDecimals", params);
    },
    getTotalSupply: async (
      params: TestTokenTypes.SignExecuteMethodParams<"getTotalSupply">
    ): Promise<TestTokenTypes.SignExecuteMethodResult<"getTotalSupply">> => {
      return signExecuteMethod(TestToken, this, "getTotalSupply", params);
    },
    getToken: async (
      params: TestTokenTypes.SignExecuteMethodParams<"getToken">
    ): Promise<TestTokenTypes.SignExecuteMethodResult<"getToken">> => {
      return signExecuteMethod(TestToken, this, "getToken", params);
    },
  };

  async multicall<Calls extends TestTokenTypes.MultiCallParams>(
    calls: Calls
  ): Promise<TestTokenTypes.MultiCallResults<Calls>>;
  async multicall<Callss extends TestTokenTypes.MultiCallParams[]>(
    callss: Narrow<Callss>
  ): Promise<TestTokenTypes.MulticallReturnType<Callss>>;
  async multicall<
    Callss extends
      | TestTokenTypes.MultiCallParams
      | TestTokenTypes.MultiCallParams[]
  >(callss: Callss): Promise<unknown> {
    return await multicallMethods(
      TestToken,
      this,
      callss,
      getContractByCodeHash
    );
  }
}
