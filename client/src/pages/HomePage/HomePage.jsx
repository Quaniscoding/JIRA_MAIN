import { useState } from "react";
import Sidebar from "../../components/SideBar/SideBar";
// import Header from "../../Header/Header"
import { Outlet } from "react-router-dom";
import { Button, Layout, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { getLocal } from "../../utils/config";
import { DATA_USER } from "../../utils/constant";

const { Header, Sider, Content } = Layout;

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const dataUser = getLocal(DATA_USER);
  if (!dataUser) {
    window.location.href = "/login";
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
