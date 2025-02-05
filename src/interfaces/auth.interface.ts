

export interface LoginAuthCredentials {
    cedula: string;
    password: string;
}

export interface UserAuth {
    uid: string;
    cedula: string;
    name: string;
    email: string;
    role?: string;
}