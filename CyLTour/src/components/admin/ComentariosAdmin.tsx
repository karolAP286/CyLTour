import { useEffect, useState } from "react";
import { Button, Table, Tag, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
    getComentariosRechazados,
    updateComentario,
} from "../../services/apiService";
import { Comentario } from "../../types/Comentario";
import { getMonumentoById } from "../../services/datosAbiertosService";

const ComentariosAdmin = () => {
    const [comentarios, setComentarios] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingTable, setLoadingTable] = useState(true);

    const fetchComentarios = async () => {
        try {
            const data = await getComentariosRechazados();

            // Obtener monumentos para cada comentario
            const comentariosConMonumento = await Promise.all(
                data.map(async (comentario: Comentario) => {
                    try {
                        const monumento = await getMonumentoById(comentario.monumento_id.toString());
                        return { ...comentario, monumentoNombre: monumento.nombre };
                    } catch (error) {
                        console.error("Error al obtener monumento:", error);
                        return { ...comentario, monumentoNombre: "Desconocido" };
                    }
                })
            );

            setComentarios(comentariosConMonumento);
        } catch (error) {
            console.error("Error al cargar comentarios:", error);
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        fetchComentarios();
    }, []);

    const handleAprobarComentario = async (comentarioId: number, data: Comentario) => {
        setLoading(true);
        try {
            await updateComentario(comentarioId, { ...data, estado: true });
            message.success("Comentario aprobado correctamente");
            fetchComentarios();
        } catch (error) {
            console.error(error);
            message.error("Error al aprobar el comentario");
        } finally {
            setLoading(false);
        }
    };

    const handleRechazarComentario = async (comentarioId: number, data: Comentario) => {
        setLoading(true);
        try {
            const dataComentario = data.contenido + ".";
            await updateComentario(comentarioId, { ...data, contenido: dataComentario });
            message.success("Comentario rechazado (fecha actualizada)");
            fetchComentarios();
        } catch (error) {
            console.error(error);
            message.error("Error al rechazar el comentario");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: "Autor",
            dataIndex: ["usuario", "nombre"],
            key: "autor",
        },
        {
            title: "Comentario",
            dataIndex: "contenido",
            key: "contenido",
        },
        {
            title: "Puntuación",
            dataIndex: "puntuacion",
            key: "puntuacion",
        },
        {
            title: "Monumento",
            dataIndex: "monumentoNombre",
            key: "monumento",
        },
        {
            title: "Estado",
            key: "estado",
            render: (_: any, record: Comentario) => {
                const isPendiente =
                    !record.estado &&
                    new Date(record.created_at).getTime() ===
                        new Date(record.updated_at).getTime();

                if (record.estado) {
                    return <Tag color="green">Aprobado</Tag>;
                } else if (isPendiente) {
                    return <Tag color="orange">Pendiente</Tag>;
                } else {
                    return <Tag color="red">Rechazado</Tag>;
                }
            },
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
            render: (_: any, record: Comentario) => {
                if (!record.estado) {
                    const isRechazado =
                        new Date(record.created_at).getTime() !==
                        new Date(record.updated_at).getTime();
                    return (
                        <>
                            <Button
                                type="primary"
                                onClick={() =>
                                    handleAprobarComentario(record.id, record)
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
                                    handleRechazarComentario(record.id, record)
                                }
                                loading={loading}
                                disabled={isRechazado}
                            >
                                {isRechazado ? "Ya rechazado" : "Rechazar"}
                            </Button>
                        </>
                    );
                }
                return null;
            },
        },
    ];

    return (
        <div>
            <h2>Comentarios pendientes o rechazados</h2>
            <Table
                columns={columns}
                dataSource={comentarios}
                rowKey="id"
                loading={loadingTable}
                locale={{
                    emptyText: loadingTable ? null : (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <InfoCircleOutlined
                                style={{ fontSize: 24, color: "#999" }}
                            />
                            <p style={{ marginTop: 8 }}>No hay comentarios</p>
                        </div>
                    ),
                }}
            />
        </div>
    );
};

export default ComentariosAdmin;
