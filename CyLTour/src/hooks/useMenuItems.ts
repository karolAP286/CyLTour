import { useEffect, useState } from "react";
import { getUsuarioById } from "../services/apiService";

type MenuItem = {
    key: string;
    label: string;
    path: string;
};

const useMenuItems = (): MenuItem[] => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [updateFlag, setUpdateFlag] = useState(0);

    useEffect(() => {
        const onSessionChanged = () => {
            setUpdateFlag((f) => f + 1);
        };

        window.addEventListener("sessionChanged", onSessionChanged);
        return () => {
            window.removeEventListener("sessionChanged", onSessionChanged);
        };
    }, []);

    useEffect(() => {
        const fetchMenuItems = async () => {
            const token = localStorage.getItem("tokenCYLTour");
            const encodedRol = localStorage.getItem("rol_id");
            const storedUser = localStorage.getItem("user_id");

            let isAdmin = false;
            let nombreUsuario = "Perfil";

            if (token && encodedRol) {
                try {
                    const decodedRol = atob(encodedRol);
                    if (decodedRol === "1") {
                        isAdmin = true;
                    }
                } catch (error) {
                    console.error("Error al decodificar el rol_id", error);
                }

                if (storedUser) {
                    try {
                        const decodedUser = parseInt(atob(storedUser));
                        const user = await getUsuarioById(decodedUser);
                        nombreUsuario = user.nombre;
                    } catch (error) {
                        console.error("Error al obtener el usuario", error);
                    }
                }
            }

            const items: MenuItem[] = [];

            if (!token) {
                items.push(
                    { key: "home", label: "Inicio", path: "/" },
                    { key: "login", label: "Iniciar sesión", path: "/login" },
                    { key: "register", label: "Registrarse", path: "/register" }
                );
            } else {
                items.push(
                    { key: "home", label: "Inicio", path: "/" },
                    { key: "profile", label: nombreUsuario, path: "/usuario" },
                    { key: "logout", label: "Cerrar sesión", path: "/logout" }
                );

                if (isAdmin) {
                    items.push({
                        key: "admin",
                        label: "Panel de admin",
                        path: "/admin",
                    });
                }
            }

            setMenuItems(items);
        };

        fetchMenuItems();
    }, [updateFlag]);

    return menuItems;
};

export default useMenuItems;
