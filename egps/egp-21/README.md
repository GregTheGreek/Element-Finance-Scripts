# Additional Information

[EGP-21](https://forum.element.fi/discussion/9556-egp21-enable-the-transferability-of-elfi)

This script enables the transferability of ELFI by upgrading both the LockingVault and VestingVault proxies to point to new contracts which contain full functionality.

[Full-Featured Locking Vault](https://github.com/element-fi/council/blob/main/contracts/vaults/LockingVault.sol)

[Full-Featured Vesting Vault](https://github.com/element-fi/council/blob/main/contracts/vaults/VestingVault.sol)

To run this proposal

1. Deploy the contracts locally to ensure that your environment is set up

   ```sh
   npx hardhat run egps/egp-21/deploy.ts
   ```

   The file `egps/egp-21/addresses-hardhat.json` should now exist.

1. Deploy the contracts to mainnet

   ```sh
   npx hardhat run egps/egp-21/deploy.ts --network mainnet
   ```

   The file `egps/egp-21/addresses-mainnet.json` should now exist.

1. Uncomment line 12 in `egps/egp-21/egp-21.ts`.

   ```ts
   import VAULT_ADDRESSES from './addresses-mainnet.json'
   ```

1. Run the proposal script on mainnet

   ```sh
   npx hardhat run egps/egp-21/egp-21.ts --network mainnet
   ```
