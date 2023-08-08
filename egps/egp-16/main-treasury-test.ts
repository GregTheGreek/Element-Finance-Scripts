import { expect, assert } from "chai";
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { network, ethers } from 'hardhat'

// Artifacts
import iERC20 from '../../elf-contracts/artifacts/contracts/interfaces/IERC20.sol/IERC20.json'

import { yearnPools, crvPools, TREASURY_ADDRESS } from "./constants";
import { withdrawFromYearn, deployPriceChecker, swapviaMilkman } from "./helpers";

// Run the test on a mainnet fork
describe("Run unwinding part 1, mainnet fork", function() {
    async function signerFixture() {
        // Setup your signer
        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [TREASURY_ADDRESS],
        });

        await network.provider.send("hardhat_setBalance", [
            TREASURY_ADDRESS,
            ethers.utils.parseEther("10.0").toHexString()
        ]);

        const signer = await ethers.provider.getSigner(
            TREASURY_ADDRESS
        );

        return signer;
    }

    async function yearnWithdrawalFixture() {
        const signer = await loadFixture(signerFixture);

        return await withdrawFromYearn(signer);
    }

    async function priceCheckerDeployFixture() {
        const signer = await loadFixture(yearnWithdrawalFixture);
        
        return await deployPriceChecker(signer);
    }

    it ("should have zero crv lp balances before yearn withdrawal", async function() {
        const signer = await loadFixture(signerFixture);

        for (let i in yearnPools) {
            const tokenContract = new ethers.Contract(
                yearnPools[i].withdrawn,
                iERC20.abi,
                signer
            );
    
            const balance = await tokenContract.balanceOf(TREASURY_ADDRESS);

            expect(balance).to.equal(0);
        }
    });

    it("should have crv lp, USDC, DAI, wbtc balances after yearn withdrawal", async function() {
        const signer = await loadFixture(yearnWithdrawalFixture);

        console.log('CRV Token Balances after Withdraw from Yearn:')

        for (var i in crvPools) {
            const tokenContract = new ethers.Contract(
                yearnPools[i].withdrawn,
                iERC20.abi,
                signer
            );

            const postBalance = await tokenContract.balanceOf(TREASURY_ADDRESS);
            const symbol = await tokenContract.symbol();
            const decimals = await tokenContract.decimals();
            
            console.log(`crv token ${symbol} balance: ${ethers.utils.formatUnits(postBalance, decimals)}`);

            expect(postBalance).greaterThan(0);
        }

        console.log('Base Token Balances after Withdraw from Yearn:');

        const tokens = [
            // usdc
            "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            // wbtc
            "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
            // dai
            "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        ]

        for (var i in tokens) {
            const tokenContract = new ethers.Contract(
                tokens[i],
                iERC20.abi,
                signer
            );
    
            const postBalance = await tokenContract.balanceOf(TREASURY_ADDRESS);
            const symbol = await tokenContract.symbol();
            const decimals = await tokenContract.decimals();

            console.log(`token ${symbol} balance: ${ethers.utils.formatUnits(postBalance, decimals)}`);

            expect(postBalance).greaterThan(0);    
        }
    })
})
