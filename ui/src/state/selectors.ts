import { RootState } from ".";

export const selectSlippageTolerance = (state: RootState) => state.userState.slippageTolerance
export const selectDeadline = (state: RootState) => state.userState.deadline
