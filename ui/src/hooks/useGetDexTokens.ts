import {
  web3,
  addressFromContractId,
  EventSubscription,
  SubscribeOptions,
  Subscription
} from "@alephium/web3";
import { useEffect, useMemo, useState } from "react";
import { TokenPairFactory, TokenPairFactoryTypes } from "../contracts/ts";
import { DexTokens, getTokenInfo } from "../utils/dex";

function useGetDexTokens(factoryId: string): {
  subscription: EventSubscription | undefined
  dexTokens: DexTokens
} {
  const [dexTokens, setDexTokens] = useState<DexTokens>(new DexTokens())
  const [subscription, setSubscription] = useState<EventSubscription | undefined>(undefined)

  useEffect(() => {
    const messageCallback = async (event: TokenPairFactoryTypes.PairCreatedEvent) => {
      const token0Id = event.fields.token0
      const token1Id = event.fields.token1
      const token0Address = addressFromContractId(token0Id)
      const token1Address = addressFromContractId(token1Id)
      const tokenPairId = event.fields.pair
      const token0Info = await getTokenInfo(web3.getCurrentNodeProvider(), token0Id)
      if (token0Info === undefined) {
        console.log(`Ignore invalid token info, token id: ${token0Id}`)
        return
      }
      const token1Info = await getTokenInfo(web3.getCurrentNodeProvider(), token1Id)
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
      console.error(`Subscription error: ${error}`)
      return Promise.resolve()
    }
    const options: SubscribeOptions<TokenPairFactoryTypes.PairCreatedEvent> = {
      pollingInterval: 5000,
      messageCallback: messageCallback,
      errorCallback: errorCallback
    }
    const factoryAddress = addressFromContractId(factoryId)
    const subscription = TokenPairFactory.at(factoryAddress).subscribePairCreatedEvent(options)
    setSubscription(subscription)
  }, [factoryId])

  return useMemo(() => {
    return {
      subscription,
      dexTokens 
    }
  }, [subscription, dexTokens])
}

export default useGetDexTokens;
