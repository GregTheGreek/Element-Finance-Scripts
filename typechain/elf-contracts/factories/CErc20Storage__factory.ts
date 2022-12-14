/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { CErc20Storage, CErc20StorageInterface } from "../CErc20Storage";

const _abi = [
  {
    inputs: [],
    name: "underlying",
    outputs: [
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

export class CErc20Storage__factory {
  static readonly abi = _abi;
  static createInterface(): CErc20StorageInterface {
    return new utils.Interface(_abi) as CErc20StorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CErc20Storage {
    return new Contract(address, _abi, signerOrProvider) as CErc20Storage;
  }
}
