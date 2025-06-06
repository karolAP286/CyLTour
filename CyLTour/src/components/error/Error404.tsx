import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Lo sentimos, la página que estás buscando no existe."
            extra={
                <Button type="primary" onClick={() => navigate("/")}>
                    Volver al inicio
                </Button>
            }
        />
    );
};

export default Error404;
