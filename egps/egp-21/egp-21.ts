import { ethers, network } from 'hardhat'

// Artifacts
import corevotingData from '../../council/artifacts/contracts/CoreVoting.sol/CoreVoting.json'
import timelockData from '../../council/artifacts/contracts/features/Timelock.sol/Timelock.json'
import proxyData from '../../council/artifacts/contracts/simpleProxy.sol/SimpleProxy.json'
import {
  FrozenLockingVaultProxy,
  FrozenVestingVaultProxy,
  CoreVoting,
} from '../helpers/addresses'
// import VAULT_ADDRESSES from './addresses-mainnet.json'

// Helpers
import * as addresses from '../helpers/addresses'
import { createCallHash } from '../helpers/hashing'
import { getExpiry } from '../helpers/expiry'

async function proposal() {
  // Set up wallet
  console.log(`network: ${network.name}`)
  const [deployer] = await ethers.getSigners()
  console.log(`currently using address ${deployer.address}`)

  // Setup your interfaces
  const timelockInterface = new ethers.utils.Interface(timelockData.abi) // TimeLock is like sudo, you always need it.
  const proxyInterface = new ethers.utils.Interface(proxyData.abi)

  // Connect the signer to the coreVotingContract, this is where your proposals will fed into.
  const coreVoting = new ethers.Contract(
    CoreVoting,
    corevotingData.abi,
    deployer
  )

  // --- main egp logic ---
  /**
   * 1. Upgrade the locking vault to the non-frozen contract address
   * 2. Upgrade the vesting vault to the non-frozen contract address
   */
  const lockingVaultUpgradeCalldata = proxyInterface.encodeFunctionData(
    'upgradeProxy',
    [VAULT_ADDRESSES.LockingVault]
  )
  const vestingVaultUpgradeCalldata = proxyInterface.encodeFunctionData(
    'upgradeProxy',
    [VAULT_ADDRESSES.VestingVault]
  )

  /**
   * Take the calldata and convert it to the callhash.
   * Param BytesLike[] - An arrary of encoded calldata
   * Param string[] - An array of addresses, index must match that from the first parameter
   * Notes:
   * - You can pass in as many "chained calls" as you like, just match the calldata to the addresses in the two parameters.
   */
  const callHash = await createCallHash(
    [lockingVaultUpgradeCalldata, vestingVaultUpgradeCalldata], // calldata
    [FrozenLockingVaultProxy, FrozenVestingVaultProxy] // each targets its respective proxy
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
   * Creates the expiery for the proposal, no need to modify.
   * Default: 14 days after the proposal begins (unit is block number)
   */
  const expiryDate = await getExpiry(deployer.provider!, 14)

  /**
   * The coreVoting contract registers the call with the timelock
   * - Supply all the vaults where you wish voting power to originate from.
   */
  const tx = await coreVoting.proposal(
    [FrozenLockingVaultProxy], // Forzen vaults because all ELFI lives there
    ['0x'], // Extra data - typically 0x
    [addresses.Timelock], // You always call the timelock, the timelock is "sudo" it controls the DAO contracts.
    [calldataCv], // load in the call data
    expiryDate, // Last call for proposal
    0 // This is your vote. change if you please.
  )

  // --- end main EGP logic ---

  await tx.wait()

  console.log({
    lockingVaultUpgradeCalldata,
    vestingVaultUpgradeCalldata,
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
