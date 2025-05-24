import { useEffect, useState } from "react";
import { getMonumentosPorProvincia } from "../services/datosAbiertosService";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";

interface monumentosProps {
    provincia: string;
    clasificacion: string;
}
const PaginationStyle: React.CSSProperties = {
    width: "100%",
};

const MonumentosList: React.FC<monumentosProps> = (props: monumentosProps) => {
    const { provincia, clasificacion } = props;
    const navigate = useNavigate();
    const [monumentos, setMonumentos] = useState<any[]>([]);
    const [pagina, setPagina] = useState<number>(1);
    const [numPaginas, setNumPaginas] = useState<number>(1);

    const fetchData = async () => {
        if (provincia && clasificacion) {
            const data = await getMonumentosPorProvincia(
                provincia,
                clasificacion,
                pagina
            );
            setMonumentos(data.results);
            const pagTotal: number = Math.round(data.total_count / 10);
            setNumPaginas(pagTotal);
        }
    };

    useEffect(() => {
        fetchData();
    }, [provincia, pagina, clasificacion]);

    const onChange: PaginationProps["onChange"] = (page) => {
        setPagina(page);
    };

    const handleClick = (id: number) => {
        if (provincia) {
            navigate(`/provincia/${provincia}/${id}`);
        }
    };

    return (
        <div style={{ padding: 0 }}>
            <ul style={{ margin: 0, paddingLeft: 24 }}>
                {monumentos.map((mon, idx) => (
                    <li
                        key={idx}
                        onClick={() => handleClick(mon.identificador)}
                    >
                        {mon.nombre}
                    </li>
                ))}
            </ul>
            <div style={{ textAlign: "center", marginTop: "2rem", display: "flex", justifyContent:"space-around" }}>
                <Pagination
                    current={pagina}
                    onChange={onChange}
                    total={numPaginas * 10}
                    defaultCurrent={pagina}
                    showSizeChanger={false}
                    style={PaginationStyle}
                />
            </div>
        </div>
    );
};

export default MonumentosList;
