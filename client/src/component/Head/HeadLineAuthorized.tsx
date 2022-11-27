import React from 'react';
import {useGetUserQuery} from "../../services/userService";
import {Avatar, Layout, Menu, MenuProps} from "antd";
import {NavLink} from "react-router-dom";
import {MenuOutlined, OrderedListOutlined, UserOutlined} from "@ant-design/icons";
import "./Headline.css";

const HeadLineAuthorized = ({userId, onClick, current, items}: any) => {

    const {data: currentUser, error, isLoading} = useGetUserQuery(userId);
    const { Header } = Layout;

    console.log(currentUser, "current");

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
                        <h4 style={{margin: "0 10px 0 0"}}>
                            {isLoading ? <>Loading...</> : currentUser.name}
                        </h4>
                        {currentUser && currentUser.avatar && (
                            <Avatar
                                size="default"
                                src={`http://localhost:5000/files/${currentUser.avatar}`}
                                icon={<UserOutlined/>}
                                style={{margin: "0 10px 0 0"}}
                            />
                        )}
                    </div>
                </NavLink>
            ),
            key: "personal",
        },
    ];

    // const onClick: MenuProps["onClick"] = (e) => {
    //   console.log("click ", e);
    //   setCurrent(e.key);
    // };

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

export default HeadLineAuthorized;