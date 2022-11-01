/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ProtocolFeesCollector,
  ProtocolFeesCollectorInterface,
} from "../ProtocolFeesCollector";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IVault",
        name: "_vault",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFlashLoanFeePercentage",
        type: "uint256",
      },
    ],
    name: "FlashLoanFeePercentageChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newSwapFeePercentage",
        type: "uint256",
      },
    ],
    name: "SwapFeePercentageChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "selector",
        type: "bytes4",
      },
    ],
    name: "getActionId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAuthorizer",
    outputs: [
      {
        internalType: "contract IAuthorizer",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20[]",
        name: "tokens",
        type: "address[]",
      },
    ],
    name: "getCollectedFeeAmounts",
    outputs: [
      {
        internalType: "uint256[]",
        name: "feeAmounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFlashLoanFeePercentage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSwapFeePercentage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newFlashLoanFeePercentage",
        type: "uint256",
      },
    ],
    name: "setFlashLoanFeePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSwapFeePercentage",
        type: "uint256",
      },
    ],
    name: "setSwapFeePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "vault",
    outputs: [
      {
        internalType: "contract IVault",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "withdrawCollectedFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b50604051610c79380380610c7983398101604081905261002f9161004d565b30608052600160005560601b6001600160601b03191660a05261007b565b60006020828403121561005e578081fd5b81516001600160a01b0381168114610074578182fd5b9392505050565b60805160a05160601c610bd36100a66000398061042d52806105815250806102b45250610bd36000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c8063851c1bb311610076578063d877845c1161005b578063d877845c14610129578063e42abf3514610131578063fbfa77cf14610151576100a3565b8063851c1bb314610101578063aaabadc514610114576100a3565b806338e9922e146100a857806355c67628146100bd5780636b6b9f69146100db5780636daefab6146100ee575b600080fd5b6100bb6100b63660046109fb565b610159565b005b6100c56101b8565b6040516100d29190610b1f565b60405180910390f35b6100bb6100e93660046109fb565b6101be565b6100bb6100fc366004610830565b610211565b6100c561010f366004610983565b6102b0565b61011c610302565b6040516100d29190610a94565b6100c5610311565b61014461013f3660046108b1565b610317565b6040516100d29190610adb565b61011c61042b565b61016161044f565b6101786706f05b59d3b20000821115610258610498565b60018190556040517fa9ba3ffe0b6c366b81232caab38605a0699ad5398d6cce76f91ee809e322dafc906101ad908390610b1f565b60405180910390a150565b60015490565b6101c661044f565b6101dc662386f26fc10000821115610259610498565b60028190556040517f5a0b7386237e7f07fa741efc64e59c9387d2cccafec760efed4d53387f20e19a906101ad908390610b1f565b6102196104aa565b61022161044f565b61022b84836104c3565b60005b848110156102a057600086868381811061024457fe5b905060200201602081019061025991906109df565b9050600085858481811061026957fe5b60200291909101359150610296905073ffffffffffffffffffffffffffffffffffffffff831685836104d0565b505060010161022e565b506102a9610576565b5050505050565b60007f0000000000000000000000000000000000000000000000000000000000000000826040516020016102e5929190610a2b565b604051602081830303815290604052805190602001209050919050565b600061030c61057d565b905090565b60025490565b6060815167ffffffffffffffff8111801561033157600080fd5b5060405190808252806020026020018201604052801561035b578160200160208202803683370190505b50905060005b82518110156104255782818151811061037657fe5b602002602001015173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016103b69190610a94565b60206040518083038186803b1580156103ce57600080fd5b505afa1580156103e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104069190610a13565b82828151811061041257fe5b6020908102919091010152600101610361565b50919050565b7f000000000000000000000000000000000000000000000000000000000000000081565b600061047e6000357fffffffff00000000000000000000000000000000000000000000000000000000166102b0565b905061049561048d823361061d565b610191610498565b50565b816104a6576104a6816106bc565b5050565b6104bc60026000541415610190610498565b6002600055565b6104a68183146067610498565b6105718363a9059cbb60e01b84846040516024016104ef929190610ab5565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152610729565b505050565b6001600055565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663aaabadc56040518163ffffffff1660e01b815260040160206040518083038186803b1580156105e557600080fd5b505afa1580156105f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061030c91906109c3565b600061062761057d565b73ffffffffffffffffffffffffffffffffffffffff16639be2a8848484306040518463ffffffff1660e01b815260040161066393929190610b28565b60206040518083038186803b15801561067b57600080fd5b505afa15801561068f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b3919061095c565b90505b92915050565b7f08c379a0000000000000000000000000000000000000000000000000000000006000908152602060045260076024526642414c23000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b600060608373ffffffffffffffffffffffffffffffffffffffff16836040516107529190610a5b565b6000604051808303816000865af19150503d806000811461078f576040519150601f19603f3d011682016040523d82523d6000602084013e610794565b606091505b509150915060008214156107ac573d6000803e3d6000fd5b6107d68151600014806107ce5750818060200190518101906107ce919061095c565b6101a2610498565b50505050565b60008083601f8401126107ed578182fd5b50813567ffffffffffffffff811115610804578182fd5b602083019150836020808302850101111561081e57600080fd5b9250929050565b80356106b681610b7b565b600080600080600060608688031215610847578081fd5b853567ffffffffffffffff8082111561085e578283fd5b61086a89838a016107dc565b90975095506020880135915080821115610882578283fd5b5061088f888289016107dc565b90945092505060408601356108a381610b7b565b809150509295509295909350565b600060208083850312156108c3578182fd5b823567ffffffffffffffff808211156108da578384fd5b818501915085601f8301126108ed578384fd5b8135818111156108fb578485fd5b838102915061090b848301610b54565b8181528481019084860184860187018a1015610925578788fd5b8795505b8386101561094f5761093b8a82610825565b835260019590950194918601918601610929565b5098975050505050505050565b60006020828403121561096d578081fd5b8151801515811461097c578182fd5b9392505050565b600060208284031215610994578081fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461097c578182fd5b6000602082840312156109d4578081fd5b815161097c81610b7b565b6000602082840312156109f0578081fd5b813561097c81610b7b565b600060208284031215610a0c578081fd5b5035919050565b600060208284031215610a24578081fd5b5051919050565b9182527fffffffff0000000000000000000000000000000000000000000000000000000016602082015260240190565b60008251815b81811015610a7b5760208186018101518583015201610a61565b81811115610a895782828501525b509190910192915050565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b73ffffffffffffffffffffffffffffffffffffffff929092168252602082015260400190565b6020808252825182820181905260009190848201906040850190845b81811015610b1357835183529284019291840191600101610af7565b50909695505050505050565b90815260200190565b92835273ffffffffffffffffffffffffffffffffffffffff918216602084015216604082015260600190565b60405181810167ffffffffffffffff81118282101715610b7357600080fd5b604052919050565b73ffffffffffffffffffffffffffffffffffffffff8116811461049557600080fdfea2646970667358221220633078d55bd2045f236885d689344d0a00a8faa41d676a87e245bd03003ddef164736f6c63430007010033";

type ProtocolFeesCollectorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProtocolFeesCollectorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ProtocolFeesCollector__factory extends ContractFactory {
  constructor(...args: ProtocolFeesCollectorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ProtocolFeesCollector> {
    return super.deploy(
      _vault,
      overrides || {}
    ) as Promise<ProtocolFeesCollector>;
  }
  getDeployTransaction(
    _vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_vault, overrides || {});
  }
  attach(address: string): ProtocolFeesCollector {
    return super.attach(address) as ProtocolFeesCollector;
  }
  connect(signer: Signer): ProtocolFeesCollector__factory {
    return super.connect(signer) as ProtocolFeesCollector__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProtocolFeesCollectorInterface {
    return new utils.Interface(_abi) as ProtocolFeesCollectorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ProtocolFeesCollector {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ProtocolFeesCollector;
  }
}
