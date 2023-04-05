import { Deployer, DeployFunction } from '@alephium/cli'
import { TokenPairFactory } from '../artifacts/ts'

const deployFactory: DeployFunction<undefined> = async (deployer: Deployer): Promise<void> => {
  const tokenPairTemplate = deployer.getDeployContractResult('TokenPair')
  const initialFields = { pairTemplateId: tokenPairTemplate.contractInstance.contractId, pairSize: 0n }
  const result = await deployer.deployContract(TokenPairFactory, { initialFields: initialFields })
  console.log(`TokenPairFactory contract address: ${result.contractInstance.address}, contract id: ${result.contractInstance.contractId}`)
}

export default deployFactory
