import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
    HomeOutlined,
    UserOutlined,
    FileTextOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import "./AdminPanel.css";

const { Header, Sider, Content } = Layout;

const AdminPanel = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        {
            key: "/admin",
            icon: <HomeOutlined />,
            label: "Dashboard",
            onClick: () => navigate("/admin"),
        },
        {
            key: "/admin/usuarios",
            icon: <UserOutlined />,
            label: "Usuarios",
            onClick: () => navigate("/admin/usuarios"),
        },
        {
            key: "/admin/comentarios",
            icon: <FileTextOutlined />,
            label: "Comentarios",
            onClick: () => navigate("/admin/comentarios"),
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Cerrar sesión",
            onClick: () => navigate("/logout"),
        },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                theme="dark"
                width={220}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                breakpoint="md" 
                onBreakpoint={(broken) => setCollapsed(broken)} 
            >
                <div className="logoAdmin">{!collapsed ? "CyLTour Admin" : "CTA"}</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header className="admin-header">Panel de Administración</Header>
                <Content className="admin-content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPanel;
