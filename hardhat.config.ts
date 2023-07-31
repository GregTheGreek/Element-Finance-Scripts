import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@nomicfoundation/hardhat-chai-matchers'

import dotenv from 'dotenv'
dotenv.config()

const config: HardhatUserConfig = {
  mocha: {
    timeout: 100000000,
    parallel: false,
  },
  solidity: {
    compilers: [
      {
        version: '0.8.18',
      },
      {
        version: '0.7.6',
      }
    ]
  },
  paths: {
    sources: './egps',
    artifacts: './artifacts',
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`,
      },
      accounts: {
        accountsBalance: '100000000000000000000000', // 100000 ETH
        count: 5,
      },
    },
  },
  typechain: {
    outDir: './typechain',
  },
}

export default config
