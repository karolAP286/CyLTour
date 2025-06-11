import { useEffect, useState } from "react";
import { Table, message, Tag, Popconfirm, Button } from "antd";
import {
    deleteRespuesta,
    getComentarioById,
    getRespuestasUsuario,
} from "../../services/apiService";
import { Respuesta } from "../../types/Respuesta";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { getMonumentoById } from "../../services/datosAbiertosService";

const MisRespuestas = () => {
    const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [deleting, setDeleting] = useState<number | null>(null);

    const fetchRespuestas = async () => {
        try {
            const encodedId = localStorage.getItem("user_id");
            if (!encodedId) {
                message.error("Usuario no autenticado");
                return;
            }

            const userId = parseInt(atob(encodedId), 10);
            if (isNaN(userId)) {
                message.error("ID de usuario inválido");
                return;
            }

            const data = await getRespuestasUsuario(userId);

            const respuestasConDatos = await Promise.all(
                data.map(async (respuesta: Respuesta) => {
                    try {
                        const comentario =
                            respuesta.comentario ||
                            (await getComentarioById(respuesta.comentario_id));
                        const monumento = await getMonumentoById(
                            comentario.monumento_id.toString()
                        );

                        return {
                            ...respuesta,
                            comentario: comentario,
                            monumentoNombre: monumento.nombre,
                        };
                    } catch (error) {
                        console.error(
                            "Error al obtener datos relacionados:",
                            error
                        );
                        return {
                            ...respuesta,
                            comentario: respuesta.comentario || {
                                contenido: "Desconocido",
                            },
                            monumentoNombre: "Desconocido",
                        };
                    }
                })
            );

            setRespuestas(respuestasConDatos);
        } catch (error) {
            console.error("Error al cargar respuestas:", error);
            message.error("No se pudieron cargar las respuestas");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchRespuestas();
    }, []);

    const obtenerEstado = (respuesta: Respuesta) => {
        if (respuesta.updated_at === respuesta.created_at) return "En curso";
        const contenido = respuesta.contenido.trim();
        if (contenido.endsWith("0")) return "Rechazado";
        if (contenido.endsWith("1")) return "Aprobado";
        return "Desconocido";
    };

    const limpiarContenido = (contenido: string) => {
        return contenido.trim().replace(/[01]$/, "").trim();
    };

    const renderEstadoTag = (estado: string) => {
        switch (estado) {
            case "En curso":
                return <Tag color="blue">Pendiente de aprobar</Tag>;
            case "Aprobado":
                return <Tag color="green">Aprobado</Tag>;
            case "Rechazado":
                return <Tag color="red">Rechazado</Tag>;
            default:
                return <Tag color="default">Desconocido</Tag>;
        }
    };
    const handleDelete = async (respuestaId: number) => {
        setDeleting(respuestaId);
        try {
            await deleteRespuesta(respuestaId);
            message.success("Respuesta eliminada");
            fetchRespuestas();
        } catch (error) {
            console.error("Error al eliminar respuesta:", error);
            message.error("No se pudo eliminar la respuesta");
        } finally {
            setDeleting(null);
        }
    };

    const columns = [
        {
            title: "Respuesta",
            dataIndex: "contenido",
            key: "contenido",
            render: (contenido: string) => limpiarContenido(contenido),
        },
        {
            title: "Estado",
            key: "estado",
            render: (_: any, record: Respuesta) =>
                renderEstadoTag(obtenerEstado(record)),
        },
        {
            title: "Comentario original",
            dataIndex: ["comentario", "contenido"],
            key: "comentario",
        },
        {
            title: "Monumento",
            dataIndex: "monumentoNombre",
            key: "monumento",
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
            render: (_: any, record: Respuesta) => (
                <Popconfirm
                    title="¿Estás seguro de que deseas eliminar esta respuesta?"
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
            <h2>Mis Respuestas</h2>
            <Table
                columns={columns}
                dataSource={respuestas}
                rowKey="id"
                loading={loading}
                locale={{
                    emptyText: loading ? null : (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <InfoCircleOutlined
                                style={{ fontSize: 24, color: "#999" }}
                            />
                            <p style={{ marginTop: 8 }}>No tienes respuestas</p>
                        </div>
                    ),
                }}
            />
        </div>
    );
};

export default MisRespuestas;
