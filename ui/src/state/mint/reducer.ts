import { TokenInfo } from '../../utils/dex'
import { createReducer } from '@reduxjs/toolkit'
import { reset, selectTokenA, selectTokenB, typeInput } from './actions'

export interface MintState {
  lastInput: 'TokenA' | 'TokenB' | undefined
  inputValue: string | undefined
  otherInputValue: string | undefined // this is used for initial add liquidity
  tokenAInfo: TokenInfo | undefined
  tokenBInfo: TokenInfo | undefined
}

const initialState: MintState = {
  lastInput: undefined,
  inputValue: undefined,
  otherInputValue: undefined,
  tokenAInfo: undefined,
  tokenBInfo: undefined
}

export default createReducer<MintState>(initialState, (builder) =>
  builder
    .addCase(selectTokenA, (state, tokenInfo) => {
      return { ...state, tokenAInfo: tokenInfo.payload }
    })
    .addCase(selectTokenB, (state, tokenInfo) => {
      return { ...state, tokenBInfo: tokenInfo.payload }
    })
    .addCase(typeInput, (state, arg) => {
      const inputValue = arg.payload.value === '' ? undefined : arg.payload.value
      if (arg.payload.hasLiquidity) {
        return {
          ...state,
          lastInput: arg.payload.type,
          inputValue: inputValue,
          otherInputValue: undefined
        }
      }
      if (state.lastInput === undefined || state.lastInput === arg.payload.type) {
        return { ...state, inputValue: inputValue, lastInput: arg.payload.type }
      }
      return {
        ...state,
        lastInput: arg.payload.type,
        inputValue: inputValue,
        otherInputValue: state.inputValue
      }
    })
    .addCase(reset, () => { return initialState })
)
