import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMonumentosPorProvincia } from "../services/datosAbiertosService";

const MonumentosList: React.FC = () => {
  const { nombre } = useParams();
  const [monumentos, setMonumentos] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (nombre) {
        const data = await getMonumentosPorProvincia(nombre);
        setMonumentos(data);
      }
    };

    fetchData();
  }, [nombre]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Monumentos en {nombre}</h2>
      <ul>
        {monumentos.map((mon, idx) => (
          <li key={idx}>{mon.nombre_monumento}</li>
        ))}
      </ul>
    </div>
  );
};

export default MonumentosList;
