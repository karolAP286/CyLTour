import { useState, useEffect } from "react";
import { getProvincia } from "../services/datosAbiertosService";

export const useProvincias = (): string[] => {
    const [provincias, setProvincias] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProvincia();
                const soloProvincias = data
                    .filter((p) => p.poblacion_provincia !== null)
                    .map((p) => p.poblacion_provincia as string)
                    .sort((a, b) =>
                        a.localeCompare(b, "es", { sensitivity: "base" })
                    );
                setProvincias(soloProvincias);
            } catch (error) {
                console.error("Error al obtener provincias:", error);
            }
        };

        fetchData();
    }, []);

    return provincias;
};
