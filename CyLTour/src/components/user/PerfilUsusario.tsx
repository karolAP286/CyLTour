import { useEffect, useState } from "react";
import { Card, Descriptions, DescriptionsProps, Spin, message, Button, Modal } from "antd";
import { getUsuarioById, deleteUsuario } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const PerfilUsuario = () => {
  const [items, setItems] = useState<DescriptionsProps["items"]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const storedUser = localStorage.getItem("user_id");
      if (storedUser) {
        try {
          const decodedUser = parseInt(atob(storedUser));
          setUserId(decodedUser);
          const data = await getUsuarioById(decodedUser);
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

  const handleDelete = () => {
    Modal.confirm({
      title: "¿Estás seguro?",
      content: "Esta acción eliminará tu cuenta permanentemente.",
      okText: "Sí, eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          if (userId !== null) {
            await deleteUsuario(userId);
            message.success("Cuenta eliminada correctamente");
            localStorage.clear();
            navigate("/");
          }
        } catch (error) {
          console.error("Error al eliminar usuario:", error);
          message.error("Hubo un error al eliminar tu cuenta");
        }
      },
    });
  };

  return (
    <Spin spinning={loading} tip="Cargando perfil...">
      <Card
        title="Mi Perfil"
        extra={
          <Button danger onClick={handleDelete}>
            Eliminar cuenta
          </Button>
        }
      >
        <Descriptions column={2} layout="vertical" bordered items={items} />
      </Card>
    </Spin>
  );
};

export default PerfilUsuario;
