import { groupOfAddress } from '@alephium/web3'
import { RouterInstance, TokenPairFactoryInstance } from '../../artifacts/ts'
import { loadDeployments } from '../../artifacts/ts/deployments'

export interface NetworkConfig {
  networkId: number
  groupIndex: number
  factory: TokenPairFactoryInstance
  router: RouterInstance
}

// TODO: use NetworkId from alephium/web3
export type NetworkName = 'mainnet' | 'testnet' | 'devnet'

export const networkName: NetworkName = process.env.REACT_APP_NETWORK as NetworkName

export const network: NetworkConfig = getNetworkConfig(networkName)

export const PollingInterval = networkName === 'devnet' ? 1 : 5 // seconds

function getNetworkConfig(network: NetworkName): NetworkConfig {
  if (network === 'mainnet') {
    throw new Error('Not support now')
  }

  const deployments = loadDeployments(network)
  if (deployments === undefined) {
    throw new Error(`Please deploy the DEX contract to ${networkName} first`)
  }
  return {
    networkId: network === 'testnet' ? 1 : 4,
    groupIndex: groupOfAddress(deployments.deployerAddress),
    factory: deployments.contracts.TokenPairFactory.contractInstance,
    router: deployments.contracts.Router.contractInstance
  }
}
