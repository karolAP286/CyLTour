import axios from "axios";
import { Provincia } from "../types/Provincia";
import { Clasificacion } from "../types/Clasificacion";

const datosAbiertosService = axios.create({
    baseURL:
        "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/relacion-monumentos/records?",
});


// Interceptor para manejo de errores globales
datosAbiertosService.interceptors.response.use(
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

export const getProvincia = async (): Promise<Provincia[]> => {
    const response = await datosAbiertosService.get("", {
        params: {
            select: "count(identificador) as monumentos_provincia",
            group_by: "poblacion_provincia",
            order_by: "poblacion_provincia",
        },
    });
    return response.data.results;
};

export const getMonumentosPorProvincia = async (
    provincia: string,
    clasificacion: string,
    pagina: number
) => {
    const pag = pagina - 1;
    const limite = pag * 10;
    const response = await datosAbiertosService.get("", {
        params: {
            where: `poblacion_provincia="${provincia}"`,
            refine: `clasificacion:"${clasificacion}"`,
            order_by: "identificador",
            limit: 10,
            offset: limite,
        },
    });
    return response.data;
};

export const getClasificacion = async (
    provincia: string
): Promise<Clasificacion[]> => {
    const response = await datosAbiertosService.get("", {
        params: {
            select: "count(identificador) as total_monumentos",
            refine: `poblacion_provincia:"${provincia}"`,
            group_by: "clasificacion",
            order_by: "total_monumentos",
        },
    });

    return response.data.results;
};

export const getMonumentoById = async (id: string) => {
    const response = await datosAbiertosService.get("", {
        params: {
            refine: `identificador:"${id}"`,
            limit: 1,
        },
    });
    return response.data.results[0];
};

export const getMonumentos = async () => {
    const response = await datosAbiertosService.get("");
    return response.data;
};

export default datosAbiertosService;
