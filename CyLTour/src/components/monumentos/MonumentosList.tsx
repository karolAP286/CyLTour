import { useEffect, useState } from "react";
import { getMonumentosPorProvincia } from "../../services/datosAbiertosService";
import type { PaginationProps } from "antd";
import { Pagination, Spin, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { FaLandmark } from "react-icons/fa";

interface MonumentosProps {
    provincia: string;
    clasificacion: string;
}

const MonumentosList: React.FC<MonumentosProps> = ({
    provincia,
    clasificacion,
}) => {
    const navigate = useNavigate();
    const [monumentos, setMonumentos] = useState<any[]>([]);
    const [pagina, setPagina] = useState<number>(1);
    const [numPaginas, setNumPaginas] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [total, setTotal] = useState<number>(0);

    const fetchData = async () => {
        if (provincia && clasificacion) {
            setLoading(true);
            try {
                const data = await getMonumentosPorProvincia(
                    provincia,
                    clasificacion,
                    pagina
                );
                setMonumentos(data.results);
                setTotal(data.total_count);
                setNumPaginas(Math.ceil(data.total_count / 10));
            } catch (err) {
                console.error("Error cargando monumentos", err);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [provincia, pagina, clasificacion]);

    const onChange: PaginationProps["onChange"] = (page) => setPagina(page);

    const handleClick = (id: number) => {
        if (provincia) {
            navigate(`/provincia/${provincia}/${id}`);
        }
    };

    return (
        <div className="p-4">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            ) : monumentos.length === 0 ? (
                <Empty description="No se encontraron monumentos" />
            ) : (
                <div className="flex flex-col space-y-4">
                    {monumentos.map((mon, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleClick(mon.identificador)}
                            style={{margin: "0.5rem 0"}}
                            className="flex items-center gap-2 cursor-pointer text-blue-700 hover:text-blue-900 transition hover:underline underline-offset-4"
                        >
                            <FaLandmark className="text-lg" />
                            <span style={{paddingLeft:"15px"}}>{mon.nombre}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Mostrar paginación solo si hay más de 10 resultados */}
            {total > 10 && (
                <div className="flex justify-center mt-8" style={{ marginTop: "1rem" }}>
                    <Pagination
                        current={pagina}
                        onChange={onChange}
                        total={numPaginas * 10}
                        showSizeChanger={false}
                        size="small"
                        pageSize={10}
                        align="center"
                    />
                </div>
            )}
        </div>
    );
};

export default MonumentosList;
