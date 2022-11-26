import React from "react";
import "./main.css";
import { useGetUsersQuery } from "../../services/userService";
import { Card, Avatar, Button } from "antd";
import { useGetTestsQuery } from "../../services/testService";
import { Link, useRoutes } from "react-router-dom";

const Main = () => {
  const { data, error, isLoading } = useGetUsersQuery();
  const {
    data: dataTests,
    error: dataErrors,
    isLoading: dataLoading,
  } = useGetTestsQuery();
  console.log("err", error);

  if (isLoading || dataLoading) {
    return (
      <div className={"main-wrapper"}>
        <div className={"brand-info"}>
          <Avatar src={require("./logo.png")} size={300} loading={isLoading} />
          <Card
            loading={isLoading}
            style={{ height: "50%", marginTop: "10px" }}
          ></Card>
        </div>
        <div className={"tests"}>
          <Card loading={isLoading} style={{ height: "100%" }}></Card>
        </div>
      </div>
    );
  }
  console.log(data, error);
  return (
    <div className={"main-wrapper"}>
      <div className={"brand-info"}>
        <Avatar src={require("./logo.png")} size={300} />
        <hr style={{ border: "none" }} />
        <div>
          <h1>Гринатом</h1>
        </div>
        <hr style={{ border: "1px solid whitesmoke" }} />
        <div>
          Гринатом – ИТ-интегратор Госкорпорации «Росатом». Компания ведет
          собственную разработку ПО, осуществляет поддержку и развитие
          корпоративных ИТ-систем, разрабатывает программных роботов, занимается
          проектным управлением, импортозамещением, применяет искусственный
          интеллект и машинное обучение. Сегодня Гринатом создает самые
          современные решения для цифровизации Росатома и является одной из
          самых динамично развивающихся ИТ-компаний России.
        </div>
      </div>
      <div className={"tests"}>
        <Card title={"Тесты"}>
          <div className={"testcard-wrapper"}>
            {dataTests.map((test) => (
              <Card title={test.name} style={{ width: "100%" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {test.description}
                  <Link to={`/test/${test._id}`}>
                    <Button type="primary">Пройти тест!</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Main;
