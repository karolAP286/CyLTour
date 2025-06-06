import axios from "axios";
import { Usuario } from "../types/Usuario";
import { Comentario } from "../types/Comentario";
import { Respuesta } from "../types/Respuesta";
import { Rol } from "../types/Rol";
import { LoginData } from "../types/LoginData";
import { LoginResponse } from "../types/LoginResponse";
import { RegisterData } from "../types/RegisterData";
import { ClearSession } from "../hooks/ClearSession";

const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Agregar interceptor para insertar el token en cada petición
apiService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("tokenCYLTour");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejo de errores globales
apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            // Error de red o servidor no disponible
            console.error("Servidor no disponible.");
            window.location.href = "/server-error";
        } else {
            const status = error.response.status;

            if (status === 404) {
                window.location.href = "/404";
            } else if (status >= 500 || status === 0) {
                window.location.href = "/server-error";
            }
        }

        return Promise.reject(error);
    }
);

//
// 🚀 USUARIOS
//

export const getUsuarios = async (): Promise<Usuario[]> => {
    const response = await apiService.get<Usuario[]>("/usuarios");
    return response.data;
};

export const getUsuarioById = async (id: number): Promise<Usuario> => {
    const response = await apiService.get<Usuario>(`/usuarios/${id}`);
    return response.data;
};

export const createUsuario = async (
    usuario: Partial<Usuario>
): Promise<Usuario> => {
    const response = await apiService.post<Usuario>("/usuarios", usuario);
    return response.data;
};

export const updateUsuario = async (
    id: number,
    usuario: Partial<Usuario>
): Promise<Usuario> => {
    const response = await apiService.put<Usuario>(`/usuarios/${id}`, usuario);
    return response.data;
};

export const deleteUsuario = async (id: number): Promise<void> => {
    await apiService.delete(`/usuarios/${id}`);
    ClearSession();
};

//
// 🚀 COMENTARIOS
//

export const getComentarios = async (): Promise<Comentario[]> => {
    const response = await apiService.get<Comentario[]>("/comentarios");
    return response.data;
};

export const getComentarioById = async (id: number): Promise<Comentario> => {
    const response = await apiService.get<Comentario>(`/comentarios/${id}`);
    return response.data;
};

export const createComentario = async (
    comentario: Partial<Comentario>
): Promise<Comentario> => {
    const response = await apiService.post<Comentario>(
        "/comentarios",
        comentario
    );
    return response.data;
};

export const updateComentario = async (
    id: number,
    comentario: Partial<Comentario>
): Promise<Comentario> => {
    const response = await apiService.put<Comentario>(
        `/comentarios/${id}`,
        comentario
    );
    return response.data;
};

export const deleteComentario = async (id: number): Promise<void> => {
    await apiService.delete(`/comentarios/${id}`);
};

export const getComentariosAprobados = async (): Promise<Comentario[]> => {
    const response = await apiService.get<Comentario[]>(
        "/comentariosAprobados"
    );
    return response.data;
};

export const getComentariosRechazados = async (): Promise<Comentario[]> => {
    const response = await apiService.get<Comentario[]>(
        "/comentariosRechazados"
    );
    return response.data;
};

export const getComentariosPorMonumento = async (
    monumentoId: string
): Promise<Comentario[]> => {
    const response = await apiService.get<Comentario[]>(
        `/monumentos/${monumentoId}/comentarios`
    );
    return response.data;
};

export const getComentariosUsuario = async (
    id: number
): Promise<Comentario[]> => {
    const response = await apiService.get<Comentario[]>(
        `/comentariosUsuario/${id}`
    );
    return response.data;
};

//
// 🚀 RESPUESTAS
//

export const getRespuestas = async (): Promise<Respuesta[]> => {
    const response = await apiService.get<Respuesta[]>("/respuestas");
    return response.data;
};

export const getRespuestaById = async (id: number): Promise<Respuesta> => {
    const response = await apiService.get<Respuesta>(`/respuestas/${id}`);
    return response.data;
};

export const createRespuesta = async (
    respuesta: Partial<Respuesta>
): Promise<Respuesta> => {
    const response = await apiService.post<Respuesta>("/respuestas", respuesta);
    return response.data;
};

export const updateRespuesta = async (
    id: number,
    respuesta: Partial<Respuesta>
): Promise<Respuesta> => {
    const response = await apiService.put<Respuesta>(
        `/respuestas/${id}`,
        respuesta
    );
    return response.data;
};

export const deleteRespuesta = async (id: number): Promise<void> => {
    await apiService.delete(`/respuestas/${id}`);
};

export const getRespuestasUsuario = async (
    id: number
): Promise<Respuesta[]> => {
    const response = await apiService.get<Respuesta[]>(
        `/respuestasUsuario/${id}`
    );
    return response.data;
};

//
// 🚀 ROLES
//

export const getRoles = async (): Promise<Rol[]> => {
    const response = await apiService.get<Rol[]>("/roles");
    return response.data;
};

export const getRolById = async (id: number): Promise<Rol> => {
    const response = await apiService.get<Rol>(`/roles/${id}`);
    return response.data;
};

export const createRol = async (rol: Partial<Rol>): Promise<Rol> => {
    const response = await apiService.post<Rol>("/roles", rol);
    return response.data;
};

export const updateRol = async (
    id: number,
    rol: Partial<Rol>
): Promise<Rol> => {
    const response = await apiService.put<Rol>(`/roles/${id}`, rol);
    return response.data;
};

export const deleteRol = async (id: number): Promise<void> => {
    await apiService.delete(`/roles/${id}`);
};

//
// 👩‍💼 LOGIN REGISTER LOGOUT
//

export const login = async (data: LoginData): Promise<LoginResponse> => {
    const response = await apiService.post<LoginResponse>("/login", data);
    return response.data;
};

export const logout = async () => {
    let message = "Sesión cerrada correctamente.";
    try {
        const response = await apiService.post("/logout");
        message = response.data?.message || message;
    } catch (err: any) {
        if (err.response?.status === 401) {
            console.warn("Token inválido o expirado, cerrando sesión local.");
            message = "Sesión expirada. Has sido desconectado.";
        } else {
            throw err;
        }
    } finally {
        ClearSession();
        window.dispatchEvent(new Event("sessionChanged"));
    }

    return { success: true, message };
};

export const register = async (data: RegisterData) => {
    const response = await apiService.post("/register", data);
    return response.data;
};
export default apiService;
