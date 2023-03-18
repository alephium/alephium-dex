import { configureStore } from "@reduxjs/toolkit";
import swap from "./swap/reducer"
import mint from "./mint/reducer"

export const store = configureStore({
  reducer: { swap, mint },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
