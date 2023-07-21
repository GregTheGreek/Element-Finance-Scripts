import { expect, assert } from "chai";
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { network, ethers } from 'hardhat'

// Artifacts
import iERC20 from '../../elf-contracts/artifacts/contracts/interfaces/IERC20.sol/IERC20.json'

import { balancerPools, BALANCER_VAULT } from "./egp-16";

// Run the test on a mainnet fork
describe("Run unwinding part 1, mainnet fork", function() {
    async function signerFixture() {
        // Setup your signer
        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [BALANCER_VAULT],
        });

        await network.provider.send("hardhat_setBalance", [
            BALANCER_VAULT,
            ethers.utils.parseEther("10.0").toHexString()
        ]);

        const signer = await ethers.provider.getSigner(
            BALANCER_VAULT
        );

        return signer;
    }
})
