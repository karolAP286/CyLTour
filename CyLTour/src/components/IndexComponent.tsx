import { useProvincias } from "../hooks/useProvincias";
import { Row, Col } from "antd";
import CardsComponent from "./CardsComponent";

function IndexComponent() {
    const provincias = useProvincias();
    return (
        <>
            {provincias.length === 0 ? (
                <p style={{ textAlign: "center" }}>Cargando provincias...</p>
            ) : (
                <Row gutter={[24, 24]} justify="space-around">
                    {provincias.map((provincia) => (
                        <Col
                            key={provincia}
                            xs={24}
                            sm={24}
                            md={12}
                            xl={8}
                            className="card-col"
                        >
                            <CardsComponent title={provincia} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}

export default IndexComponent;
