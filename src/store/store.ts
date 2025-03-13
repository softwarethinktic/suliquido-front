import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { fletesApi } from "../api/fletesApi";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_MODE } = getEnvVariables();
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [fletesApi.reducerPath]: fletesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fletesApi.middleware),
  devTools: VITE_MODE !== "production",
});
export type AppDispatch = typeof store.dispatch;
