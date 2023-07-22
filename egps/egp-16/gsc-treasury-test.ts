import { expect, assert } from "chai";
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { network, ethers } from 'hardhat'

// Artifacts
import iERC20 from '../../elf-contracts/artifacts/contracts/interfaces/IERC20.sol/IERC20.json'
import iVault from '../../artifacts/egps/egp-16/BalancerVault.sol/IVault.json'

import { balancerPools, BALANCER_VAULT_ADDRESS, GSC_TREASURY_ADDRESS } from "./egp-16";

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

    it ("testing...", async function() {
        const signer = await loadFixture(signerFixture);

        for (var i in balancerPools) {
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

            console.log(lpBalance);
            await lpTokenContract.approve(BALANCER_VAULT_ADDRESS, lpBalance);
            console.log('Approved balance withdraw...');

            const poolExitTokens = await vaultContract.getPoolTokens(balancerPools[i].poolId);
            const userData = ethers.utils.defaultAbiCoder.encode(["uint256[]"], [[0, 0]]);

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
            )
        }
    });
});
