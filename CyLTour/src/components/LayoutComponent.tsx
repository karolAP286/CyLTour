import React, { useState, useEffect } from "react";
import { Col, Layout, Menu, Row, theme, Button } from "antd";
import "./LayoutComponent.css";
import reactLogo from "../img/logo.svg";
import CardsComponent from "./CardsComponent";
import { MenuOutlined } from "@ant-design/icons";
import MonumentosList from "./MonumentosList";

const { Header, Content, Footer } = Layout;

const items = Array.from({ length: 4 }).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));

const LayoutComponent: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [drawerVisible, setDrawerVisible] = useState(true);

    const provinciasCastillaLeon: string[] = [
        "ávila",
        "burgos",
        "león",
        "palencia",
        "salamanca",
        "segovia",
        "soria",
        "valladolid",
        "zamora",
    ];

    return (
        <Layout>
            <Header style={{ display: "flex", alignItems: "center" }}>
                {
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flex: 1,
                        }}
                    >
                        <img
                            alt=""
                            src={reactLogo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{" "}
                        <span
                            style={{
                                color: "white",
                                marginLeft: "16px",
                                fontSize: "1.2em",
                            }}
                        >
                            CyLTour
                        </span>
                    </div>
                }
                {drawerVisible ? (
                    <Menu
                        className="menu-desktop"
                        mode="horizontal"
                        theme="dark"
                        items={items}
                    />
                ) : (
                    <Menu
                        className="menu-desktop"
                        mode="vertical"
                        theme="dark"
                        items={items}
                    />
                )}

                {/* Mobile hamburger icon */}
                <Button
                    className="menu-mobile-btn"
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={() => setDrawerVisible(!drawerVisible)}
                    style={{ color: "white" }}
                />
            </Header>
            <Content style={{ padding: "40px 40px 0px 40px" }}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        minWidth: 348,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Row gutter={[24, 24]} justify="space-around">
                        {provinciasCastillaLeon.map((provincia) => (
                            <Col
                                xs={{ flex: "100%" }}
                                sm={{ flex: "100%" }}
                                md={{ flex: "100%" }}
                                lg={{ flex: "50%" }}
                                xl={{ flex: "33%" }}
                                xxl={{ flex: "33%" }}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <CardsComponent title={provincia} />
                            </Col>
                        ))}
                    </Row>
                </div>
                <MonumentosList/>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                CyLTour ©{new Date().getFullYear()} Created by Carolina Alonso
                De Pablos
            </Footer>
        </Layout>
    );
};

export default LayoutComponent;
