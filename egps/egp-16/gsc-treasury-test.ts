import { expect, assert } from "chai";
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { network, ethers } from 'hardhat'
import { encodeSingle, encodeMulti } from 'ethers-multisend';

// Artifacts
import iERC20 from '../../elf-contracts/artifacts/contracts/libraries/ERC20PermitWithSupply.sol/ERC20PermitWithSupply.json'
import iTranche from '../../elf-contracts/artifacts/contracts/interfaces/ITranche.sol/ITranche.json'
import iVault from '../../artifacts/egps/egp-16/BalancerVault.sol/IVault.json'
import iGnosisSafe from '../../artifacts/egps/egp-16/GnosisSafe.sol/iGnosisSafe.json'

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

    it ("testing safe transaction", async function() {
        // Setup your signer
        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: ['0x422494292e7a9Dda8778Bb4EA05C2779a3d60f5D'],
        });

        await network.provider.send("hardhat_setBalance", [
            '0x422494292e7a9Dda8778Bb4EA05C2779a3d60f5D',
            ethers.utils.parseEther("10.0").toHexString()
        ]);

        const signer = await ethers.provider.getSigner(
            '0x422494292e7a9Dda8778Bb4EA05C2779a3d60f5D'
        );

        const lpTokenContract = new ethers.Contract(
            balancerPools[0].pool,
            iERC20.abi,
            signer
        );
        
        const iERC20Interace = new ethers.utils.Interface(iERC20.abi)

        const functionData = iERC20Interace.encodeFunctionData('transfer', [
            '0x422494292e7a9Dda8778Bb4EA05C2779a3d60f5D',
            ethers.BigNumber.from(100)
        ]);

        const safeContract = new ethers.Contract(
            GSC_TREASURY_ADDRESS,
            iGnosisSafe.abi,
            signer
        );

        const signatures = "0x" + "000000000000000000000000" + '0x422494292e7a9Dda8778Bb4EA05C2779a3d60f5D'.replace('0x', '') + "0000000000000000000000000000000000000000000000000000000000000000" + "01";

        const encodedSingle = {
            to: balancerPools[0].pool,
            value: '0x00',
            data: functionData
        }
        const encodedMultiSend = encodeMulti([encodedSingle], '0x8D29bE29923b68abfDD21e541b9374737B49cdAD');
        console.log(encodedMultiSend);

        const beforeBalance = await lpTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
        console.log(beforeBalance);

        const response = await safeContract.execTransaction(
            '0x8D29bE29923b68abfDD21e541b9374737B49cdAD',
            0,
            encodedMultiSend.data,
            1,
            0,
            0,
            0,
            '0x0000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000',
            signatures
        );

        console.log(response);
        const afterBalance = await lpTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
        console.log(afterBalance);
    });

    it ("withdraw lp and redeem", async function() {
        const signer = await loadFixture(signerFixture);
        const totalGasUsed = []
        // redeem and withdraw
        for (let i in balancerPools) {
            let gasUsed = BigNumber.from("0");

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
            const lpBalanceSymbol = await lpTokenContract.symbol();
            const lpBalanceDecimals = await lpTokenContract.decimals();
            const totalSupply = await lpTokenContract.totalSupply();
            const totalSupplyDecimals = await lpTokenContract.decimals();
            const approveBalVaultTx = await lpTokenContract.approve(BALANCER_VAULT_ADDRESS, lpBalance);

            gasUsed = approveBalVaultTx.gasLimit.add(gasUsed);
            const poolExitTokens = await vaultContract.getPoolTokens(balancerPools[i].poolId);

            const totalSupplyString = ethers.utils.formatUnits(totalSupply, totalSupplyDecimals);
            const lpBalanceString = ethers.utils.formatUnits(lpBalance, lpBalanceDecimals);

            console.log(`LP Token ${lpBalanceSymbol} balance of ${lpBalanceString}`);

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

            gasUsed = gasUsed.add(exitResponse.gasLimit);

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

            const approveTranche = await ptTokenContract.approve(balancerPools[i].tranche, ptBalance);
            gasUsed = gasUsed.add(approveTranche.gasLimit)

            const withdrawTranche = await trancheContract.withdrawPrincipal(ptBalance, GSC_TREASURY_ADDRESS);
            gasUsed = gasUsed.add(withdrawTranche.gasLimit);

            const newPtBalance = await ptTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
            const newBaseBalance = await baseTokenContract.balanceOf(GSC_TREASURY_ADDRESS);

            console.log(`After redeem pt token ${baseSymbol} balance: ${ethers.utils.formatUnits(newPtBalance, ptDecimals)}`);
            console.log(`After redeem base token ${baseSymbol} balance: ${ethers.utils.formatUnits(newBaseBalance, baseDecimals)}`);
            totalGasUsed.push(gasUsed)

            expect(ethers.utils.formatUnits(newPtBalance, ptDecimals)).to.equal("0.0");
        }

        console.log('Total Gas Used, LP withdraw and Redeem: ', totalGasUsed);
    });
});
