import { Routes, Route } from "react-router-dom";
import LayoutComponent from "./components/LayoutComponent";
import IndexComponent from "./components/IndexComponent";
import CardsMonumentosList from "./components/monumentos/CardsMonumentosList";
import MonumentoDetalle from "./components/monumentos/MonumentosDetalle";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import LogoutHandler from "./components/LogoutHandle";
import useLogout from "./hooks/useLogout";
import AdminPanel from "./components/admin/AdminPanel";
import ComentariosAdmin from "./components/admin/ComentariosAdmin";
import DashboardAdmin from "./components/admin/DashboardAdmin";
import UsuariosAdmin from "./components/admin/UsuariosAdmin";
import QRCodesAdmin from "./components/admin/QRCodesAdmin";
import UserPanel from "./components/user/UserPanel";
import PerfilUsuario from "./components/user/PerfilUsusario";
import EditarPerfil from "./components/user/EditarPerfil";
import MisComentarios from "./components/user/MisComentarios";
import MisRespuestas from "./components/user/MisRespuestas";
import "@ant-design/v5-patch-for-react-19";
import Error404 from "./components/error/Error404";
import ServerDown from "./components/error/ServerDown";
import RespuestasAdmin from "./components/admin/RespuestasAdmin";

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
                        element={<CardsMonumentosList />}
                    />
                    <Route
                        path="/provincia/:provincia/:id"
                        element={<MonumentoDetalle />}
                    />
                </Route>

                {/* Páginas de error */}
                <Route path="/404" element={<Error404 />} />
                <Route path="/server-error" element={<ServerDown />} />
                <Route path="*" element={<Error404 />} />

                {/* Rutas del Panel de Administración */}
                <Route path="/admin" element={<AdminPanel />}>
                    <Route index element={<DashboardAdmin />} />
                    <Route path="usuarios" element={<UsuariosAdmin />} />
                    <Route path="comentarios" element={<ComentariosAdmin />} />
                    <Route path="respuestas" element={<RespuestasAdmin />} />
                    <Route path="qr" element={<QRCodesAdmin />} />
                    <Route path="*" element={<DashboardAdmin />} />
                </Route>

                {/* Rutas del Panel de Usuario */}
                <Route path="/usuario" element={<UserPanel />}>
                    <Route index element={<PerfilUsuario />} />
                    <Route path="editar" element={<EditarPerfil />} />
                    <Route path="comentarios" element={<MisComentarios />} />
                    <Route path="respuestas" element={<MisRespuestas />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
