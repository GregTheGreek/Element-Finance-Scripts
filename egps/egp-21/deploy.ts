import LockingVaultData from '../../council/artifacts/contracts/vaults/LockingVault.sol/LockingVault.json'
import VestingVaultData from '../../council/artifacts/contracts/vaults/VestingVault.sol/VestingVault.json'
import { ethers, network } from 'hardhat'
import { ELFI } from '../helpers/addresses'
import fs from 'fs'
import path from 'path'

async function main() {
  console.log(`network: ${network.name}`)
  const [deployer] = await ethers.getSigners()
  console.log(`currently using address ${deployer.address}`)

  // set some common deployment variables
  const TOKEN_ADDRESS = ELFI
  const STALE_BLOCK_LAG = 200000 // taken from old contract
  console.log(`token address: ${TOKEN_ADDRESS}`)
  console.log(`lag: ${STALE_BLOCK_LAG}`)

  // deploy the locking vault
  const lockingVaultFactory = new ethers.ContractFactory(
    LockingVaultData.abi,
    LockingVaultData.bytecode,
    deployer
  )
  let lockingVaultContract = await lockingVaultFactory.deploy(
    TOKEN_ADDRESS,
    STALE_BLOCK_LAG
  )
  lockingVaultContract = await lockingVaultContract.deployed()
  console.log(`LockingVault deployed to ${lockingVaultContract.address}`)

  // deploy the vesting vault
  const vestingVaultFactory = new ethers.ContractFactory(
    VestingVaultData.abi,
    VestingVaultData.bytecode,
    deployer
  )
  let vestingVaultContract = await vestingVaultFactory.deploy(
    TOKEN_ADDRESS,
    STALE_BLOCK_LAG
  )
  vestingVaultContract = await vestingVaultContract.deployed()
  console.log(`VestingVault deployed to ${vestingVaultContract.address}`)

  // write the addresses to a file
  const outputFile = path.join(
    process.cwd(),
    `egps/egp-21/addresses-${network.name}.json`
  )
  fs.writeFileSync(
    outputFile,
    `
{
  "LockingVault": "${lockingVaultContract.address}",
  "VestingVault": "${vestingVaultContract.address}"
}
  `
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
