import React, { FC, useState } from "react";
import "./Questions.css";
import { Button, Card, Input } from "antd";
import { questionI } from "./SingleQuestion";
import { useCreateVariantMutation } from "../../services/taskService";
import { toast } from "react-toastify";

const { TextArea } = Input;

export const FreeQuestion: FC<questionI> = ({ task, onAnswer }) => {
  const [answer, setAnswer] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [createVariant] = useCreateVariantMutation();
  return (
    <div className={"free-wrapper"}>
      <Card title={task.title}>
        <p>{task.body}</p>
        <div className={"freeq-card"}>
          <TextArea
            rows={4}
            placeholder={"Введите свой ответ..."}
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              const customTask = {
                task_id: task._id,
                variants_id: [answer] as any,
              };
              onAnswer(customTask);
            }}
            disabled={disabled}
          />
          <Button
            style={{ marginTop: "5px" }}
            onClick={() => {
              createVariant({ value: answer })
                .unwrap()
                .then((data) => {
                  console.log(data);
                  const customTask = {
                    task_id: task._id,
                    variants_id: data._id,
                  };
                  onAnswer(customTask);
                  setDisabled(true);
                  toast.info("Ответы добавлен");
                })
                .catch((err) => toast.error("Произошла ошибка"));
            }}
            disabled={disabled}
          >
            Подтвердить
          </Button>
        </div>
      </Card>
    </div>
  );
};
