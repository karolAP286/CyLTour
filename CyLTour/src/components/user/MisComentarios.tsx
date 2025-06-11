import { useEffect, useState } from "react";
import { Table, Tag, message, Button, Popconfirm } from "antd";
import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    getComentariosUsuario,
    deleteComentario,
} from "../../services/apiService";
import { Comentario } from "../../types/Comentario";
import { getMonumentoById } from "../../services/datosAbiertosService";

const MisComentarios = () => {
    const [comentarios, setComentarios] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleting, setDeleting] = useState<number | null>(null);

    const fetchComentarios = async () => {
        try {
            const encodedId = localStorage.getItem("user_id");
            if (!encodedId) {
                message.error("Usuario no autenticado");
                return;
            }

            const decodedId = atob(encodedId);
            const userId = parseInt(decodedId, 10);

            if (isNaN(userId)) {
                message.error("ID de usuario inválido");
                return;
            }

            const data = await getComentariosUsuario(userId);
            
            const monumentoCache: Record<number, string> = {};

            const comentariosConMonumento = await Promise.all(
                data.map(async (comentario: Comentario) => {
                    if (monumentoCache[comentario.monumento_id]) {
                        return {
                            ...comentario,
                            monumentoNombre: monumentoCache[comentario.monumento_id],
                        };
                    }

                    try {
                        const monumento = await getMonumentoById(comentario.monumento_id.toString());
                        monumentoCache[comentario.monumento_id] = monumento.nombre;
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
            message.error("No se pudieron cargar los comentarios");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComentarios();
    }, []);

    const handleDelete = async (comentarioId: number) => {
        setDeleting(comentarioId);
        try {
            await deleteComentario(comentarioId);
            message.success("Comentario eliminado");
            fetchComentarios();
        } catch (error) {
            console.error("Error al eliminar comentario:", error);
            message.error("No se pudo eliminar el comentario");
        } finally {
            setDeleting(null);
        }
    };

    const columns = [
        {
            title: "Monumento",
            dataIndex: "monumentoNombre",
            key: "monumento",
        },
        {
            title: "Contenido",
            dataIndex: "contenido",
            key: "contenido",
        },
        {
            title: "Puntuación",
            dataIndex: "puntuacion",
            key: "puntuacion",
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
                    return <Tag color="blue">En curso</Tag>;
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
            render: (_: any, record: Comentario) => (
                <Popconfirm
                    title="¿Estás seguro de que deseas eliminar este comentario?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Sí"
                    cancelText="No"
                >
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        loading={deleting === record.id}
                    >
                        Eliminar
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            <h2>Mis Comentarios</h2>
            <Table
                columns={columns}
                dataSource={comentarios}
                rowKey="id"
                loading={loading}
                locale={{
                    emptyText: loading ? null : (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <InfoCircleOutlined
                                style={{ fontSize: 24, color: "#999" }}
                            />
                            <p style={{ marginTop: 8 }}>
                                No tienes comentarios
                            </p>
                        </div>
                    ),
                }}
            />
        </div>
    );
};

export default MisComentarios;
