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

export interface MockInternalBalanceRelayerInterface
  extends ethers.utils.Interface {
  functions: {
    "depositAndWithdraw(address,address,uint256[],uint256[])": FunctionFragment;
    "vault()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "depositAndWithdraw",
    values: [string, string, BigNumberish[], BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: "vault", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "depositAndWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vault", data: BytesLike): Result;

  events: {};
}

export interface MockInternalBalanceRelayer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MockInternalBalanceRelayerInterface;

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
    depositAndWithdraw(
      sender: string,
      asset: string,
      depositAmounts: BigNumberish[],
      withdrawAmounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "depositAndWithdraw(address,address,uint256[],uint256[])"(
      sender: string,
      asset: string,
      depositAmounts: BigNumberish[],
      withdrawAmounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vault(overrides?: CallOverrides): Promise<[string]>;

    "vault()"(overrides?: CallOverrides): Promise<[string]>;
  };

  depositAndWithdraw(
    sender: string,
    asset: string,
    depositAmounts: BigNumberish[],
    withdrawAmounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "depositAndWithdraw(address,address,uint256[],uint256[])"(
    sender: string,
    asset: string,
    depositAmounts: BigNumberish[],
    withdrawAmounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vault(overrides?: CallOverrides): Promise<string>;

  "vault()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    depositAndWithdraw(
      sender: string,
      asset: string,
      depositAmounts: BigNumberish[],
      withdrawAmounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    "depositAndWithdraw(address,address,uint256[],uint256[])"(
      sender: string,
      asset: string,
      depositAmounts: BigNumberish[],
      withdrawAmounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    vault(overrides?: CallOverrides): Promise<string>;

    "vault()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    depositAndWithdraw(
      sender: string,
      asset: string,
      depositAmounts: BigNumberish[],
      withdrawAmounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "depositAndWithdraw(address,address,uint256[],uint256[])"(
      sender: string,
      asset: string,
      depositAmounts: BigNumberish[],
      withdrawAmounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vault(overrides?: CallOverrides): Promise<BigNumber>;

    "vault()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    depositAndWithdraw(
      sender: string,
      asset: string,
      depositAmounts: BigNumberish[],
      withdrawAmounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "depositAndWithdraw(address,address,uint256[],uint256[])"(
      sender: string,
      asset: string,
      depositAmounts: BigNumberish[],
      withdrawAmounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vault(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "vault()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}