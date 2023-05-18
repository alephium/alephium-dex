import { NetworkId, web3, networkIds, ONE_ALPH, DUST_AMOUNT } from "@alephium/web3"
import { PrivateKeyWallet } from "@alephium/web3-wallet"
import { EnableFeeCollector } from "../artifacts/ts"
import { loadDeployments } from "../artifacts/ts/deployments"
import { waitTxConfirmed } from "./utils"
import config from "../alephium.config"
import { program, Option } from 'commander'

async function enableFeeCollector(
  feeSetterPrivateKey: string,
  networkId: NetworkId,
  tokenPairId: string
) {
  const network = config.networks[networkId]
  web3.setCurrentNodeProvider(network.nodeUrl)
  const deployments = loadDeployments(networkId)
  const tokenPairFactoryId = deployments.contracts.TokenPairFactory.contractInstance.contractId
  const signer = new PrivateKeyWallet({ privateKey: feeSetterPrivateKey })
  const initialFields = {
    tokenPairFactory: tokenPairFactoryId,
    tokenPair: tokenPairId
  }
  const result = await EnableFeeCollector.execute(signer, {
    initialFields: initialFields,
    attoAlphAmount: ONE_ALPH + DUST_AMOUNT
  })
  await waitTxConfirmed(web3.getCurrentNodeProvider(), result.txId, 1)
  console.log(`EnableFeeCollector tx confirmed, tx id: ${result.txId}`)
}

program
  .description('enable fee collector for token pair')
  .addOption(new Option('--network-id <string>', 'network id').choices(networkIds).makeOptionMandatory())
  .requiredOption('--fee-setter-private-key <string>', 'the private key of the feeSetter')
  .requiredOption('--token-pair-id <string>', 'the contract id of the TokenPair')
  .action(async (opts) => {
    try {
      const privateKey = opts.feeSetterPrivateKey as string
      const networkId = opts.networkId as NetworkId
      const tokenPairId = opts.tokenPairId as string
      await enableFeeCollector(privateKey, networkId, tokenPairId)
    } catch (error) {
      console.log(`Failed to enable fee collector, error: ${error}`)
    }
  })

program.parse()
