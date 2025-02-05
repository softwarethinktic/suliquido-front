// import { calendarApi } from "../api";
import { UserAuth } from "../interfaces/auth.interface";
import { clearErrorMessages, onChecking, onLogin, onLogout, /*onLogoutCalendar*/ } from "../store/auth/authSlice";
import { useAppDispatch, /*useAppSelector*/    } from "./hooks";





export const useAuthStore = () => {

    // const { status, user, errorMessage } = useAppSelector( state=> state.auth );
    const dispatch = useAppDispatch();

    const startLogin = async (user: UserAuth) => {

        dispatch(onChecking());

        try {
            // const {data} = await calendarApi.post('/auth', {email, password});
            // localStorage.setItem('token', data.token);
            // localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin({user}) );
        } catch (error:any) {
        // console.log(error);
            const errorMessage = 'Credenciales incorrectas';

            dispatch( onLogout({errorMessage}) );
            setTimeout(()=>{
                dispatch( clearErrorMessages() );
            },10);

        }
    }


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


    // const checkAuthToken = async() =>{

    //     const token = localStorage.getItem('token');
    //     if(!token)    return dispatch( onLogout() );
        
    //     try {
    //         // const { data } = await calendarApi.get('/auth/renew');
    //         localStorage.setItem('token', data.token);
    //         localStorage.setItem('token-init-date', new Date().getTime());
    //         dispatch( onLogin({name: data.name, uid: data.uid}) );
    //     } catch (error) {
    //         localStorage.clear();
    //         dispatch( onLogout() );

    //     }
    // }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout({errorMessage: undefined} ) );
        // dispatch( onLogoutCalendar() );
    }


    return{
        // Props
        // status,  
        // user,
        // errorMessage,
        // Methods
        startLogin,
        startLogout,
        // startRegister,
        // checkAuthToken
    }
}