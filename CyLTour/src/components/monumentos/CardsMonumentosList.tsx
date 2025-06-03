import { Card, Row, Col } from "antd";
import { useParams } from "react-router-dom";
import MonumentosList from "./MonumentosList";

import { useClasificacion } from "../../hooks/useClasificacion";
const CardStyle: React.CSSProperties = {
    width: "100%",
    minWidth: 300,
    maxWidth: 500,
};

const CardsMonumentosList = () => {
    const { nombre } = useParams();
    const clasificaciones = useClasificacion(nombre!);
    return (
        <Row gutter={[16, 16]}>
            {clasificaciones.map((clasificacion, index) => (
                <Col
                    xs={24}
                    sm={24}
                    md={12}
                    xl={8}
                    key={index}
                    className="card-col"
                >
                    <Card title={clasificacion} hoverable style={CardStyle}>
                        <MonumentosList
                            clasificacion={clasificacion}
                            provincia={nombre!}
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default CardsMonumentosList;
