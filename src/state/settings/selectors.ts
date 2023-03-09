import { RootState } from "..";

export const selectSlippageTolerance = (state: RootState) => state.settings.slippageTolerance
export const selectDeadline = (state: RootState) => state.settings.deadline
