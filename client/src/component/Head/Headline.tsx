import React, { useState } from "react";
import { Avatar, Layout, Menu, MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import "./Headline.css";
import {
  MenuOutlined,
  OrderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const items2: MenuProps["items"] = [
  {
    label: (
      <NavLink to="/personalpage">
        {" "}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 0 0 10px",
          }}
        >
          <h4 style={{ margin: "0 10px 0 0" }}>Fynjy</h4>
          <Avatar
            size="default"
            icon={<UserOutlined />}
            style={{ margin: "0 10px 0 0" }}
          />
        </div>
      </NavLink>
    ),
    key: "personal",
  },
];

const items: MenuProps["items"] = [
  {
    icon: <MenuOutlined />,
    label: <NavLink to="/">Главная</NavLink>,
    key: "main",
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items2}
        />
      </div>
    </Header>
  );
};

export default Headline;
