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

export interface IWeightedPoolPriceOracleInterface
  extends ethers.utils.Interface {
  functions: {
    "getSample(uint256)": FunctionFragment;
    "getTotalSamples()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getSample",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalSamples",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "getSample", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTotalSamples",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IWeightedPoolPriceOracle extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IWeightedPoolPriceOracleInterface;

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
    getSample(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        logPairPrice: BigNumber;
        accLogPairPrice: BigNumber;
        logBptPrice: BigNumber;
        accLogBptPrice: BigNumber;
        logInvariant: BigNumber;
        accLogInvariant: BigNumber;
        timestamp: BigNumber;
      }
    >;

    "getSample(uint256)"(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        logPairPrice: BigNumber;
        accLogPairPrice: BigNumber;
        logBptPrice: BigNumber;
        accLogBptPrice: BigNumber;
        logInvariant: BigNumber;
        accLogInvariant: BigNumber;
        timestamp: BigNumber;
      }
    >;

    getTotalSamples(overrides?: CallOverrides): Promise<[BigNumber]>;

    "getTotalSamples()"(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  getSample(
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      logPairPrice: BigNumber;
      accLogPairPrice: BigNumber;
      logBptPrice: BigNumber;
      accLogBptPrice: BigNumber;
      logInvariant: BigNumber;
      accLogInvariant: BigNumber;
      timestamp: BigNumber;
    }
  >;

  "getSample(uint256)"(
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ] & {
      logPairPrice: BigNumber;
      accLogPairPrice: BigNumber;
      logBptPrice: BigNumber;
      accLogBptPrice: BigNumber;
      logInvariant: BigNumber;
      accLogInvariant: BigNumber;
      timestamp: BigNumber;
    }
  >;

  getTotalSamples(overrides?: CallOverrides): Promise<BigNumber>;

  "getTotalSamples()"(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    getSample(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        logPairPrice: BigNumber;
        accLogPairPrice: BigNumber;
        logBptPrice: BigNumber;
        accLogBptPrice: BigNumber;
        logInvariant: BigNumber;
        accLogInvariant: BigNumber;
        timestamp: BigNumber;
      }
    >;

    "getSample(uint256)"(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ] & {
        logPairPrice: BigNumber;
        accLogPairPrice: BigNumber;
        logBptPrice: BigNumber;
        accLogBptPrice: BigNumber;
        logInvariant: BigNumber;
        accLogInvariant: BigNumber;
        timestamp: BigNumber;
      }
    >;

    getTotalSamples(overrides?: CallOverrides): Promise<BigNumber>;

    "getTotalSamples()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    getSample(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getSample(uint256)"(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalSamples(overrides?: CallOverrides): Promise<BigNumber>;

    "getTotalSamples()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getSample(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getSample(uint256)"(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalSamples(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getTotalSamples()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
