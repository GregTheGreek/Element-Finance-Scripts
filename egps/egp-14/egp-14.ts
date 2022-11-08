import { BytesLike, ethers } from "ethers";
import { LedgerSigner } from "@ethersproject/hardware-wallets";

// Artifacts
import timelockData from "../../artifacts/council/contracts/features/Timelock.sol/Timelock.json";
import treasuryData from "../../artifacts/council/contracts/features/Treasury.sol/Treasury.json";
import yVaultAssetProxyData from "../../artifacts/elf-contracts/contracts/YVaultAssetProxy.sol/YVaultAssetProxy.json";
import { CoreVoting__factory } from "../../typechain/council/factories/CoreVoting__factory";
import { YVaultAssetProxy__factory } from "../../typechain/elf-contracts/factories/YVaultAssetProxy__factory";

// Helpers
import * as addresses from "../helpers/addresses";
import { createCallHash } from "../helpers/hashing";

async function proposal() {
  // Setup your signer
  // Using a ledger, connect to metamask
  const providerUrl = "";
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const signer = new LedgerSigner(provider, undefined, "m/44'/60'/3'/0/0");

  // Setup your interfaces
  const timelockInterface = new ethers.utils.Interface(timelockData.abi); // TimeLock is like sudo, you always need it.
  const treasuryInterface = new ethers.utils.Interface(treasuryData.abi); // TimeLock is like sudo, you always need it.
  const yVaultAssetProxyInterface = new ethers.utils.Interface(
    yVaultAssetProxyData.abi
  );

  // Connect the signer to the coreVotingContract, this is where your proposals will fed into.
  const coreVoting = CoreVoting__factory.connect(addresses.CoreVoting, signer);

  // --- main egp logic ---

  /**
   * To have the contract deployed in the paused state and end up with correct permissioning, a couple steps need to be taken
   * 1. Deploy with owner & pauser as current signer
   * 2. Pause the contract
   * 3. Authorize the timelock as a pauser
   * 4. Deauthorize current signer (self)
   * 5. Transfer ownership to the timelock
   * ------- Proposal Passes ------
   * 6. Timelock unpauses contract
   */

  /**
   * Deploy the asset proxy contract
   * Used https://etherscan.io/address/0xcd62f09681dcbb9fbc5ba8054b52f414cb28960a for reference on constructor args.
   */
  const vault_ = addresses.YearnVaultBBAUSD;
  const _token = addresses.TokenBBAUSD;
  const _name = "element yvbb-a-usd";
  const _symbol = "yvbb-a-usd";
  const _governance = await signer.getAddress(); // set owner as signer (will be changed after authorizing timelock)
  const _pauser = await signer.getAddress(); // authorize current signer as a pauser
  const yVaultAssetProxyFactory = new ethers.ContractFactory(
    yVaultAssetProxyInterface,
    yVaultAssetProxyData.bytecode,
    signer
  );
  const yVaultAssetProxyContractDeployed = await yVaultAssetProxyFactory.deploy(
    vault_,
    _token,
    _name,
    _symbol,
    _governance,
    _pauser
  );
  await yVaultAssetProxyContractDeployed.deployed();
  console.log(
    `yvbb-a-usd asset proxy address: ${yVaultAssetProxyContractDeployed.address}`
  );

  /**
   * Connect the current signer to the deployed contract
   */
  const yVaultAssetProxyContract = YVaultAssetProxy__factory.connect(
    yVaultAssetProxyContractDeployed.address,
    signer
  );

  /**
   * Pause the contract (to be resumed when proposal passes)
   */
  const pausetx = await yVaultAssetProxyContract.pause(true);
  await pausetx.wait();

  /**
   * Authorize the Timelock as a pauser
   */
  const authorizetx = await yVaultAssetProxyContract.authorize(
    addresses.Timelock
  );
  await authorizetx.wait();

  /**
   * Transfer ownership to the Timelock
   */
  const ownershiptx = await yVaultAssetProxyContract.setOwner(
    addresses.Timelock
  );
  await ownershiptx.wait();

  /**
   * Deauthorize current signer
   */
  const deauthorizetx = await yVaultAssetProxyContract.deauthorize(
    await signer.getAddress()
  );
  await deauthorizetx.wait();

  /**
   * Calldata for unpausing Asset Proxy
   */
  const unpauseCalldata = yVaultAssetProxyContract.interface.encodeFunctionData(
    "pause",
    [false]
  );

  /**
   * Form the callhash
   */
  const callData = [unpauseCalldata];
  const callHash = await createCallHash(
    callData, // unpause calldata
    [
      yVaultAssetProxyContractDeployed.address, // address of the deployed asset proxy
    ]
  );

  /**
   * Encode proposal to be sent to the core voting contract
   * Notes:
   * - Simple add the multiple call hashes into the array.
   * - You can have multiple callHashes, if a proposal affects multiple different vaults or other DAO contracts.
   * - eg: Proposal updates a voting threshold, and moves funds from the treasury. This would be two callHashes.
   */
  const calldataCv = timelockInterface.encodeFunctionData("registerCall", [
    callHash,
  ]);

  /**
   * Creates the expiery for the proposal, no need to modify.
   * Default: xxxx
   */
  const expiryDate = 15378000; // TODO change to something automatic.

  /**
   * The coreVoting contract registers the call with the timelock
   * - Supply all the vaults where you wish voting power to originate from.
   */
  const tx = await coreVoting.proposal(
    [addresses.FrozenLockingVaultProxy, addresses.FrozenVestingVaultProxy], // Forzen vaults because all ELFI lives there
    ["0x", "0x"], // Extra data - typically 0x
    [addresses.Timelock], // You always call the timelock, the timelock is "sudo" it controls the DAO contracts.
    [calldataCv], // load in the call data
    expiryDate, // Last call for proposal
    0, // This is your vote. change if you please.
    // Gas Settings - TODO modify
    {
      maxFeePerGas: 110820118419,
      maxPriorityFeePerGas: 2,
      gasLimit: 5000000,
    }
  );

  // --- end main EGP logic ---

  await tx.wait();

  // need these 2 values to execute from the timelock after lock duration, please keep record of them.
  console.log({
    callData,
    callHash,
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
