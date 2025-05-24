import React, { useState } from "react";
import { Button, Form, Input, Card, message } from "antd";
import { login } from "../services/apiService";

const LoginForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const response = await login(values);
            localStorage.setItem("token", response.access_token);
            message.success("Login exitoso");
            // redirige o actualiza el estado
        } catch (error: any) {
            message.error(
                error.response?.data?.error || "Error al iniciar sesión"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card title="Iniciar Sesión" style={{ width: 300 }}>
                <Form name="login" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        label="Correo"
                        name="correo"
                        rules={[
                            { required: true, message: "Introduce tu correo" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Introduce tu contraseña",
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
                        >
                            Iniciar sesión
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginForm;
