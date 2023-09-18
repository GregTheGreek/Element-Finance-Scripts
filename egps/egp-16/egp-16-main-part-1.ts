import { ethers, network } from 'hardhat'

// Artifacts
import corevotingData from '../../council/artifacts/contracts/CoreVoting.sol/CoreVoting.json'
import timelockData from '../../council/artifacts/contracts/features/Timelock.sol/Timelock.json'

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

  // Connect the signer to the coreVotingContract, this is where your proposals will feed into.
  const coreVoting = new ethers.Contract(
    CoreVoting,
    corevotingData.abi,
    signer
  )

  // --- main egp logic ---
  /**
   * Withdraw from 8 yearn positions 
   */

  const callData = [];
  const targets = [];

  for (let i in YEARN_WITHDRAWAL_TRANSACTIONS) {
    callData.push(YEARN_WITHDRAWAL_TRANSACTIONS[i].data)
    targets.push(YEARN_WITHDRAWAL_TRANSACTIONS[i].to)
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
  const tx = await coreVoting.proposal(
    [FrozenLockingVaultProxy, FrozenVestingVaultProxy], // Frozen vaults because all ELFI lives there
    ['0x'], // Extra data - typically 0x
    [addresses.Timelock], // You always call the timelock, the timelock is "sudo" it controls the DAO contracts.
    [calldataCv], // load in the call data
    expiryDate, // Last call for proposal
    0 // This is your vote. change if you please.
  )

  // --- end main EGP logic ---

  await tx.wait()

  console.log({
    callData,
    targets,
    callHash,
    calldataCv,
    proposal: tx.data,
  })
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