import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMonumentoById } from "../services/datosAbiertosService";
import { Card, Spin, Alert } from "antd";
import MapaEmbed from "./MapaEmbed";

const MonumentoDetalle = () => {
    const { id } = useParams<{ id: string }>();
    const [monumento, setMonumento] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMonumento = async () => {
            try {
                if (!id) return;
                const data = await getMonumentoById(id);
                setMonumento(data);
            } catch (err) {
                setError("Error al cargar el monumento.");
            } finally {
                setLoading(false);
            }
        };

        fetchMonumento();
    }, [id]);

    if (loading) return <Spin tip="Cargando monumento..." />;
    if (error) return <Alert type="error" message={error} />;

    if (!monumento)
        return <Alert type="warning" message="Monumento no encontrado." />;

    return (
        <Card title={monumento.nombre} style={{ margin: "24px" }}>
            <p>
                <strong>Clasificación:</strong> {monumento.clasificacion}
            </p>
            <p>
                <strong>Tipo:</strong> {monumento.tipomonumento}
            </p>
            <p>
                <strong>Tipo de Construcción:</strong>{" "}
                {monumento.tipoconstruccion?.join(", ")}
            </p>
            <p>
                <strong>Períodos históricos:</strong>{" "}
                {monumento.periodohistorico?.join(", ")}
            </p>
            <p>
                <strong>Código Postal:</strong> {monumento.codigopostal}
            </p>
            <p>
                <strong>Ubicación:</strong> {monumento.poblacion_localidad},{" "}
                {monumento.poblacion_municipio} ({monumento.poblacion_provincia}
                )
            </p>
            <div dangerouslySetInnerHTML={{ __html: monumento.descripcion }} />
            
            <MapaEmbed
                lat={parseFloat(monumento.coordenadas_latitud)}
                lon={parseFloat(monumento.coordenadas_longitud)}
            />
        </Card>
    );
};

export default MonumentoDetalle;
