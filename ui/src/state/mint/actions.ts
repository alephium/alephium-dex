import { createAction } from '@reduxjs/toolkit'
import { TokenInfo } from '../../utils/dex';

export const selectTokenA = createAction<TokenInfo>('mint/selectTokenA')
export const selectTokenB = createAction<TokenInfo>('mint/selectTokenB')
export const typeInput = createAction<{ type: 'TokenA' | 'TokenB'; value: string; hasLiquidity: boolean }>('mint/typeInput')
export const reset = createAction<void>('mint/reset')
