import { Deployer, DeployFunction } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { Router } from '../artifacts/ts'

const deployRouter: DeployFunction<Settings> = async (deployer: Deployer): Promise<void> => {
  const result = await deployer.deployContract(Router, { initialFields: {} })
  console.log(`Router contract address: ${result.contractInstance.address}, contract id: ${result.contractInstance.contractId}`)
}

export default deployRouter
