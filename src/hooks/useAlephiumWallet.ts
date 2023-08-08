import { SignerProvider, Address, web3, ALPH_TOKEN_ID, node, NodeProvider } from '@alephium/web3'
import { useMemo } from 'react'
import { useAlephiumConnectContext, useBalance } from "@alephium/web3-react"

export interface AlephiumWallet {
  signer: SignerProvider
  address: Address
  group: number
  nodeProvider: NodeProvider
}

export function useAlephiumWallet() {
  const context = useAlephiumConnectContext();

  return useMemo(() => {
    if (context.signerProvider?.nodeProvider === undefined) {
      return undefined;
    }
    web3.setCurrentNodeProvider(context.signerProvider.nodeProvider);
    if (context.account !== undefined) {
      return {
        signer: context.signerProvider,
        address: context.account.address,
        group: context.account.group,
        nodeProvider: context.signerProvider.nodeProvider
      }
    }
    return undefined;
  }, [context.signerProvider, context.account]);
}

export function useAvailableBalances() {
  const { balance, updateBalanceForTx } = useBalance()
  return useMemo(() => {
    return { balance: getAvailableBalances(balance), updateBalanceForTx }
  }, [balance, updateBalanceForTx])
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
