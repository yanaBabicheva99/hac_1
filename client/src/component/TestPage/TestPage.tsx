import React, { useEffect } from "react";
import "./TestPage.css";
import { SingleQuestion } from "../QuestionsTmp/SingleQuestion";
import { MultiQuestion } from "../QuestionsTmp/MultiQuestion";
import { FreeQuestion } from "../QuestionsTmp/FreeQuestion";
import { Button, Card } from "antd";
import { useParams } from "react-router-dom";
import { useGetTestQuery } from "../../services/testService";

export const TestPage = () => {
  const params = useParams();
  const { data, error, isLoading } = useGetTestQuery(`${params.id}`);

  console.log(data);

  return (
    <div className={"test-wrapper"}>
      <Card
        title={data && data?.name}
        extra={"Таймер: 02:58:59"}
        style={{ width: "100%" }}
      >
        <p>{data && data?.description}</p>
        {data?.tasks.map((task: any) => {
          if (task.type === "one")
            return (
              <div key={task._id}>
                <SingleQuestion task={task} />
              </div>
            );
          if (task.type === "many")
            return (
              <div key={task._id}>
                <MultiQuestion task={task} />
              </div>
            );
          if (task.type === "input")
            return (
              <div key={task._id}>
                <FreeQuestion task={task} />
              </div>
            );
        })}
        <Button type={"primary"} style={{ width: "100%" }}>
          Завершить тест
        </Button>
      </Card>
    </div>
  );
};
