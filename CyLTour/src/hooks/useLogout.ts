import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/apiService";
import { message } from "antd";

const useLogout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (location.pathname === "/logout") {
            (async () => {
                try {
                    const { message: msg } = await logout();
                    messageApi.success(msg);
                } catch (error) {
                    messageApi.error("Error inesperado al cerrar sesión");
                } finally {
                    navigate("/", { replace: true });
                }
            })();
        }
    }, [location.pathname, navigate]);

    return contextHolder; 
};

export default useLogout;