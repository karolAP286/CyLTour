import { useEffect, useState } from "react";
import { Table, message, Tag } from "antd";
import { getRespuestasUsuario } from "../../services/apiService";
import { Respuesta } from "../../types/Respuesta";
import { InfoCircleOutlined } from "@ant-design/icons";

const MisRespuestas = () => {
    const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
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
                setRespuestas(data);
            } catch (error) {
                console.error("Error al cargar respuestas:", error);
                message.error("No se pudieron cargar las respuestas");
            } finally {
                setLoading(false);
            }
        };

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
                return <Tag color="blue">En curso</Tag>;
            case "Aprobado":
                return <Tag color="green">Aprobado</Tag>;
            case "Rechazado":
                return <Tag color="red">Rechazado</Tag>;
            default:
                return <Tag color="default">Desconocido</Tag>;
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
            title: "Fecha",
            dataIndex: "created_at",
            key: "fecha",
            render: (fecha: string) => new Date(fecha).toLocaleDateString(),
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
