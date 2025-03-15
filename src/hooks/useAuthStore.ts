// import { calendarApi } from "../api";
import { fletesApi } from "../api/fletesApi";
import suliquidoApi from "../api/suliquidoApi";
import { LoginAuthCredentials, UserAuth } from "../interfaces/auth.interface";
import {
  clearErrorMessages,
  onChecking,
  onLoading,
  onLogin,
  onLogout /*onLogoutCalendar*/,
  onValidateOTP,
} from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

export const useAuthStore = () => {
  const { status, user, errorMessage, isOTPvalid, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const startLogin = async (userCredentials: LoginAuthCredentials) => {
    dispatch(onChecking());

    try {
      const { data } = await suliquidoApi.post("/auth/login", userCredentials);
      const { token, user } = data as { token: string; user: UserAuth };
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());

      dispatch(onLogin({ user }));
    } catch (error: any) {
      const errorMessage = error.response?.data?.msg || "Error en el servidor";

      dispatch(onLogout({ errorMessage }));
    }
  };

  const startRegister = async ({
    name,
    password,
    otpCode,
  }: {
    name: string;
    password: string;
    otpCode: string;
  }) => {
    dispatch(onChecking());

    try {
      const { data } = await suliquidoApi.post(
        "/auth/register",
        {
          name,
          password,
        },
        {
          headers: {
            "otp-code": otpCode, // OTP code
          },
        }
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());

      dispatch(onLogin({ user: data.user }));
    } catch (error: any) {
      dispatch(onLogout({errorMessage: error.response.data?.msg || ""}));
    }
  };
  const checkOTPcode = async (otp: string) => {
    if (otp.length === 0 || !otp) {
      dispatch(onValidateOTP(false));
      return;
    }
    dispatch(onLoading());
    try {
      const { data } = await suliquidoApi.get("/otp/validate", {
        headers: {
          "otp-code": otp,
        },
      });
      dispatch(onValidateOTP(data.ok));
    } catch (error: any) {
      dispatch(onValidateOTP(false));
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout({}));

    try {
      const { data } = await suliquidoApi.post("/auth/renew");
      const { token, user } = data as { token: string; user: UserAuth };
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ user }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout({}));
    }
  };

  const startClearErrorMessages = () => {
    dispatch(clearErrorMessages());
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(fletesApi.util.resetApiState());
    dispatch(onLogout({ errorMessage: undefined }));
    // dispatch( onLogoutCalendar() );
  };

  return {
    // Props
    status,
    isLoading,
    isOTPvalid,
    user,
    errorMessage,
    // Methods
    startLogin,
    startRegister,
    startLogout,
    startClearErrorMessages,
    // startRegister,
    checkAuthToken,
    checkOTPcode,
  };
};
