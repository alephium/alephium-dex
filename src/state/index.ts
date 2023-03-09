import { configureStore } from "@reduxjs/toolkit";
import settings from "./settings/reducer";
import swap from "./swap/reducer"
import mint from "./mint/reducer"

export const store = configureStore({
  reducer: { settings, swap, mint },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
