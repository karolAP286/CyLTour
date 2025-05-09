import { Routes, Route } from "react-router-dom";
import LayoutComponent from "./components/LayoutComponent";
import MonumentosPorProvincia from "./components/MonumentosList";
import IndexComponent from "./components/IndexComponent";
import ComentariosList from "./components/ComentariosList";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LayoutComponent />}>
            <Route index element={<IndexComponent />} />
            <Route path="/about" element={<ComentariosList />} />
            <Route path="/contact" element={<ComentariosList />} />
            <Route
                path="/provincia/:nombre"
                element={<MonumentosPorProvincia />}
            />
        </Route>
    </Routes>
);

export default AppRoutes;
