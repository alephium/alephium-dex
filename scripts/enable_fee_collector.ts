import { NetworkId, web3, networkIds, SignExecuteScriptTxParams, addressFromPublicKey, TransactionBuilder, ONE_ALPH, DUST_AMOUNT } from "@alephium/web3"
import { EnableFeeCollector } from "../artifacts/ts"
import { loadDeployments } from "../artifacts/ts/deployments"
import config from "../alephium.config"
import { program, Option } from 'commander'

async function enableFeeCollector(
  feeSetterPublicKey: string,
  networkId: NetworkId,
  tokenPairId: string
) {
  const network = config.networks[networkId]
  web3.setCurrentNodeProvider(network.nodeUrl)
  const deployments = loadDeployments(networkId)
  const tokenPairFactoryId = deployments.contracts.TokenPairFactory.contractInstance.contractId
  const initialFields = {
    tokenPairFactory: tokenPairFactoryId,
    tokenPair: tokenPairId
  }
  const feeSetterAddress = addressFromPublicKey(feeSetterPublicKey)
  const params: SignExecuteScriptTxParams = {
    signerAddress: feeSetterAddress,
    signerKeyType: 'default',
    bytecode: EnableFeeCollector.script.buildByteCodeToDeploy(initialFields),
    attoAlphAmount: ONE_ALPH + DUST_AMOUNT
  }
  const buildUnsignedTxResult = await TransactionBuilder.from(web3.getCurrentNodeProvider()).buildExecuteScriptTx(params, feeSetterPublicKey)
  console.log(`EnableFeeCollector tx id: ${buildUnsignedTxResult.txId}, unsigned tx: ${buildUnsignedTxResult.unsignedTx}`)
}

program
  .description('build unsigned tx used to enable token pair fee collector')
  .addOption(new Option('--network-id <string>', 'network id').choices(networkIds).makeOptionMandatory())
  .requiredOption('--fee-setter-public-key <string>', 'the public key of the feeSetter')
  .requiredOption('--token-pair-id <string>', 'the contract id of the TokenPair')
  .action(async (opts) => {
    try {
      const publicKey = opts.feeSetterPublicKey as string
      const networkId = opts.networkId as NetworkId
      const tokenPairId = opts.tokenPairId as string
      await enableFeeCollector(publicKey, networkId, tokenPairId)
    } catch (error) {
      console.log(`Failed to build unsgined tx, error: ${error}`)
    }
  })

program.parse()
