/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MockStableMath,
  MockStableMathInterface,
} from "../MockStableMath";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amp",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amountsOut",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "bptTotalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapFee",
        type: "uint256",
      },
    ],
    name: "bptInForExactTokensOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amp",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "lastInvariant",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "protocolSwapFeePercentage",
        type: "uint256",
      },
    ],
    name: "calculateDueTokenProtocolSwapFeeAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amp",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "tokenIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bptAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bptTotalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapFee",
        type: "uint256",
      },
    ],
    name: "exactBPTInForTokenOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "bptAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bptTotalSupply",
        type: "uint256",
      },
    ],
    name: "exactBPTInForTokensOut",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amp",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amountsIn",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "bptTotalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapFee",
        type: "uint256",
      },
    ],
    name: "exactTokensInForBPTOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amp",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "tokenIndexIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenIndexOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenAmountOut",
        type: "uint256",
      },
    ],
    name: "inGivenOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amp",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
    ],
    name: "invariant",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amp",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "tokenIndexIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenIndexOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenAmountIn",
        type: "uint256",
      },
    ],
    name: "outGivenIn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amp",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "tokenIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bptAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bptTotalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapFee",
        type: "uint256",
      },
    ],
    name: "tokenInForExactBPTOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506117c3806100206000396000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c80639cd91d3f11610076578063cf1b8c8c1161005b578063cf1b8c8c14610632578063db7ad3f2146106ed578063fe2dd7ba146107a2576100a3565b80639cd91d3f1461044a578063a89d4259146104ff576100a3565b8063155bfcb8146100a85780631c855fa614610164578063405de9781461025c5780636fc82f2914610317575b600080fd5b610152600480360360408110156100be57600080fd5b813591908101906040810160208201356401000000008111156100e057600080fd5b8201836020820111156100f257600080fd5b8035906020019184602083028401116401000000008311171561011457600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550610857945050505050565b60408051918252519081900360200190f35b61020c6004803603606081101561017a57600080fd5b81019060208101813564010000000081111561019557600080fd5b8201836020820111156101a757600080fd5b803590602001918460208302840111640100000000831117156101c957600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550508235935050506020013561086c565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610248578181015183820152602001610230565b505050509050019250505060405180910390f35b610152600480360360c081101561027257600080fd5b8135919081019060408101602082013564010000000081111561029457600080fd5b8201836020820111156102a657600080fd5b803590602001918460208302840111640100000000831117156102c857600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295505082359350505060208101359060408101359060600135610881565b610152600480360360a081101561032d57600080fd5b8135919081019060408101602082013564010000000081111561034f57600080fd5b82018360208201111561036157600080fd5b8035906020019184602083028401116401000000008311171561038357600080fd5b91908080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525092959493602081019350359150506401000000008111156103d357600080fd5b8201836020820111156103e557600080fd5b8035906020019184602083028401116401000000008311171561040757600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550508235935050506020013561089c565b610152600480360360a081101561046057600080fd5b8135919081019060408101602082013564010000000081111561048257600080fd5b82018360208201111561049457600080fd5b803590602001918460208302840111640100000000831117156104b657600080fd5b91908080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525092955050823593505050602081013590604001356108b5565b610152600480360360a081101561051557600080fd5b8135919081019060408101602082013564010000000081111561053757600080fd5b82018360208201111561054957600080fd5b8035906020019184602083028401116401000000008311171561056b57600080fd5b91908080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525092959493602081019350359150506401000000008111156105bb57600080fd5b8201836020820111156105cd57600080fd5b803590602001918460208302840111640100000000831117156105ef57600080fd5b91908080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525092955050823593505050602001356108c4565b610152600480360360c081101561064857600080fd5b8135919081019060408101602082013564010000000081111561066a57600080fd5b82018360208201111561067c57600080fd5b8035906020019184602083028401116401000000008311171561069e57600080fd5b91908080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525092955050823593505050602081013590604081013590606001356108d3565b610152600480360360a081101561070357600080fd5b8135919081019060408101602082013564010000000081111561072557600080fd5b82018360208201111561073757600080fd5b8035906020019184602083028401116401000000008311171561075957600080fd5b91908080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525092955050823593505050602081013590604001356108e3565b610152600480360360a08110156107b857600080fd5b813591908101906040810160208201356401000000008111156107da57600080fd5b8201836020820111156107ec57600080fd5b8035906020019184602083028401116401000000008311171561080e57600080fd5b91908080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525092955050823593505050602081013590604001356108f2565b60006108638383610901565b90505b92915050565b6060610879848484610a7b565b949350505050565b6000610891878787878787610b2d565b979650505050505050565b60006108ab8686868686610c41565b9695505050505050565b60006108ab8686868686610ecf565b60006108ab8686868686610f75565b60006108918787878787876111f6565b60006108ab86868686866112a8565b60006108ab8686868686611304565b80516000908190815b818110156109425761093885828151811061092157fe5b60200260200101518461138890919063ffffffff16565b925060010161090a565b508161095357600092505050610866565b60008281610961888561139a565b905060005b60ff811015610a6e57600061098f868a60008151811061098257fe5b602002602001015161139a565b905060015b868110156109c8576109be6109b86109b2848d858151811061098257fe5b8961139a565b866113be565b9150600101610994565b50839450610a286109fe6109e56109df868b61139a565b8461139a565b6109f86109f28a8961139a565b8861139a565b90611388565b610a23610a15610a0f8760016113f1565b8561139a565b6109f86109b28b6001611388565b6113be565b935084841115610a4e576001610a3e85876113f1565b11610a495750610a6e565b610a65565b6001610a5a86866113f1565b11610a655750610a6e565b50600101610966565b5090979650505050505050565b60606000610a898484611407565b90506060855167ffffffffffffffff81118015610aa557600080fd5b50604051908082528060200260200182016040528015610acf578160200160208202803683370190505b50905060005b8651811015610b2357610b0483888381518110610aee57fe5b602002602001015161145890919063ffffffff16565b828281518110610b1057fe5b6020908102919091010152600101610ad5565b5095945050505050565b600080610b3a8888610901565b90506000610b5c82610b5687610b50818b611388565b90611484565b906114d2565b90506000805b8951811015610b9b57610b918a8281518110610b7a57fe5b60200260200101518361138890919063ffffffff16565b9150600101610b62565b506000610baa8b8b858c61152c565b90506000610bd48b8b81518110610bbd57fe5b6020026020010151836113f190919063ffffffff16565b90506000610bfe848d8d81518110610be857fe5b602002602001015161140790919063ffffffff16565b90506000610c0b826116c8565b90506000610c198a836114d2565b9050610c2e610c27826116c8565b8590611484565b9f9e505050505050505050505050505050565b600080610c4e8787610901565b90506000805b8751811015610c7657610c6c888281518110610b7a57fe5b9150600101610c54565b506060865167ffffffffffffffff81118015610c9157600080fd5b50604051908082528060200260200182016040528015610cbb578160200160208202803683370190505b5090506000805b8951811015610d72576000610cdd858c8481518110610be857fe5b9050610d358b8381518110610cee57fe5b6020026020010151610d2f8c8581518110610d0557fe5b60200260200101518e8681518110610d1957fe5b602002602001015161138890919063ffffffff16565b90611407565b848381518110610d4157fe5b602002602001018181525050610d67610d6082868581518110610aee57fe5b8490611388565b925050600101610cc2565b506060895167ffffffffffffffff81118015610d8d57600080fd5b50604051908082528060200260200182016040528015610db7578160200160208202803683370190505b50905060005b8a51811015610e8a576000848281518110610dd457fe5b60200260200101518410610dea57506000610e2e565b610e2b610e1b670de0b6b3a7640000878581518110610e0557fe5b60200260200101516113f190919063ffffffff16565b610b5086888681518110610e0557fe5b90505b6000610e3a8a836114d2565b90506000610e56610e4a836116c8565b8e8681518110610aee57fe5b9050610e68818f8681518110610d1957fe5b858581518110610e7457fe5b6020908102919091010152505050600101610dbd565b506000610e978c83610901565b9050610ebf610eb8670de0b6b3a7640000610eb2848a611407565b906113f1565b8a90611458565b9c9b505050505050505050505050565b600080610edc8787610901565b9050610eee83878681518110610e0557fe5b868581518110610efa57fe5b6020026020010181815250506000610f148888848961152c565b9050610f2684888781518110610d1957fe5b878681518110610f3257fe5b602002602001018181525050610f6960016109f8898981518110610f5257fe5b6020026020010151846113f190919063ffffffff16565b98975050505050505050565b600080610f828787610901565b90506000805b8751811015610faa57610fa0888281518110610b7a57fe5b9150600101610f88565b506060865167ffffffffffffffff81118015610fc557600080fd5b50604051908082528060200260200182016040528015610fef578160200160208202803683370190505b5090506000805b89518110156110af576000611027858c848151811061101157fe5b602002602001015161148490919063ffffffff16565b90506110638b838151811061103857fe5b6020026020010151610b508c858151811061104f57fe5b60200260200101518e8681518110610e0557fe5b84838151811061106f57fe5b6020026020010181815250506110a4610d608286858151811061108e57fe5b60200260200101516114d290919063ffffffff16565b925050600101610ff6565b506060895167ffffffffffffffff811180156110ca57600080fd5b506040519080825280602002602001820160405280156110f4578160200160208202803683370190505b50905060005b8a518110156111cb57600084828151811061111157fe5b602002602001015184116111275750600061116f565b61116c61114686848151811061113957fe5b60200260200101516116c8565b610b5087858151811061115557fe5b6020026020010151876113f190919063ffffffff16565b90505b600061117b8a836114d2565b9050600061119761118b836116c8565b8e868151811061101157fe5b90506111a9818f8681518110610e0557fe5b8585815181106111b557fe5b60209081029190910101525050506001016110fa565b5060006111d88c83610901565b9050610ebf6111ef6111ea8389611484565b6116c8565b8a906114d2565b6000806112038888610901565b9050600061121982610b5687610b50818b6113f1565b90506000805b8951811015611241576112378a8281518110610b7a57fe5b915060010161121f565b5060006112508b8b858c61152c565b90506000611264828c8c81518110610e0557fe5b90506000611278848d8d81518110610be857fe5b90506000611285826116c8565b905060006112938a836114d2565b9050610c2e6112a1826116c8565b8590611458565b6000806112b78787878761152c565b90506000818786815181106112c857fe5b6020026020010151116112dc5760006112ec565b6112ec82888781518110610e0557fe5b9050610f69670de0b6b3a7640000610d2f8387611458565b6000806113118787610901565b905061132383878781518110610d1957fe5b86868151811061132f57fe5b60200260200101818152505060006113498888848861152c565b905061135b84888881518110610e0557fe5b87878151811061136757fe5b602002602001018181525050610f696001610eb2838a8981518110610e0557fe5b600082820161086384821015836116ee565b60008282026108638415806113b75750838583816113b457fe5b04145b60036116ee565b60006113cd82151560046116ee565b826113da57506000610866565b8160018403816113e657fe5b046001019050610866565b60006114018383111560016116ee565b50900390565b600061141682151560046116ee565b8261142357506000610866565b670de0b6b3a7640000838102906114469085838161143d57fe5b041460056116ee565b82818161144f57fe5b04915050610866565b60008282026114728415806113b75750838583816113b457fe5b670de0b6b3a764000090049392505050565b600061149382151560046116ee565b826114a057506000610866565b670de0b6b3a7640000838102906114ba9085838161143d57fe5b8260018203816114c657fe5b04600101915050610866565b60008282026114ec8415806113b75750838583816113b457fe5b806114fb576000915050610866565b670de0b6b3a76400007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82016114c6565b60008061153a86865161139a565b905060008560008151811061154b57fe5b60200260200101519050600061156987518860008151811061098257fe5b905060015b87518110156115b55761159a61159461158d848b858151811061098257fe5b8a5161139a565b88611700565b91506115ab88828151811061092157fe5b925060010161156e565b506115c5878681518110610bbd57fe5b915060006115dc6115d6888961139a565b856113be565b905061160882610b508a89815181106115f157fe5b6020026020010151846114d290919063ffffffff16565b905060006116206116198987611407565b8590611388565b90506000806116406116328b85611388565b610b50866109f88e806114d2565b905060005b60ff8110156116b8578192506116756116678c610eb2876109f887600261139a565b610b50876109f886806114d2565b91508282111561169a57600161168b83856113f1565b11611695576116b8565b6116b0565b60016116a684846113f1565b116116b0576116b8565b600101611645565b509b9a5050505050505050505050565b6000670de0b6b3a764000082106116e0576000610866565b50670de0b6b3a76400000390565b816116fc576116fc81611720565b5050565b600061170f82151560046116ee565b81838161171857fe5b049392505050565b7f08c379a0000000000000000000000000000000000000000000000000000000006000908152602060045260076024526642414c23000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fdfea2646970667358221220c7b900a0566d897d4c69c9d6605d89c42e28fd6443443b57ea8c79ae2eb0fe1064736f6c63430007010033";

type MockStableMathConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockStableMathConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockStableMath__factory extends ContractFactory {
  constructor(...args: MockStableMathConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockStableMath> {
    return super.deploy(overrides || {}) as Promise<MockStableMath>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MockStableMath {
    return super.attach(address) as MockStableMath;
  }
  connect(signer: Signer): MockStableMath__factory {
    return super.connect(signer) as MockStableMath__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockStableMathInterface {
    return new utils.Interface(_abi) as MockStableMathInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockStableMath {
    return new Contract(address, _abi, signerOrProvider) as MockStableMath;
  }
}