import { useState, useEffect } from "react";
import { getClasificacion } from "../services/datosAbiertosService";

export const useClasificacion = (provincia: string): string[] => {
    const [clasificaciones, setClasificaciones] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getClasificacion(provincia);
                const soloClasificacion = data
                    .filter((p) => p.clasificacion !== null)
                    .map((p) => p.clasificacion as string)
                    .sort((a, b) =>
                        a.localeCompare(b, "es", { sensitivity: "base" })
                    );
                setClasificaciones(soloClasificacion);
            } catch (error) {
                console.error("Error al obtener clasificaciones:", error);
            }
        };

        if (provincia) {
            fetchData();
        }
    }, [provincia]);

    return clasificaciones;
};
