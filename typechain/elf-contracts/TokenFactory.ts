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

export interface TokenFactoryInterface extends ethers.utils.Interface {
  functions: {
    "create(address,string,string,uint8)": FunctionFragment;
    "getTokens(uint256,uint256)": FunctionFragment;
    "getTotalTokens()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "create",
    values: [string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokens",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalTokens",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTokens", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTotalTokens",
    data: BytesLike
  ): Result;

  events: {
    "TokenCreated(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "TokenCreated"): EventFragment;
}

export type TokenCreatedEvent = TypedEvent<[string], { token: string }>;

export type TokenCreatedEventFilter = TypedEventFilter<TokenCreatedEvent>;

export interface TokenFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TokenFactoryInterface;

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
    create(
      admin: string,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "create(address,string,string,uint8)"(
      admin: string,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getTokens(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    "getTokens(uint256,uint256)"(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getTotalTokens(overrides?: CallOverrides): Promise<[BigNumber]>;

    "getTotalTokens()"(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  create(
    admin: string,
    name: string,
    symbol: string,
    decimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "create(address,string,string,uint8)"(
    admin: string,
    name: string,
    symbol: string,
    decimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getTokens(
    start: BigNumberish,
    end: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  "getTokens(uint256,uint256)"(
    start: BigNumberish,
    end: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getTotalTokens(overrides?: CallOverrides): Promise<BigNumber>;

  "getTotalTokens()"(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    create(
      admin: string,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "create(address,string,string,uint8)"(
      admin: string,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getTokens(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    "getTokens(uint256,uint256)"(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getTotalTokens(overrides?: CallOverrides): Promise<BigNumber>;

    "getTotalTokens()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "TokenCreated(address)"(token?: string | null): TokenCreatedEventFilter;
    TokenCreated(token?: string | null): TokenCreatedEventFilter;
  };

  estimateGas: {
    create(
      admin: string,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "create(address,string,string,uint8)"(
      admin: string,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getTokens(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getTokens(uint256,uint256)"(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalTokens(overrides?: CallOverrides): Promise<BigNumber>;

    "getTotalTokens()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    create(
      admin: string,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "create(address,string,string,uint8)"(
      admin: string,
      name: string,
      symbol: string,
      decimals: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getTokens(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getTokens(uint256,uint256)"(
      start: BigNumberish,
      end: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getTotalTokens()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
