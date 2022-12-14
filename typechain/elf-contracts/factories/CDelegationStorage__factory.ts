/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  CDelegationStorage,
  CDelegationStorageInterface,
} from "../CDelegationStorage";

const _abi = [
  {
    inputs: [],
    name: "implementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b5060ba8061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80635c60da1b14602d575b600080fd5b60336047565b604051603e91906063565b60405180910390f35b60005473ffffffffffffffffffffffffffffffffffffffff1681565b73ffffffffffffffffffffffffffffffffffffffff9190911681526020019056fea26469706673582212207c9fd63c88598458a6252f1ac116067a19f9f68386721ea48e75b3826eeaaff364736f6c63430008000033";

type CDelegationStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CDelegationStorageConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CDelegationStorage__factory extends ContractFactory {
  constructor(...args: CDelegationStorageConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CDelegationStorage> {
    return super.deploy(overrides || {}) as Promise<CDelegationStorage>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CDelegationStorage {
    return super.attach(address) as CDelegationStorage;
  }
  connect(signer: Signer): CDelegationStorage__factory {
    return super.connect(signer) as CDelegationStorage__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CDelegationStorageInterface {
    return new utils.Interface(_abi) as CDelegationStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CDelegationStorage {
    return new Contract(address, _abi, signerOrProvider) as CDelegationStorage;
  }
}
