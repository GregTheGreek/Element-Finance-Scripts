/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Multicall, MulticallInterface } from "../Multicall";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes[]",
        name: "returnData",
        type: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockCoinbase",
    outputs: [
      {
        internalType: "address",
        name: "coinbase",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockDifficulty",
    outputs: [
      {
        internalType: "uint256",
        name: "difficulty",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockGasLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "gaslimit",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getEthBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610689806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806372425d9d1161005b57806372425d9d146100e757806386d516e8146100ef578063a8b0574e146100f7578063ee82ac5e1461010c57610088565b80630f28c97d1461008d578063252dba42146100ab57806327e86d6e146100cc5780634d2301cc146100d4575b600080fd5b61009561011f565b6040516100a29190610500565b60405180910390f35b6100be6100b93660046103ad565b610123565b6040516100a2929190610540565b610095610289565b6100956100e236600461038b565b6102b0565b6100956102ca565b6100956102ce565b6100ff6102d2565b6040516100a291906104df565b61009561011a3660046104ab565b6102d6565b4290565b8051439060609067ffffffffffffffff8111801561014057600080fd5b5060405190808252806020026020018201604052801561017457816020015b606081526020019060019003908161015f5790505b50905060005b8351811015610283576000606085838151811061019357fe5b60200260200101516000015173ffffffffffffffffffffffffffffffffffffffff168684815181106101c157fe5b6020026020010151602001516040516101da91906104c3565b6000604051808303816000865af19150503d8060008114610217576040519150601f19603f3d011682016040523d82523d6000602084013e61021c565b606091505b509150915081610261576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161025890610509565b60405180910390fd5b8084848151811061026e57fe5b6020908102919091010152505060010161017a565b50915091565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff43014090565b73ffffffffffffffffffffffffffffffffffffffff163190565b4490565b4590565b4190565b4090565b803573ffffffffffffffffffffffffffffffffffffffff811681146102fe57600080fd5b92915050565b600082601f830112610314578081fd5b813567ffffffffffffffff81111561032a578182fd5b61035b60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016105fc565b915080825283602082850101111561037257600080fd5b8060208401602084013760009082016020015292915050565b60006020828403121561039c578081fd5b6103a683836102da565b9392505050565b600060208083850312156103bf578182fd5b823567ffffffffffffffff808211156103d6578384fd5b818501915085601f8301126103e9578384fd5b8135818111156103f7578485fd5b61040484858302016105fc565b81815284810190848601875b8481101561049c57813587016040807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0838f0301121561044e578a8bfd5b610457816105fc565b6104638e8c85016102da565b8152908201359088821115610476578b8cfd5b6104848e8c84860101610304565b818c0152865250509287019290870190600101610410565b50909998505050505050505050565b6000602082840312156104bc578081fd5b5035919050565b600082516104d5818460208701610623565b9190910192915050565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b90815260200190565b6020808252600b908201527f43414c4c5f4641494c4544000000000000000000000000000000000000000000604082015260600190565b600060408201848352602060408185015281855180845260608601915060608382028701019350828701855b828110156105ee577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa0888703018452815180518088526105b181888a01898501610623565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169690960185019550928401929084019060010161056c565b509398975050505050505050565b60405181810167ffffffffffffffff8111828210171561061b57600080fd5b604052919050565b60005b8381101561063e578181015183820152602001610626565b8381111561064d576000848401525b5050505056fea264697066735822122097603dddec83c48347bdbc6fb76a486ece35af828c358ad30e6525d5ef2eadf564736f6c63430007010033";

type MulticallConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MulticallConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Multicall__factory extends ContractFactory {
  constructor(...args: MulticallConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Multicall> {
    return super.deploy(overrides || {}) as Promise<Multicall>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Multicall {
    return super.attach(address) as Multicall;
  }
  connect(signer: Signer): Multicall__factory {
    return super.connect(signer) as Multicall__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MulticallInterface {
    return new utils.Interface(_abi) as MulticallInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Multicall {
    return new Contract(address, _abi, signerOrProvider) as Multicall;
  }
}
