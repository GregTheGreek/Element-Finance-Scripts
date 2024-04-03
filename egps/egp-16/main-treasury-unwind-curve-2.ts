// Temporarily deprecated until bringing back milkmen

import { expect, assert } from "chai";
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { network, ethers } from 'hardhat'

// Artifacts
import iERC20 from '../../elf-contracts/artifacts/contracts/interfaces/IERC20.sol/IERC20.json'
import iCurvePool from '../../artifacts/egps/egp-16/interfaces/ICurve.sol/iCurvePool.json'
import iCurveMetaPool from '../../artifacts/egps/egp-16/interfaces/ICurve.sol/iCurveMetaPool.json'

import { crvPools_2, TREASURY_ADDRESS } from "./constants";

function trimDecimalOverflow(n: string, decimals: number){
    n+=""

    if(n.indexOf(".") === -1) return n
    
    const arr = n.split(".");
    const fraction = arr[1] .substr(0, decimals);
    return arr[0] + "." + fraction;
}

// Run the test on a mainnet fork
describe("Run unwinding part 3, unwind CRV pools, mainnet fork", function() {
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

    it("Curve positions should unwind", async function() {
        const signer = await loadFixture(signerFixture);
        const transactions = [];

        for (let i in crvPools_2) {
            let iCurvePoolContract;
            let icurvePoolContractInterface;

            if (crvPools_2[i].isInt128) {
                iCurvePoolContract = new ethers.Contract(
                    crvPools_2[i].pool,
                    iCurveMetaPool.abi,
                    signer
                );
                icurvePoolContractInterface = new ethers.utils.Interface(iCurveMetaPool.abi);
            } else {
                iCurvePoolContract = new ethers.Contract(
                    crvPools_2[i].pool,
                    iCurvePool.abi,
                    signer
                );
                icurvePoolContractInterface = new ethers.utils.Interface(iCurvePool.abi);
            }
    
            const lpTokenContract = new ethers.Contract(
                crvPools_2[i].token,
                iERC20.abi,
                signer
            );
            const withdrawnToken = new ethers.Contract(
                crvPools_2[i].withdrawn,
                iERC20.abi,
                signer
            );

            const lpBalance = await lpTokenContract.balanceOf(TREASURY_ADDRESS);
            const lpSymbol = await lpTokenContract.symbol();
            const lpDecimals = await lpTokenContract.decimals();

            console.log(`Withdrawing ${ethers.utils.formatUnits(lpBalance, lpDecimals)} ${lpSymbol}`)
            const amountToWithdraw = await iCurvePoolContract.calc_withdraw_one_coin(
                lpBalance,
                crvPools_2[i].i
            );

            let withdrawnSymbol;
            let withdrawnDecimals;

            if (crvPools_2[i].isEth) {
                withdrawnSymbol = 'ETH';
                withdrawnDecimals = 18;    
            } else {
                withdrawnSymbol = await withdrawnToken.symbol();
                withdrawnDecimals = await withdrawnToken.decimals();    
            }

            console.log(`Withdrawal to ${withdrawnSymbol}, no slippage quantity: ${ethers.utils.formatUnits(amountToWithdraw, withdrawnDecimals)}`)
    
            const amountToWithdrawFixed = ethers.FixedNumber.fromValue(amountToWithdraw, withdrawnDecimals);
            const fraction = ethers.FixedNumber.fromString(crvPools_2[i].slippage);
            const minAmountToWithdrawFixed = amountToWithdrawFixed.mulUnsafe(fraction);

            const minAmountToWithdraw = ethers.utils.parseUnits(trimDecimalOverflow(minAmountToWithdrawFixed.toString(), withdrawnDecimals), withdrawnDecimals);

            console.log(`Min Withdraw: ${ethers.utils.formatUnits(minAmountToWithdraw, withdrawnDecimals)} ${withdrawnSymbol}`)

            const withdrawFunctionData = icurvePoolContractInterface.encodeFunctionData(
                'remove_liquidity_one_coin', [
                    lpBalance,
                    crvPools_2[i].i,
                    minAmountToWithdraw
                ]
            );
            const withdrawTxEncodedSingle = {
                to: crvPools_2[i].pool,
                value: '0x00',
                data: withdrawFunctionData
            }    

            const withdrawnTx = await iCurvePoolContract.remove_liquidity_one_coin(
                lpBalance,
                crvPools_2[i].i,
                minAmountToWithdraw
            );

            const newLpBalance = await lpTokenContract.balanceOf(TREASURY_ADDRESS);

            let newWithdrawBalance;
            if (crvPools_2[i].isEth) {
                newWithdrawBalance = await signer.provider.getBalance(TREASURY_ADDRESS);
            } else {
                newWithdrawBalance = await withdrawnToken.balanceOf(TREASURY_ADDRESS);
            }

            console.log(`Final Withdrawn: ${ethers.utils.formatUnits(newWithdrawBalance, withdrawnDecimals)}`)
            console.log(`Final LP Balance: ${lpSymbol} ${newLpBalance}`);
            
            expect(newLpBalance).to.equal(0);
            expect(newWithdrawBalance).to.be.greaterThan(0);

            transactions.push(withdrawTxEncodedSingle)
        }

        console.log('transactions: ', transactions);
    })
})
