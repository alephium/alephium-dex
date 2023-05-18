import { NetworkId, web3, networkIds } from "@alephium/web3"
import { PrivateKeyWallet } from "@alephium/web3-wallet"
import { SetFeeCollectorFactory } from "../artifacts/ts"
import { loadDeployments } from "../artifacts/ts/deployments"
import { waitTxConfirmed } from "./utils"
import config from "../alephium.config"
import { program, Option } from 'commander'

async function setFeeCollectorFactory(
  feeSetterPrivateKey: string,
  networkId: NetworkId,
  feeCollectorFactoryId: string
) {
  const network = config.networks[networkId]
  web3.setCurrentNodeProvider(network.nodeUrl)
  const deployments = loadDeployments(networkId)
  const tokenPairFactoryId = deployments.contracts.TokenPairFactory.contractInstance.contractId
  const signer = new PrivateKeyWallet({ privateKey: feeSetterPrivateKey })
  const initialFields = {
    tokenPairFactory: tokenPairFactoryId,
    feeCollectorFactory: feeCollectorFactoryId
  }
  const result = await SetFeeCollectorFactory.execute(signer, { initialFields: initialFields })
  await waitTxConfirmed(web3.getCurrentNodeProvider(), result.txId, 1)
  console.log(`SetFeeCollectorFactory tx confirmed, tx id: ${result.txId}`)
}

program
  .description('set fee collector factory')
  .addOption(new Option('--network-id <string>', 'network id').choices(networkIds).makeOptionMandatory())
  .requiredOption('--fee-setter-private-key <string>', 'the private key of the feeSetter')
  .requiredOption('--fee-collector-factory-id <string>', 'the contract id of the FeeCollectorFactory')
  .action(async (opts) => {
    try {
      const privateKey = opts.feeSetterPrivateKey as string
      const networkId = opts.networkId as NetworkId
      const feeCollectorFactoryId = opts.feeCollectorFactoryId as string
      await setFeeCollectorFactory(privateKey, networkId, feeCollectorFactoryId)
    } catch (error) {
      console.log(`Failed to set FeeCollectorFactory, error: ${error}`)
    }
  })

program.parse()
