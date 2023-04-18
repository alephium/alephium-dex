import { Configuration } from '@alephium/cli'

const configuration: Configuration<undefined> = {
  networks: {
    devnet: {
      nodeUrl: 'http://localhost:22973',
      privateKeys: ['a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5'],
      settings: undefined
    },

    testnet: {
      nodeUrl: process.env.NODE_URL as string,
      privateKeys: process.env.PRIVATE_KEYS === undefined ? [] : process.env.PRIVATE_KEYS.split(','),
      settings: undefined
    },

    mainnet: {
      nodeUrl: process.env.NODE_URL as string,
      privateKeys: process.env.PRIVATE_KEYS === undefined ? [] : process.env.PRIVATE_KEYS.split(','),
      settings: undefined
    }
  },

  compilerOptions: {
    errorOnWarnings: true,
    ignoreUnusedConstantsWarnings: true
  }
}

export default configuration
