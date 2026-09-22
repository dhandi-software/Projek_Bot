export interface LoginCredentials {
    email?: string;
    username?: string; 
    password?: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    phone?: string;
    password: string;
    address?: string;
}

export interface User {
    id: number;
    username?: string;
    name: string;
    role: 'admin' | 'customer';
    token?: string; 
    email?: string;
    phone?: string;
    photo?: string;
    address?: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}
