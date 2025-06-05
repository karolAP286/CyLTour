import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Card, Alert } from "antd";
import { login } from "../services/apiService";
import { LoginData } from "../types/LoginData";

const LoginForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const onFinish = async (values: LoginData) => {
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const response = await login(values);
            const rolId = response.user.rol_id;
            const encodedRolId = btoa(String(rolId)); // codifica
            localStorage.setItem("rol_id", encodedRolId);
            localStorage.setItem("user_id", btoa(String(response.user.id)));
            localStorage.setItem("tokenCYLTour", response.token);
            
            setSuccessMessage("Login exitoso. Redirigiendo...");
            setTimeout(() => {
                window.dispatchEvent(new Event("sessionChanged"));
                navigate("/");
            }, 1500);
        } catch (error: any) {
            setErrorMessage("Correo o contraseña incorrectos.");
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
                {errorMessage && (
                    <Alert
                        message={errorMessage}
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
                            block
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
