import axios from "axios";
import { Provincia } from "../types/Provincia";

const datosAbiertosService = axios.create({
    baseURL:
        "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/relacion-monumentos/records?",
});

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
    pagina: number
) => {
    const limite = pagina * 10;
    const response = await datosAbiertosService.get("", {
        params: {
            where: `poblacion_provincia="${provincia}"`,
            order_by: "identificador",
            limit: 10,
            offset: limite,
        },
    });

    return response.data;
};

export default datosAbiertosService;
