import { expect, assert } from "chai";
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { network, ethers } from 'hardhat'

// Artifacts
import iERC20 from '../../elf-contracts/artifacts/contracts/libraries/ERC20PermitWithSupply.sol/ERC20PermitWithSupply.json'
import iVault from '../../artifacts/egps/egp-16/BalancerVault.sol/IVault.json'

import { balancerPools, BALANCER_VAULT_ADDRESS, GSC_TREASURY_ADDRESS, TREASURY_ADDRESS } from "./egp-16";
import { BigNumber } from "ethers";

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


    it ("withdraw mim", async function() {
        // await loadFixture(mimFixture);
        const signer = await loadFixture(signerFixture);

        const vaultContract = new ethers.Contract(
            BALANCER_VAULT_ADDRESS,
            iVault.abi,
            signer
        );
        const lpTokenContract = new ethers.Contract(
            balancerPools[0].pool,
            iERC20.abi,
            signer
        );
        const lpBalance = await lpTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
        const totalSupply = await lpTokenContract.totalSupply();
        await lpTokenContract.approve(BALANCER_VAULT_ADDRESS, lpBalance);
        const poolExitTokens = await vaultContract.getPoolTokens(balancerPools[0].poolId);

        console.log(poolExitTokens);
        console.log(totalSupply);
        console.log(lpBalance);
        const totalSupplyString = ethers.utils.formatUnits(totalSupply, 18);
        const lpBalanceString = ethers.utils.formatUnits(lpBalance, 18);
        console.log(totalSupplyString);
        console.log(lpBalanceString);

        const totalSupplyFixed = ethers.FixedNumber.fromString(totalSupplyString);
        const lpBalanceFixed = ethers.FixedNumber.fromString(lpBalanceString);

        console.log(totalSupplyFixed);
        console.log(lpBalanceFixed);

        const lpShare = lpBalanceFixed.divUnsafe(totalSupplyFixed);
        console.log(lpShare.toString());

        const token1Fixed = ethers.FixedNumber.fromString(ethers.utils.formatUnits(poolExitTokens.balances[0], 18));
        const token2Fixed = ethers.FixedNumber.fromString(ethers.utils.formatUnits(poolExitTokens.balances[1], 18));
        const minOut1Fixed = token1Fixed.mulUnsafe(lpShare);
        const minOut2Fixed = token2Fixed.mulUnsafe(lpShare);
        console.log(minOut1Fixed.toString());
        console.log(minOut2Fixed.toString());


        const minOut1 = ethers.utils.parseUnits(minOut1Fixed.toString(), 18);
        const minOut2 = ethers.utils.parseUnits(minOut2Fixed.toString(), 18);

        const minOuts = [
            minOut1,
            minOut2,
        ];

        console.log("minOuts: ", minOuts);

        const userData = ethers.utils.defaultAbiCoder.encode(["uint256[]"], [minOuts]);

        const exitPoolRequest = {
            assets: poolExitTokens.tokens,
            minAmountsOut: [0, 0],
            userData,
            toInternalBalance: false
        };
        const exitResponse = await vaultContract.exitPool(
            balancerPools[0].poolId,
            GSC_TREASURY_ADDRESS,
            GSC_TREASURY_ADDRESS,
            exitPoolRequest
        );

        const ptTokenContract = new ethers.Contract(
            balancerPools[0].withdraw.pt,
            iERC20.abi,
            signer
        );
        const baseTokenContract = new ethers.Contract(
            balancerPools[0].withdraw.base,
            iERC20.abi,
            signer
        );

        const ptBalance = await ptTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
        const ptSymbol = await ptTokenContract.symbol();
        const baseBalance = await baseTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
        const baseSymbol = await baseTokenContract.symbol();

        console.log(`withdraw pt token ${ptSymbol} balance: ${ethers.utils.formatUnits(ptBalance, 18)}`);
        console.log(`withdraw base token ${baseSymbol} balance: ${ethers.utils.formatUnits(baseBalance, 18)}`);
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
