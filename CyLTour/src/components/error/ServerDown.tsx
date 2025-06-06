import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ServerDown = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="500"
            title="Servidor no disponible"
            subTitle="Actualmente no podemos conectar con el servidor. Intenta más tarde o contacta con soporte."
            extra={
                <Button type="primary" onClick={() => navigate("/")}>
                    Volver al inicio
                </Button>
            }
        />
    );
};

export default ServerDown;
