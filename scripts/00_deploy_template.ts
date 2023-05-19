import { Deployer, DeployFunction } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { TokenPair } from '../artifacts/ts'

const deployTokenPairTemplate: DeployFunction<Settings> = async (deployer: Deployer): Promise<void> => {
  const initialFields = {
    tokenPairFactory: '',
    token0Id: '',
    token1Id: '',
    reserve0: 0n,
    reserve1: 0n,
    blockTimeStampLast: 0n,
    price0CumulativeLast: 0n,
    price1CumulativeLast: 0n,
    totalSupply: 0n,
    kLast: 0n,
    feeCollectorId: ''
  }
  const result = await deployer.deployContract(TokenPair, { initialFields: initialFields })
  console.log(`TokenPair template contract address: ${result.contractInstance.address}, contract id: ${result.contractInstance.contractId}`)
}

export default deployTokenPairTemplate
