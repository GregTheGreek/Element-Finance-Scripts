import { ethers } from 'hardhat'

// Artifacts
import timelockData from '../../council/artifacts/contracts/features/Timelock.sol/Timelock.json'
import treasuryData from '../../council/artifacts/contracts/features/Treasury.sol/Treasury.json'
import coreVotingData from '../../council/artifacts/contracts/CoreVoting.sol/CoreVoting.json'
import airdropData from '../../council/artifacts/contracts/features/Airdrop.sol/Airdrop.json'

// Helpers
import * as addresses from '../helpers/addresses'
import { createCallHash } from '../helpers/hashing'
import { getExpiry } from '../helpers/expiry'

// local imports
import { hexRoot } from './egp5Proofs.json'

async function proposal() {
  // Setup your signer
  const [signer] = await ethers.getSigners()

  // Setup your interfaces
  const coreVotingInterface = new ethers.utils.Interface(coreVotingData.abi)
  const treasuryInterface = new ethers.utils.Interface(treasuryData.abi)
  const timelockInterface = new ethers.utils.Interface(timelockData.abi)

  // New Params
  const totalElfi = ethers.utils.parseEther('1000000') // 1m ELFI

  const expiration = new Date()
  expiration.setMonth(expiration.getMonth() + 6)

  // Connect the signer to the coreVotingContract, this is where your proposals will fed into.
  const coreVotingContract = new ethers.Contract(
    addresses.CoreVoting,
    coreVotingData.abi,
    signer
  )

  // --- main egp logic ---
  /**
   * Steps:
   * 1. Deploy airdrop contract
   * 2. Transfer `amountPastTerms` worth of ELFI to the `aidrop` contract.
   * 3. Transfer `amountFutureTerms` worth of ELFI to the `futureRewards` contract.
   */

  // Create calldata for the proposal
  // Note: This is the maint part of the proposal, it dictates what the dao will be modifying etc...
  const calldataAirdrop = treasuryInterface.encodeFunctionData('sendFunds', [
    addresses.ELFI,
    totalElfi,
    addresses.EGP5Airdrop,
  ])

  // Take the callData and convert it to the callhash
  // Param BytesLike[] - An arrary of encoded calldata
  // Param string[] - An array of addresses, index must match that from the first parameter
  const callHash = await createCallHash(
    [calldataAirdrop], // calldata
    [addresses.Treasury] // Both target treasury to move funds
  )

  // Encode proposal to be sent to the core voting contract
  const calldataCv = timelockInterface.encodeFunctionData('registerCall', [
    callHash,
  ])

  // Creates the expiery for the proposal
  const expiryDate = getExpiry(ethers.provider) // TODO change to something automatic.

  // The coreVoting contract registers the call with the timelock
  const tx = await coreVotingContract.proposal(
    [addresses.FrozenLockingVaultProxy, addresses.FrozenVestingVaultProxy], // Forzen vaults because all ELFI lives there
    ['0x', '0x'], // Extra data - typically 0x
    [addresses.Timelock], // You always call the timelock, the timelock is "sudo" it controls the DAO contracts.
    [calldataCv], // load in the call data
    expiryDate, // Last call for proposal
    0 // This is your vote. change if you please.
  )

  // --- end main EGP logic ---

  await tx.wait()

  // need these 2 values to execute from the timelock after lock duration
  console.log({
    calldataAirdrop,
    callHash,
    calldataCv,
  })
}

async function main() {
  const result = await proposal()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
