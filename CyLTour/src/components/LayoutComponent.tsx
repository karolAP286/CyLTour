import React, { useState } from "react";
import { Button, Drawer, Layout, Menu, theme, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import useMenuItems from '../hooks/useMenuItems';

import "./LayoutComponent.css";
import { Outlet, useNavigate } from "react-router-dom";

const { useBreakpoint } = Grid;
const { Header, Content, Footer } = Layout;

const LayoutComponent: React.FC = () => {
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const items = useMenuItems();
    const menuItems = items.map(({ key, label, path }) => (
    <Menu.Item
        key={key}
        onClick={() => navigate(path)}
        className={key === "profile" ? "profile" : ""}
    >
        {label}
    </Menu.Item>
));

    const screens = useBreakpoint();
    const isMobile = !screens.md;

    return (
        <Layout>
            <Header className="custom-header">
                <div className="logo">CYLTour</div>

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
                                onClick={() => setDrawerOpen(false)}
                            >
                                {menuItems}
                            </Menu>
                        </Drawer>
                    </>
                ) : (
                    <Menu
                        key="desktopMenu"
                        mode="horizontal"
                        
                        className="menu-custom"
                    >
                        {menuItems}
                    </Menu>
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
                    <Outlet />
                </div>
            </Content>

            <Footer className="custom-footer">
                CyLTour ©{new Date().getFullYear()} Created by Carolina Alonso
                De Pablos
            </Footer>
        </Layout>
    );
};

export default LayoutComponent;
