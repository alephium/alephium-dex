import { NetworkId } from "@alephium/web3"
import { loadDeployments } from "../../artifacts/ts/deployments"

export interface NetworkConfig {
  groupIndex: number
  factoryId: string
  routerId: string
}

export const networkId: NetworkId = process.env.REACT_APP_NETWORK as NetworkId

export const network: NetworkConfig = getNetworkConfig(networkId)

export const PollingInterval = networkId === 'devnet' ? 1 : 5 // seconds

function getNetworkConfig(networkId: NetworkId): NetworkConfig {
  try {
    const deployments = loadDeployments(networkId)
    return {
      groupIndex: deployments.contracts.Router.contractInstance.groupIndex,
      factoryId: deployments.contracts.TokenPairFactory.contractInstance.contractId,
      routerId: deployments.contracts.Router.contractInstance.contractId
    }
  } catch (error) {
    console.log(`Failed to load deployments on ${networkId}, error: ${error}`)
    throw error
  }
}
