import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { fletesApi } from "../api/fletesApi";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [fletesApi.reducerPath]: fletesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat( fletesApi.middleware )
});
export type AppDispatch = typeof store.dispatch 