import { useEffect, useState } from "react";
import { Card, Descriptions, DescriptionsProps, Spin, message } from "antd";
import { getUsuarioById } from "../../services/apiService";

const PerfilUsuario = () => {
  const [items, setItems] = useState<DescriptionsProps["items"]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      const storedUser = localStorage.getItem("user_id");
      if (storedUser) {
        try {
          const decodedUser = atob(storedUser);
          const data = await getUsuarioById(parseInt(decodedUser));
          setItems([
            { key: "1", label: "Nombre", children: data.nombre },
            { key: "2", label: "Correo", children: data.correo },
            { key: "3", label: "DNI", children: data.dni || "No disponible" },
            {
              key: "4",
              label: "Fecha de nacimiento",
              children: data.fecha_nacimiento,
            },
          ]);
        } catch (error) {
          console.error("Error al cargar perfil:", error);
          message.error("Error al cargar los datos del perfil");
        } finally {
          setLoading(false); 
        }
      }
    };

    fetchPerfil();
  }, []);

  return (
    <Spin spinning={loading} tip="Cargando perfil...">
      <Card title="Mi Perfil">
        <Descriptions
          column={2}
          layout="vertical"
          bordered
          items={items}
        />
      </Card>
    </Spin>
  );
};

export default PerfilUsuario;
