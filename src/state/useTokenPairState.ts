import { TokenInfo } from "@alephium/token-list"
import { getPairContractId, getTokenPairState, TokenPairState } from "../utils/dex"
import { useEffect, useReducer, useRef } from 'react'

interface InnerState {
  state: TokenPairState | undefined
  error: string | undefined
}

type Action = {
  type: 'Fetching'
} | {
  type: 'Fetched',
  state: TokenPairState
} | {
  type: 'Error',
  error: string
}

function createReducer(state: InnerState, action: Action): InnerState {
  switch (action.type) {
    case 'Fetched':
      return { state: action.state, error: undefined }
    case 'Fetching':
      return { state: undefined, error: undefined }
    case 'Error':
      return { state: undefined, error: action.error }
  }
}

export function useTokenPairState(
  token0Info: TokenInfo | undefined,
  token1Info: TokenInfo | undefined
): { state: TokenPairState | undefined, error: string | undefined } {
  const cache = useRef<InnerState>({ state: undefined, error: undefined })
  const [state, dispatch] = useReducer(createReducer, { state: undefined, error: undefined })

  useEffect(() => {
    if (token0Info !== undefined && token1Info !== undefined) {
      if (cache.current?.state?.tokenPairId === getPairContractId(token0Info, token1Info)) {
        return
      }
      dispatch({ type: 'Fetching' })
      getTokenPairState(token0Info, token1Info)
        .then((state) => {
          cache.current = { state, error: undefined }
          dispatch({ type: 'Fetched', state })
        })
        .catch((error) => {
          cache.current = { state: undefined, error: `${error}` }
          dispatch({ type: 'Error', error: `${error}` })
        })
    }
  }, [token0Info, token1Info])

  return state
}