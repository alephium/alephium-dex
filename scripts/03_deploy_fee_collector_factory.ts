import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { FeeCollectorFactoryImpl, FeeCollectorImpl } from '../artifacts/ts'

const deployFeeCollectorFactory: DeployFunction<Settings> = async (deployer: Deployer): Promise<void> => {
  const feeCollectorTemplateInitialFields = {
    tokenPairFactory: '',
    tokenPairId: ''
  }
  const feeCollectorTemplateResult = await deployer.deployContract(FeeCollectorImpl, { initialFields: feeCollectorTemplateInitialFields })
  const tokenPairFactoryId = deployer.getDeployContractResult('TokenPairFactory').contractInstance.contractId
  const feeCollectorFactoryInitialFields = {
    feeCollectorTemplateId: feeCollectorTemplateResult.contractInstance.contractId,
    tokenPairFactory: tokenPairFactoryId
  }
  const feeCollectorFactoryResult = await deployer.deployContract(FeeCollectorFactoryImpl, { initialFields: feeCollectorFactoryInitialFields })
  console.log(`FeeCollectorFactory contract address: ${feeCollectorFactoryResult.contractInstance.address}, contract id: ${feeCollectorFactoryResult.contractInstance.contractId}`)
}

export default deployFeeCollectorFactory
