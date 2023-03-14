import { ethers } from 'hardhat'

// Artifacts
import timelockData from '../../council/artifacts/contracts/features/Timelock.sol/Timelock.json'
import treasuryData from '../../council/artifacts/contracts/features/Treasury.sol/Treasury.json'
import coreVotingData from '../../council/artifacts/contracts/CoreVoting.sol/CoreVoting.json'

// Helpers
import * as addresses from '../helpers/addresses'
import { createCallHash } from '../helpers/hashing'
import { getExpiry } from '../helpers/expiry'
import { AirdropReclaim__factory } from '../../typechain/factories'

async function proposal() {
  // Setup your signer
  const [deployer] = await ethers.getSigners()
  console.log(`current signer is ${deployer.address}`)

  // Deploy the AirdropReclaim contract
  console.log('deploying AirdropReclaim contract...')
  const factory = new AirdropReclaim__factory(deployer)
  let airdropReclaim = await factory.deploy()
  airdropReclaim = await airdropReclaim.deployed()
  console.log(`AirdropReclaim contract deployed to ${airdropReclaim.address}`)

  // Setup your interfaces
  const timelockInterface = new ethers.utils.Interface(timelockData.abi) // TimeLock is like sudo, you always need it.
  const elfi = await ethers.getContractAt('ELFI', addresses.ELFI)

  // Connect the signer to the coreVotingContract, this is where your proposals will fed into.
  const coreVoting = new ethers.Contract(addresses.CoreVoting, coreVotingData.abi, deployer)

  // --- main egp logic ---
  /**
   * Steps:
   * 1. Transfer ownership of ELFI contract to AirdropReclaim contract
   * 2. Call reclaim method on AirdropReclaim contract
   * 3. Reclaim method on AirdropReclaim contract transfers ownership back to Timelock
   */

  const transferOwnershipCalldata = elfi.interface.encodeFunctionData('setOwner', [airdropReclaim.address])
  const transferOwnershipTarget = elfi.address

  const reclaimCalldata = airdropReclaim.interface.encodeFunctionData('reclaim')
  const reclaimTarget = airdropReclaim.address

  /**
   * Take the calldata and convert it to the callhash.
   * Param BytesLike[] - An arrary of encoded calldata
   * Param string[] - An array of addresses, index must match that from the first parameter
   * Notes:
   * - You can pass in as many "chained calls" as you like, just match the calldata to the addresses in the two parameters.
   */
  const callHash = await createCallHash(
    [transferOwnershipCalldata, reclaimCalldata], // calldata
    [transferOwnershipTarget, reclaimTarget] // Both target treasury to move funds
  )

  /**
   * Encode proposal to be sent to the core voting contract
   * Notes:
   * - Simple add the multiple call hashes into the array.
   * - You can have multiple callHashes, if a proposal affects multiple different vaults or other DAO contracts.
   * - eg: Proposal updates a voting threshold, and moves funds from the treasury. This would be two callHashes.
   */
  const calldataCv = timelockInterface.encodeFunctionData('registerCall', [callHash])

  /**
   * Creates the expiery for the proposal, no need to modify.
   * Default: 7 days after the proposal begins (unit is block number)
   */
  const expiryDate = await getExpiry(ethers.provider)

  /**
   * The coreVoting contract registers the call with the timelock
   * - Supply all the vaults where you wish voting power to originate from.
   */
  const tx = await coreVoting.proposal(
    [addresses.FrozenLockingVaultProxy, addresses.FrozenVestingVaultProxy], // Forzen vaults because all ELFI lives there
    ['0x', '0x'], // Extra data - typically 0x
    [addresses.Timelock], // You always call the timelock, the timelock is "sudo" it controls the DAO contracts.
    [calldataCv], // load in the call data
    expiryDate, // Last call for proposal
    0 // This is your vote. change if you please.
  )

  // --- end main EGP logic ---

  await tx.wait()

  // need these 2 values to execute from the timelock after lock duration, please keep record of them.
  console.log({
    transferOwnershipCalldata,
    reclaimCalldata,
    calldataCv,
    callHash,
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
