import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/apiService";

const useLogout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/logout") {
      (async () => {
        try {
          const response = await logout();
          alert(response.data.message || "Sesión cerrada correctamente");
        } catch (error) {
          alert("Error al cerrar sesión");
        } finally {
          navigate("/", { replace: true });
        }
      })();
    }
  }, [location.pathname, navigate]);
};

export default useLogout;
