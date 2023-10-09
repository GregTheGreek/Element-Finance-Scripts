import { ethers } from 'hardhat'

// Artifacts
import timelockData from '../../council/artifacts/contracts/features/Timelock.sol/Timelock.json'
import coreVotingData from '../../council/artifacts/contracts/CoreVoting.sol/CoreVoting.json'

// constants
import { GSC_CALL_DATA, GSC_TREASURY_ADDRESS } from './constants';

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
  const coreVotingInterface = new ethers.utils.Interface(coreVotingData.abi)

  // --- main egp logic ---
  /**
   * Withdraws 17 balancer pool positions, redeems the PT then transfers to the main treasury
   */

  /**
   * Take the calldata and convert it to the callhash.
   * Param BytesLike[] - An arrary of encoded calldata
   * Param string[] - An array of addresses, index must match that from the first parameter
   * Notes:
   * - You can pass in as many "chained calls" as you like, just match the calldata to the addresses in the two parameters.
   */

  const callHash = await createCallHash(
    [GSC_CALL_DATA], // It is a multisend call through the gnosis safe treasury
    [GSC_TREASURY_ADDRESS] // Gnosis safe, GSC core voting is an owner of it
  )

  /**
   * Encode proposal to be sent to the core voting contract
   * Notes:
   * - Simply add the multiple call hashes into the array.
   * - You can have multiple callHashes, if a proposal affects multiple different vaults or other DAO contracts.
   * - eg: Proposal updates a voting threshold, and moves funds from the treasury. This would be two callHashes.
   */
  const calldataCv = timelockInterface.encodeFunctionData('registerCall', [
    callHash,
  ])

  /**
   * Creates the expiery for the proposal, no need to modify.
   * Default: 7 days after the proposal begins (unit is block number)
   */
  const expiryDate = await getExpiry(ethers.provider)

  /**
   * The coreVoting contract registers the call with the timelock
   * - Supply all the vaults where you wish voting power to originate from.
   */
  const callDataProposal = coreVotingInterface.encodeFunctionData('proposal', [
    [addresses.GSCVault],
    ['0x'],
    [addresses.Timelock],
    [calldataCv],
    expiryDate,
    0
  ])

  const proposalTxEncoded = {
    to: addresses.GSCCoreVoting,
    value: '0x00',
    data: callDataProposal
  };

  // need these values to execute from the timelock after lock duration, please keep record of them.
  console.log({
    GSC_CALL_DATA,
    calldataCv,
    callHash,
    proposalTxEncoded
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
