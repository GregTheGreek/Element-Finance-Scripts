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
import type {
  WrappedCoveredPrincipalTokenFactory,
  WrappedCoveredPrincipalTokenFactoryInterface,
} from "../WrappedCoveredPrincipalTokenFactory";

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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_baseToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_wcPrincipalToken",
        type: "address",
      },
    ],
    name: "WrappedCoveredPrincipalTokenCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "allWrappedCoveredPrincipalTokens",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_baseToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "create",
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

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516132d53803806132d583398101604081905261002f9161004a565b60609190911b6001600160601b03191660805260a052610082565b6000806040838503121561005c578182fd5b82516001600160a01b0381168114610072578283fd5b6020939093015192949293505050565b60805160601c60a05161322d6100a8600039600060d90152600060b8015261322d6000f3fe60806040523480156200001157600080fd5b50600436106200003a5760003560e01c806313a030d1146200003f5780633e68680a1462000061575b600080fd5b6200004962000087565b604051620000589190620003d9565b60405180910390f35b62000078620000723660046200034a565b6200009a565b60405162000058919062000381565b6060620000956000620001b3565b905090565b6000620000a782620001cb565b620000b283620001cb565b600083837f00000000000000000000000000000000000000000000000000000000000000007f0000000000000000000000000000000000000000000000000000000000000000604051620001069062000317565b620001159493929190620003a2565b604051809103906000f08015801562000132573d6000803e3d6000fd5b5090506200014260008262000227565b508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f5108c1888a39d89152f0f7d4ba229eb4e8f850c9ec999020384b72cd4764a7ec83604051620001a2919062000381565b60405180910390a390505b92915050565b60606000620001c28362000252565b9150505b919050565b73ffffffffffffffffffffffffffffffffffffffff811662000224576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200021b9062000435565b60405180910390fd5b50565b60006200024b8373ffffffffffffffffffffffffffffffffffffffff8416620002b0565b9392505050565b606081600001805480602002602001604051908101604052809291908181526020018280548015620002a457602002820191906000526020600020905b8154815260200190600101908083116200028f575b50505050509050919050565b6000620002be8383620002ff565b620002f657508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155620001ad565b506000620001ad565b60009081526001919091016020526040902054151590565b612d8b806200046d83390190565b803573ffffffffffffffffffffffffffffffffffffffff81168114620001c657600080fd5b600080604083850312156200035d578182fd5b620003688362000325565b9150620003786020840162000325565b90509250929050565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b73ffffffffffffffffffffffffffffffffffffffff9485168152928416602084015292166040820152606081019190915260800190565b6020808252825182820181905260009190848201906040850190845b818110156200042957835173ffffffffffffffffffffffffffffffffffffffff1683529284019291840191600101620003f5565b50909695505050505050565b60208082526011908201527f574650463a5a45524f5f4144445245535300000000000000000000000000000060408201526060019056fe60e06040523480156200001157600080fd5b5060405162002d8b38038062002d8b83398101604081905262000034916200050f565b620000b7846001600160a01b03166395d89b416040518163ffffffff1660e01b815260040160006040518083038186803b1580156200007257600080fd5b505afa15801562000087573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052620000b1919081019062000560565b620002d9565b6200013a856001600160a01b03166395d89b416040518163ffffffff1660e01b815260040160006040518083038186803b158015620000f557600080fd5b505afa1580156200010a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405262000134919081019062000560565b62000305565b81516200014f90600090602085019062000451565b5080516200016590600190602084019062000451565b506002805460ff1916601217905560036020526000197f3617319a054d772f909f7c479a2cebe5066e836a939412e32403c99029b92eff8190553060009081526040902055620001b46200031a565b7f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f6000604051620001e691906200060e565b60408051918290038220828201825260018352603160f81b60209384015290516200023993927fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc69146913091016200072a565b60408051601f19818403018152919052805160209091012060065550506001600160601b0319606085811b821660805283901b1660a05260c08190526200028e6941444d494e5f524f4c4560b01b846200031c565b620002a76941444d494e5f524f4c4560b01b806200032c565b620002cf6b5245434c41494d5f524f4c4560a01b6941444d494e5f524f4c4560b01b6200032c565b50505050620007e8565b606081604051602001620002ee9190620006b3565b60405160208183030381529060405290505b919050565b606081604051602001620002ee9190620006ff565b565b62000328828262000381565b5050565b600062000339836200040d565b600084815260086020526040808220600101859055519192508391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b6200038d828262000422565b620003285760008281526008602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620003c96200044d565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60009081526008602052604090206001015490565b60009182526008602090815260408084206001600160a01b0393909316845291905290205460ff1690565b3390565b8280546200045f9062000795565b90600052602060002090601f016020900481019282620004835760008555620004ce565b82601f106200049e57805160ff1916838001178555620004ce565b82800160010185558215620004ce579182015b82811115620004ce578251825591602001919060010190620004b1565b50620004dc929150620004e0565b5090565b5b80821115620004dc5760008155600101620004e1565b80516001600160a01b03811681146200030057600080fd5b6000806000806080858703121562000525578384fd5b6200053085620004f7565b93506200054060208601620004f7565b92506200055060408601620004f7565b6060959095015193969295505050565b60006020828403121562000572578081fd5b81516001600160401b038082111562000589578283fd5b818401915084601f8301126200059d578283fd5b815181811115620005b257620005b2620007d2565b604051601f8201601f191681016020018381118282101715620005d957620005d9620007d2565b604052818152838201602001871015620005f1578485fd5b6200060482602083016020870162000762565b9695505050505050565b81546000908190600281046001808316806200062b57607f831692505b60208084108214156200064c57634e487b7160e01b87526022600452602487fd5b8180156200066357600181146200067557620006a5565b60ff19861689528489019650620006a5565b620006808a62000756565b885b868110156200069d5781548b82015290850190830162000682565b505084890196505b509498975050505050505050565b60006615dc985c1c195960ca1b82528251620006d781600785016020870162000762565b7010dbdd995c995908141c9a5b98da5c185b607a1b6007939091019283015250601801919050565b6000605760f81b825282516200071d81600185016020870162000762565b9190910160010192915050565b9485526020850193909352604084019190915260608301526001600160a01b0316608082015260a00190565b60009081526020902090565b60005b838110156200077f57818101518382015260200162000765565b838111156200078f576000848401525b50505050565b600281046001821680620007aa57607f821691505b60208210811415620007cc57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b60805160601c60a05160601c60c05161256662000825600039600061105c015260006110380152600081816109b40152610c8901526125666000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c806375b238fc116100f9578063c55dae6311610097578063d87ba12b11610071578063d87ba12b1461037a578063dd62ed3e1461038d578063f0508a49146103a0578063f8970f88146103a8576101c4565b8063c55dae631461033f578063d505accf14610354578063d547741f14610367576101c4565b806391d14854116100d357806391d148541461030957806395d89b411461031c578063a217fddf14610324578063a9059cbb1461032c576101c4565b806375b238fc146102db5780637ecebe00146102e35780638218f76c146102f6576101c4565b806330adf81f1161016657806336568abe1161014057806336568abe1461028f57806340ab841e146102a25780634b19b20a146102b557806370a08231146102c8576101c4565b806330adf81f1461026a578063313ce567146102725780633644e51514610287576101c4565b806318160ddd116101a257806318160ddd1461021a57806323b872dd1461022f578063248a9ca3146102425780632f2ff15d14610255576101c4565b806301ffc9a7146101c957806306fdde03146101f2578063095ea7b314610207575b600080fd5b6101dc6101d7366004611a16565b6103bd565b6040516101e99190611e4b565b60405180910390f35b6101fa61041b565b6040516101e99190611eb1565b6101dc61021536600461198f565b6104a9565b610222610514565b6040516101e99190611e56565b6101dc61023d3660046118df565b61051a565b6102226102503660046119da565b61068b565b6102686102633660046119f2565b6106a0565b005b6102226106c9565b61027a6106ed565b6040516101e9919061227c565b6102226106f6565b61026861029d3660046119f2565b6106fc565b6102686102b0366004611b75565b610742565b6102686102c3366004611b34565b6107de565b6102226102d636600461188b565b610913565b610222610925565b6102226102f136600461188b565b610949565b6101dc61030436600461188b565b61095b565b6101dc6103173660046119f2565b610968565b6101fa610993565b6102226109a0565b6101dc61033a36600461198f565b6109a5565b6103476109b2565b6040516101e99190611d6c565b61026861036236600461191f565b6109d6565b6102686103753660046119f2565b610c14565b61026861038836600461188b565b610c33565b61022261039b3660046118a7565b610d90565b610222610dad565b6103b0610dd1565b6040516101e99190611dfe565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b000000000000000000000000000000000000000000000000000000001480610413575061041382610de2565b90505b919050565b600080546104289061246b565b80601f01602080910402602001604051908101604052809291908181526020018280546104549061246b565b80156104a15780601f10610476576101008083540402835291602001916104a1565b820191906000526020600020905b81548152906001019060200180831161048457829003601f168201915b505050505081565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92590610502908690611e56565b60405180910390a35060015b92915050565b60075481565b6001600160a01b0383166000908152600360205260408120548281101561055c5760405162461bcd60e51b815260040161055390612154565b60405180910390fd5b6001600160a01b03851633146105ea576001600160a01b038516600090815260046020908152604080832033845290915290205460001981146105e857838110156105b95760405162461bcd60e51b815260040161055390611f19565b6105c38482612411565b6001600160a01b03871660009081526004602090815260408083203384529091529020555b505b6105f48382612411565b6001600160a01b03808716600090815260036020526040808220939093559086168152205461062490849061228a565b6001600160a01b0380861660008181526003602052604090819020939093559151908716907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610676908790611e56565b60405180910390a360019150505b9392505050565b60009081526008602052604090206001015490565b6106a98261068b565b6106ba816106b5610e2c565b610e30565b6106c48383610e94565b505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b60025460ff1681565b60065481565b610704610e2c565b6001600160a01b0316816001600160a01b0316146107345760405162461bcd60e51b81526004016105539061221f565b61073e8282610f39565b5050565b61074b8261095b565b6107675760405162461bcd60e51b8152600401610553906120e6565b60006107738385610fdc565b905061078d8161078836859003850185611a72565b6110a3565b4284106107ac5760405162461bcd60e51b815260040161055390612078565b6107cd33306107bb8885611139565b6001600160a01b0385169291906111d4565b6107d7338661125f565b5050505050565b7f5245434c41494d5f524f4c45000000000000000000000000000000000000000061080b816106b5610e2c565b6108148361095b565b6108305760405162461bcd60e51b8152600401610553906120e6565b600061083c8486610fdc565b90506000816001600160a01b03166370a08231306040518263ffffffff1660e01b815260040161086c9190611d6c565b60206040518083038186803b15801561088457600080fd5b505afa158015610898573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108bc9190611b1c565b90506108d26001600160a01b0383168583611300565b7fcab347be18c8c37ef504626a027a12ea6725f491b5f5b154778d8d0c54f7841e8282604051610903929190611de5565b60405180910390a1505050505050565b60036020526000908152604090205481565b7f41444d494e5f524f4c450000000000000000000000000000000000000000000081565b60056020526000908152604090205481565b600061041360098361131f565b60009182526008602090815260408084206001600160a01b0393909316845291905290205460ff1690565b600180546104289061246b565b600081565b600061068433848461051a565b7f000000000000000000000000000000000000000000000000000000000000000081565b6006546001600160a01b0388166000908152600560209081526040808320549051929392610a2f927f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9928d928d928d92918d9101611e5f565b60405160208183030381529060405280519060200120604051602001610a56929190611cb5565b60408051601f19818403018152919052805160209091012090506001600160a01b038816610a965760405162461bcd60e51b81526004016105539061200a565b60018185858560405160008152602001604052604051610ab99493929190611e93565b6020604051602081039080840390855afa158015610adb573d6000803e3d6000fd5b505050602060405103516001600160a01b0316886001600160a01b031614610b155760405162461bcd60e51b815260040161055390612041565b841580610b225750844211155b610b3e5760405162461bcd60e51b8152600401610553906120af565b7f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0821115610b7e5760405162461bcd60e51b815260040161055390611f50565b6001600160a01b0388166000908152600560205260408120805491610ba2836124bf565b90915550506001600160a01b038089166000818152600460209081526040808320948c168084529490915290819020899055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92590610c02908a90611e56565b60405180910390a35050505050505050565b610c1d8261068b565b610c29816106b5610e2c565b6106c48383610f39565b80610c3d8161095b565b15610c5a5760405162461bcd60e51b81526004016105539061218b565b7f41444d494e5f524f4c4500000000000000000000000000000000000000000000610c87816106b5610e2c565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316836001600160a01b031663fc0c546a6040518163ffffffff1660e01b815260040160206040518083038186803b158015610cea57600080fd5b505afa158015610cfe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d229190611a56565b6001600160a01b031614610d485760405162461bcd60e51b8152600401610553906120e6565b610d53600984611334565b507f77c9be2ad93337cc51a90c1dd929d83d0ec1c5353be1ef8b6b24ebd7d9524de883604051610d839190611d6c565b60405180910390a1505050565b600460209081526000928352604080842090915290825290205481565b7f5245434c41494d5f524f4c45000000000000000000000000000000000000000081565b6060610ddd6009611349565b905090565b7fffffffff0000000000000000000000000000000000000000000000000000000081167f01ffc9a70000000000000000000000000000000000000000000000000000000014919050565b3390565b610e3a8282610968565b61073e57610e52816001600160a01b03166014611356565b610e5d836020611356565b604051602001610e6e929190611ceb565b60408051601f198184030181529082905262461bcd60e51b825261055391600401611eb1565b610e9e8282610968565b61073e5760008281526008602090815260408083206001600160a01b0385168452909152902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055610ef5610e2c565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610f438282610968565b1561073e5760008281526008602090815260408083206001600160a01b0385168452909152902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055610f98610e2c565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b6000808383604051602001610ff2929190611c00565b60408051601f198184030181529082905280516020918201209250600091611082917fff00000000000000000000000000000000000000000000000000000000000000917f00000000000000000000000000000000000000000000000000000000000000009186917f00000000000000000000000000000000000000000000000000000000000000009101611c35565b60408051808303601f19018152919052805160209091012095945050505050565b80516001600160a01b03161561073e57816001600160a01b031663d505accf33836000015184602001518560400151866060015187608001518860a001516040518863ffffffff1660e01b81526004016111039796959493929190611da4565b600060405180830381600087803b15801561111d57600080fd5b505af1158015611131573d6000803e3d6000fd5b505050505050565b6000670de0b6b3a7640000826001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561117d57600080fd5b505afa158015611191573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111b59190611be4565b6111c090600a612321565b6111ca90856123f2565b61068491906122a2565b611259846323b872dd60e01b8585856040516024016111f593929190611d80565b60408051601f198184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611612565b50505050565b6001600160a01b03821660009081526003602052604090205461128390829061228a565b6001600160a01b038316600090815260036020526040812091909155600780548392906112b190849061228a565b90915550506040516001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906112f4908590611e56565b60405180910390a35050565b6106c48363a9059cbb60e01b84846040516024016111f5929190611de5565b6000610684836001600160a01b0384166116a1565b6000610684836001600160a01b0384166116b9565b6060600061068483611703565b606060006113658360026123f2565b61137090600261228a565b67ffffffffffffffff8111156113af577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156113d9576020820181803683370190505b5090507f300000000000000000000000000000000000000000000000000000000000000081600081518110611437577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106114c1577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060006114fd8460026123f2565b61150890600161228a565b90505b60018111156115f3577f303132333435363738396162636465660000000000000000000000000000000085600f1660108110611570577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b1a60f81b8282815181106115ad577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060049490941c936115ec81612454565b905061150b565b5083156106845760405162461bcd60e51b815260040161055390611ee4565b6000611667826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b031661175f9092919063ffffffff16565b8051909150156106c4578080602001905181019061168591906119ba565b6106c45760405162461bcd60e51b8152600401610553906121c2565b60009081526001919091016020526040902054151590565b60006116c583836116a1565b6116fb5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561050e565b50600061050e565b60608160000180548060200260200160405190810160405280929190818152602001828054801561175357602002820191906000526020600020905b81548152602001906001019080831161173f575b50505050509050919050565b606061176e8484600085611776565b949350505050565b6060824710156117985760405162461bcd60e51b815260040161055390611fad565b6117a185611836565b6117bd5760405162461bcd60e51b81526004016105539061211d565b600080866001600160a01b031685876040516117d99190611c99565b60006040518083038185875af1925050503d8060008114611816576040519150601f19603f3d011682016040523d82523d6000602084013e61181b565b606091505b509150915061182b82828661183c565b979650505050505050565b3b151590565b6060831561184b575081610684565b82511561185b5782518084602001fd5b8160405162461bcd60e51b81526004016105539190611eb1565b803561041681612509565b803561041681612521565b60006020828403121561189c578081fd5b813561068481612509565b600080604083850312156118b9578081fd5b82356118c481612509565b915060208301356118d481612509565b809150509250929050565b6000806000606084860312156118f3578081fd5b83356118fe81612509565b9250602084013561190e81612509565b929592945050506040919091013590565b600080600080600080600060e0888a031215611939578283fd5b873561194481612509565b9650602088013561195481612509565b95506040880135945060608801359350608088013561197281612521565b9699959850939692959460a0840135945060c09093013592915050565b600080604083850312156119a1578182fd5b82356119ac81612509565b946020939093013593505050565b6000602082840312156119cb578081fd5b81518015158114610684578182fd5b6000602082840312156119eb578081fd5b5035919050565b60008060408385031215611a04578182fd5b8235915060208301356118d481612509565b600060208284031215611a27578081fd5b81357fffffffff0000000000000000000000000000000000000000000000000000000081168114610684578182fd5b600060208284031215611a67578081fd5b815161068481612509565b600060c08284031215611a83578081fd5b60405160c0810181811067ffffffffffffffff82111715611acb577f4e487b710000000000000000000000000000000000000000000000000000000083526041600452602483fd5b604052611ad783611875565b81526020830135602082015260408301356040820152611af960608401611880565b60608201526080830135608082015260a083013560a08201528091505092915050565b600060208284031215611b2d578081fd5b5051919050565b600080600060608486031215611b48578081fd5b833592506020840135611b5a81612509565b91506040840135611b6a81612509565b809150509250925092565b600080600080848603610120811215611b8c578283fd5b85359450602086013593506040860135611ba581612509565b925060c07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa082011215611bd6578182fd5b509295919450926060019150565b600060208284031215611bf5578081fd5b815161068481612521565b60609290921b7fffffffffffffffffffffffffffffffffffffffff000000000000000000000000168252601482015260340190565b7fff0000000000000000000000000000000000000000000000000000000000000094909416845260609290921b7fffffffffffffffffffffffffffffffffffffffff0000000000000000000000001660018401526015830152603582015260550190565b60008251611cab818460208701612428565b9190910192915050565b7f190100000000000000000000000000000000000000000000000000000000000081526002810192909252602282015260420190565b60007f416363657373436f6e74726f6c3a206163636f756e742000000000000000000082528351611d23816017850160208801612428565b7f206973206d697373696e6720726f6c65200000000000000000000000000000006017918401918201528351611d60816028840160208801612428565b01602801949350505050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6001600160a01b0397881681529590961660208601526040850193909352606084019190915260ff16608083015260a082015260c081019190915260e00190565b6001600160a01b03929092168252602082015260400190565b6020808252825182820181905260009190848201906040850190845b81811015611e3f5783516001600160a01b031683529284019291840191600101611e1a565b50909695505050505050565b901515815260200190565b90815260200190565b9586526001600160a01b0394851660208701529290931660408501526060840152608083019190915260a082015260c00190565b93845260ff9290921660208401526040830152606082015260800190565b6000602082528251806020840152611ed0816040850160208701612428565b601f01601f19169190910160400192915050565b6020808252818101527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604082015260600190565b6020808252601d908201527f45524332303a20696e73756666696369656e742d616c6c6f77616e6365000000604082015260600190565b60208082526022908201527f45524332303a20696e76616c6964207369676e6174757265202773272076616c60408201527f7565000000000000000000000000000000000000000000000000000000000000606082015260800190565b60208082526026908201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60408201527f722063616c6c0000000000000000000000000000000000000000000000000000606082015260800190565b60208082526018908201527f45524332303a20696e76616c69642d616464726573732d300000000000000000604082015260600190565b60208082526015908201527f45524332303a20696e76616c69642d7065726d69740000000000000000000000604082015260600190565b60208082526018908201527f5746503a504f534954494f4e5f4e4f545f455850495245440000000000000000604082015260600190565b60208082526015908201527f45524332303a207065726d69742d657870697265640000000000000000000000604082015260600190565b6020808252600e908201527f5746503a494e56414c49445f5750000000000000000000000000000000000000604082015260600190565b6020808252601d908201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604082015260600190565b6020808252601b908201527f45524332303a20696e73756666696369656e742d62616c616e63650000000000604082015260600190565b60208082526012908201527f5746503a414c52454144595f4558495354530000000000000000000000000000604082015260600190565b6020808252602a908201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60408201527f6f74207375636365656400000000000000000000000000000000000000000000606082015260800190565b6020808252602f908201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560408201527f20726f6c657320666f722073656c660000000000000000000000000000000000606082015260800190565b60ff91909116815260200190565b6000821982111561229d5761229d6124da565b500190565b6000826122d6577f4e487b710000000000000000000000000000000000000000000000000000000081526012600452602481fd5b500490565b80825b60018086116122ed5750612318565b8187048211156122ff576122ff6124da565b8086161561230c57918102915b9490941c9380026122de565b94509492505050565b600061068460001960ff85168460008261233d57506001610684565b8161234a57506000610684565b8160018114612360576002811461236a57612397565b6001915050610684565b60ff84111561237b5761237b6124da565b6001841b915084821115612391576123916124da565b50610684565b5060208310610133831016604e8410600b84101617156123ca575081810a838111156123c5576123c56124da565b610684565b6123d784848460016122db565b8086048211156123e9576123e96124da565b02949350505050565b600081600019048311821515161561240c5761240c6124da565b500290565b600082821015612423576124236124da565b500390565b60005b8381101561244357818101518382015260200161242b565b838111156112595750506000910152565b600081612463576124636124da565b506000190190565b60028104600182168061247f57607f821691505b602082108114156124b9577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b60006000198214156124d3576124d36124da565b5060010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6001600160a01b038116811461251e57600080fd5b50565b60ff8116811461251e57600080fdfea264697066735822122014245c05f4c4465d3319dff34c64b91dbd12bc54f023e96ecdfccfba0eb985ba64736f6c63430008000033a264697066735822122082745717804c03f4871e8be361498fa36a640d03a52831f61b2f6b668715048c64736f6c63430008000033";

type WrappedCoveredPrincipalTokenFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WrappedCoveredPrincipalTokenFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WrappedCoveredPrincipalTokenFactory__factory extends ContractFactory {
  constructor(...args: WrappedCoveredPrincipalTokenFactoryConstructorParams) {
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
  ): Promise<WrappedCoveredPrincipalTokenFactory> {
    return super.deploy(
      __trancheFactory,
      __trancheBytecodeHash,
      overrides || {}
    ) as Promise<WrappedCoveredPrincipalTokenFactory>;
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
  attach(address: string): WrappedCoveredPrincipalTokenFactory {
    return super.attach(address) as WrappedCoveredPrincipalTokenFactory;
  }
  connect(signer: Signer): WrappedCoveredPrincipalTokenFactory__factory {
    return super.connect(
      signer
    ) as WrappedCoveredPrincipalTokenFactory__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WrappedCoveredPrincipalTokenFactoryInterface {
    return new utils.Interface(
      _abi
    ) as WrappedCoveredPrincipalTokenFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WrappedCoveredPrincipalTokenFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as WrappedCoveredPrincipalTokenFactory;
  }
}
