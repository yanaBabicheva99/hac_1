import React from "react";
import { Route, Routes as Switch, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { getToken } from "../services/tokenService";
import Main from "./Main/main";
import Login from "./LoginPage/login";
import Register from "./RegisterPage/register";
import {Exhibition} from './Exhibition/Exhibition';

export const Routes = () => {
  const select = useSelector(getToken());
  if (select) {
    return (
      <Switch>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Navigate to="/" replace />} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Main />}></Route>
          <Route path={'/exhibition'} element={<Exhibition />} />
        {/*<Route path="*" element={<Navigate to="/login" replace />} />*/}
      </Switch>
    );
  }
};
