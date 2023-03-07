import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { TokenPairFactory } from '../artifacts/ts'
import { Settings } from '../alephium.config'

const deployFactory: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  const tokenPairTemplate = deployer.getDeployContractResult('TokenPair')
  const initialFields = {
    pairTemplateId: tokenPairTemplate.contractId,
    admin: deployer.account.address,
    maxSlippage: network.settings.slippage,
    pairSize: 0n
  }
  const result = await deployer.deployContract(TokenPairFactory, { initialFields: initialFields })
  console.log(`TokenPairFactory contract address: ${result.contractAddress}, contract id: ${result.contractId}`)
}

export default deployFactory
