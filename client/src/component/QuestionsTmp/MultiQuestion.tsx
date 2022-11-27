import React, { FC, useState } from "react";
import "./Questions.css";
import { Button, Card, Checkbox, Space } from "antd";
import { questionI } from "./SingleQuestion";
import { CheckboxValueType } from "antd/es/checkbox/Group";

export const MultiQuestion: FC<questionI> = ({ task, onAnswer }) => {
  const [disabled, setDisabled] = useState(false);

  const [answers, setAnswers] = useState<any>([]);
  const options: any[] = [];
  task.variants.map((variant, index) => {
    options.push({ label: variant.value, value: variant._id });
  });

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setAnswers([...checkedValues]);
  };

  return (
    <div className={"multi-wrapper"}>
      <Card title={task.title}>
        <div className={"multiq-card"}>
          <p>{task.body}</p>
          <Checkbox.Group
            disabled={disabled}
            name="checkboxgroup"
            options={options as any}
            onChange={onChange}
          />
          <Button
            style={{ marginTop: "5px" }}
            onClick={() => {
              console.log(answers);
              const customTask = {
                task_id: task._id,
                variants_id: answers,
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
