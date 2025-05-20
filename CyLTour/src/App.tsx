import { Routes, Route } from "react-router-dom";
import LayoutComponent from "./components/LayoutComponent";
import IndexComponent from "./components/IndexComponent";
import ComentariosList from "./components/ComentariosList";
import CardsClasificacion from "./components/CardsClasificacion";
import MonumentoDetalle from "./components/MonumentosDetalle";
import "leaflet/dist/leaflet.css";


const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LayoutComponent />}>
            <Route index element={<IndexComponent />} />
            <Route path="/about" element={<ComentariosList />} />
            <Route path="/contact" element={<ComentariosList />} />
            <Route
                path="/provincia/:nombre"
                element={<CardsClasificacion />}
            />
            <Route path="/provincia/:provincia/:id" element={<MonumentoDetalle />} />

        </Route>
    </Routes>
);

export default AppRoutes;
