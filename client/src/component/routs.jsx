import React from "react";
import { Route, Routes as Switch, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { getToken } from "../services/tokenService";
import Main from "./Main/main";
import Login from "./LoginPage/login";
import Personal from "./PersonalCabinet/personal";
import Register from "./RegisterPage/register";
import Headline from "./Head/Headline";

import { Exhibition } from "./Exhibition/Exhibition";
import { SingleQuestion } from "./QuestionsTmp/SingleQuestion";
import { MultiQuestion } from "./QuestionsTmp/MultiQuestion";
import { FreeQuestion } from "./QuestionsTmp/FreeQuestion";
import { TestPage } from "./TestPage/TestPage";
// import TaskList from "./TaskLists/TaskList/TaskList";
// import TaskLists from "./TaskLists/TaskLists";
// import CreateTest from "./createTest/createTest";

import CreateTest from './createTest/createTest';
import TestsList from './TestListPage/testsList';


export const Routes = () => {
  const select = useSelector(getToken());
  console.log("select");
  console.log(select);
  if (select) {
    return (
      <Switch>
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Main />}></Route>
        {/*<Route path={"/tasks"} element={<Tasks />}></Route>*/}
        <Route path={'/tests'} element={<TestsList />}></Route>

        <Route path="/personalpage" element={<Personal />}></Route>
        <Route path="/headline" element={<Headline />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path={"/exhibition"} element={<Exhibition />} />
        {/*<Route path="*" element={<Navigate to="/login" replace />} />*/}
        <Route path={"/singlequestion"} element={<SingleQuestion />} />
        <Route path={"/multiquestion"} element={<MultiQuestion />} />
        <Route path={"/freequestion"} element={<FreeQuestion />} />
        <Route path={"/test/:id"} element={<TestPage />} />
        <Route path={"/createtest"} element={<CreateTest />} />
        {/*<Route path={"/tasklist"} element={<TaskList />} />*/}
        {/*<Route path={"/tasklists"} element={<TaskLists />} />*/}
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />}></Route>
      </Switch>
    );
  }
};
