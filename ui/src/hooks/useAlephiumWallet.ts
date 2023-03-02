import { SignerProvider, Address, groupOfAddress, web3, ALPH_TOKEN_ID, node, NodeProvider } from '@alephium/web3'
import { useMemo } from 'react'
import { useAccount, useContext, useBalance } from "@alephium/web3-react"

export class AlephiumWallet {
  signer: SignerProvider
  address: Address
  group: number
  balances: Map<string, bigint>
  nodeProvider: NodeProvider

  constructor(signerProvider: SignerProvider, address: Address, balances: Map<string, bigint>, nodeProvider: NodeProvider) {
    this.signer = signerProvider
    this.address = address
    this.group = groupOfAddress(address)
    this.balances = balances
    this.nodeProvider = nodeProvider
  }
}

export function useAlephiumWallet() {
  const balance = useBalance()
  const context = useContext()
  const { account, isConnected } = useAccount()

  return useMemo(() => {
    if (context.signerProvider?.nodeProvider === undefined) {
      return
    }
    web3.setCurrentNodeProvider(context.signerProvider.nodeProvider)
    if (isConnected && account !== undefined) {
      const availableBalances = getAvailableBalances(balance.balance)
      return new AlephiumWallet(context.signerProvider, account.address, availableBalances, context.signerProvider.nodeProvider)
    }
    return undefined
  }, [account, isConnected, context, balance])
}

function getAvailableBalances(rawBalance: node.Balance | undefined): Map<string, bigint> {
  if (rawBalance === undefined) return new Map<string, bigint>()
  const balances = new Map<string, bigint>()
  const alphAmount = BigInt(rawBalance.balance) - BigInt(rawBalance.lockedBalance)
  balances.set(ALPH_TOKEN_ID, alphAmount)
  const tokens: node.Token[] = rawBalance.tokenBalances ?? []
  for (const token of tokens) {
    const locked = BigInt(rawBalance.lockedTokenBalances?.find((t) => t.id === token.id)?.amount ?? '0')
    const tokenAmount = BigInt(token.amount) - locked
    balances.set(token.id, tokenAmount)
  }
  return balances
}
