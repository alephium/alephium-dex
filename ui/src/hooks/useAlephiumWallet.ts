import { NodeProvider, SignerProvider, Address, groupOfAddress } from '@alephium/web3'
import { useEffect, useState } from 'react'
import { network, networkName } from '../utils/consts'
import { useAccount, useContext } from "@alephium/web3-react"

export class AlephiumWallet {
  signer: SignerProvider
  address: Address
  group: number
  nodeProvider: NodeProvider

  constructor(signerProvider: SignerProvider, address: Address) {
    this.signer = signerProvider
    this.address = address
    this.group = groupOfAddress(address)
    this.nodeProvider = new NodeProvider(network.nodeHost)
  }
}

export function useAlephiumWallet() {
  const context = useContext()
  const { account, isConnected } = useAccount(networkName)
  const [wallet, setWallet] = useState<AlephiumWallet | undefined>(undefined)

  useEffect(() => {
    if (isConnected && account !== undefined && context.signerProvider !== undefined) {
      setWallet(new AlephiumWallet(context.signerProvider, account.address))
      return
    }
    setWallet(undefined)
  }, [account, isConnected, context])

  return wallet
}
