/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Tranche, TrancheInterface } from "../Tranche";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "SpeedBumpHit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
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
    name: "PERMIT_TYPEHASH",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_destination",
        type: "address",
      },
    ],
    name: "deposit",
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
    inputs: [],
    name: "hitSpeedbump",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "interestSupply",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "interestToken",
    outputs: [
      {
        internalType: "contract IInterestToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
    name: "nonces",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "position",
    outputs: [
      {
        internalType: "contract IWrappedPosition",
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
        name: "_destination",
        type: "address",
      },
    ],
    name: "prefundedDeposit",
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
    inputs: [],
    name: "speedbump",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "underlying",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unlockTimestamp",
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
    name: "valueSupplied",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_destination",
        type: "address",
      },
    ],
    name: "withdrawInterest",
    outputs: [
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_destination",
        type: "address",
      },
    ],
    name: "withdrawPrincipal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6101206040523480156200001257600080fd5b50604080518082018252601881527f456c656d656e74205072696e636970616c20546f6b656e200000000000000000602080830191825283518085019094526002845261065560f41b90840152815191929162000072916000916200063e565b508051620000889060019060208401906200063e565b506002805460ff1916601217905560036020526000197f3617319a054d772f909f7c479a2cebe5066e836a939412e32403c99029b92eff8190553060009081526040902055620000d762000384565b7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f600060405162000109919062000854565b60408051918290038220828201825260018352603160f81b60209384015290516200015c93927fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6914691309101620008f9565b6040516020818303038152906040528051906020012060068190555050506000339050600080600080846001600160a01b0316633bc5de306040518163ffffffff1660e01b8152600401608060405180830381600087803b158015620001c157600080fd5b505af1158015620001d6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001fc9190620006e4565b6001600160601b0319606083811b821660805285901b1660a05261010083905260408051637e062a3560e11b81529051949850929650909450925085916000916001600160a01b0384169163fc0c546a91600480820192602092909190829003018186803b1580156200026e57600080fd5b505afa15801562000283573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620002a991906200073f565b9050806001600160a01b031660c0816001600160a01b031660601b815250506000816001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156200030457600080fd5b505afa15801562000319573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200033f919062000813565b7fff0000000000000000000000000000000000000000000000000000000000000060f882901b1660e0529050620003768162000628565b505050505050505062000a14565b6000339050600080600080846001600160a01b0316633bc5de306040518163ffffffff1660e01b8152600401608060405180830381600087803b158015620003cb57600080fd5b505af1158015620003e0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620004069190620006e4565b93509350935093506000846001600160a01b03166395d89b416040518163ffffffff1660e01b815260040160006040518083038186803b1580156200044a57600080fd5b505afa1580156200045f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405262000489919081019062000765565b60405190915060009060019082906001600160a01b03861690637a0674a360e11b90620004bf9087908b90869060240162000925565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051620004ff919062000836565b600060405180830381855af49150503d80600081146200053c576040519150601f19603f3d011682016040523d82523d6000602084013e62000541565b606091505b505090506000856001600160a01b031663f40ce94660e01b868a86604051602401620005709392919062000925565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051620005b0919062000836565b600060405180830381855af49150503d8060008114620005ed576040519150601f19603f3d011682016040523d82523d6000602084013e620005f2565b606091505b50509050818015620006015750805b6200061c57634e487b7160e01b600052600160045260246000fd5b50505050505050505050565b6002805460ff191660ff92909216919091179055565b8280546200064c90620009a8565b90600052602060002090601f016020900481019282620006705760008555620006bb565b82601f106200068b57805160ff1916838001178555620006bb565b82800160010185558215620006bb579182015b82811115620006bb5782518255916020019190600101906200069e565b50620006c9929150620006cd565b5090565b5b80821115620006c95760008155600101620006ce565b60008060008060808587031215620006fa578384fd5b84516200070781620009fb565b6020860151604087015191955093506200072181620009fb565b60608601519092506200073481620009fb565b939692955090935050565b60006020828403121562000751578081fd5b81516200075e81620009fb565b9392505050565b60006020828403121562000777578081fd5b81516001600160401b03808211156200078e578283fd5b818401915084601f830112620007a2578283fd5b815181811115620007b757620007b7620009e5565b604051601f8201601f191681016020018381118282101715620007de57620007de620009e5565b604052818152838201602001871015620007f6578485fd5b6200080982602083016020870162000975565b9695505050505050565b60006020828403121562000825578081fd5b815160ff811681146200075e578182fd5b600082516200084a81846020870162000975565b9190910192915050565b81546000908190600281046001808316806200087157607f831692505b60208084108214156200089257634e487b7160e01b87526022600452602487fd5b818015620008a95760018114620008bb57620008eb565b60ff19861689528489019650620008eb565b620008c68a62000969565b885b86811015620008e35781548b820152908501908301620008c8565b505084890196505b509498975050505050505050565b9485526020850193909352604084019190915260608301526001600160a01b0316608082015260a00190565b60006060825284518060608401526200094681608085016020890162000975565b60208301949094525060408101919091526080601f909201601f19160101919050565b60009081526020902090565b60005b838110156200099257818101518382015260200162000978565b83811115620009a2576000848401525b50505050565b600281046001821680620009bd57607f821691505b60208210811415620009df57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811462000a1157600080fd5b50565b60805160601c60a05160601c60c05160601c60e05160f81c610100516120b862000acb600039600081816104a901528181610ba501528181610d3901528181611017015261143d01526000505060008181610a470152610b2b01526000818161040c015281816105d50152818161076e01528181610a8401528181610c2301528181610d7d015281816110b50152818161120801526112da01526000818161052d01528181610b610152610f9101526120b86000f3fe608060405234801561001057600080fd5b50600436106101a35760003560e01c80636e553f65116100ee57806385f45c8811610097578063a9059cbb11610071578063a9059cbb1461030f578063aa082a9d14610322578063d505accf1461032a578063dd62ed3e1461033d576101a3565b806385f45c88146102e1578063884e17f3146102f457806395d89b4114610307576101a3565b8063764b666c116100c8578063764b666c146102bc5780637da081a2146102c45780637ecebe00146102ce576101a3565b80636e553f65146102805780636f307dc3146102a157806370a08231146102a9576101a3565b806323b872dd116101505780633644e5151161012a5780633644e51514610268578063421b15c11461027057806363cf7cdd14610278576101a3565b806323b872dd1461023857806330adf81f1461024b578063313ce56714610253576101a3565b8063095ea7b311610181578063095ea7b3146101f05780631210aac21461021057806318160ddd14610230576101a3565b8063041be7c2146101a857806306fdde03146101c657806309218e91146101db575b600080fd5b6101b0610350565b6040516101bd9190611eb7565b60405180910390f35b6101ce61037c565b6040516101bd9190611b8c565b6101e361040a565b6040516101bd9190611a73565b6102036101fe36600461196a565b61042e565b6040516101bd9190611b19565b61022361021e3660046119cb565b6104a5565b6040516101bd9190611b24565b610223610807565b6102036102463660046118be565b61081f565b6102236109f1565b61025b610a15565b6040516101bd9190611ee2565b610223610a1e565b610223610a24565b6101b0610a2a565b61029361028e3660046119cb565b610a42565b6040516101bd929190611ed4565b6101e3610b29565b6102236102b7366004611872565b610b4d565b6101e3610b5f565b6102cc610b83565b005b6102236102dc366004611872565b610d22565b6102936102ef366004611872565b610d34565b6102236103023660046119cb565b611013565b6101ce61141a565b61020361031d36600461196a565b611427565b61022361143b565b6102cc6103383660046118f9565b61145f565b61022361034b36600461188c565b611709565b60075470010000000000000000000000000000000090046fffffffffffffffffffffffffffffffff1681565b6000805461038990611fc6565b80601f01602080910402602001604051908101604052809291908181526020018280546103b590611fc6565b80156104025780601f106103d757610100808354040283529160200191610402565b820191906000526020600020905b8154815290600101906020018083116103e557829003601f168201915b505050505081565b7f000000000000000000000000000000000000000000000000000000000000000081565b33600081815260046020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92590610494908690611b24565b60405180910390a350600192915050565b60007f00000000000000000000000000000000000000000000000000000000000000004210156104f05760405162461bcd60e51b81526004016104e790611d36565b60405180910390fd5b6040517f9dc29fac00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690639dc29fac906105649033908790600401611ac5565b600060405180830381600087803b15801561057e57600080fd5b505af1158015610592573d6000803e3d6000fd5b50506040517f3af9e6690000000000000000000000000000000000000000000000000000000081526000925073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000169150633af9e6699061060b903090600401611a73565b60206040518083038186803b15801561062357600080fd5b505afa158015610637573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061065b91906119b3565b6007549091506fffffffffffffffffffffffffffffffff80821691700100000000000000000000000000000000900416600082841161069b5760006106a5565b6106a58385611faf565b90506000826106b48984611f41565b6106be9190611f08565b90506000670de0b6b3a76400006106db6509184e72a00084611f41565b6106e59190611f08565b6106ef9083611faf565b90506106fb8985611faf565b600780546fffffffffffffffffffffffffffffffff9283167001000000000000000000000000000000000292169190911790556040517f67caf87100000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016906367caf871906107a7908c9087908790600401611aeb565b6040805180830381600087803b1580156107c057600080fd5b505af11580156107d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107f891906119ed565b509a9950505050505050505050565b6007546fffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260036020526040812054828110156108655760405162461bcd60e51b81526004016104e790611e80565b73ffffffffffffffffffffffffffffffffffffffff851633146109385773ffffffffffffffffffffffffffffffffffffffff851660009081526004602090815260408083203384529091529020547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461093657838110156108fa5760405162461bcd60e51b81526004016104e790611bfd565b6109048482611faf565b73ffffffffffffffffffffffffffffffffffffffff871660009081526004602090815260408083203384529091529020555b505b6109428382611faf565b73ffffffffffffffffffffffffffffffffffffffff808716600090815260036020526040808220939093559086168152205461097f908490611ef0565b73ffffffffffffffffffffffffffffffffffffffff80861660008181526003602052604090819020939093559151908716907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906109de908790611b24565b60405180910390a3506001949350505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b60025460ff1681565b60065481565b60085481565b6007546fffffffffffffffffffffffffffffffff1681565b6000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd337f0000000000000000000000000000000000000000000000000000000000000000876040518463ffffffff1660e01b8152600401610ac293929190611a94565b602060405180830381600087803b158015610adc57600080fd5b505af1158015610af0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b149190611993565b50610b1e83610d34565b915091509250929050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60036020526000908152604090205481565b7f000000000000000000000000000000000000000000000000000000000000000081565b60085415610ba35760405162461bcd60e51b81526004016104e790611da4565b7f0000000000000000000000000000000000000000000000000000000000000000421015610be35760405162461bcd60e51b81526004016104e790611d36565b6040517f3af9e66900000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690633af9e66990610c58903090600401611a73565b60206040518083038186803b158015610c7057600080fd5b505afa158015610c84573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ca891906119b3565b6007549091506fffffffffffffffffffffffffffffffff16811015610d07577ff7f87880c827db1e5aaa7a648e710c6e9c3a608de27471889dbd94199232c31f42604051610cf69190611b24565b60405180910390a142600855610d1f565b60405162461bcd60e51b81526004016104e790611e49565b50565b60056020526000908152604090205481565b6000807f00000000000000000000000000000000000000000000000000000000000000004210610d765760405162461bcd60e51b81526004016104e790611cff565b60008060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166385f45c88306040518263ffffffff1660e01b8152600401610dd49190611a73565b606060405180830381600087803b158015610dee57600080fd5b505af1158015610e02573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e269190611a10565b91945092509050600083610e3a8484611f41565b610e449190611f08565b6007549091506fffffffffffffffffffffffffffffffff80821691700100000000000000000000000000000000900416610e7f836002611ef0565b821115610e9e5760405162461bcd60e51b81526004016104e790611e12565b60008083118015610eae57508284115b15610ee4578186610ebf8587611faf565b610ec99190611f41565b610ed39190611f08565b610edd9087611faf565b9050610ee7565b50845b610ef18184611ef0565b610efb8784611ef0565b600780546fffffffffffffffffffffffffffffffff938416928416700100000000000000000000000000000000029316929092177fffffffffffffffffffffffffffffffff00000000000000000000000000000000161790556040517f40c10f1900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016906340c10f1990610fc8908d908a90600401611ac5565b600060405180830381600087803b158015610fe257600080fd5b505af1158015610ff6573d6000803e3d6000fd5b505050506110048a82611726565b97509395505050505050915091565b60007f00000000000000000000000000000000000000000000000000000000000000004210156110555760405162461bcd60e51b81526004016104e790611d36565b60085460075484906fffffffffffffffffffffffffffffffff168215611188576040517f3af9e66900000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690633af9e669906110ea903090600401611a73565b60206040518083038186803b15801561110257600080fd5b505afa158015611116573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061113a91906119b3565b905081811015611186578161114f8289611f41565b6111599190611f08565b9250426111696202a30086611ef0565b106111865760405162461bcd60e51b81526004016104e790611c34565b505b61119233876117bf565b61119c8682611f7e565b600780547fffffffffffffffffffffffffffffffff00000000000000000000000000000000166fffffffffffffffffffffffffffffffff929092169190911790556040517f70a082310000000000000000000000000000000000000000000000000000000081526000907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16906370a0823190611252903090600401611a73565b60206040518083038186803b15801561126a57600080fd5b505afa15801561127e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112a291906119b3565b90506000670de0b6b3a76400006112bf6509184e72a00086611f41565b6112c99190611f08565b6112d39085611faf565b90506000807f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166367caf8718a88866040518463ffffffff1660e01b815260040161133593929190611aeb565b6040805180830381600087803b15801561134e57600080fd5b505af1158015611362573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061138691906119ed565b90925090506000816113988487611f41565b6113a29190611f08565b90508581101561140b57876113c95760405162461bcd60e51b81526004016104e790611e12565b426113d76202a3008a611ef0565b1061140b577f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b50909998505050505050505050565b6001805461038990611fc6565b600061143433848461081f565b9392505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60065473ffffffffffffffffffffffffffffffffffffffff881660009081526005602090815260408083205490519293926114c5927f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9928d928d928d92918d9101611b2d565b604051602081830303815290604052805190602001206040516020016114ec929190611a3d565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190528051602090910120905073ffffffffffffffffffffffffffffffffffffffff88166115575760405162461bcd60e51b81526004016104e790611cc8565b6001818585856040516000815260200160405260405161157a9493929190611b6e565b6020604051602081039080840390855afa15801561159c573d6000803e3d6000fd5b5050506020604051035173ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff16146115f05760405162461bcd60e51b81526004016104e790611d6d565b8415806115fd5750844211155b6116195760405162461bcd60e51b81526004016104e790611ddb565b7f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08211156116595760405162461bcd60e51b81526004016104e790611c6b565b73ffffffffffffffffffffffffffffffffffffffff8816600090815260056020526040812080549161168a8361201a565b909155505073ffffffffffffffffffffffffffffffffffffffff8089166000818152600460209081526040808320948c168084529490915290819020899055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906116f7908a90611b24565b60405180910390a35050505050505050565b600460209081526000928352604080842090915290825290205481565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260036020526040902054611757908290611ef0565b73ffffffffffffffffffffffffffffffffffffffff83166000818152600360205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906117b3908590611b24565b60405180910390a35050565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600360205260409020546117f0908290611faf565b73ffffffffffffffffffffffffffffffffffffffff83166000818152600360205260408082209390935591517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906117b3908590611b24565b803573ffffffffffffffffffffffffffffffffffffffff8116811461186d57600080fd5b919050565b600060208284031215611883578081fd5b61143482611849565b6000806040838503121561189e578081fd5b6118a783611849565b91506118b560208401611849565b90509250929050565b6000806000606084860312156118d2578081fd5b6118db84611849565b92506118e960208501611849565b9150604084013590509250925092565b600080600080600080600060e0888a031215611913578283fd5b61191c88611849565b965061192a60208901611849565b95506040880135945060608801359350608088013560ff8116811461194d578384fd5b9699959850939692959460a0840135945060c09093013592915050565b6000806040838503121561197c578182fd5b61198583611849565b946020939093013593505050565b6000602082840312156119a4578081fd5b81518015158114611434578182fd5b6000602082840312156119c4578081fd5b5051919050565b600080604083850312156119dd578182fd5b823591506118b560208401611849565b600080604083850312156119ff578182fd5b505080516020909101519092909150565b600080600060608486031215611a24578283fd5b8351925060208401519150604084015190509250925092565b7f190100000000000000000000000000000000000000000000000000000000000081526002810192909252602282015260420190565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b73ffffffffffffffffffffffffffffffffffffffff9384168152919092166020820152604081019190915260600190565b73ffffffffffffffffffffffffffffffffffffffff929092168252602082015260400190565b73ffffffffffffffffffffffffffffffffffffffff9390931683526020830191909152604082015260600190565b901515815260200190565b90815260200190565b95865273ffffffffffffffffffffffffffffffffffffffff94851660208701529290931660408501526060840152608083019190915260a082015260c00190565b93845260ff9290921660208401526040830152606082015260800190565b6000602080835283518082850152825b81811015611bb857858101830151858201604001528201611b9c565b81811115611bc95783604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b6020808252601d908201527f45524332303a20696e73756666696369656e742d616c6c6f77616e6365000000604082015260600190565b60208082526007908201527f453a4561726c7900000000000000000000000000000000000000000000000000604082015260600190565b60208082526022908201527f45524332303a20696e76616c6964207369676e6174757265202773272076616c60408201527f7565000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526018908201527f45524332303a20696e76616c69642d616464726573732d300000000000000000604082015260600190565b60208082526007908201527f6578706972656400000000000000000000000000000000000000000000000000604082015260600190565b6020808252600d908201527f453a4e6f74204578706972656400000000000000000000000000000000000000604082015260600190565b60208082526015908201527f45524332303a20696e76616c69642d7065726d69740000000000000000000000604082015260600190565b6020808252600c908201527f453a416c72656164795365740000000000000000000000000000000000000000604082015260600190565b60208082526015908201527f45524332303a207065726d69742d657870697265640000000000000000000000604082015260600190565b60208082526009908201527f453a4e45475f494e540000000000000000000000000000000000000000000000604082015260600190565b60208082526008908201527f453a4e6f4c6f7373000000000000000000000000000000000000000000000000604082015260600190565b6020808252601b908201527f45524332303a20696e73756666696369656e742d62616c616e63650000000000604082015260600190565b6fffffffffffffffffffffffffffffffff91909116815260200190565b918252602082015260400190565b60ff91909116815260200190565b60008219821115611f0357611f03612053565b500190565b600082611f3c577f4e487b710000000000000000000000000000000000000000000000000000000081526012600452602481fd5b500490565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611f7957611f79612053565b500290565b60006fffffffffffffffffffffffffffffffff83811690831681811015611fa757611fa7612053565b039392505050565b600082821015611fc157611fc1612053565b500390565b600281046001821680611fda57607f821691505b60208210811415612014577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561204c5761204c612053565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea264697066735822122036a9e3f6eda75a6387b3b4baa338e33541a18e3338317883fe0af5efe715bd5064736f6c63430008000033";

type TrancheConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TrancheConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Tranche__factory extends ContractFactory {
  constructor(...args: TrancheConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Tranche> {
    return super.deploy(overrides || {}) as Promise<Tranche>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Tranche {
    return super.attach(address) as Tranche;
  }
  connect(signer: Signer): Tranche__factory {
    return super.connect(signer) as Tranche__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TrancheInterface {
    return new utils.Interface(_abi) as TrancheInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Tranche {
    return new Contract(address, _abi, signerOrProvider) as Tranche;
  }
}
