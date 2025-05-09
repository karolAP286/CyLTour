import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMonumentosPorProvincia } from "../services/datosAbiertosService";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
const MonumentosList: React.FC = () => {
    const { nombre } = useParams();
    const [monumentos, setMonumentos] = useState<any[]>([]);
    const [pagina, setPagina] = useState<number>(1);
    const [numPaginas, setNumPaginas] = useState<number>(1);
    const fetchData = async () => {
        if (nombre) {
            const data = await getMonumentosPorProvincia(nombre, pagina);
            setMonumentos(data.results);
            const pagTotal: number = Math.round(data.total_count / 10);
            setNumPaginas(pagTotal);
        }
    };

    useEffect(() => {
        fetchData();
    }, [nombre, pagina]);

    const onChange: PaginationProps["onChange"] = (page) => {
        setPagina(page);
    };
    return (
        <div style={{ padding: 24 }}>
            <h2>Monumentos en {nombre}</h2>
            <ul>
                {monumentos.map((mon, idx) => (
                    <li key={idx}>{mon.nombre}</li>
                ))}
            </ul>
            <Pagination
                current={pagina}
                onChange={onChange}
                total={numPaginas * 10}
                defaultCurrent={pagina}
                showSizeChanger={false}
            />
        </div>
    );
};

export default MonumentosList;
