import React, { useState } from "react";
import { Form, Input, Button, Card, DatePicker, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../services/apiService";
import { RegisterData } from "../types/RegisterData";
const RegisterForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        setLoading(true);
        setFormError(null);
        setSuccessMessage(null);

        const payload: RegisterData = {
            nombre: values.nombre,
            fecha_nacimiento: values.fecha_nacimiento.format("YYYY-MM-DD"),
            dni: values.dni,
            correo: values.correo,
            password: values.password,
        };

        try {
            await register(payload);
            setSuccessMessage("Registro exitoso. Ahora puedes iniciar sesión.");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error: any) {
            const responseErrors = error.response?.data?.errors;

            if (responseErrors) {
                const allMessages = Object.values(responseErrors)
                    .flat()
                    .join(" ");
                setFormError(allMessages);
            } else {
                setFormError(
                    error.response?.data?.message || "Error al registrarse"
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
            <Card title="Registro de Usuario" style={{ width: 400 }}>
                {formError && (
                    <Alert
                        message={formError}
                        type="error"
                        showIcon
                        style={{ marginBottom: 16 }}
                    />
                )}
                {successMessage && (
                    <Alert
                        message={successMessage}
                        type="success"
                        showIcon
                        style={{ marginBottom: 16 }}
                    />
                )}
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="nombre"
                        label="Nombre"
                        rules={[
                            { required: true, message: "Ingresa tu nombre" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="fecha_nacimiento"
                        label="Fecha de nacimiento"
                        rules={[
                            {
                                required: true,
                                message: "Selecciona tu fecha de nacimiento",
                            },
                        ]}
                    >
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        name="dni"
                        label="DNI"
                        rules={[{ required: true, message: "Ingresa tu DNI" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="correo"
                        label="Correo electrónico"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Correo inválido",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[
                            {
                                required: true,
                                message: "Ingresa tu contraseña",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                        >
                            Registrarse
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default RegisterForm;
