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
  ContractInstance,
  getContractEventsCurrentCount,
} from "@alephium/web3";
import { default as RouterContractJson } from "../dex/Router.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace RouterTypes {
  export type State = Omit<ContractState<any>, "fields">;

  export interface CallMethodTable {
    addLiquidity: {
      params: CallContractParams<{
        tokenPair: HexString;
        sender: Address;
        amount0Desired: bigint;
        amount1Desired: bigint;
        amount0Min: bigint;
        amount1Min: bigint;
        deadline: bigint;
      }>;
      result: CallContractResult<[bigint, bigint, bigint]>;
    };
    removeLiquidity: {
      params: CallContractParams<{
        tokenPairId: HexString;
        sender: Address;
        liquidity: bigint;
        amount0Min: bigint;
        amount1Min: bigint;
        deadline: bigint;
      }>;
      result: CallContractResult<[bigint, bigint]>;
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
}

class Factory extends ContractFactory<RouterInstance, {}> {
  consts = {
    ErrorCodes: {
      ReserveOverflow: BigInt(0),
      InsufficientInitLiquidity: BigInt(1),
      InsufficientLiquidityMinted: BigInt(2),
      InsufficientLiquidityBurned: BigInt(3),
      InvalidToAddress: BigInt(4),
      InsufficientLiquidity: BigInt(5),
      InvalidTokenInId: BigInt(6),
      InvalidCalleeId: BigInt(7),
      InvalidK: BigInt(8),
      InsufficientOutputAmount: BigInt(9),
      InsufficientInputAmount: BigInt(10),
      IdenticalTokenIds: BigInt(11),
      Expired: BigInt(12),
      InsufficientToken0Amount: BigInt(13),
      InsufficientToken1Amount: BigInt(14),
      TokenNotExist: BigInt(15),
      InvalidCaller: BigInt(16),
      FeeCollectorNotEnabled: BigInt(17),
    },
  };

  at(address: string): RouterInstance {
    return new RouterInstance(address);
  }

  tests = {
    addLiquidity_: async (
      params: Omit<
        TestContractParams<
          never,
          {
            reserve0: bigint;
            reserve1: bigint;
            amount0Desired: bigint;
            amount1Desired: bigint;
            amount0Min: bigint;
            amount1Min: bigint;
          }
        >,
        "initialFields"
      >
    ): Promise<TestContractResult<[bigint, bigint]>> => {
      return testMethod(this, "addLiquidity_", params);
    },
    addLiquidity: async (
      params: Omit<
        TestContractParams<
          never,
          {
            tokenPair: HexString;
            sender: Address;
            amount0Desired: bigint;
            amount1Desired: bigint;
            amount0Min: bigint;
            amount1Min: bigint;
            deadline: bigint;
          }
        >,
        "initialFields"
      >
    ): Promise<TestContractResult<[bigint, bigint, bigint]>> => {
      return testMethod(this, "addLiquidity", params);
    },
    removeLiquidity: async (
      params: Omit<
        TestContractParams<
          never,
          {
            tokenPairId: HexString;
            sender: Address;
            liquidity: bigint;
            amount0Min: bigint;
            amount1Min: bigint;
            deadline: bigint;
          }
        >,
        "initialFields"
      >
    ): Promise<TestContractResult<[bigint, bigint]>> => {
      return testMethod(this, "removeLiquidity", params);
    },
    getReserveInAndReserveOut: async (
      params: Omit<
        TestContractParams<
          never,
          { tokenPair: HexString; tokenInId: HexString }
        >,
        "initialFields"
      >
    ): Promise<TestContractResult<[bigint, bigint]>> => {
      return testMethod(this, "getReserveInAndReserveOut", params);
    },
    swapExactTokenForToken: async (
      params: Omit<
        TestContractParams<
          never,
          {
            tokenPair: HexString;
            sender: Address;
            tokenInId: HexString;
            amountIn: bigint;
            amountOutMin: bigint;
            to: Address;
            deadline: bigint;
          }
        >,
        "initialFields"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "swapExactTokenForToken", params);
    },
    swapTokenForExactToken: async (
      params: Omit<
        TestContractParams<
          never,
          {
            tokenPair: HexString;
            sender: Address;
            tokenInId: HexString;
            amountInMax: bigint;
            amountOut: bigint;
            to: Address;
            deadline: bigint;
          }
        >,
        "initialFields"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "swapTokenForExactToken", params);
    },
    swap: async (
      params: Omit<
        TestContractParams<
          never,
          {
            tokenPair: HexString;
            sender: Address;
            to: Address;
            tokenInId: HexString;
            amountIn: bigint;
            amountOut: bigint;
          }
        >,
        "initialFields"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "swap", params);
    },
  };
}

// Use this object to test and deploy the contract
export const Router = new Factory(
  Contract.fromJson(
    RouterContractJson,
    "",
    "5b325453e5506a90851742af5f7797303703acecb523830220a105a88273b1b0"
  )
);

// Use this class to interact with the blockchain
export class RouterInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<RouterTypes.State> {
    return fetchContractState(Router, this);
  }

  methods = {
    addLiquidity: async (
      params: RouterTypes.CallMethodParams<"addLiquidity">
    ): Promise<RouterTypes.CallMethodResult<"addLiquidity">> => {
      return callMethod(
        Router,
        this,
        "addLiquidity",
        params,
        getContractByCodeHash
      );
    },
    removeLiquidity: async (
      params: RouterTypes.CallMethodParams<"removeLiquidity">
    ): Promise<RouterTypes.CallMethodResult<"removeLiquidity">> => {
      return callMethod(
        Router,
        this,
        "removeLiquidity",
        params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends RouterTypes.MultiCallParams>(
    calls: Calls
  ): Promise<RouterTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      Router,
      this,
      calls,
      getContractByCodeHash
    )) as RouterTypes.MultiCallResults<Calls>;
  }
}
