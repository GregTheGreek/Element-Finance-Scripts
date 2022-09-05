import { ethers } from "ethers";
import { LedgerSigner } from "@ethersproject/hardware-wallets";

// Artifacts
import timelockData from "../artifacts/contracts/features/Timelock.sol/Timelock.json";
import treasuryData from "../artifacts/contracts/features/Treasury.sol/Treasury.json";
import coreVotingData from "../artifacts/contracts/CoreVoting.sol/CoreVoting.json";
import { CoreVoting__factory } from "../typechain/factories/CoreVoting__factory";

// Helpers
import * as addresses from "./helpers/addresses";
import {createCallHash} from "./helpers/hashing";

async function proposal() {
  // Setup your signer
  // Using a ledger, connect to metamask
  const provider = new ethers.providers.JsonRpcProvider("<redacted>");
  const signer = new LedgerSigner(provider, undefined, "m/44'/60'/3'/0/0");
  
  // Setup your interfaces
  const coreVotingInterface = new ethers.utils.Interface(coreVotingData.abi);
  const treasuryInterface = new ethers.utils.Interface(treasuryData.abi);
  const timelockInterface = new ethers.utils.Interface(timelockData.abi);

  // New Params
  const amountPastTerms = 0; // amount of ELFI to be sent to the terms that have already expired (standard airdrop)
  const amountFutureTerms = 0; // amountn of ELFI to be sent to the terms that have not yet started (shushi contract)
  const airdropContractAddress = ""; // rewards contract for past terms
  const futureRewardsContractAddress = ""; // rewards contract for future terms

  // Connect the signer to the coreVotingContract, this is where your proposals will fed into.
  const coreVoting = CoreVoting__factory.connect(
    addresses.CoreVoting,
    signer
  );

  // --- main egp logic ---
  /**
   * Steps:
   * 1. Transfer `amountPastTerms` worth of ELFI to the `aidrop` contract.
   * 2. Transfer `amountFutureTerms` worth of ELFI to the `futureRewards` contract.
   */

  // Create calldata for the proposal
  // Note: This is the maint part of the proposal, it dictates what the dao will be modifying etc...
  const calldataAirdrop = treasuryInterface.encodeFunctionData("sendFunds", [addresses.ELFI, amountPastTerms, airdropContractAddress]);
  const calldatafutureRewards = treasuryInterface.encodeFunctionData("sendFunds", [addresses.ELFI, amountPastTerms, airdropContractAddress]);

  // Take the callData and convert it to the callhash
  // Param BytesLike[] - An arrary of encoded calldata
  // Param string[] - An array of addresses, index must match that from the first parameter
  const callHash = await createCallHash(
    [calldataAirdrop, calldatafutureRewards], // calldata
    [addresses.Treasury, addresses.Treasury] // Both target treasury to move funds
  );

  // Encode proposal to be sent to the core voting contract
  const calldataCv = timelockInterface.encodeFunctionData("registerCall", [
    callHash,
  ]);

  // Creates the expiery for the proposal
  const expiryDate = 15378000; // TODO change to something automatic.

  // The coreVoting contract registers the call with the timelock
  const tx = await coreVoting.proposal(
    [addresses.FrozenLockingVaultProxy, addresses.FrozenVestingVaultProxy], 
    ["0x", "0x"],
    [addresses.Timelock], //timelock
    [calldataCv],
    expiryDate,
    0,
    // Gas Settings - TODO modify
    {
      maxFeePerGas: 110820118419,
      maxPriorityFeePerGas: 2,
      gasLimit: 5000000
    }
  );

  // --- end main EGP logic ---

  await tx.wait();

  // need these 2 values to execute from the timelock after lock duration
  console.log({
    calldataAirdrop, 
    calldatafutureRewards,
    callHash
  });
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
