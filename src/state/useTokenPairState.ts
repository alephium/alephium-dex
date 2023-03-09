import { TokenInfo } from "@alephium/token-list"
import { getTokenPairState, TokenPairState } from "../utils/dex"
import { useState, useEffect, useMemo } from 'react'

export function useTokenPairState(
  token0Info: TokenInfo | undefined,
  token1Info: TokenInfo | undefined
): { tokenPairState: TokenPairState | undefined, getTokenPairStateError: string | undefined } {
  const [state, setState] = useState<TokenPairState | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setError(undefined)
    if (token0Info !== undefined && token1Info !== undefined) {
      setIsLoading(true)
      getTokenPairState(token0Info, token1Info)
        .then((state) => {
          setIsLoading(false)
          setState(state)
        })
        .catch((error) => {
          setIsLoading(false)
          setError(`${error}`)
          setState(undefined)
        })
    }
  }, [token0Info, token1Info])

  return useMemo(() => {
    return isLoading
      ? { tokenPairState: undefined, getTokenPairStateError: undefined }
      : { tokenPairState: state, getTokenPairStateError: error }
  }, [isLoading, state, error])
}