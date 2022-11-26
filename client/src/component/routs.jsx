import React from "react";
import { Route, Routes as Switch, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { getToken } from "../services/tokenService";
import Main from "./Main/main";
import Login from "./LoginPage/login";
import Personal from "./PersonalCabinet/personal";
import Register from "./RegisterPage/register";
import Headline from "./Head/Headline";
import {Exhibition} from './Exhibition/Exhibition';
import {SingleQuestion} from "./QuestionsTmp/SingleQuestion";
import {MultiQuestion} from "./QuestionsTmp/MultiQuestion";
import {FreeQuestion} from "./QuestionsTmp/FreeQuestion";
import {TestPage} from "./TestPage/TestPage";
import TaskList from "./TaskLists/TaskList/TaskList";
import TaskLists from "./TaskLists/TaskLists";


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

        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/personalpage" element={<Personal />}></Route>
        <Route path="/headline" element={<Headline />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Main />}></Route>
        <Route path={'/exhibition'} element={<Exhibition />} />
        {/*<Route path="*" element={<Navigate to="/login" replace />} />*/}
          <Route path={'/singlequestion'} element={<SingleQuestion />} />
          <Route path={'/multiquestion'} element={<MultiQuestion />} />
          <Route path={'/freequestion'} element={<FreeQuestion />} />
          <Route path={'/test'} element={<TestPage />} />
          <Route path={'/tasklist'} element={<TaskList/>} />
          <Route path={'/tasklists'} element={<TaskLists/>} />


      </Switch>
    );
  }
};
