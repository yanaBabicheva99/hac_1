import React, { FC, useState } from "react";
import "./Questions.css";
import { Button, Card, Radio, RadioChangeEvent, Space } from "antd";

type task = {
  _id: string;
  title: string;
  body: string;
  type: "many" | "one" | "input";
  variants: {
    _id: string;
    value: string;
    isAnswer?: boolean;
  }[];
};
export interface questionI {
  task: task;
  onAnswer: (task: { task_id: string; variants_id: string }) => void;
}
export const SingleQuestion: FC<questionI> = ({ task, onAnswer }) => {
  const options: any[] = [];

  task.variants.map((variant, index) =>
    options.push({ label: variant.value, value: variant._id })
  );

  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setAnswer(value);
    setValue(value);
  };
  const [answer, setAnswer] = useState("");

  return (
    <div className={"single-wrapper"}>
      <Card title={task.title}>
        <p>{task.body}</p>
        <div className={"singleq-card"}>
          <Radio.Group
            options={options}
            disabled={disabled}
            onChange={onChange}
            value={value}
          />
          <Button
            style={{ marginTop: "5px" }}
            className={"button-wrapper"}
            onClick={() => {
              console.log(answer);
              const customTask = {
                task_id: task._id,
                variants_id: [answer] as any,
              };
              onAnswer(customTask);
              setDisabled(true);
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
