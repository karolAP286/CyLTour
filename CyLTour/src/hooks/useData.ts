import { useState, useEffect } from "react";
import { getComentariosRechazados, getUsuarios } from "../services/apiService";
import { getMonumentos } from "../services/datosAbiertosService";
import { dataAdmin } from "../types/dataAdmin";

export const useData = (): dataAdmin => {
    const [data, setData] = useState<dataAdmin>({
        usuarios: 0,
        monumentos: 0,
        comentariosRechazados: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usuariosData, monumentosData, comentariosData] = await Promise.all([
                    getUsuarios(),
                    getMonumentos(),
                    getComentariosRechazados(),
                ]);


                setData({
                    usuarios:  usuariosData.length,
                    monumentos: monumentosData.total_count,
                    comentariosRechazados: comentariosData.length,
                });
            } catch (error) {
                console.error("Error al obtener datos del panel:", error);
            }
        };

        fetchData();
    }, []);

    return data;
};
