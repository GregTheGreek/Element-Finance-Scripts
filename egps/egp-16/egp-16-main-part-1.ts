import { ethers, network } from 'hardhat'

// Artifacts
import corevotingData from '../../council/artifacts/contracts/CoreVoting.sol/CoreVoting.json'
import timelockData from '../../council/artifacts/contracts/features/Timelock.sol/Timelock.json'
import treasuryData from '../../council/artifacts/contracts/features/Treasury.sol/Treasury.json'

import {
  FrozenLockingVaultProxy,
  FrozenVestingVaultProxy,
  CoreVoting,
} from '../helpers/addresses'

import { YEARN_WITHDRAWAL_TRANSACTIONS } from './constants';

// Helpers
import * as addresses from '../helpers/addresses'
import { createCallHash } from '../helpers/hashing'
import { getExpiry } from '../helpers/expiry'

async function proposal() {
  // Setup your signer
  const [signer] = await ethers.getSigners()
  console.log(`current signer is ${signer.address}`)

  // Setup your interfaces
  const timelockInterface = new ethers.utils.Interface(timelockData.abi) // TimeLock is like sudo, you always need it.
  const coreVotingInterface = new ethers.utils.Interface(corevotingData.abi)
  const treasuryVotingInterface = new ethers.utils.Interface(treasuryData.abi)

  // --- main egp logic ---
  /**
   * Withdraw from 8 yearn positions 
   */

  const callData = [];
  const targets = [];

  for (let i in YEARN_WITHDRAWAL_TRANSACTIONS) {
    const treasuryCallData = treasuryVotingInterface.encodeFunctionData('genericCall', [
      YEARN_WITHDRAWAL_TRANSACTIONS[i].to,
      YEARN_WITHDRAWAL_TRANSACTIONS[i].data
    ]);

    callData.push(treasuryCallData)
    targets.push(addresses.Treasury)
  }


  /**
   * Take the calldata and convert it to the callhash.
   * Param BytesLike[] - An array of encoded calldata
   * Param string[] - An array of addresses, index must match that from the first parameter
   * Notes:
   * - You can pass in as many "chained calls" as you like, just match the calldata to the addresses in the two parameters.
   */
  const callHash = await createCallHash(
    callData,
    targets // each targets its respective proxy
  )

  /**
   * Encode proposal to be sent to the core voting contract
   * Notes:
   * - Simple add the multiple call hashes into the array.
   * - You can have multiple callHashes, if a proposal affects multiple different vaults or other DAO contracts.
   * - eg: Proposal updates a voting threshold, and moves funds from the treasury. This would be two callHashes.
   */
  const calldataCv = timelockInterface.encodeFunctionData('registerCall', [
    callHash,
  ])

  /**
   * Creates the expiry for the proposal, no need to modify.
   * Default: 14 days after the proposal begins (unit is block number)
   */
  const expiryDate = await getExpiry(signer.provider!, 14)

  /**
   * The coreVoting contract registers the call with the timelock
   * - Supply all the vaults where you wish voting power to originate from.
   */
  const callDataProposal = coreVotingInterface.encodeFunctionData('proposal', [
    [FrozenLockingVaultProxy, FrozenVestingVaultProxy], // Frozen vaults because all ELFI lives there
    ['0x', '0x'], // Extra data - typically 0x
    [addresses.Timelock], // You always call the timelock, the timelock is "sudo" it controls the DAO contracts.
    [calldataCv], // load in the call data
    expiryDate, // Last call for proposal
    0 // This is your vote. change if you please.
  ])

  const proposalTxEncoded = {
    to: CoreVoting,
    value: '0x00',
    data: callDataProposal
  };

  // need these values to execute from the timelock after lock duration, please keep record of them.\
  process.stdout.write(JSON.stringify(callData) + '\n');
  process.stdout.write(JSON.stringify(targets) + '\n');
  process.stdout.write(JSON.stringify(callHash) + '\n');
  process.stdout.write(JSON.stringify(calldataCv) + '\n');
  process.stdout.write(JSON.stringify(proposalTxEncoded));
}

async function main() {
  await proposal()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
