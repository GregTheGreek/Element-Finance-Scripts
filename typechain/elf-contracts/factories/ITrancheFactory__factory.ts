/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  ITrancheFactory,
  ITrancheFactoryInterface,
} from "../ITrancheFactory";

const _abi = [
  {
    inputs: [],
    name: "getData",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "contract InterestToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ITrancheFactory__factory {
  static readonly abi = _abi;
  static createInterface(): ITrancheFactoryInterface {
    return new utils.Interface(_abi) as ITrancheFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ITrancheFactory {
    return new Contract(address, _abi, signerOrProvider) as ITrancheFactory;
  }
}
