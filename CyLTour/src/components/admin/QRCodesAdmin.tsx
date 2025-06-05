import { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Button } from "antd";
import { getMonumentos } from "../../services/datosAbiertosService";

interface Monumento {
    identificador: number;
    poblacion_provincia: string;
    nombre: string;
}

const QRCodesAdmin = () => {
    const [monumentos, setMonumentos] = useState<Monumento[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMonumentos = async () => {
            try {
                const data = await getMonumentos();
                const primeros10 = data.results.slice(0, 10).map((m: any) => ({
                    identificador: m.identificador,
                    poblacion_provincia: m.poblacion_provincia,
                    nombre: m.nombre,
                }));
                setMonumentos(primeros10);
            } catch (error) {
                console.error("Error al obtener monumentos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMonumentos();
    }, []);

    const generarQRUrl = (monumento: Monumento) => {
        const baseUrl = "https://cyl-tour.vercel.app/provincia/";
        const fullUrl = `${baseUrl}${monumento.poblacion_provincia}/${monumento.identificador}`;
        return `http://api.qrserver.com/v1/create-qr-code/?data=${fullUrl}&size=300x300&bgcolor=ffffff`;
    };

    if (loading) return <Spin tip="Cargando monumentos..." fullscreen/>;

    return (
        <div>
            <h2>Códigos QR de los 10 primeros monumentos</h2>
            <Row gutter={[16, 16]}>
                {monumentos.map((monumento) => {
                    const qrUrl = generarQRUrl(monumento);
                    return (
                        <Col
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                            key={monumento.identificador}
                        >
                            <Card title={monumento.nombre} variant="outlined" hoverable>
                                <img
                                    src={qrUrl}
                                    alt={`QR de ${monumento.nombre}`}
                                    width="100%"
                                />
                                <a
                                    href={qrUrl}
                                    download={`qr-${monumento.nombre}.png`}
                                >
                                    <Button
                                        type="primary"
                                        block
                                        style={{ marginTop: 12 }}
                                    >
                                        Descargar QR
                                    </Button>
                                </a>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default QRCodesAdmin;
