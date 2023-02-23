import { default as devnetDeployment } from '../../../.deployments.devnet.json'

export interface Network {
  nodeHost: string
  explorerApiHost: string
  explorerUrl: string
  networkId: number
  groupIndex: number
  factoryId: string
  routerId: string
}

export interface Settings {
  networks: Record<NetworkName, Network>
}

export type NetworkName = 'mainnet' | 'testnet' | 'devnet'

export const networks: Record<NetworkName, Network> = {
  mainnet: {
    nodeHost: 'https://mainnet-wallet.alephium.org',
    explorerApiHost: 'https://mainnet-backend.alephium.org',
    explorerUrl: 'https://explorer.alephium.org',
    networkId: 0,
    groupIndex: 0,
    factoryId: '',
    routerId: ''
  },
  testnet: {
    nodeHost: 'https://testnet-wallet.alephium.org',
    explorerApiHost: 'https://testnet-backend.alephium.org',
    explorerUrl: 'https://testnet.alephium.org',
    networkId: 1,
    groupIndex: 0,
    factoryId: '',
    routerId: ''
  },
  devnet: {
    nodeHost: 'http://localhost:22973',
    explorerApiHost: 'http://localhost:9090',
    explorerUrl: 'http://localhost:3000',
    networkId: 4,
    groupIndex: 0,
    factoryId: devnetDeployment[0].deployContractResults.TokenPairFactory.contractId,
    routerId: devnetDeployment[0].deployContractResults.Router.contractId
  }
}

export const settings: Settings = {
  networks: networks
}

export const networkName: NetworkName = process.env.REACT_APP_NETWORK === 'mainnet'
  ? 'mainnet'
  : process.env.REACT_APP_NETWORK === 'testnet'
  ? 'testnet'
  : "devnet"

export const network: Network = settings.networks[networkName]
