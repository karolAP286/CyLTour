import { Usuario } from "./Usuario";

export interface LoginResponse {
    success: boolean;
    user: Usuario;
    token: string;
}