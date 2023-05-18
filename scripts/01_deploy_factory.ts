import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { TokenPairFactory } from '../artifacts/ts'

const deployFactory: DeployFunction<Settings> = async (deployer: Deployer, network: Network<Settings>): Promise<void> => {
  if (network.settings.feeSetter === undefined) {
    throw new Error('Please specify the `feeSetter` in alephium.config.ts')
  }
  const tokenPairTemplate = deployer.getDeployContractResult('TokenPair')
  const initialFields = {
    pairTemplateId: tokenPairTemplate.contractInstance.contractId,
    pairSize: 0n,
    feeSetter: network.settings.feeSetter,
    feeCollectorFactory: '',
  }
  const result = await deployer.deployContract(TokenPairFactory, { initialFields: initialFields })
  console.log(`TokenPairFactory contract address: ${result.contractInstance.address}, contract id: ${result.contractInstance.contractId}`)
}

export default deployFactory
