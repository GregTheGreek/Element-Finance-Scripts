import { BigNumber, BytesLike, ethers } from 'ethers'
import { LedgerSigner } from '@ethersproject/hardware-wallets'

// Artifacts
import timelockData from '../../artifacts/council/contracts/features/Timelock.sol/Timelock.json'
import treasuryData from '../../artifacts/council/contracts/features/Treasury.sol/Treasury.json'
import lockingVaultData from '../../artifacts/council/contracts/vaults/LockingVault.sol/LockingVault.json'
import { CoreVoting__factory } from '../../typechain/council/factories/CoreVoting__factory'

// Helpers
import * as addresses from '../helpers/addresses'
import { createCallHash } from '../helpers/hashing'
import { getExpiry } from '../helpers/expiry'

async function proposal() {
  // Setup your signer
  // Using a ledger, connect to metamask
  const providerUrl = ''
  const provider = new ethers.providers.JsonRpcProvider(providerUrl)
  const signer = new LedgerSigner(provider, undefined, "m/44'/60'/3'/0/0")

  // Setup your interfaces
  const timelockInterface = new ethers.utils.Interface(timelockData.abi) // TimeLock is like sudo, you always need it.
  const treasuryInterface = new ethers.utils.Interface(treasuryData.abi) // TimeLock is like sudo, you always need it.
  const lockingVaultInterface = new ethers.utils.Interface(lockingVaultData.abi)

  // New Params
  // @TODO - fill in.

  // Connect the signer to the coreVotingContract, this is where your proposals will fed into.
  const coreVoting = CoreVoting__factory.connect(addresses.CoreVoting, signer)

  // --- main egp logic ---
  /**
   * The Timelock contract has to call deposit() on the locking vault contract through the Treasury contract...
   * 1. Generate calldata for deposit() call on locking vault
   * 2. Generate calldata for genericCall() call on treasury
   * 3. Generate callhash for timelock
   */

  /** Generate calldata for locking vault deposit */
  const amount = ethers.utils.parseEther('54725.06')
  const lockingVaultCalldata = lockingVaultInterface.encodeFunctionData('deposit', [
    addresses.ComponentMultisig,
    amount,
    addresses.ComponentDelegate,
  ])

  /** Generate calldata for treasury genericcall */
  const callData = treasuryInterface.encodeFunctionData('genericCall', [
    addresses.FrozenLockingVaultProxy,
    lockingVaultCalldata,
  ])

  /**
   * Take the calldata and convert it to the callhash.
   * Param BytesLike[] - An arrary of encoded calldata
   * Param string[] - An array of addresses, index must match that from the first parameter
   * Notes:
   * - You can pass in as many "chained calls" as you like, just match the calldata to the addresses in the two parameters.
   */
  const callHash = await createCallHash(
    [callData], // calldata
    [addresses.Treasury] // Target treasury to move funds
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
   * Default: xxxx
   */
  const expiryBlockNumber = await getExpiry(provider)

  /**
   * The coreVoting contract registers the call with the timelock
   * - Supply all the vaults where you wish voting power to originate from.
   */
  const tx = await coreVoting.proposal(
    [addresses.FrozenLockingVaultProxy, addresses.FrozenVestingVaultProxy], // Forzen vaults because all ELFI lives there
    ['0x', '0x'], // Extra data - typically 0x
    [addresses.Timelock], // You always call the timelock, the timelock is "sudo" it controls the DAO contracts.
    [calldataCv], // load in the call data
    expiryBlockNumber, // Last call for proposal
    0, // This is your vote. change if you please.
    // Gas Settings - TODO modify
    {
      maxFeePerGas: 110820118419,
      maxPriorityFeePerGas: 2,
      gasLimit: 5000000,
    }
  )

  // --- end main EGP logic ---

  await tx.wait()

  // need these 2 values to execute from the timelock after lock duration, please keep record of them.
  console.log({
    callData,
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
