import { createAction } from '@reduxjs/toolkit'
import { TokenInfo } from '../../utils/dex';

export const selectTokenIn = createAction<TokenInfo>('swap/selectTokenIn')
export const selectTokenOut = createAction<TokenInfo>('swap/selectTokenOut')
export const switchTokens = createAction<void>('swap/switchTokens')
export const typeInput = createAction<{ type: 'TokenIn' | 'TokenOut'; value: string }>('swap/typeInput')
export const reset = createAction<void>('swap/reset')
