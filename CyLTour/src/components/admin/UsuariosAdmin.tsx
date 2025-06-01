// src/pages/admin/UsuariosAdmin.tsx

import { useEffect, useState } from "react";
import { Table } from "antd";
import { getUsuarios } from "../../services/apiService";
import { Usuario } from "../../types/Usuario";

const UsuariosAdmin = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                const usuariosConCorreo = data.filter((u) => u.correo !== null);
                setUsuarios(usuariosConCorreo);
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
            }
        };

        fetchUsuarios();
    }, []);

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
    ];

    return (
        <div>
            <h2>Lista de usuarios registrados</h2>
            <Table columns={columns} dataSource={usuarios} rowKey="id" />
        </div>
    );
};

export default UsuariosAdmin;
