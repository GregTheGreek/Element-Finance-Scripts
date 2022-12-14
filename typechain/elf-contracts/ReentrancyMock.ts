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
  Overrides,
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

export interface ReentrancyMockInterface extends ethers.utils.Interface {
  functions: {
    "callback()": FunctionFragment;
    "countAndCall(address)": FunctionFragment;
    "countLocalRecursive(uint256)": FunctionFragment;
    "countThisRecursive(uint256)": FunctionFragment;
    "counter()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "callback", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "countAndCall",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "countLocalRecursive",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "countThisRecursive",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "counter", values?: undefined): string;

  decodeFunctionResult(functionFragment: "callback", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "countAndCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "countLocalRecursive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "countThisRecursive",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "counter", data: BytesLike): Result;

  events: {};
}

export interface ReentrancyMock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ReentrancyMockInterface;

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
    callback(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "callback()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    countAndCall(
      attacker: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "countAndCall(address)"(
      attacker: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    countLocalRecursive(
      n: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "countLocalRecursive(uint256)"(
      n: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    countThisRecursive(
      n: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "countThisRecursive(uint256)"(
      n: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    counter(overrides?: CallOverrides): Promise<[BigNumber]>;

    "counter()"(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  callback(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "callback()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  countAndCall(
    attacker: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "countAndCall(address)"(
    attacker: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  countLocalRecursive(
    n: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "countLocalRecursive(uint256)"(
    n: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  countThisRecursive(
    n: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "countThisRecursive(uint256)"(
    n: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  counter(overrides?: CallOverrides): Promise<BigNumber>;

  "counter()"(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    callback(overrides?: CallOverrides): Promise<void>;

    "callback()"(overrides?: CallOverrides): Promise<void>;

    countAndCall(attacker: string, overrides?: CallOverrides): Promise<void>;

    "countAndCall(address)"(
      attacker: string,
      overrides?: CallOverrides
    ): Promise<void>;

    countLocalRecursive(
      n: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "countLocalRecursive(uint256)"(
      n: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    countThisRecursive(
      n: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "countThisRecursive(uint256)"(
      n: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    counter(overrides?: CallOverrides): Promise<BigNumber>;

    "counter()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    callback(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "callback()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    countAndCall(
      attacker: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "countAndCall(address)"(
      attacker: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    countLocalRecursive(
      n: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "countLocalRecursive(uint256)"(
      n: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    countThisRecursive(
      n: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "countThisRecursive(uint256)"(
      n: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    counter(overrides?: CallOverrides): Promise<BigNumber>;

    "counter()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    callback(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "callback()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    countAndCall(
      attacker: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "countAndCall(address)"(
      attacker: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    countLocalRecursive(
      n: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "countLocalRecursive(uint256)"(
      n: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    countThisRecursive(
      n: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "countThisRecursive(uint256)"(
      n: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    counter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "counter()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
