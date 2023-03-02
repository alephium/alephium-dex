import { groupOfAddress } from '@alephium/web3'
import { default as devnetDeploymentJson } from '../../../.deployments.devnet.json'
import { default as testnetDeploymentJson } from '../../../.deployments.testnet.json'

export interface NetworkConfig {
  networkId: number
  groupIndex: number
  factoryId: string
  routerId: string
}

export type NetworkName = 'mainnet' | 'testnet' | 'devnet'

export const networkName: NetworkName = process.env.REACT_APP_NETWORK as NetworkName

export const network: NetworkConfig = getNetworkConfig(networkName)

export const checkTxConfirmedFrequency = networkName === 'devnet' ? 1 : 15 // seconds
export const eventPollingInterval = networkName === 'devnet' ? 1 : 15 // seconds

function getNetworkConfig(network: NetworkName): NetworkConfig {
  if (network === 'mainnet') {
    throw new Error('Not support now')
  }

  const deploymentJson = network === 'testnet' ? testnetDeploymentJson : devnetDeploymentJson
  const deployAddress = Object.keys(deploymentJson)[0]
  const deployment = (deploymentJson as any)[deployAddress]
  return {
    networkId: network === 'testnet' ? 1 : 4,
    groupIndex: groupOfAddress(deployAddress),
    factoryId: deployment.deployContractResults.TokenPairFactory.contractId,
    routerId: deployment.deployContractResults.Router.contractId
  }
}
