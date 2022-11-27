import React, { useState } from "react";
import { Avatar, Layout, Menu, MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import "./Headline.css";
import {
    MenuOutlined,
    OrderedListOutlined,
    UserOutlined,
} from "@ant-design/icons";

import { useSelector } from "react-redux";
import { getUser } from "../../services/tokenService";
import HeadLineAuthorized from "./HeadLineAuthorized";

const { Header } = Layout;

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


const itemsGuest2: MenuProps["items"] = [
    {
        icon: <MenuOutlined />,
        label: <NavLink to="/">Главная</NavLink>,
        key: "main",
    },

];


const itemsGuest: MenuProps["items"] = [
    {
        label: (
            <NavLink to='/login'>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 0 0 10px",
                    }}
                >
                    <h4 style={{margin: "0 10px 0 0"}}>Вход</h4>
                </div>
            </NavLink>
        ),
        key: "personal",
    },
];

const Headline: any = () => {
    const [current, setCurrent] = useState("mail");

    const userId = useSelector(getUser());

    console.log(userId, 'uir');

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    if (!userId) {
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
                        items={itemsGuest2}
                    />
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={itemsGuest}
                    />
                </div>
            </Header>
        );

    } else {
        return (
            <HeadLineAuthorized userId={userId} onClick={onClick} current={current} items={items}/>
        )
    }
};

export default Headline;
