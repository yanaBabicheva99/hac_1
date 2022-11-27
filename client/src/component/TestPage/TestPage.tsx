import React, { useEffect } from "react";
import "./TestPage.css";
import { SingleQuestion } from "../QuestionsTmp/SingleQuestion";
import { MultiQuestion } from "../QuestionsTmp/MultiQuestion";
import { FreeQuestion } from "../QuestionsTmp/FreeQuestion";
import { Button, Card } from "antd";
import { useParams } from "react-router-dom";
import { useGetTestQuery } from "../../services/testService";
import { useCreateAnswersMutation } from "../../services/userService";
import { toast } from "react-toastify";

type result = {
  test_id: string;
  tasks: { task_id: string; variants_id: string[] }[];
};
export const TestPage = () => {
  const params = useParams();
  const { data, error, isLoading } = useGetTestQuery(`${params.id}`);

  const [createAnswer] = useCreateAnswersMutation();
  let result: result = { test_id: params.id as string, tasks: [] };
  console.log(data);

  const addTaskToTest = (task: any) => {
    result.tasks.push({ task_id: task.task_id, variants_id: task.variants_id });
    console.log(result);
  };

  const submitTest = (resultToUser: result) => {
    createAnswer(resultToUser)
      .unwrap()
      .then((data) => toast.info("Ответы добавлены"))
      .catch((err) => toast.error("Произошла ошибка"));
  };
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
                <SingleQuestion task={task} onAnswer={addTaskToTest} />
              </div>
            );
          if (task.type === "many")
            return (
              <div key={task._id}>
                <MultiQuestion task={task} onAnswer={addTaskToTest} />
              </div>
            );
          if (task.type === "input")
            return (
              <div key={task._id}>
                <FreeQuestion task={task} onAnswer={addTaskToTest} />
              </div>
            );
        })}
        <Button
          type={"primary"}
          style={{ width: "100%" }}
          onClick={() => submitTest(result)}
        >
          Завершить тест
        </Button>
      </Card>
    </div>
  );
};
