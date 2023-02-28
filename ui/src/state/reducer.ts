import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
  slippageTolerance: number | 'auto'
  deadline: number
}

export const DEFAULT_DEADLINE_FROM_NOW = 60 * 60 // one hour in seconds 
export const DEFAULT_SLIPPAGE = 0.5

export const initialState: UserState = {
  slippageTolerance: 'auto',
  deadline: DEFAULT_DEADLINE_FROM_NOW
}

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    updateSlippageTolerance(state, action) {
      state.slippageTolerance = action.payload.slippageTolerance
    },
    updateDeadline(state, action) {
      state.deadline = action.payload.deadline
    }
  }
})

export const { updateSlippageTolerance, updateDeadline } = stateSlice.actions
export default stateSlice.reducer
