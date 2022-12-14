/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface MockWeightedOracleMathInterface
  extends ethers.utils.Interface {
  functions: {
    "calcLogBPTPrice(uint256,uint256,int256)": FunctionFragment;
    "calcLogSpotPrice(uint256,uint256,uint256,uint256)": FunctionFragment;
    "fromLowResLog(int256)": FunctionFragment;
    "toLowResLog(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "calcLogBPTPrice",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calcLogSpotPrice",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "fromLowResLog",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "toLowResLog",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "calcLogBPTPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcLogSpotPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fromLowResLog",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "toLowResLog",
    data: BytesLike
  ): Result;

  events: {};
}

export interface MockWeightedOracleMath extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MockWeightedOracleMathInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    calcLogBPTPrice(
      normalizedWeight: BigNumberish,
      balance: BigNumberish,
      bptTotalSupplyLn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "calcLogBPTPrice(uint256,uint256,int256)"(
      normalizedWeight: BigNumberish,
      balance: BigNumberish,
      bptTotalSupplyLn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    calcLogSpotPrice(
      normalizedWeightA: BigNumberish,
      balanceA: BigNumberish,
      normalizedWeightB: BigNumberish,
      balanceB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "calcLogSpotPrice(uint256,uint256,uint256,uint256)"(
      normalizedWeightA: BigNumberish,
      balanceA: BigNumberish,
      normalizedWeightB: BigNumberish,
      balanceB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    fromLowResLog(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "fromLowResLog(int256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    toLowResLog(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "toLowResLog(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  calcLogBPTPrice(
    normalizedWeight: BigNumberish,
    balance: BigNumberish,
    bptTotalSupplyLn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "calcLogBPTPrice(uint256,uint256,int256)"(
    normalizedWeight: BigNumberish,
    balance: BigNumberish,
    bptTotalSupplyLn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calcLogSpotPrice(
    normalizedWeightA: BigNumberish,
    balanceA: BigNumberish,
    normalizedWeightB: BigNumberish,
    balanceB: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "calcLogSpotPrice(uint256,uint256,uint256,uint256)"(
    normalizedWeightA: BigNumberish,
    balanceA: BigNumberish,
    normalizedWeightB: BigNumberish,
    balanceB: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  fromLowResLog(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "fromLowResLog(int256)"(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  toLowResLog(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "toLowResLog(uint256)"(
    value: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    calcLogBPTPrice(
      normalizedWeight: BigNumberish,
      balance: BigNumberish,
      bptTotalSupplyLn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calcLogBPTPrice(uint256,uint256,int256)"(
      normalizedWeight: BigNumberish,
      balance: BigNumberish,
      bptTotalSupplyLn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcLogSpotPrice(
      normalizedWeightA: BigNumberish,
      balanceA: BigNumberish,
      normalizedWeightB: BigNumberish,
      balanceB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calcLogSpotPrice(uint256,uint256,uint256,uint256)"(
      normalizedWeightA: BigNumberish,
      balanceA: BigNumberish,
      normalizedWeightB: BigNumberish,
      balanceB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fromLowResLog(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "fromLowResLog(int256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toLowResLog(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "toLowResLog(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    calcLogBPTPrice(
      normalizedWeight: BigNumberish,
      balance: BigNumberish,
      bptTotalSupplyLn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calcLogBPTPrice(uint256,uint256,int256)"(
      normalizedWeight: BigNumberish,
      balance: BigNumberish,
      bptTotalSupplyLn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcLogSpotPrice(
      normalizedWeightA: BigNumberish,
      balanceA: BigNumberish,
      normalizedWeightB: BigNumberish,
      balanceB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "calcLogSpotPrice(uint256,uint256,uint256,uint256)"(
      normalizedWeightA: BigNumberish,
      balanceA: BigNumberish,
      normalizedWeightB: BigNumberish,
      balanceB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fromLowResLog(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "fromLowResLog(int256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toLowResLog(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "toLowResLog(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    calcLogBPTPrice(
      normalizedWeight: BigNumberish,
      balance: BigNumberish,
      bptTotalSupplyLn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "calcLogBPTPrice(uint256,uint256,int256)"(
      normalizedWeight: BigNumberish,
      balance: BigNumberish,
      bptTotalSupplyLn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calcLogSpotPrice(
      normalizedWeightA: BigNumberish,
      balanceA: BigNumberish,
      normalizedWeightB: BigNumberish,
      balanceB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "calcLogSpotPrice(uint256,uint256,uint256,uint256)"(
      normalizedWeightA: BigNumberish,
      balanceA: BigNumberish,
      normalizedWeightB: BigNumberish,
      balanceB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fromLowResLog(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "fromLowResLog(int256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    toLowResLog(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "toLowResLog(uint256)"(
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
