/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BytesLike,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ZapTrancheHop, ZapTrancheHopInterface } from "../ZapTrancheHop";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "__trancheFactory",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "__trancheBytecodeHash",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "authorize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "authorized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "deauthorize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_underlying",
        type: "address",
      },
      {
        internalType: "address",
        name: "_positionFrom",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_expirationFrom",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_positionTo",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_expirationTo",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountPt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountYt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ptExpected",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ytExpected",
        type: "uint256",
      },
    ],
    name: "hopToTranche",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "isAuthorized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isFrozen",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "rescueTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_newState",
        type: "bool",
      },
    ],
    name: "setIsFrozen",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c06040526002805460ff1916905534801561001a57600080fd5b5060405161107138038061107183398101604081905261003991610099565b600080546001600160a01b0319163390811790915561005790610072565b60609190911b6001600160601b03191660805260a0526100d1565b6001600160a01b03166000908152600160208190526040909120805460ff19169091179055565b600080604083850312156100ab578182fd5b82516001600160a01b03811681146100c1578283fd5b6020939093015192949293505050565b60805160601c60a051610f786100f96000396000610ab201526000610a8e0152610f786000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c80638da5cb5b11610076578063b91816111161005b578063b918161114610157578063f5019c4f1461016a578063fe9fbb801461018b576100be565b80638da5cb5b1461012f578063b6a5d7de14610144576100be565b806333eeb147116100a757806333eeb147146100eb578063573761981461010957806364eda74b1461011c576100be565b806313af4035146100c357806327c97fa5146100d8575b600080fd5b6100d66100d1366004610b17565b61019e565b005b6100d66100e6366004610b17565b61023f565b6100f36102dc565b6040516101009190610d85565b60405180910390f35b6100d6610117366004610b3a565b6102e5565b6100d661012a366004610b65565b6103e4565b610137610454565b6040516101009190610d0d565b6100d6610152366004610b17565b610470565b6100f3610165366004610b17565b6104cd565b61017d610178366004610b9d565b6104e2565b604051610100929190610ec7565b6100f3610199366004610b17565b610997565b60005473ffffffffffffffffffffffffffffffffffffffff1633146101f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ef90610d90565b60405180910390fd5b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60005473ffffffffffffffffffffffffffffffffffffffff163314610290576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ef90610d90565b73ffffffffffffffffffffffffffffffffffffffff16600090815260016020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055565b60025460ff1681565b60005473ffffffffffffffffffffffffffffffffffffffff163314610336576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ef90610d90565b6040517fa9059cbb000000000000000000000000000000000000000000000000000000008152829073ffffffffffffffffffffffffffffffffffffffff82169063a9059cbb9061038c9033908690600401610d5f565b602060405180830381600087803b1580156103a657600080fd5b505af11580156103ba573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103de9190610b81565b50505050565b6103ed33610997565b610423576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ef90610dc7565b600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016911515919091179055565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff1633146104c1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ef90610d90565b6104ca816109c2565b50565b60016020526000908152604090205460ff1681565b600254600090819060ff1615610524576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ef90610e35565b60006105308b8b610a14565b9050600061053e8a8a610a14565b9050600088156106a4576040517f23b872dd00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8416906323b872dd9061059e90339030908e90600401610d2e565b602060405180830381600087803b1580156105b857600080fd5b505af11580156105cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f09190610b81565b506040517f884e17f300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84169063884e17f390610645908c908f90600401610ea3565b602060405180830381600087803b15801561065f57600080fd5b505af1158015610673573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106979190610c39565b6106a19082610ed5565b90505b87156108715760008373ffffffffffffffffffffffffffffffffffffffff1663764b666c6040518163ffffffff1660e01b815260040160206040518083038186803b1580156106f257600080fd5b505afa158015610706573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072a9190610c1d565b6040517f23b872dd00000000000000000000000000000000000000000000000000000000815290915073ffffffffffffffffffffffffffffffffffffffff8216906323b872dd9061078390339030908e90600401610d2e565b602060405180830381600087803b15801561079d57600080fd5b505af11580156107b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d59190610b81565b508373ffffffffffffffffffffffffffffffffffffffff16631210aac28a8e6040518363ffffffff1660e01b8152600401610811929190610ea3565b602060405180830381600087803b15801561082b57600080fd5b505af115801561083f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108639190610c39565b61086d9083610ed5565b9150505b6000808373ffffffffffffffffffffffffffffffffffffffff166385f45c88336040518263ffffffff1660e01b81526004016108ad9190610d0d565b6040805180830381600087803b1580156108c657600080fd5b505af11580156108da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108fe9190610c51565b915091508281101580156109125750878110155b610948576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ef90610e6c565b88821015610982576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101ef90610dfe565b909f909e509c50505050505050505050505050565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604090205460ff1690565b73ffffffffffffffffffffffffffffffffffffffff16600090815260016020819052604090912080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169091179055565b6000808383604051602001610a2a929190610c74565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529082905280516020918201209250600091610ad8917fff00000000000000000000000000000000000000000000000000000000000000917f00000000000000000000000000000000000000000000000000000000000000009186917f00000000000000000000000000000000000000000000000000000000000000009101610ca9565b604080518083037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0018152919052805160209091012095945050505050565b600060208284031215610b28578081fd5b8135610b3381610f12565b9392505050565b60008060408385031215610b4c578081fd5b8235610b5781610f12565b946020939093013593505050565b600060208284031215610b76578081fd5b8135610b3381610f34565b600060208284031215610b92578081fd5b8151610b3381610f34565b60008060008060008060008060006101208a8c031215610bbb578485fd5b8935610bc681610f12565b985060208a0135610bd681610f12565b975060408a0135965060608a0135610bed81610f12565b989b979a50959860808101359760a0820135975060c0820135965060e08201359550610100909101359350915050565b600060208284031215610c2e578081fd5b8151610b3381610f12565b600060208284031215610c4a578081fd5b5051919050565b60008060408385031215610c63578182fd5b505080516020909101519092909150565b60609290921b7fffffffffffffffffffffffffffffffffffffffff000000000000000000000000168252601482015260340190565b7fff0000000000000000000000000000000000000000000000000000000000000094909416845260609290921b7fffffffffffffffffffffffffffffffffffffffff0000000000000000000000001660018401526015830152603582015260550190565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b73ffffffffffffffffffffffffffffffffffffffff9384168152919092166020820152604081019190915260600190565b73ffffffffffffffffffffffffffffffffffffffff929092168252602082015260400190565b901515815260200190565b60208082526010908201527f53656e646572206e6f74206f776e657200000000000000000000000000000000604082015260600190565b60208082526015908201527f53656e646572206e6f7420417574686f72697a65640000000000000000000000604082015260600190565b60208082526014908201527f4e6f7420656e6f756768205054206d696e746564000000000000000000000000604082015260600190565b6020808252600f908201527f436f6e74726163742066726f7a656e0000000000000000000000000000000000604082015260600190565b60208082526014908201527f4e6f7420656e6f756768205954206d696e746564000000000000000000000000604082015260600190565b91825273ffffffffffffffffffffffffffffffffffffffff16602082015260400190565b918252602082015260400190565b60008219821115610f0d577f4e487b710000000000000000000000000000000000000000000000000000000081526011600452602481fd5b500190565b73ffffffffffffffffffffffffffffffffffffffff811681146104ca57600080fd5b80151581146104ca57600080fdfea2646970667358221220d1543b5d639f173b13788ecf75c0ec629ce2128a1789952bb38faadfb23e374e64736f6c63430008000033";

type ZapTrancheHopConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ZapTrancheHopConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ZapTrancheHop__factory extends ContractFactory {
  constructor(...args: ZapTrancheHopConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    __trancheFactory: string,
    __trancheBytecodeHash: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ZapTrancheHop> {
    return super.deploy(
      __trancheFactory,
      __trancheBytecodeHash,
      overrides || {}
    ) as Promise<ZapTrancheHop>;
  }
  getDeployTransaction(
    __trancheFactory: string,
    __trancheBytecodeHash: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      __trancheFactory,
      __trancheBytecodeHash,
      overrides || {}
    );
  }
  attach(address: string): ZapTrancheHop {
    return super.attach(address) as ZapTrancheHop;
  }
  connect(signer: Signer): ZapTrancheHop__factory {
    return super.connect(signer) as ZapTrancheHop__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ZapTrancheHopInterface {
    return new utils.Interface(_abi) as ZapTrancheHopInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ZapTrancheHop {
    return new Contract(address, _abi, signerOrProvider) as ZapTrancheHop;
  }
}
