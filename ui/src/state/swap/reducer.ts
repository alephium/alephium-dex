import { TokenInfo } from '../../utils/dex'
import { createReducer } from '@reduxjs/toolkit'
import { reset, selectTokenIn, selectTokenOut, switchTokens, typeInput } from './actions'

export interface SwapState {
  lastInput: 'TokenIn' | 'TokenOut' | undefined
  inputValue: string | undefined
  tokenInInfo: TokenInfo | undefined
  tokenOutInfo: TokenInfo | undefined
}

const initialState: SwapState = {
  lastInput: undefined,
  inputValue: undefined,
  tokenInInfo: undefined,
  tokenOutInfo: undefined
}

export default createReducer<SwapState>(initialState, (builder) =>
  builder
    .addCase(selectTokenIn, (state, tokenInfo) => {
      return { ...state, tokenInInfo: tokenInfo.payload }
    })
    .addCase(selectTokenOut, (state, tokenInfo) => {
      return { ...state, tokenOutInfo: tokenInfo.payload }
    })
    .addCase(switchTokens, (state) => {
      return {
        ...state,
        lastInput: state.lastInput === undefined ? undefined : state.lastInput === 'TokenIn' ? 'TokenOut' : 'TokenIn',
        tokenInInfo: state.tokenOutInfo,
        tokenOutInfo: state.tokenInInfo
      }
    })
    .addCase(typeInput, (state, arg) => {
      const inputValue = arg.payload.value
      return {
        ...state,
        lastInput: arg.payload.type,
        inputValue: inputValue === '' ? undefined : inputValue
      }
    })
    .addCase(reset, () => { return initialState })
)
