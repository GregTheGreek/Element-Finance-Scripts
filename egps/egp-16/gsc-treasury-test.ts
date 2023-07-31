import { expect, assert } from "chai";
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { network, ethers } from 'hardhat'

// Artifacts
import iERC20 from '../../elf-contracts/artifacts/contracts/libraries/ERC20PermitWithSupply.sol/ERC20PermitWithSupply.json'
import iTranche from '../../elf-contracts/artifacts/contracts/interfaces/ITranche.sol/ITranche.json'
import iVault from '../../artifacts/egps/egp-16/BalancerVault.sol/IVault.json'

import { balancerPools, BALANCER_VAULT_ADDRESS, GSC_TREASURY_ADDRESS, TREASURY_ADDRESS } from "./egp-16";
import { BigNumber } from "ethers";
import { EtherscanProvider } from "@ethersproject/providers";

function trimDecimalOverflow(n: string, decimals: number){
    n+=""

    if(n.indexOf(".") === -1) return n
    
    const arr = n.split(".");
    const fraction = arr[1] .substr(0, decimals);
    return arr[0] + "." + fraction;
}

// Run the test on a mainnet fork
describe("Run unwinding GSC treasury", function() {
    async function signerFixture() {
        // Setup your signer
        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [GSC_TREASURY_ADDRESS],
        });

        await network.provider.send("hardhat_setBalance", [
            GSC_TREASURY_ADDRESS,
            ethers.utils.parseEther("10.0").toHexString()
        ]);

        const signer = await ethers.provider.getSigner(
            GSC_TREASURY_ADDRESS
        );

        return signer;
    };

    async function mimFixture() {
        // Setup your signer
        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: ["0xd8b712d29381748dB89c36BCa0138d7c75866ddF"],
        });

        await network.provider.send("hardhat_setBalance", [
            "0xd8b712d29381748dB89c36BCa0138d7c75866ddF",
            ethers.utils.parseEther("10.0").toHexString()
        ]);

        const signer = await ethers.provider.getSigner(
            "0xd8b712d29381748dB89c36BCa0138d7c75866ddF"
        );

        // mim vault
        const vaultContract = new ethers.Contract(
            BALANCER_VAULT_ADDRESS,
            iVault.abi,
            signer
        );
        const baseTokenContract = new ethers.Contract(
            balancerPools[0].withdraw.base,
            iERC20.abi,
            signer
        );
        const baseBalance = await baseTokenContract.balanceOf('0xd8b712d29381748dB89c36BCa0138d7c75866ddF');
        await baseTokenContract.approve(BALANCER_VAULT_ADDRESS, baseBalance);

        const singleSwap = {
            poolId: balancerPools[0].poolId,
            kind: 0,
            assetIn: balancerPools[0].withdraw.base,
            assetOut: balancerPools[0].withdraw.pt,
            amount: BigNumber.from('11911000000000000000000'),
            userData: "0x00",
          };
        
        const funds = {
            sender: '0xd8b712d29381748dB89c36BCa0138d7c75866ddF',
            recipient: '0xd8b712d29381748dB89c36BCa0138d7c75866ddF',
            fromInternalBalance: false,
            toInternalBalance: false,
        };
    
        const limit = BigNumber.from('0');
        const deadline = Math.round(Date.now() / 1000) + 100; // 100 seconds expiration

        await vaultContract.swap(singleSwap, funds, limit, deadline);

        const ptTokenContract = new ethers.Contract(
            balancerPools[0].withdraw.pt,
            iERC20.abi,
            signer
        );

        const ptBalance = await ptTokenContract.balanceOf('0xd8b712d29381748dB89c36BCa0138d7c75866ddF');
        const ptSymbol = await ptTokenContract.symbol();
        const newBaseBalance = await baseTokenContract.balanceOf('0xd8b712d29381748dB89c36BCa0138d7c75866ddF');
        const baseSymbol = await baseTokenContract.symbol();

        console.log(`withdraw pt token ${ptSymbol} balance: ${ethers.utils.formatUnits(ptBalance, 18)}`);
        console.log(`withdraw base token ${baseSymbol} balance: ${ethers.utils.formatUnits(newBaseBalance, 18)}`);
    };


    it ("withdraw lp and redeem", async function() {
        for (let i in balancerPools) {
            const signer = await loadFixture(signerFixture);

            const vaultContract = new ethers.Contract(
                BALANCER_VAULT_ADDRESS,
                iVault.abi,
                signer
            );
            const lpTokenContract = new ethers.Contract(
                balancerPools[i].pool,
                iERC20.abi,
                signer
            );
            const lpBalance = await lpTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
            const lpBalanceDecimals = await lpTokenContract.decimals();
            const totalSupply = await lpTokenContract.totalSupply();
            const totalSupplyDecimals = await lpTokenContract.decimals();
            await lpTokenContract.approve(BALANCER_VAULT_ADDRESS, lpBalance);
            const poolExitTokens = await vaultContract.getPoolTokens(balancerPools[i].poolId);

            const totalSupplyString = ethers.utils.formatUnits(totalSupply, totalSupplyDecimals);
            const lpBalanceString = ethers.utils.formatUnits(lpBalance, lpBalanceDecimals);

            const totalSupplyFixed = ethers.FixedNumber.fromString(totalSupplyString);
            const lpBalanceFixed = ethers.FixedNumber.fromString(lpBalanceString);


            const lpShare = lpBalanceFixed.divUnsafe(totalSupplyFixed);

            const token1Contract = new ethers.Contract(
                poolExitTokens.tokens[0],
                iERC20.abi,
                signer
            );

            const token2Contract = new ethers.Contract(
                poolExitTokens.tokens[1],
                iERC20.abi,
                signer
            );

            const token1Decimals = await token1Contract.decimals();
            const token2Decimals = await token2Contract.decimals();

            const token1Fixed = ethers.FixedNumber.fromValue(poolExitTokens.balances[0], token1Decimals);
            const token2Fixed = ethers.FixedNumber.fromValue(poolExitTokens.balances[1], token2Decimals);
            const minOut1Fixed = token1Fixed.mulUnsafe(lpShare);
            const minOut2Fixed = token2Fixed.mulUnsafe(lpShare);

            const minOut1 = ethers.utils.parseUnits(trimDecimalOverflow(minOut1Fixed.toString(), token1Decimals), token1Decimals);
            const minOut2 = ethers.utils.parseUnits(trimDecimalOverflow(minOut2Fixed.toString(), token2Decimals), token2Decimals);

            const minOuts = [
                minOut1,
                minOut2,
            ];

            const userData = ethers.utils.defaultAbiCoder.encode(["uint256[]"], [minOuts]);
            const exitPoolRequest = {
                assets: poolExitTokens.tokens,
                minAmountsOut: [0, 0],
                userData,
                toInternalBalance: false
            };
            const exitResponse = await vaultContract.exitPool(
                balancerPools[i].poolId,
                GSC_TREASURY_ADDRESS,
                GSC_TREASURY_ADDRESS,
                exitPoolRequest
            );

            const ptTokenContract = new ethers.Contract(
                balancerPools[i].withdraw.pt,
                iERC20.abi,
                signer
            );
            const baseTokenContract = new ethers.Contract(
                balancerPools[i].withdraw.base,
                iERC20.abi,
                signer
            );

            const ptBalance = await ptTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
            const ptSymbol = await ptTokenContract.symbol();
            const ptDecimals = await ptTokenContract.decimals();
            const baseBalance = await baseTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
            const baseSymbol = await baseTokenContract.symbol();
            const baseDecimals = await baseTokenContract.decimals();

            console.log(`withdraw pt token ${ptSymbol} balance: ${ethers.utils.formatUnits(ptBalance, ptDecimals)}`);
            console.log(`withdraw base token ${baseSymbol} balance: ${ethers.utils.formatUnits(baseBalance, baseDecimals)}`);

            // redeem PT
            const trancheContract = new ethers.Contract(
                balancerPools[i].tranche,
                iTranche.abi,
                signer
            );

            await ptTokenContract.approve(balancerPools[i].tranche, ptBalance);
            await trancheContract.withdrawPrincipal(ptBalance, GSC_TREASURY_ADDRESS);

            const newPtBalance = await ptTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
            const newBaseBalance = await baseTokenContract.balanceOf(GSC_TREASURY_ADDRESS);

            console.log(`After redeem pt token ${baseSymbol} balance: ${ethers.utils.formatUnits(newPtBalance, ptDecimals)}`);
            console.log(`After redeem base token ${baseSymbol} balance: ${ethers.utils.formatUnits(newBaseBalance, baseDecimals)}`);
        }
    });

    it ("testing...", async function() {
        // const signer = await loadFixture(signerFixture);

        // for (var i in balancerPools) {
        //     const vaultContract = new ethers.Contract(
        //         BALANCER_VAULT_ADDRESS,
        //         iVault.abi,
        //         signer
        //     );

        //     const lpTokenContract = new ethers.Contract(
        //         balancerPools[i].pool,
        //         iERC20.abi,
        //         signer
        //     );

        //     const lpBalance = await lpTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
        //     await lpTokenContract.approve(BALANCER_VAULT_ADDRESS, lpBalance);

        //     const poolExitTokens = await vaultContract.getPoolTokens(balancerPools[i].poolId);
        //     console.log(poolExitTokens.balances[0]);
        //     console.log(poolExitTokens.balances[1]);
        //     const userData = ethers.utils.defaultAbiCoder.encode(["uint256[]"], [[
        //         BigNumber.from('2088947429834919766981'),
        //         BigNumber.from('24000000000000000000'),
        //     ]]);

        //     const exitPoolRequest = {
        //         assets: poolExitTokens.tokens,
        //         minAmountsOut: [0, 0],
        //         userData,
        //         toInternalBalance: false
        //     };
        //     const exitResponse = await vaultContract.exitPool(
        //         balancerPools[i].poolId,
        //         GSC_TREASURY_ADDRESS,
        //         GSC_TREASURY_ADDRESS,
        //         exitPoolRequest
        //     )

        //     const ptTokenContract = new ethers.Contract(
        //         balancerPools[i].withdraw.pt,
        //         iERC20.abi,
        //         signer
        //     );
        //     const baseTokenContract = new ethers.Contract(
        //         balancerPools[i].withdraw.base,
        //         iERC20.abi,
        //         signer
        //     );

        //     const ptBalance = await ptTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
        //     const ptSymbol = await ptTokenContract.symbol();
        //     const baseBalance = await baseTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
        //     const baseSymbol = await baseTokenContract.symbol();

        //     console.log(`withdraw pt token ${ptSymbol} balance: ${ethers.utils.formatUnits(ptBalance, 18)}`);
        //     console.log(`withdraw base token ${baseSymbol} balance: ${ethers.utils.formatUnits(baseBalance, 18)}`);
        // }
    });
});
