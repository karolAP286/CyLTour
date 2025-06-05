import { useEffect, useState } from "react";
import { Button, Table, Tag, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
    getComentariosRechazados,
    updateComentario,
} from "../../services/apiService";
import { Comentario } from "../../types/Comentario";

const ComentariosAdmin = () => {
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingTable, setLoadingTable] = useState(true);

    const fetchComentarios = async () => {
        try {
            const data = await getComentariosRechazados();
            setComentarios(data);
        } catch (error) {
            console.error("Error al cargar comentarios:", error);
        } finally {
            setLoadingTable(false);
        }
    };

    useEffect(() => {
        fetchComentarios();
    }, []);

    const handleAprobarComentario = async (
        comentarioId: number,
        data: Comentario
    ) => {
        setLoading(true);
        try {
            await updateComentario(comentarioId, { ...data, estado: true });
            message.success("Comentario aprobado correctamente");
            fetchComentarios(); // recargar lista
        } catch (error) {
            console.error(error);
            message.error("Error al aprobar el comentario");
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
            title: "Correo",
            dataIndex: ["usuario", "correo"],
            key: "correo",
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
        {
            title: "Acciones",
            key: "acciones",
            render: (_: any, record: Comentario) =>
                !record.estado ? (
                    <Button
                        type="primary"
                        onClick={() =>
                            handleAprobarComentario(record.id, record)
                        }
                        loading={loading}
                    >
                        Aprobar
                    </Button>
                ) : null,
        },
    ];

    return (
        <div>
            <h2>Comentarios Rechazados</h2>
                <Table columns={columns} dataSource={comentarios} rowKey="id" loading={loadingTable} locale={{
                    emptyText: loadingTable ? null : (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <InfoCircleOutlined
                                style={{ fontSize: 24, color: "#999" }}
                            />
                            <p style={{ marginTop: 8 }}>No hay comentarios</p>
                        </div>
                    ),
                }}/>
        </div>
    );
};

export default ComentariosAdmin;
