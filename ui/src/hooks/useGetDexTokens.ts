import { addressFromContractId, EventSubscription, NodeProvider, SubscribeOptions, Subscription } from "@alephium/web3";
import { useEffect, useMemo, useState } from "react";
import { TokenPairFactory, TokenPairFactoryTypes } from "../contracts/ts";
import { eventPollingInterval, network } from "../utils/consts";
import { DexTokens, getTokenInfo } from "../utils/dex";
import { useAlephiumWallet } from "./useAlephiumWallet";

// TODO: remove this after integrated with token-lists
function useGetDexTokens(): DexTokens {
  const [dexTokens, setDexTokens] = useState<DexTokens>(new DexTokens())
  const [, setSubscription] = useState<EventSubscription | undefined>(undefined)
  const [nodeProvider, setNodeProvider] = useState<NodeProvider | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const wallet = useAlephiumWallet()

  useEffect(() => setNodeProvider(wallet?.signer.nodeProvider), [wallet])

  useEffect(() => {
    if (nodeProvider === undefined) {
      return
    }
    const messageCallback = async (event: TokenPairFactoryTypes.PairCreatedEvent) => {
      const token0Id = event.fields.token0
      const token1Id = event.fields.token1
      const token0Address = addressFromContractId(token0Id)
      const token1Address = addressFromContractId(token1Id)
      const tokenPairId = event.fields.pair
      const token0Info = await getTokenInfo(nodeProvider, token0Id)
      if (token0Info === undefined) {
        console.log(`Ignore invalid token info, token id: ${token0Id}`)
        return
      }
      const token1Info = await getTokenInfo(nodeProvider, token1Id)
      if (token1Info === undefined) {
        console.log(`Ignore invalid token info, token id: ${token1Id}`)
        return
      }
      setDexTokens((current) => {
        const tokenPairs = [{ token0Id, token1Id, token0Address, token1Address, tokenPairId }]
        return current
          .addTokenInfos([token0Info, token1Info])
          .addTokenPairs(tokenPairs)
          .addMappings([[token0Address, [token1Address]], [token1Address, [token0Address]]])
      })
    }
    const errorCallback = (error: any, s: Subscription<TokenPairFactoryTypes.PairCreatedEvent>) => {
      s.unsubscribe()
      setSubscription(undefined)
      setError(`${error}`)
      console.error(`Subscription error: ${error}`)
      return Promise.resolve()
    }
    const options: SubscribeOptions<TokenPairFactoryTypes.PairCreatedEvent> = {
      pollingInterval: eventPollingInterval * 1000,
      messageCallback: messageCallback,
      errorCallback: errorCallback
    }
    setSubscription((previous) => {
      if (previous !== undefined) {
        return previous
      }
      console.log('Subscribe token pair created events')
      const factoryAddress = addressFromContractId(network.factoryId)
      return TokenPairFactory.at(factoryAddress).subscribePairCreatedEvent(options)
    })
  }, [nodeProvider, error])

  return useMemo(() => { return dexTokens }, [dexTokens])
}

export default useGetDexTokens;
