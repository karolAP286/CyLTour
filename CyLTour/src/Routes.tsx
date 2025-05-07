import { Routes, Route } from "react-router-dom";
import LayoutComponent from "./components/LayoutComponent";
import MonumentosPorProvincia from "./components/MonumentosList";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LayoutComponent />} />
    <Route path="/provincia/:nombre" element={<MonumentosPorProvincia />} />
  </Routes>
);

export default AppRoutes;