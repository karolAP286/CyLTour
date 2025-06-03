import { useEffect, useState } from "react";
import { Button, Card, Form, Input, DatePicker, message, Spin } from "antd";
import dayjs from "dayjs";
import { getUsuarioById, updateUsuario } from "../../services/apiService";
import { Usuario } from "../../types/Usuario";

const EditarPerfil = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const fetchUsuario = async () => {
            const storedUser = localStorage.getItem("user_id");
            if (storedUser) {
                try {
                    const decodedUser = atob(storedUser);
                    const data = await getUsuarioById(parseInt(decodedUser));

                    form.setFieldsValue({
                        nombre: data.nombre,
                        correo: data.correo,
                        dni: data.dni,
                        fecha_nacimiento: data.fecha_nacimiento
                            ? dayjs(data.fecha_nacimiento)
                            : null,
                    });
                } catch (error) {
                    console.error("Error al cargar usuario:", error);
                    message.error("Error al cargar datos del perfil");
                } finally {
                    setInitialLoading(false);
                }
            }
        };

        fetchUsuario();
    }, [form]);

    const onFinish = async (values: any) => {
        const storedUser = localStorage.getItem("user_id");
        if (!storedUser) return;

        const decodedUser = atob(storedUser);
        const payload: Partial<Usuario> = {
            nombre: values.nombre,
            correo: values.correo,
            dni: values.dni,
            fecha_nacimiento: values.fecha_nacimiento?.format("YYYY-MM-DD"),
        };
        // Solo actualizar la contraseña si se ha proporcionado
        if (values.password) {
            payload.password = values.password;
        }

        setLoading(true);
        try {
           const response = await updateUsuario(parseInt(decodedUser), payload);
           console.log("Perfil actualizado:", response);
            message.success("Perfil actualizado correctamente");
            form.resetFields(["password"]);
        } catch (error) {
            console.error(error);
            message.error("Error al actualizar el perfil");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Spin spinning={initialLoading} tip="Cargando perfil...">
            <Card title="Editar Perfil">
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item
                        label="Nombre"
                        name="nombre"
                        rules={[
                            { required: true, message: "Nombre obligatorio" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Correo"
                        name="correo"
                        rules={[
                            { required: true, message: "Correo obligatorio" },
                        ]}
                    >
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item label="DNI" name="dni">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Fecha de nacimiento"
                        name="fecha_nacimiento"
                    >
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        label="Nueva contraseña"
                        name="password"
                        rules={[
                            {
                                min: 6,
                                message:
                                    "La contraseña debe tener al menos 6 caracteres",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Deja vacío si no deseas cambiarla" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Guardar Cambios
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Spin>
    );
};

export default EditarPerfil;
