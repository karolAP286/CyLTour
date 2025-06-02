import { useEffect, useState } from "react";
import { Table, Tag, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { getComentariosUsuario } from "../../services/apiService";
import { Comentario } from "../../types/Comentario";

const MisComentarios = () => {
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
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
                setComentarios(data);
            } catch (error) {
                console.error("Error al cargar comentarios:", error);
                message.error("No se pudieron cargar los comentarios");
            } finally {
                setLoading(false);
            }
        };

        fetchComentarios();
    }, []);

    const columns = [
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
            dataIndex: "estado",
            key: "estado",
            render: (estado: boolean) =>
                estado ? (
                    <Tag color="green">Aprobado</Tag>
                ) : (
                    <Tag color="red">Rechazado</Tag>
                ),
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
