// SPDX-License-Identifier: LGPL-3.0-or-later
pragma solidity ^0.7.6;
pragma abicoder v2;

import "hardhat/console.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

interface iMilkman {
    function requestSwapExactTokensForTokens(
        uint256 amountIn,
        address fromToken,
        address toToken,
        address to,
        address priceChecker,
        bytes calldata priceCheckerData
    ) external view;
}

interface iCurvePool {
    function calc_withdraw_one_coin(
        uint256 token_amount,
        uint256 i
    ) external view returns (uint256);
}

interface iCurveMetaPool {
    function calc_withdraw_one_coin(
        uint256 token_amount,
        int128 i
    ) external view returns (uint256);
}

interface IPriceChecker {
    function checkPrice(
        uint256 _amountIn,
        address _fromToken,
        address _toToken,
        uint256 _feeAmount,
        uint256 _minOut,
        bytes calldata _data
    ) external view returns (bool);
}

contract CurvelpPriceChecker is IPriceChecker {
    using SafeMath for uint256;

    string public NAME;

    uint256 internal constant MAX_BPS = 10_000;

    constructor(string memory _name) {
        NAME = _name;
    }

    function checkPrice(
        uint256 _amountIn,
        address,
        address,
        uint256,
        uint256 _minOut,
        bytes calldata _data
    ) external view override returns (bool) {
        (uint256 _allowedSlippageInBps, bool _is128, uint256 _i, int128 _i128, address _pool) = abi.decode(
            _data,
            (uint256, bool, uint256, int128, address)
        );

        uint256 _expectedOut;

        if (_is128) {
            _expectedOut = iCurveMetaPool(_pool).calc_withdraw_one_coin(_amountIn, _i128);
        } else {
            _expectedOut = iCurvePool(_pool).calc_withdraw_one_coin(_amountIn, _i);
        }

        return
            _minOut >
            _expectedOut.mul(MAX_BPS.sub(_allowedSlippageInBps)).div(MAX_BPS);
    }
}
