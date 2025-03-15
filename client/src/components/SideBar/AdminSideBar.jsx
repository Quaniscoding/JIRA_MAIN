import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Avatar, Dropdown, Space } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { DATA_USER, USER_LOGIN, DATA_PROJECT } from "../../utils/constant";
import { removeLocal } from "../../utils/config";
import PropTypes from "prop-types";
import { getUserData } from "../../utils/localStorage";
import { CallGetUserById } from "../../redux/reducers/users/apiUser";

export default function AdminSideBar({ collapsed }) {
  const [reset, setReset] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const dataUser = getUserData();

  const [data, setData] = useState(null);
  const fetchData = useCallback(async () => {
    const res = await CallGetUserById(dataUser._id);
    setData(res);
  }, [dataUser._id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const selectedKey = location.pathname.startsWith("/admin/users")
    ? "users"
    : "roles";

  const handleLogout = () => {
    setReset(reset + 1);
    removeLocal(DATA_USER);
    removeLocal(USER_LOGIN);
    removeLocal(DATA_PROJECT);
    navigate("/login");
  };

  const menuItems = [
    {
      key: "users",
      icon: <UserOutlined />,
      label: "Manage Users",
      onClick: () => navigate("/admin/users"),
    },
    {
      key: "roles",
      icon: <DashboardOutlined />,
      label: "Roles",
      onClick: () => navigate("/admin/roles"),
    },
  ];

  const userMenu = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
      />

      <div className="absolute bottom-0 w-full p-4 bg-[#001529] flex justify-start">
        <Dropdown menu={{ items: userMenu }} trigger={["click"]}>
          <Space className="cursor-pointer">
            <Avatar src={data?.avatar} icon={<UserOutlined />} />
            {!collapsed && (
              <span className="text-white hidden md:inline">
                {data?.username || "User"}
              </span>
            )}
          </Space>
        </Dropdown>
      </div>
    </div>
  );
}
AdminSideBar.propTypes = {
  collapsed: PropTypes.bool,
};
