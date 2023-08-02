import { expect, assert } from "chai";
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { network, ethers } from 'hardhat'

// Artifacts
import iERC20 from '../../elf-contracts/artifacts/contracts/interfaces/IERC20.sol/IERC20.json'
import iCurvePool from '../../artifacts/egps/egp-16/CurvelpPriceChecker.sol/iCurvePool.json'
import iPriceChecker from '../../artifacts/egps/egp-16/CurvelpPriceChecker.sol/IPriceChecker.json'
import iCurveMetaPool from '../../artifacts/egps/egp-16/CurvelpPriceChecker.sol/iCurveMetaPool.json'

import { yearnPools, crvPools, TREASURY_ADDRESS, withdrawFromYearn, deployPriceChecker, swapviaMilkman } from "./egp-16";
import { BigNumber } from "ethers";

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

    it("check gas on CRV pool withdraw", async function() {
        console.log('hi');
    })

    it("price checker should return false when slippage not met", async function() {
        const { signer, address } = await loadFixture(priceCheckerDeployFixture);

        for (let i in crvPools) {
            const iPriceCheckerContract = new ethers.Contract(
                address,
                iPriceChecker.abi,
                signer
            );
    
            const priceCheckerData = ethers.utils.defaultAbiCoder.encode(
                ["uint256", "bool", "uint256", "int128", "address"],
                // 1% slippage param
                [100, crvPools[i].isInt128, crvPools[i].i, crvPools[i].i, crvPools[i].pool]
            );
    
            const arrayified = ethers.utils.arrayify(priceCheckerData)
    
            const lpTokenContract = new ethers.Contract(
                yearnPools[i].withdrawn,
                iERC20.abi,
                signer
            );
            const lpBalance = await lpTokenContract.balanceOf(TREASURY_ADDRESS);

            const pricePasses = await iPriceCheckerContract.checkPrice(
                lpBalance,
                yearnPools[i].withdrawn,
                crvPools[i].withdrawn,
                0,
                0,
                arrayified
            );
    
            // it will be false because minOut = 0
            assert.isFalse(pricePasses);
        }
    })

    it("price checker should return true when slippage met", async function() {
        const { signer, address } = await loadFixture(priceCheckerDeployFixture);

        for (let i in crvPools) {
            let iCurvePoolContract
            if (crvPools[i].isInt128) {
                iCurvePoolContract = new ethers.Contract(
                    crvPools[i].pool,
                    iCurveMetaPool.abi,
                    signer
                );
            } else {
                iCurvePoolContract = new ethers.Contract(
                    crvPools[i].pool,
                    iCurvePool.abi,
                    signer
                );
            }

            const iPriceCheckerContract = new ethers.Contract(
                address,
                iPriceChecker.abi,
                signer
            );
    
            const priceCheckerData = ethers.utils.defaultAbiCoder.encode(
                ["uint256", "bool", "uint256", "int128", "address"],
                // 1% slippage param
                [100, crvPools[i].isInt128, crvPools[i].i, crvPools[i].i, crvPools[i].pool]
            );
    
            const arrayified = ethers.utils.arrayify(priceCheckerData)

            const lpTokenContract = new ethers.Contract(
                yearnPools[i].withdrawn,
                iERC20.abi,
                signer
            );
            const withdrawnToken = new ethers.Contract(
                crvPools[i].withdrawn,
                iERC20.abi,
                signer
            );

            const lpBalance = await lpTokenContract.balanceOf(TREASURY_ADDRESS);
            const amountWithdrawn = await iCurvePoolContract.calc_withdraw_one_coin(
                lpBalance,
                crvPools[i].i
            );

            const withdrawnSymbol = await withdrawnToken.symbol();
            const withdrawnDecimals = await withdrawnToken.decimals();

            console.log(
                `Slippage on curve pool withdrawal should be 1% from ${ethers.utils.formatUnits(amountWithdrawn, withdrawnDecimals)} for ${withdrawnSymbol}`
            )
    
            const pricePasses = await iPriceCheckerContract.checkPrice(
                lpBalance,
                yearnPools[i].withdrawn,
                crvPools[i].withdrawn,
                0,
                amountWithdrawn,
                arrayified
            );

            await lpTokenContract.approve(crvPools[i].pool, lpBalance)
            const withdrawnTx = await iCurvePoolContract.remove_liquidity_one_coin(
                lpBalance,
                crvPools[i].i,
                0
            );
            console.log('removing liquidity crv, gas used: ', withdrawnTx.gasLimit);
    
            assert.isTrue(pricePasses);
        }
    })

    it("sends swap events to milkman", async function() {
        const { signer, address } = await loadFixture(priceCheckerDeployFixture);

        await swapviaMilkman(signer, address);
        console.log("No Reverts Returned.")
    })
})
