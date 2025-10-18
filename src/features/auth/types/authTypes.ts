export interface AuthRequest {
    email: string;
    password: string;
}

export interface TokenResponse {
    access: string;
    refresh: string;
}