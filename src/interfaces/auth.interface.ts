

export interface LoginAuthCredentials {
    documentNumber: string;
    password: string;
}

export interface UserAuth {
    id: string;
    documentNumber: string;
    name: string;
    email: string;
    role?: string;
}