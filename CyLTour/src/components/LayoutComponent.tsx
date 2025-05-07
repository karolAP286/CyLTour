import React, { useState } from "react";
import { Button, Col, Drawer, Layout, Menu, Row, theme, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import CardsComponent from "./CardsComponent";
import "./LayoutComponent.css";
import ComentariosList from "./ComentariosList";
import { useProvincias } from "../hooks/useProvincias";

const { useBreakpoint } = Grid;
const { Header, Content, Footer } = Layout;

const LayoutComponent: React.FC = () => {
    const provincias = useProvincias();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const items = [
        { key: "home", label: "Inicio" },
        { key: "about", label: "Acerca de" },
        { key: "contact", label: "Contacto" },
    ];

    const screens = useBreakpoint();
    const isMobile = !screens.md;

    return (
        <Layout>
            <Header className="custom-header">
                <div className="logo">MiSitio</div>

                {isMobile ? (
                    <>
                        <Button
                            type="primary"
                            icon={<MenuOutlined />}
                            onClick={() => setDrawerOpen(true)}
                        />
                        <Drawer
                            title="Menú"
                            placement="right"
                            onClose={() => setDrawerOpen(false)}
                            open={drawerOpen}
                        >
                            <Menu
                                key="mobileMenu"
                                mode="vertical"
                                items={items}
                                onClick={() => setDrawerOpen(false)}
                            />
                        </Drawer>
                    </>
                ) : (
                    <Menu key="desktopMenu" mode="horizontal" items={items} />
                )}
            </Header>

            <Content className="custom-content">
                <div
                    className="content-inner"
                    style={{
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {provincias.length === 0 ? (
                        <p style={{ textAlign: "center" }}>
                            Cargando provincias...
                        </p>
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
                </div>
                <ComentariosList />
            </Content>

            <Footer className="custom-footer">
                CyLTour ©{new Date().getFullYear()} Created by Carolina Alonso
                De Pablos
            </Footer>
        </Layout>
    );
};

export default LayoutComponent;
