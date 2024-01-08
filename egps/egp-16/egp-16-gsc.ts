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
   * Creates the expiery for the proposal, no need to modify.
   * Default: 7 days after the proposal begins (unit is block number)
   */
  const expiryDate = await getExpiry(ethers.provider)

  for (let i in GSC_CALL_DATA) {
    /**
     * The coreVoting contract registers the call with the timelock
     * - Supply all the vaults where you wish voting power to originate from.
     */

    const callDataProposal = coreVotingInterface.encodeFunctionData('proposal', [
      [addresses.GSCVault],
      ['0x'],
      [GSC_TREASURY_ADDRESS],
      [GSC_CALL_DATA[i]],
      expiryDate,
      0
    ])

    const proposalTxEncoded = {
      to: addresses.GSCCoreVoting,
      value: '0x00',
      data: callDataProposal
    };

    // need these values to execute from the timelock after lock duration, please keep record of them.\
    process.stdout.write(`transaction number: ${i}` + '\n');
    process.stdout.write(GSC_CALL_DATA[i] + '\n');
    process.stdout.write(JSON.stringify(proposalTxEncoded) + '\n');
  }
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
