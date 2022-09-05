// get required contract artifacts by compiling
import timelockData from "../artifacts/contracts/features/Timelock.sol/Timelock.json";
import coreVotingData from "../artifacts/contracts/CoreVoting.sol/CoreVoting.json";
import { CoreVoting__factory } from "../typechain/factories/CoreVoting__factory";

import { ethers } from "ethers";
import { BytesLike } from "ethers";
import { LedgerSigner } from "@ethersproject/hardware-wallets";

// helper callhash function
export async function createCallHash(calldata: BytesLike[], targets: string[]) {
  const toBeHashed = ethers.utils.defaultAbiCoder.encode(
    ["address[]", "bytes[]"],
    [targets, calldata]
  );
  return ethers.utils.keccak256(toBeHashed);
}

async function proposal() {
  const provider = new ethers.providers.JsonRpcProvider("<redacted>");
  const signer = new LedgerSigner(provider, undefined, "m/44'/60'/3'/0/0");
  // const [signer] = await ethers.getSigners()
  const coreVotingAddress = "0xEaCD577C3F6c44C3ffA398baaD97aE12CDCFed4a"
  const timelockAddress = "0x81758f3361A769016eae4844072FA6d7f828a651"
  const gscCoreVotingAddress = "0x40309f197e7f94B555904DF0f788a3F48cF326aB"
  const FrozenLockingVaultProxy = "0x02Bd4A3b1b95b01F2Aa61655415A5d3EAAcaafdD"
  const FrozenVestingVaultProxy = "0x6De73946eab234F1EE61256F10067D713aF0e37A"
  const timelockInterface = new ethers.utils.Interface(timelockData.abi);
  const coreVotingInterface = new ethers.utils.Interface(coreVotingData.abi);
  const newMinGSCProposalPower = 3

  const coreVoting = CoreVoting__factory.connect(
    coreVotingAddress,
    signer
  );

  //setup calldata for votingVault's setTime function.
  const calldataTl = coreVotingInterface.encodeFunctionData("setDefaultQuorum", [newMinGSCProposalPower]);
  // get the callhash
  const callHash = await createCallHash(
    [calldataTl],//calldata
    [gscCoreVotingAddress]//target address (GSC core voting)
  );
  const calldataCv = timelockInterface.encodeFunctionData("registerCall", [
    callHash,
  ]);
  // the coreVoting contract registers the call with the timelock 
  const tx = await coreVoting.proposal(
    [FrozenLockingVaultProxy, FrozenVestingVaultProxy], 
    ["0x", "0x"],
    [timelockAddress], //timelock
    [calldataCv],
    15378000,
    0,
    // Gas Settings
    {
      maxFeePerGas: 110820118419,
      maxPriorityFeePerGas: 2,
      gasLimit: 5000000
    }
  );

  await tx.wait();

  // need these 2 values to execute from the timelock after lock duration
  console.log(calldataTl) // note the calldata for the timelock
  console.log(callHash) // note the callHash for the timelock
}

async function main() {
  const result = await proposal();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
