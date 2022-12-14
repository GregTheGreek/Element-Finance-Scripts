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

export interface IInterestTokenFactoryInterface extends ethers.utils.Interface {
  functions: {
    "deployInterestToken(address,string,uint256,uint8)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "deployInterestToken",
    values: [string, string, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "deployInterestToken",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IInterestTokenFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IInterestTokenFactoryInterface;

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
    deployInterestToken(
      tranche: string,
      strategySymbol: string,
      expiration: BigNumberish,
      underlyingDecimals: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "deployInterestToken(address,string,uint256,uint8)"(
      tranche: string,
      strategySymbol: string,
      expiration: BigNumberish,
      underlyingDecimals: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  deployInterestToken(
    tranche: string,
    strategySymbol: string,
    expiration: BigNumberish,
    underlyingDecimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "deployInterestToken(address,string,uint256,uint8)"(
    tranche: string,
    strategySymbol: string,
    expiration: BigNumberish,
    underlyingDecimals: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deployInterestToken(
      tranche: string,
      strategySymbol: string,
      expiration: BigNumberish,
      underlyingDecimals: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "deployInterestToken(address,string,uint256,uint8)"(
      tranche: string,
      strategySymbol: string,
      expiration: BigNumberish,
      underlyingDecimals: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    deployInterestToken(
      tranche: string,
      strategySymbol: string,
      expiration: BigNumberish,
      underlyingDecimals: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "deployInterestToken(address,string,uint256,uint8)"(
      tranche: string,
      strategySymbol: string,
      expiration: BigNumberish,
      underlyingDecimals: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deployInterestToken(
      tranche: string,
      strategySymbol: string,
      expiration: BigNumberish,
      underlyingDecimals: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "deployInterestToken(address,string,uint256,uint8)"(
      tranche: string,
      strategySymbol: string,
      expiration: BigNumberish,
      underlyingDecimals: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
