import { TokenInfo } from "@alephium/token-list"
import { getTokenPairState, TokenPairState } from "../utils/dex"
import { useState, useEffect } from 'react'

export function useTokenPairState(
  token0Info: TokenInfo | undefined,
  token1Info: TokenInfo | undefined,
  setError: (err: string) => void
) {
  const [state, setState] = useState<TokenPairState | undefined>(undefined)

  useEffect(() => {
    if (token0Info !== undefined && token1Info !== undefined) {
      getTokenPairState(token0Info, token1Info)
        .then((state) => setState(state))
        .catch((error) => setError(error))
    }
  }, [token0Info, token1Info, setError])

  return state
}