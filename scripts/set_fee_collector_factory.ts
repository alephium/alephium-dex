import { NetworkId, web3, networkIds, addressFromPublicKey, SignExecuteScriptTxParams, TransactionBuilder } from "@alephium/web3"
import { SetFeeCollectorFactory } from "../artifacts/ts"
import { loadDeployments } from "../artifacts/ts/deployments"
import config from "../alephium.config"
import { program, Option } from 'commander'

async function setFeeCollectorFactory(
  feeSetterPublicKey: string,
  networkId: NetworkId,
  feeCollectorFactoryId: string
) {
  const network = config.networks[networkId]
  web3.setCurrentNodeProvider(network.nodeUrl)
  const deployments = loadDeployments(networkId)
  const tokenPairFactoryId = deployments.contracts.TokenPairFactory.contractInstance.contractId
  const initialFields = {
    tokenPairFactory: tokenPairFactoryId,
    feeCollectorFactory: feeCollectorFactoryId
  }
  const feeSetterAddress = addressFromPublicKey(feeSetterPublicKey)
  const params: SignExecuteScriptTxParams = {
    signerAddress: feeSetterAddress,
    signerKeyType: 'default',
    bytecode: SetFeeCollectorFactory.script.buildByteCodeToDeploy(initialFields)
  }
  const buildUnsignedTxResult = await TransactionBuilder.from(web3.getCurrentNodeProvider()).buildExecuteScriptTx(params, feeSetterPublicKey)
  console.log(`SetFeeCollectorFactory tx id: ${buildUnsignedTxResult.txId}, unsigned tx: ${buildUnsignedTxResult.unsignedTx}`)
}

program
  .description('build unsigned tx used to set fee collector factory')
  .addOption(new Option('--network-id <string>', 'network id').choices(networkIds).makeOptionMandatory())
  .requiredOption('--fee-setter-public-key <string>', 'the public key of the feeSetter')
  .requiredOption('--fee-collector-factory-id <string>', 'the contract id of the FeeCollectorFactory')
  .action(async (opts) => {
    try {
      const publicKey = opts.feeSetterPublicKey as string
      const networkId = opts.networkId as NetworkId
      const feeCollectorFactoryId = opts.feeCollectorFactoryId as string
      await setFeeCollectorFactory(publicKey, networkId, feeCollectorFactoryId)
    } catch (error) {
      console.log(`Failed to build unsigned tx, error: ${error}`)
    }
  })

program.parse()
