import { network, ethers } from 'hardhat'

// Artifacts
import iYearnVault from '../../elf-contracts/artifacts/contracts/interfaces/IYearnVault.sol/IYearnVault.json'
import iERC20 from '../../elf-contracts/artifacts/contracts/interfaces/IERC20.sol/IERC20.json'
import iCurvePool from '../../elf-contracts/artifacts/contracts/interfaces/ICurvePool.sol/ICurvePool.json'

// Helpers
import * as addresses from '../helpers/addresses'
import { createCallHash } from '../helpers/hashing'

async function proposal() {
  // Setup your signer
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: ["0x82ef450fb7f06e3294f2f19ed1713b255af0f541"],
  });

  await network.provider.send("hardhat_setBalance", [
    '0x82ef450fb7f06e3294f2f19ed1713b255af0f541',
    ethers.utils.parseEther("10.0").toHexString()
  ]);

  const signer = await ethers.provider.getSigner(
    "0x82ef450fb7f06e3294f2f19ed1713b255af0f541"
  );

  // First withdraw from the appropriate Yearn Vault

  const yearnVaults = [
    // crv3crypto
    "0xE537B5cc158EB71037D4125BDD7538421981E6AA",
    // alusd3crv-f
    "0xA74d4B67b3368E83797a35382AFB776bAAE4F5C8",
    // eurscrv
    "0x25212Df29073FfFA7A67399AcEfC2dd75a831A1A",
    // lusd3crv-f"
    "0x5fA5B62c8AF877CB37031e0a3B2f34A78e3C56A6",
    // mim-3lp3crv-f
    "0x2DfB14E32e2F8156ec15a2c21c3A6c053af52Be8",
    // stecrv
    "0xdCD90C7f6324cfa40d7169ef80b12031770B4325",
    // usdc
    "0xa354f35829ae975e850e23e9615b11da1b3dc4de",
    // wbtc
    "0xA696a63cc78DfFa1a63E9E50587C197387FF6C7E",
    // dai
    "0xdA816459F1AB5631232FE5e97a05BBBb94970c95",
  ];

  const erc20Tokens = [
    // crv3crypto
    "0xc4AD29ba4B3c580e6D59105FFf484999997675Ff",
    // alusd3crv-f
    "0x43b4FdFD4Ff969587185cDB6f0BD875c5Fc83f8c",
    // eurscrv
    "0x194eBd173F6cDacE046C53eACcE9B953F28411d1",
    // lusd3crv-f"
    "0xEd279fDD11cA84bEef15AF5D39BB4d4bEE23F0cA",
    // mim-3lp3crv-f
    "0x5a6A4D54456819380173272A5E8E9B9904BdF41B",
    // stecrv
    "0x06325440D014e39736583c165C2963BA99fAf14E",
    // usdc
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    // wbtc
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    // dai
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  ];

  for (var i in yearnVaults) {
    const iYearnVaultContract = new ethers.Contract(
      yearnVaults[i],
      iYearnVault.abi,
      signer
    );

    const tokenContract = new ethers.Contract(
      erc20Tokens[i],
      iERC20.abi,
      signer
    );

    const balance = await iYearnVaultContract.balanceOf("0x82ef450fb7f06e3294f2f19ed1713b255af0f541");
    const preBalance = await tokenContract.balanceOf("0x82ef450fb7f06e3294f2f19ed1713b255af0f541");

    console.log("pre-balance: ", preBalance);

    await iYearnVaultContract.withdraw(balance, "0x82ef450fb7f06e3294f2f19ed1713b255af0f541", 10000)

    const postBalance = await tokenContract.balanceOf("0x82ef450fb7f06e3294f2f19ed1713b255af0f541")
    console.log("post-balance: ", postBalance)  
  }

  // 1: crv3crypto -> weth
  // 2: weth -> eth
  const iCurvePoolContract = new ethers.Contract(
    "0xd51a44d3fae010294c616388b506acda1bfaae46",
    iCurvePool.abi,
    signer
  );

  const tokenContract = new ethers.Contract(
    erc20Tokens[0],
    iERC20.abi,
    signer
  );
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
