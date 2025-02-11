import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../hooks/hooks";

const initialState: AuthState = {
  status: "authenticated", // 'checking' | 'authenticated' | 'not-authenticated'
  user: {
    uid: "ABC123",
    cedula: "105323121",
    name: "Gian Melendez",
    email: "gmele@co.co",
    role: "admin",
  },
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state /* action */) => {
      state.status = "checking";
      state.user = undefined;
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }: { payload: AuthState }) => {
      state.status = "authenticated";
      state.user = payload.user;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }: { payload: AuthState }) => {
      state.status = "not-authenticated";
      state.user = undefined;
      state.errorMessage = payload?.errorMessage;
    },
    clearErrorMessages: (state /* action */) => {
      state.errorMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessages } =
  authSlice.actions;
