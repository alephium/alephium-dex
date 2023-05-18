import { Configuration } from '@alephium/cli'
import { Address } from '@alephium/web3'

export type Settings = {
  feeSetter?: Address
}

const configuration: Configuration<Settings> = {
  networks: {
    devnet: {
      nodeUrl: 'http://localhost:22973',
      privateKeys: ['a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5'],
      settings: { feeSetter: '1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH' }
    },

    testnet: {
      nodeUrl: process.env.NODE_URL as string,
      privateKeys: process.env.PRIVATE_KEYS === undefined ? [] : process.env.PRIVATE_KEYS.split(','),
      settings: {}
    },

    mainnet: {
      nodeUrl: process.env.NODE_URL as string,
      privateKeys: process.env.PRIVATE_KEYS === undefined ? [] : process.env.PRIVATE_KEYS.split(','),
      settings: {}
    }
  },

  compilerOptions: {
    errorOnWarnings: true,
    ignoreUnusedConstantsWarnings: true
  }
}

export default configuration
