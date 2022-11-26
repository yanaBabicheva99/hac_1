import React, { FC } from "react";
import "./Questions.css";
import { Button, Card, Radio, Space } from "antd";

export interface questionI {
  task: {
    title: string;
    body: string;
    type: "many" | "one" | "input";
    variants: {
      value: string;
      isAnswer?: boolean;
    }[];
  };
}
export const SingleQuestion: FC<questionI> = ({ task }) => {
  return (
    <div className={"single-wrapper"}>
      <Card title={task.title}>
        <p>{task.body}</p>
        <div className={"singleq-card"}>
          <Radio.Group name="radiogroup" defaultValue={1}>
            <Space direction="vertical">
              {task.variants.map((variant, index) => (
                <Radio value={index}>{variant.value}</Radio>
              ))}
            </Space>
          </Radio.Group>
          <Button style={{ marginTop: "5px" }} className={"button-wrapper"}>
            Подтвердить
          </Button>
        </div>
      </Card>
    </div>
  );
};
