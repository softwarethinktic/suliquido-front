import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../hooks/hooks";

const initialState: AuthState = {
  isOTPvalid: false,
  status: "checking", // 'checking' | 'authenticated' | 'not-authenticated'
  isLoading: false,
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
    onLoading: (state /* action */) => {
      state.isLoading = true;
    },
    onValidateOTP: (state, { payload }: { payload: boolean }) => {
      state.isOTPvalid = payload;
      state.isLoading = false;
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
export const {
  onChecking,
  onLoading,
  onValidateOTP,
  onLogin,
  onLogout,
  clearErrorMessages,
} = authSlice.actions;
