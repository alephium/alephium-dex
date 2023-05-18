import { addressFromContractId, NetworkId, networkIds, subContractId } from "@alephium/web3"
import { loadDeployments } from "../artifacts/ts/deployments"
import { program, Option } from 'commander'

function sortTokens(tokenAId: string, tokenBId: string): [string, string] {
  const tokenA = BigInt('0x' + tokenAId)
  const tokenB = BigInt('0x' + tokenBId)
  return tokenA < tokenB ? [tokenAId, tokenBId] : [tokenBId, tokenAId]
}

async function getTokenPairId(networkId: NetworkId, tokenAId: string, tokenBId: string) {
  const deployments = loadDeployments(networkId)
  const groupIndex = deployments.contracts.TokenPairFactory.contractInstance.groupIndex
  const tokenPairFactoryId = deployments.contracts.TokenPairFactory.contractInstance.contractId
  const [token0Id, token1Id] = sortTokens(tokenAId, tokenBId)
  const tokenPairId = subContractId(tokenPairFactoryId, token0Id + token1Id, groupIndex)
  console.log(`The token pair contract id is: ${tokenPairId}, contract address is: ${addressFromContractId(tokenPairId)}`)
}

program
  .description('get the contract id of TokenPair')
  .addOption(new Option('--network-id <string>', 'network id').choices(networkIds).makeOptionMandatory())
  .requiredOption('--token-a-id <string>', 'the contract id of token A')
  .requiredOption('--token-b-id <string>', 'the contract id of token B')
  .action(async (opts) => {
    try {
      const networkId = opts.networkId as NetworkId
      const tokenAId = opts.tokenAId as string
      const tokenBId = opts.tokenBId as string
      await getTokenPairId(networkId, tokenAId, tokenBId)
    } catch (error) {
      console.log(`Failed to get token pair id, error: ${error}`)
    }
  })

program.parse()
