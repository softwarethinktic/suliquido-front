import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store/store'
import { UserAuth } from '../interfaces/auth.interface';


export interface StoreState {
    auth: AuthState;
}

export interface AuthState {
    status?:  'checking' | 'authenticated' | 'not-authenticated';
    user?: UserAuth | {};
    errorMessage?: string;
}
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector