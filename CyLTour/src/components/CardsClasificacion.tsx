import { Card, Row, Col } from "antd";
import { useParams } from "react-router-dom";
import MonumentosList from "./MonumentosList";

import { useClasificacion } from "../hooks/useClasificacion";

const CardsClasificacion = () => {
    const { nombre } = useParams();
    const clasificaciones = useClasificacion(nombre!)
    return (
        <Row gutter={[16, 16]}>
            {clasificaciones.map((clasificacion, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                    <Card title={clasificacion} hoverable>
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

export default CardsClasificacion;
