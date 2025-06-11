import { useEffect, useState } from "react";
import { Button, Table, Tag, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
    getRespuestas,
    updateRespuesta,
    getComentarioById,
} from "../../services/apiService";
import { Respuesta } from "../../types/Respuesta";
import { getMonumentoById } from "../../services/datosAbiertosService";

const RespuestasAdmin = () => {
    const [respuestas, setRespuestas] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingTable, setLoadingTable] = useState(true);

    const fetchRespuestas = async () => {
        try {
            const data = await getRespuestas();

            const respuestasConDatos = await Promise.all(
                data.map(async (respuesta: Respuesta) => {
                    try {
                        const comentario = await getComentarioById(
                            respuesta.comentario_id
                        );
                        const monumento = await getMonumentoById(
                            comentario.monumento_id.toString()
                        );

                        return {
                            ...respuesta,
                            comentarioContenido: comentario.contenido,
                            monumentoNombre: monumento.nombre,
                        };
                    } catch (error) {
                        console.error(
                            "Error obteniendo datos relacionados:",
                            error
                        );
                        return {
                            ...respuesta,
                            comentarioContenido: "Desconocido",
                            monumentoNombre: "Desconocido",
                        };
                    }
                })
            );

            const sinAprobadas = respuestasConDatos.filter(
                (respuesta) => !respuesta.contenido.trim().endsWith("1")
            );

            setRespuestas(sinAprobadas);
        } catch (error) {
            console.error("Error al cargar respuestas:", error);
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        fetchRespuestas();
    }, []);

    const handleAprobarRespuesta = async (
        respuestaId: number,
        data: Respuesta
    ) => {
        setLoading(true);
        try {
            const contenidoAprobado = data.contenido.trim() + "1";
            await updateRespuesta(respuestaId, {
                ...data,
                contenido: contenidoAprobado,
            });
            message.success("Respuesta aprobada correctamente");
            fetchRespuestas();
        } catch (error) {
            console.error(error);
            message.error("Error al aprobar la respuesta");
        } finally {
            setLoading(false);
        }
    };

    const handleRechazarRespuesta = async (
        respuestaId: number,
        data: Respuesta
    ) => {
        setLoading(true);
        try {
            const contenidoRechazado = data.contenido.trim() + "0";
            await updateRespuesta(respuestaId, {
                ...data,
                contenido: contenidoRechazado,
            });
            message.success("Respuesta rechazada correctamente");
            fetchRespuestas();
        } catch (error) {
            console.error(error);
            message.error("Error al rechazar la respuesta");
        } finally {
            setLoading(false);
        }
    };

    const determinarEstado = (respuesta: Respuesta) => {
        const mismoTiempo =
            new Date(respuesta.created_at).getTime() ===
            new Date(respuesta.updated_at).getTime();
        const contenido = respuesta.contenido.trim();

        if (contenido.endsWith("1")) {
            return <Tag color="green">Aprobada</Tag>;
        } else if (contenido.endsWith("0")) {
            return <Tag color="red">Rechazada</Tag>;
        } else if (mismoTiempo) {
            return <Tag color="orange">Pendiente</Tag>;
        } else {
            return <Tag color="default">Desconocido</Tag>;
        }
    };

    const columns = [
        {
            title: "Autor",
            dataIndex: ["usuario", "nombre"],
            key: "autor",
        },
        {
            title: "Respuesta",
            dataIndex: "contenido",
            key: "contenido",
            render: (contenido: string) => contenido.slice(0, -1),
        },
        {
            title: "Comentario original",
            dataIndex: "comentarioContenido",
            key: "comentarioContenido",
        },
        {
            title: "Monumento",
            dataIndex: "monumentoNombre",
            key: "monumentoNombre",
        },
        {
            title: "Estado",
            key: "estado",
            render: (_: any, record: Respuesta) => determinarEstado(record),
        },
        {
            title: "Fecha",
            dataIndex: "created_at",
            key: "fecha",
            render: (fecha: string) => new Date(fecha).toLocaleDateString(),
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (_: any, record: Respuesta) => {
                const contenido = record.contenido.trim();
                const isRechazado =
                    new Date(record.created_at).getTime() !=
                        new Date(record.updated_at).getTime() &&
                    contenido.endsWith("0");

                return (
                    <>
                        <Button
                            type="primary"
                            onClick={() =>
                                handleAprobarRespuesta(record.id, record)
                            }
                            loading={loading}
                            style={{ marginRight: 8 }}
                        >
                            Aprobar
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() =>
                                handleRechazarRespuesta(record.id, record)
                            }
                            loading={loading}
                            disabled={isRechazado}
                        >
                            {isRechazado ? "Ya rechazado" : "Rechazar"}
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <h2>Respuestas pendientes o rechazadas</h2>
            <Table
                columns={columns}
                dataSource={respuestas}
                rowKey="id"
                loading={loadingTable}
                locale={{
                    emptyText: loadingTable ? null : (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <InfoCircleOutlined
                                style={{ fontSize: 24, color: "#999" }}
                            />
                            <p style={{ marginTop: 8 }}>No hay respuestas</p>
                        </div>
                    ),
                }}
            />
        </div>
    );
};

export default RespuestasAdmin;
