import React from "react";
import {ToastContainer} from "react-toastify";
import "./app.css";

import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";

import {createStore} from "./store/store";
import {Provider} from "react-redux";

import Headline from "./component/Head/Headline";
import {Routes} from "./component/routs";
import { ConfigProvider } from "antd";

const store: any = createStore();

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#025EA1'
                },
            }}
        >
        <Provider store={store}>
            <div className={"app"}>
                <Headline/>
                <Routes/>
                <ToastContainer position="top-center"/>
            </div>
        </Provider>
        </ConfigProvider>
    );
}

export default App;
