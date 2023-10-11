import { network, ethers } from 'hardhat'

// Artifacts
import iYearnVault from '../../elf-contracts/artifacts/contracts/interfaces/IYearnVault.sol/IYearnVault.json'
import iERC20 from '../../elf-contracts/artifacts/contracts/interfaces/IERC20.sol/IERC20.json'
import iMilkman from '../../artifacts/egps/egp-16/interfaces/ICurve.sol/iMilkman.json'

// Constants
import { yearnPools, crvPools, MILKMAN_ADDRESS, TREASURY_ADDRESS } from "./constants";

// Helpers
import { CurvelpPriceChecker__factory } from '../../typechain'
import { Signer } from 'ethers'

export async function withdrawFromYearn(signer: Signer) {
    const iYearnVaultInterface = new ethers.utils.Interface(iYearnVault.abi);
    
    const transactions = [];
    for (let i in yearnPools) {
        const iYearnVaultContract = new ethers.Contract(
        yearnPools[i].vault,
        iYearnVault.abi,
        signer
        );

        const balance = await iYearnVaultContract.balanceOf(TREASURY_ADDRESS);
        const symbol = await iYearnVaultContract.symbol();
        const decimals = await iYearnVaultContract.decimals();

        // .01%
        const maxLoss = 1000;

        console.log(`Withdrawing ${ethers.utils.formatUnits(balance, decimals)} ${symbol} yearn vault`);

        const withdrawFunctionData = iYearnVaultInterface.encodeFunctionData(
            'withdraw', [
                balance,
                TREASURY_ADDRESS,
                maxLoss
            ]
        );
        const withdrawTxEncodedSingle = {
            to: yearnPools[i].vault,
            value: '0x00',
            data: withdrawFunctionData
        }
        const withdrawTx = await iYearnVaultContract.withdraw(balance, TREASURY_ADDRESS, maxLoss);
        transactions.push(withdrawTxEncodedSingle);
        console.log('Withdrawing gas used: ', withdrawTx.gasLimit);
    }

    return { signer, transactions };
};

export async function deployPriceChecker(signer: Signer) {
    // Deploy the curve price checker
    const factory = new CurvelpPriceChecker__factory(signer);
    let priceChecker = await factory.deploy('Curve LP Withdraw Price Checker');
    priceChecker = await priceChecker.deployed();
    const address = priceChecker.address;

    return { signer, address };    
};

export async function swapviaMilkman(signer: Signer, address: String) {
    const iMilkmanContract = new ethers.Contract(
        // milkman address
        MILKMAN_ADDRESS,
        iMilkman.abi,
        signer
    );

    for (let i in crvPools) {
        const priceCheckerData = ethers.utils.defaultAbiCoder.encode(
            ["uint256", "bool", "uint256", "int128", "address"],
            // 1% slippage param
            [100, crvPools[i].isInt128, crvPools[i].i, crvPools[i].i, crvPools[i].pool]
        );

        const lpTokenContract = new ethers.Contract(
            yearnPools[i].withdrawn,
            iERC20.abi,
            signer
        );
        const lpBalance = await lpTokenContract.balanceOf(TREASURY_ADDRESS);
        const lpSymbol = await lpTokenContract.symbol();

        const withdrawnTokenContract = new ethers.Contract(
            crvPools[i].withdrawn,
            iERC20.abi,
            signer
        );
        const withdrawnSymbol = await withdrawnTokenContract.symbol();

        console.log(
            `Requesting an on-chain Swap via Milkman at 1% slippage.\n`,
            `${lpBalance} ${lpSymbol} -> ${withdrawnSymbol}`,
        )

        // approve erc20 spend amount to milkman contract
        await lpTokenContract.approve(MILKMAN_ADDRESS, lpBalance);

        await iMilkmanContract.requestSwapExactTokensForTokens(
            lpBalance,
            yearnPools[i].withdrawn,
            crvPools[i].withdrawn,
            TREASURY_ADDRESS,
            address,
            priceCheckerData
        );
    }
}
