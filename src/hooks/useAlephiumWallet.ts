import { SignerProvider, Address, groupOfAddress, web3, ALPH_TOKEN_ID, node, NodeProvider } from '@alephium/web3'
import { useMemo } from 'react'
import { useAccount, useContext, useBalance } from "@alephium/web3-react"

export class AlephiumWallet {
  signer: SignerProvider
  address: Address
  group: number
  nodeProvider: NodeProvider

  constructor(signerProvider: SignerProvider, address: Address, nodeProvider: NodeProvider) {
    this.signer = signerProvider
    this.address = address
    this.group = groupOfAddress(address)
    this.nodeProvider = nodeProvider
  }
}

export function useAlephiumWallet() {
  const context = useContext()
  const { account, isConnected } = useAccount()

  return useMemo(() => {
    if (context.signerProvider?.nodeProvider === undefined) {
      return undefined
    }
    web3.setCurrentNodeProvider(context.signerProvider.nodeProvider)
    if (isConnected && account !== undefined) {
      return new AlephiumWallet(context.signerProvider, account.address, context.signerProvider.nodeProvider)
    }
    return undefined
  }, [account, isConnected, context])
}

export function useAvailableBalances() {
  const balance = useBalance()
  return useMemo(() => getAvailableBalances(balance.balance), [balance])
}

function getAvailableBalances(rawBalance: node.Balance | undefined): Map<string, bigint> {
  const balances = new Map<string, bigint>()
  if (rawBalance === undefined) {
    return balances
  }
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
