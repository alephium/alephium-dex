import { Deployer, DeployFunction } from '@alephium/cli'
import { Router } from '../artifacts/ts'

const deployRouter: DeployFunction = async (deployer: Deployer): Promise<void> => {
  const result = await deployer.deployContract(Router, { initialFields: {} })
  console.log(`Router contract address: ${result.contractAddress}, contract id: ${result.contractId}`)
}

export default deployRouter
