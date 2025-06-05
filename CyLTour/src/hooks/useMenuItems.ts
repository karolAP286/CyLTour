import { useEffect, useState } from "react";

type MenuItem = {
    key: string;
    label: string;
    path: string;
};

// Este hook se encarga de generar los elementos del menú según el estado de autenticación y el rol del usuario.
// Ahora escucha un evento 'sessionChanged' para actualizar el menú dinámicamente.

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
        const token = localStorage.getItem("tokenCYLTour");
        const encodedRol = localStorage.getItem("rol_id");

        let isAdmin = false;

        if (token && encodedRol) {
            try {
                const decodedRol = atob(encodedRol);

                if (decodedRol === "1") {
                    isAdmin = true;
                }
            } catch (error) {
                console.error("Error al decodificar el rol_id", error);
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
                { key: "profile", label: "Perfil", path: "/usuario" },
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
    }, [updateFlag]);

    return menuItems;
};

export default useMenuItems;
