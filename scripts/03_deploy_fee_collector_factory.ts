import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { FeeCollectorFactoryImpl, FeeCollectorPerTokenPairImpl } from '../artifacts/ts'

const deployFeeCollectorFactory: DeployFunction<Settings> = async (deployer: Deployer): Promise<void> => {
  const feeCollectorPerTokenPairTemplateInitialFields = {
    tokenPairFactory: '',
    tokenPairId: ''
  }
  const feeCollectorPerTokenPairTemplateResult = await deployer.deployContract(FeeCollectorPerTokenPairImpl, { initialFields: feeCollectorPerTokenPairTemplateInitialFields })
  const tokenPairFactoryId = deployer.getDeployContractResult('TokenPairFactory').contractInstance.contractId
  const feeCollectorFactoryInitialFields = {
    feeCollectorPerTokenPairTemplateId: feeCollectorPerTokenPairTemplateResult.contractInstance.contractId,
    tokenPairFactory: tokenPairFactoryId
  }
  const feeCollectorFactoryResult = await deployer.deployContract(FeeCollectorFactoryImpl, { initialFields: feeCollectorFactoryInitialFields })
  console.log(`FeeCollectorFactory contract address: ${feeCollectorFactoryResult.contractInstance.address}, contract id: ${feeCollectorFactoryResult.contractInstance.contractId}`)
}

export default deployFeeCollectorFactory
