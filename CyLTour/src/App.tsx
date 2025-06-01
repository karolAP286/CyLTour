import { Routes, Route } from "react-router-dom";
import LayoutComponent from "./components/LayoutComponent";
import IndexComponent from "./components/IndexComponent";
import CardsClasificacion from "./components/CardsClasificacion";
import MonumentoDetalle from "./components/MonumentosDetalle";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import LogoutHandler from "./components/LogoutHandle";
import useLogout from "./hooks/useLogout";
import AdminPanel from "./components/AdminPanel";
import ComentariosAdmin from "./components/admin/ComentariosAdmin";
import DashboardAdmin from "./components/admin/DashboardAdmin";
import UsuariosAdmin from "./components/admin/UsuariosAdmin";

const AppRoutes = () => {
    const logoutMessage = useLogout();

    return (
        <>
            {logoutMessage}
            <Routes>
                <Route path="/" element={<LayoutComponent />}>
                    <Route index element={<IndexComponent />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/logout" element={<LogoutHandler />} />
                    <Route
                        path="/provincia/:nombre"
                        element={<CardsClasificacion />}
                    />
                    <Route
                        path="/provincia/:provincia/:id"
                        element={<MonumentoDetalle />}
                    />
                </Route>

                {/* Rutas del Panel de Administración */}
                <Route path="/admin" element={<AdminPanel />}>
                    <Route index element={<DashboardAdmin />} />
                    <Route path="usuarios" element={<UsuariosAdmin />} />
                    <Route path="comentarios" element={<ComentariosAdmin />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
