import { configureStore } from "@reduxjs/toolkit";
import authReduser from "./authSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReduser,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
