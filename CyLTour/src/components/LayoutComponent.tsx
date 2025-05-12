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
    const menuItems = items.map(({ key, label, path }) => ({
        key,
        label,
        onClick: () => navigate(path),
    }));

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
                                items={menuItems}
                                onClick={() => setDrawerOpen(false)}
                            />
                        </Drawer>
                    </>
                ) : (
                    <Menu
                        key="desktopMenu"
                        mode="horizontal"
                        items={menuItems}
                        className="menu-custom"
                    />
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
