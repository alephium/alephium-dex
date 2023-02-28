import { configureStore } from "@reduxjs/toolkit";
import userState from "./reducer";

export const store = configureStore({
  reducer: { userState },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
