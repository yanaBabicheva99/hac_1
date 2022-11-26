import React, { useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import "./Headline.css";
import {
  MenuOutlined,
  OrderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const items: MenuProps["items"] = [
  {
    icon: <MenuOutlined />,
    label: <NavLink to="/">Главная</NavLink>,
    key: "main",
  },
  {
    icon: <UserOutlined />,
    label: <NavLink to="/personalpage">Личный кабинет</NavLink>,
    key: "personal",
  },
  {
    icon: <OrderedListOutlined />,
    label: <NavLink to="/tests">Мои тесты</NavLink>,
    key: "tests",
  },
];

const Headline: React.FC = () => {
  const [current, setCurrent] = useState("mail");
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
          border: "1px solid whitesmoke",
        }}
      >
        <div className="logo" />
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </Header>
    </Layout>
  );
};

export default Headline;
