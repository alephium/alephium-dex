import { SignerProvider, Address, groupOfAddress, web3, ALPH_TOKEN_ID, node } from '@alephium/web3'
import { useEffect, useState } from 'react'
import { useAccount, useContext } from "@alephium/web3-react"

export class AlephiumWallet {
  signer: SignerProvider
  address: Address
  group: number
  balances: Map<string, bigint>

  constructor(signerProvider: SignerProvider, address: Address, balances: Map<string, bigint>) {
    this.signer = signerProvider
    this.address = address
    this.group = groupOfAddress(address)
    this.balances = balances
  }
}

export function useAlephiumWallet() {
  const context = useContext()
  const { account, isConnected } = useAccount()
  const [wallet, setWallet] = useState<AlephiumWallet | undefined>(undefined)

  useEffect(() => {
    if (isConnected && account !== undefined) {
      getBalance(account.address).then((balances) => {
        if (context.signerProvider !== undefined) {
          setWallet(new AlephiumWallet(context.signerProvider, account.address, balances))
        }
      })
    } else {
      setWallet(undefined)
    }
  }, [account, isConnected, context])

  return wallet
}

async function getBalance(address: string): Promise<Map<string, bigint>> {
  const balances = new Map<string, bigint>()
  const result = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(address)
  const alphAmount = BigInt(result.balance) - BigInt(result.lockedBalance)
  balances.set(ALPH_TOKEN_ID, alphAmount)
  const tokens: node.Token[] = result.tokenBalances ?? []
  for (const token of tokens) {
    const locked = BigInt(result.lockedTokenBalances?.find((t) => t.id === token.id)?.amount ?? '0')
    const tokenAmount = BigInt(token.amount) - locked
    balances.set(token.id, tokenAmount)
  }
  return balances
}
