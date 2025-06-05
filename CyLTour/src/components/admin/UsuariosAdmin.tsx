import { useEffect, useState } from "react";
import { Button, Table, message, Tag } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { getUsuarios, updateUsuario } from "../../services/apiService";
import { Usuario } from "../../types/Usuario";

const UsuariosAdmin = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loadingId, setLoadingId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUsuarios = async () => {
        try {
            const data = await getUsuarios();
            const usuariosConCorreo = data.filter((u) => u.correo !== null);
            setUsuarios(usuariosConCorreo);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleHacerAdmin = async (id: number) => {
        setLoadingId(id);
        try {
            await updateUsuario(id, { rol_id: 2 });
            message.success("Usuario convertido en administrador");
            fetchUsuarios();
        } catch (error) {
            console.error(error);
            message.error("Error al actualizar el rol del usuario");
        } finally {
            setLoadingId(null);
        }
    };
    const columns = [
        {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
        },
        {
            title: "Correo",
            dataIndex: "correo",
            key: "correo",
        },
        {
            title: "Rol",
            dataIndex: ["rol", "rol"],
            key: "rol",
            render: (rol: string) =>
                rol === "Administrador" ? (
                    <Tag color="green">Administrador</Tag>
                ) : (
                    <Tag color="blue">Usuario</Tag>
                ),
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (_: any, record: Usuario) =>
                record.rol?.rol !== "Administrador" ? (
                    <Button
                        type="primary"
                        onClick={() => handleHacerAdmin(record.id)}
                        loading={loadingId === record.id}
                    >
                        Hacer admin
                    </Button>
                ) : null,
        },
    ];

    return (
        <div>
            <h2>Lista de usuarios registrados</h2>
                <Table columns={columns} dataSource={usuarios} rowKey="id" loading={loading}
                locale={{
                    emptyText: loading ? null : (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <InfoCircleOutlined
                                style={{ fontSize: 24, color: "#999" }}
                            />
                            <p style={{ marginTop: 8 }}>No tienes respuestas</p>
                        </div>
                    ),
                }}/>
        </div>
    );
};

export default UsuariosAdmin;
