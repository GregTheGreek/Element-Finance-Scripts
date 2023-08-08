import { expect, assert } from "chai";
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { network, ethers } from 'hardhat'
import { encodeSingle, encodeMulti } from 'ethers-multisend';

// Artifacts
import iERC20 from '../../elf-contracts/artifacts/contracts/libraries/ERC20PermitWithSupply.sol/ERC20PermitWithSupply.json'
import iTranche from '../../elf-contracts/artifacts/contracts/interfaces/ITranche.sol/ITranche.json'
import iVault from '../../artifacts/egps/egp-16/interfaces/IBalancer.sol/IVault.json'
import iGnosisSafe from '../../artifacts/egps/egp-16/interfaces/IGnosisSafe.sol/iGnosisSafe.json'

import { balancerPools, BALANCER_VAULT_ADDRESS, GSC_CORE_VOTING_ADDRESS, GSC_TREASURY_ADDRESS, MULTISEND_ADDRESS, TREASURY_ADDRESS } from "./constants";
import { BigNumber } from "ethers";

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

    it ("withdraw lp and redeem", async function() {
        const iERC20Interface = new ethers.utils.Interface(iERC20.abi);
        const vaultContractInterface = new ethers.utils.Interface(iVault.abi);
        const trancheContractInterface = new ethers.utils.Interface(iTranche.abi);
        const safeContractInterface = new ethers.utils.Interface(iGnosisSafe.abi);

        const totalGasUsed = []
        const transactions = [];

        // redeem and withdraw
        for (let i in balancerPools) {
            const signer = await loadFixture(signerFixture);
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

            const approveBalVaultTxFunctionData = iERC20Interface.encodeFunctionData(
                'approve', [
                    BALANCER_VAULT_ADDRESS,
                    lpBalance
                ]
            );
            const approveBalVaultTxEncodedSingle = {
                to: balancerPools[i].pool,
                value: '0x00',
                data: approveBalVaultTxFunctionData
            };
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

            const exitBalancerPoolTxFunctionData = vaultContractInterface.encodeFunctionData(
                'exitPool', [
                    balancerPools[i].poolId,
                    GSC_TREASURY_ADDRESS,
                    GSC_TREASURY_ADDRESS,
                    exitPoolRequest
                ],
            );
            const exitBalancerPoolTxEncodedSingle = {
                to: BALANCER_VAULT_ADDRESS,
                value: '0x00',
                data: exitBalancerPoolTxFunctionData
            };
            const exitBalancerPooltx = await vaultContract.exitPool(
                balancerPools[i].poolId,
                GSC_TREASURY_ADDRESS,
                GSC_TREASURY_ADDRESS,
                exitPoolRequest
            );

            gasUsed = gasUsed.add(exitBalancerPooltx.gasLimit);

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

            const approveTrancheTxFunctionData = iERC20Interface.encodeFunctionData(
                'approve', [
                    balancerPools[i].tranche,
                    ptBalance
                ],
            );
            const approveTrancheTxEncodedSingle = {
                to: balancerPools[i].withdraw.pt,
                value: '0x00',
                data: approveTrancheTxFunctionData
            };
            const approveTranchetx = await ptTokenContract.approve(balancerPools[i].tranche, ptBalance);
            gasUsed = gasUsed.add(approveTranchetx.gasLimit)

            const withdrawTrancheTxFunctionData = trancheContractInterface.encodeFunctionData(
                'withdrawPrincipal', [
                    ptBalance,
                    GSC_TREASURY_ADDRESS,
                ],
            );
            const withdrawTrancheTxEncodedSingle = {
                to: balancerPools[i].tranche,
                value: '0x00',
                data: withdrawTrancheTxFunctionData
            };

            const withdrawTranchetx = await trancheContract.withdrawPrincipal(ptBalance, GSC_TREASURY_ADDRESS);
            gasUsed = gasUsed.add(withdrawTranchetx.gasLimit);

            const newPtBalance = await ptTokenContract.balanceOf(GSC_TREASURY_ADDRESS);
            const newBaseBalance = await baseTokenContract.balanceOf(GSC_TREASURY_ADDRESS);

            console.log(`After redeem pt token ${baseSymbol} balance: ${ethers.utils.formatUnits(newPtBalance, ptDecimals)}`);
            console.log(`After redeem base token ${baseSymbol} balance: ${ethers.utils.formatUnits(newBaseBalance, baseDecimals)}`);
            totalGasUsed.push(gasUsed)

            const transferBaseTxFunctionData = iERC20Interface.encodeFunctionData(
                'transfer', [
                    TREASURY_ADDRESS,
                    // some rounding differences in mainnet
                    newBaseBalance
                ]
            );
            const transferBaseTxEncodedSingle = {
                to: balancerPools[i].withdraw.base,
                value: '0x00',
                data: transferBaseTxFunctionData
            }

            // prepare all transactions for a gnosis multisend
            transactions.push(approveBalVaultTxEncodedSingle);
            transactions.push(exitBalancerPoolTxEncodedSingle);
            transactions.push(approveTrancheTxEncodedSingle);
            transactions.push(withdrawTrancheTxEncodedSingle);
            transactions.push(transferBaseTxEncodedSingle);

            expect(ethers.utils.formatUnits(newPtBalance, ptDecimals)).to.equal("0.0");
        }

        console.log('Total Gas Used, LP withdraw and Redeem: ', totalGasUsed);
        const encodedMulti = encodeMulti(transactions, MULTISEND_ADDRESS);
        const signatures = "0x" + "000000000000000000000000" + GSC_CORE_VOTING_ADDRESS.replace('0x', '') + "0000000000000000000000000000000000000000000000000000000000000000" + "01";

        const gnosisExecTransactionFunctionData = safeContractInterface.encodeFunctionData(
            'execTransaction', [
                MULTISEND_ADDRESS,
                0,
                encodedMulti.data,
                1,
                0,
                0,
                0,
                '0x0000000000000000000000000000000000000000',
                '0x0000000000000000000000000000000000000000',
                signatures
            ]
        );

        // Use tenderly, https://dashboard.tenderly.co/shared/simulation/f6442943-d768-4099-ae27-972d59c32ada
        console.log('Transaction data for tenderly: ', gnosisExecTransactionFunctionData);
    });
});
