import { ALPH_TOKEN_ID, node } from '@alephium/web3'
import { useMemo } from 'react'
import { useBalance } from "@alephium/web3-react"

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
