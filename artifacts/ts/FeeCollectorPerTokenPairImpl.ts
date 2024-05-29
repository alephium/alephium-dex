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
  TestContractParamsWithoutMaps,
  TestContractResultWithoutMaps,
  addStdIdToFields,
  encodeContractFields,
} from "@alephium/web3";
import { default as FeeCollectorPerTokenPairImplContractJson } from "../examples/FeeCollectorPerTokenPairImpl.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace FeeCollectorPerTokenPairImplTypes {
  export type Fields = {
    tokenPairFactory: HexString;
    tokenPair: HexString;
  };

  export type State = ContractState<Fields>;
}

class Factory extends ContractFactory<
  FeeCollectorPerTokenPairImplInstance,
  FeeCollectorPerTokenPairImplTypes.Fields
> {
  encodeFields(fields: FeeCollectorPerTokenPairImplTypes.Fields) {
    return encodeContractFields(
      addStdIdToFields(this.contract, fields),
      this.contract.fieldsSig,
      []
    );
  }

  getInitialFieldsWithDefaultValues() {
    return this.contract.getInitialFieldsWithDefaultValues() as FeeCollectorPerTokenPairImplTypes.Fields;
  }

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

  at(address: string): FeeCollectorPerTokenPairImplInstance {
    return new FeeCollectorPerTokenPairImplInstance(address);
  }

  tests = {
    collectFee: async (
      params: TestContractParamsWithoutMaps<
        FeeCollectorPerTokenPairImplTypes.Fields,
        { from: Address; amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "collectFee", params, getContractByCodeHash);
    },
    withdraw: async (
      params: TestContractParamsWithoutMaps<
        FeeCollectorPerTokenPairImplTypes.Fields,
        { to: Address; amount: bigint }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "withdraw", params, getContractByCodeHash);
    },
    destroy: async (
      params: TestContractParamsWithoutMaps<
        FeeCollectorPerTokenPairImplTypes.Fields,
        { to: Address }
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(this, "destroy", params, getContractByCodeHash);
    },
    collectFeeManually: async (
      params: Omit<
        TestContractParamsWithoutMaps<
          FeeCollectorPerTokenPairImplTypes.Fields,
          never
        >,
        "testArgs"
      >
    ): Promise<TestContractResultWithoutMaps<null>> => {
      return testMethod(
        this,
        "collectFeeManually",
        params,
        getContractByCodeHash
      );
    },
  };
}

// Use this object to test and deploy the contract
export const FeeCollectorPerTokenPairImpl = new Factory(
  Contract.fromJson(
    FeeCollectorPerTokenPairImplContractJson,
    "",
    "393eee49cd23c00d61848a8b2272e848f5278cc17f8c0b2333e2ed744edf5b79",
    []
  )
);

// Use this class to interact with the blockchain
export class FeeCollectorPerTokenPairImplInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<FeeCollectorPerTokenPairImplTypes.State> {
    return fetchContractState(FeeCollectorPerTokenPairImpl, this);
  }
}
