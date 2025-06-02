// src/pages/usuario/UserPanel.tsx
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  EditOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useState } from "react";
import "./UserPanel.css";

const { Header, Sider, Content } = Layout;

const UserPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: "/usuario",
      icon: <UserOutlined />,
      label: "Perfil",
      onClick: () => navigate("/usuario"),
    },
    {
      key: "/usuario/editar",
      icon: <EditOutlined />,
      label: "Editar Perfil",
      onClick: () => navigate("/usuario/editar"),
    },
    {
      key: "/usuario/comentarios",
      icon: <FileTextOutlined />,
      label: "Mis Comentarios",
      onClick: () => navigate("/usuario/comentarios"),
    },
    {
      key: "/usuario/respuestas",
      icon: <FileTextOutlined />,
      label: "Mis Respuestas",
      onClick: () => navigate("/usuario/respuestas"),
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
        theme="light"
        width={220}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="md"
        onBreakpoint={(broken) => setCollapsed(broken)}
      >
        <div className="logoUserPanel">CyLTour Usuario</div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header className="user-header">Panel de Usuario</Header>
        <Content className="user-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserPanel;
