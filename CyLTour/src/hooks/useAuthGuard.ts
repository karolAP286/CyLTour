import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";

const useAuthGuard = (options?: { adminOnly?: boolean }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("tokenCYLTour");
        const encodedRol = localStorage.getItem("rol_id");
        const decodedRol = encodedRol ? atob(encodedRol) : null;

        if (!token) {
            message.warning("Debes iniciar sesión para acceder.");
            navigate("/", { replace: true });
            return;
        }

        if (options?.adminOnly && decodedRol !== "1") {
            message.error("No tienes permiso para acceder a esta sección.");
            navigate("/", { replace: true });
        }
    }, [navigate, location.pathname, options]);
};

export default useAuthGuard;
