import { addressFromContractId, NetworkId, networkIds, subContractId, web3 } from "@alephium/web3"
import { loadDeployments } from "../artifacts/ts/deployments"
import { program, Option } from 'commander'
import { TokenPairFactory } from "../artifacts/ts"
import config from "../alephium.config"

async function getFeeCollectorId(networkId: NetworkId, tokenPairId: string) {
  const network = config.networks[networkId]
  web3.setCurrentNodeProvider(network.nodeUrl)
  const deployments = loadDeployments(networkId)
  const groupIndex = deployments.contracts.TokenPairFactory.contractInstance.groupIndex
  const tokenPairFactoryAddress = deployments.contracts.TokenPairFactory.contractInstance.address
  const state = await TokenPairFactory.at(tokenPairFactoryAddress).fetchState()
  const feeCollectorFactoryId = state.fields.feeCollectorFactory
  const feeCollectorId = subContractId(feeCollectorFactoryId, tokenPairId, groupIndex)
  console.log(`The fee collector contract id is: ${feeCollectorId}, contract address: ${addressFromContractId(feeCollectorId)}`)
}

program
  .description('get the contract id of TokenPair')
  .addOption(new Option('--network-id <string>', 'network id').choices(networkIds).makeOptionMandatory())
  .requiredOption('--token-pair-id <string>', 'the token pair contract id')
  .action(async (opts) => {
    try {
      const networkId = opts.networkId as NetworkId
      const tokenPairId = opts.tokenPairId as string
      await getFeeCollectorId(networkId, tokenPairId)
    } catch (error) {
      console.error(`Failed to get fee collector id, error: ${error}`)
    }
  })

program.parse()
