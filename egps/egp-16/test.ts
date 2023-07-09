import { expect } from "chai";
import { network, ethers } from 'hardhat'

// Artifacts
import iYearnVault from '../../elf-contracts/artifacts/contracts/interfaces/IYearnVault.sol/IYearnVault.json'
import iERC20 from '../../elf-contracts/artifacts/contracts/interfaces/IERC20.sol/IERC20.json'
import iCurvePool from '../../artifacts/egps/egp-16/CurvelpPriceChecker.sol/iCurvePool.json'
import iCurveMetaPool from '../../artifacts/egps/egp-16/CurvelpPriceChecker.sol/iCurveMetaPool.json'

// Helpers
import * as addresses from '../helpers/addresses'
import { createCallHash } from '../helpers/hashing'
import { CurvelpPriceChecker__factory } from '../../typechain'

const TREASURY_ADDRESS = "0x82ef450fb7f06e3294f2f19ed1713b255af0f541";

// Run the test on a mainnet fork
describe("Testing", function() {
    it("should test", async function() {
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

        // Deploy the curve price checker
        const factory = new CurvelpPriceChecker__factory(signer);
        let priceChecker = await factory.deploy('Curve LP Withdraw Price Checker');
        priceChecker = await priceChecker.deployed();

        // Withdraw from the appropriate Yearn Vaults
        const yearnPools = [
            {
                // ycrv3crypto -> crv3crypto
                vault: "0xE537B5cc158EB71037D4125BDD7538421981E6AA",
                withdrawn: "0xc4AD29ba4B3c580e6D59105FFf484999997675Ff",
            },
            {
                // yalusd3crv-f -> alusd3crv-f
                vault: "0xA74d4B67b3368E83797a35382AFB776bAAE4F5C8",
                withdrawn: "0x43b4FdFD4Ff969587185cDB6f0BD875c5Fc83f8c",
            },
            {
                // yeurscrv -> eurscrv
                vault: "0x25212Df29073FfFA7A67399AcEfC2dd75a831A1A",
                withdrawn: "0x194eBd173F6cDacE046C53eACcE9B953F28411d1",
            },
            {
                // ylusd3crv-f -> lusd3crv-f
                vault: "0x5fA5B62c8AF877CB37031e0a3B2f34A78e3C56A6",
                withdrawn: "0xEd279fDD11cA84bEef15AF5D39BB4d4bEE23F0cA"
            },
            {
                // ymim-3lp3crv-f => mim-3lp3crv-f
                vault: "0x2DfB14E32e2F8156ec15a2c21c3A6c053af52Be8",
                withdrawn: "0x5a6A4D54456819380173272A5E8E9B9904BdF41B",
            },
            {
                // ystecrv -> stecrv
                vault: "0xdCD90C7f6324cfa40d7169ef80b12031770B4325",
                withdrawn: "0x06325440D014e39736583c165C2963BA99fAf14E",
            },
            {
                // yusdc -> usdc
                vault: "0xa354f35829ae975e850e23e9615b11da1b3dc4de",
                withdrawn: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            },
            {
                // ywbtc -> wbtc
                vault: "0xA696a63cc78DfFa1a63E9E50587C197387FF6C7E",
                withdrawn: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
            },
            {
                // ydai -> dai
                vault: "0xdA816459F1AB5631232FE5e97a05BBBb94970c95",
                withdrawn: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            }
        ];

        for (var i in yearnPools) {
            const iYearnVaultContract = new ethers.Contract(
            yearnPools[i].vault,
            iYearnVault.abi,
            signer
            );

            const tokenContract = new ethers.Contract(
            yearnPools[i].withdrawn,
            iERC20.abi,
            signer
            );

            const balance = await iYearnVaultContract.balanceOf(TREASURY_ADDRESS);
            const preBalance = await tokenContract.balanceOf(TREASURY_ADDRESS);

            console.log("pre-balance: ", preBalance);

            await iYearnVaultContract.withdraw(balance, TREASURY_ADDRESS, 10000)

            const postBalance = await tokenContract.balanceOf(TREASURY_ADDRESS)
            console.log("post-balance: ", postBalance)  
        }

        const crvPools = [
            // crv3crypto -> weth
            // curve pool = https://etherscan.io/address/0xd51a44d3fae010294c616388b506acda1bfaae46#readContract
            // i = 2, weth = https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
            {
                i: 2,
                pool: '0xd51a44d3fae010294c616388b506acda1bfaae46',
                poolType: 'plain',
                withdrawn: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            },
            // alusd3crv-f -> 3crv
            // curve pool = https://etherscan.io/address/0x43b4fdfd4ff969587185cdb6f0bd875c5fc83f8c#readContract
            // i = 1, 3crv = https://etherscan.io/address/0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490
            {
                i: 1,
                pool: '0x43b4fdfd4ff969587185cdb6f0bd875c5fc83f8c',
                poolType: 'meta',
                withdrawn: '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
            },
            // eurscrv -> eurs
            // curve pool = https://etherscan.io/address/0x0ce6a5ff5217e38315f87032cf90686c96627caa#readContract
            // i = 0, eurs = https://etherscan.io/address/0xdB25f211AB05b1c97D595516F45794528a807ad8
            {
                i: 0,
                pool: '0x0ce6a5ff5217e38315f87032cf90686c96627caa',
                poolType: 'meta',
                withdrawn: '0xdB25f211AB05b1c97D595516F45794528a807ad8',
            },
            // lusd3crv-f -> 3crv
            // curve pool = https://etherscan.io/address/0xed279fdd11ca84beef15af5d39bb4d4bee23f0ca#readContract
            // i = 1, 3crv = https://etherscan.io/address/0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490
            {
                i: 1,
                pool: '0xed279fdd11ca84beef15af5d39bb4d4bee23f0ca',
                poolType: 'meta',
                withdrawn: '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
            },
            // mim-3lp3crv-f -> 3crv
            // curve pool = https://etherscan.io/address/0x5a6a4d54456819380173272a5e8e9b9904bdf41b#readContract
            // i = 1, 3crv = https://etherscan.io/address/0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490
            {
                i: 1,
                pool: '0x5a6a4d54456819380173272a5e8e9b9904bdf41b',
                poolType: 'meta',
                withdrawn: '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
            },
            // stecrv -> eth
            // curve pool = https://etherscan.io/address/0xdc24316b9ae028f1497c275eb9192a3ea0f67022#readContract
            // i = 0, eth
            {
                i: 0,
                pool: '0xdc24316b9ae028f1497c275eb9192a3ea0f67022',
                poolType: 'meta',
                withdrawn: 'eth',
            },
        ];

        for (var i in crvPools) {
            let iCurvePoolContract
            if (crvPools[i].poolType === 'plain') {
                iCurvePoolContract = new ethers.Contract(
                    crvPools[i].pool,
                    iCurvePool.abi,
                    signer
                );
            }

            if (crvPools[i].poolType === 'meta') {
                iCurvePoolContract = new ethers.Contract(
                    crvPools[i].pool,
                    iCurveMetaPool.abi,
                    signer
                );
            }

            if (iCurvePoolContract === undefined) {
                console.log('Configuration Error on Pool Type');
                process.exit();
            }

            const lpTokenContract = new ethers.Contract(
                yearnPools[i].withdrawn,
                iERC20.abi,
                signer
            );

            const lpBalance = await lpTokenContract.balanceOf(TREASURY_ADDRESS);
            const amountWithdrawn = await iCurvePoolContract.calc_withdraw_one_coin(
                lpBalance,
                crvPools[i].i
            );
        
            if (crvPools[i].withdrawn === 'eth') {
                console.log('ETH Withdrawn: ', ethers.utils.formatUnits(amountWithdrawn, 18));
                continue
            }

            const withdrawnTokenContract = new ethers.Contract(
                crvPools[i].withdrawn,
                iERC20.abi,
                signer
            );

            const decimals = await withdrawnTokenContract.decimals();
            const symbol = await withdrawnTokenContract.symbol();

            console.log(symbol, ' Withdrawn: ', ethers.utils.formatUnits(amountWithdrawn, decimals));
        }
    })
})
