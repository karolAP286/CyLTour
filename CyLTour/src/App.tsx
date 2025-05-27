import { Routes, Route } from "react-router-dom";
import LayoutComponent from "./components/LayoutComponent";
import IndexComponent from "./components/IndexComponent";
import CardsClasificacion from "./components/CardsClasificacion";
import MonumentoDetalle from "./components/MonumentosDetalle";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LayoutComponent />}>
            <Route index element={<IndexComponent />} />
            <Route path="/Login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
                path="/provincia/:nombre"
                element={<CardsClasificacion />}
            />
            <Route path="/logout" element={null} />
            <Route path="/provincia/:provincia/:id" element={<MonumentoDetalle />} />
        </Route>
    </Routes>
);

export default AppRoutes;
