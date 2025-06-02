import { Card, Col, Row, Statistic } from "antd";
import {
    UserOutlined,
    FileTextOutlined,
    EyeOutlined,
    BankOutlined,
} from "@ant-design/icons";
import { Line } from "@ant-design/charts";
import { dataAdmin } from "../../types/dataAdmin";
import { useData } from "../../hooks/useData";
import useAuthGuard from "../../hooks/useAuthGuard";

const DashboardAdmin = () => {
    useAuthGuard({ adminOnly: true });

    const dataAdmin: dataAdmin = useData();

    const chartData = [
        { month: "Enero", visitas: 200 },
        { month: "Febrero", visitas: 300 },
        { month: "Marzo", visitas: 500 },
        { month: "Abril", visitas: 400 },
        { month: "Mayo", visitas: 600 },
    ];

    const config = {
        data: chartData,
        xField: "month",
        yField: "visitas",
        point: { size: 5, shape: "diamond" },
        color: "#1677ff",
        height: 300,
    };
    const stats = [
        {
            title: "Usuarios registrados",
            value: dataAdmin.usuarios,
            icon: <UserOutlined />,
        },
        {
            title: "Monumentos",
            value: dataAdmin.monumentos,
            icon: <BankOutlined />,
        },
        {
            title: "Comentarios pendientes",
            value: dataAdmin.comentariosRechazados,
            icon: <FileTextOutlined />,
        },
        {
            title: "Visitas mensuales",
            value: 2300,
            icon: <EyeOutlined />,
        },
    ];

    return (
        <div>
            <Row gutter={[16, 16]}>
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} md={12} lg={6} key={index}>
                        <Card
                            styles={{
                                body: {
                                    height: 120,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                },
                            }}
                        >
                            <Statistic
                                title={stat.title}
                                value={stat.value}
                                prefix={stat.icon}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card style={{ marginTop: 24 }}>
                <h3>Visitas por mes</h3>
                <Line {...config} />
            </Card>
        </div>
    );
};

export default DashboardAdmin;
