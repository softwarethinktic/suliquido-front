// import { calendarApi } from "../api";
import { fletesApi } from "../api/fletesApi";
import suliquidoApi from "../api/suliquidoApi";
import { LoginAuthCredentials, UserAuth } from "../interfaces/auth.interface";
import {
  clearErrorMessages,
  onChecking,
  onLogin,
  onLogout /*onLogoutCalendar*/,
} from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useAppSelector((state) => state.auth);
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

  // const startRegister = async ({name,email,password}) => {

  //     dispatch(onChecking());

  //     try {
  //         // const {data} = await calendarApi.post('/auth/new', {name, email, password});
  //         // localStorage.setItem('token', data.token);
  //         // localStorage.setItem('token-init-date', new Date().getTime());

  //         dispatch( onLogin({name: data.name, uid: data.uid}) );
  //     }
  //     catch (error) {
  //         dispatch( onLogout( error.response.data?.msg || '' ) );
  //         setTimeout(()=>{
  //             dispatch( clearErrorMessages() );
  //         },10);
  //     }
  // }

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
    user,
    errorMessage,
    // Methods
    startLogin,
    startLogout,
    startClearErrorMessages,
    // startRegister,
    checkAuthToken,
  };
};
