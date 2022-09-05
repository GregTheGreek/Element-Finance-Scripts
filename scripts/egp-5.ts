import { ethers } from "ethers";
import { BytesLike } from "ethers";
import { LedgerSigner } from "@ethersproject/hardware-wallets";

// Artifacts
import timelockData from "../../artifacts/contracts/features/Timelock.sol/Timelock.json";
import coreVotingData from "../../artifacts/contracts/CoreVoting.sol/CoreVoting.json";
import { CoreVoting__factory } from "../../typechain/factories/CoreVoting__factory";

// Helpers
import * as addresses from "./helpers/addresses";
import {createCallHash} from "./helpers/hashing";

async function proposal() {
  const provider = new ethers.providers.JsonRpcProvider("<redacted>");
  const signer = new LedgerSigner(provider, undefined, "m/44'/60'/3'/0/0");
  
  // OLD EGP-2
  const timelockInterface = new ethers.utils.Interface(timelockData.abi);
  const coreVotingInterface = new ethers.utils.Interface(coreVotingData.abi);

  // New Params
  const amountPastTerms = 0; // amount of ELFI to be sent to the terms that have already expired (standard airdrop)
  const amountFutureTerms = 0; // amountn of ELFI to be sent to the terms that have not yet started (shushi contract)

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
