import React from "react";
import {
  useCreateTestMutation,
  useGetTestsQuery,
} from "../../services/testService";

import { TestList } from "../TestList/TestList";
import TestLists from "../TaskLists/TestLists";
import { Card } from "antd";

const TestsListPage = () => {
  const [createTest] = useCreateTestMutation();
  const { data, error, isLoading } = useGetTestsQuery();

  const handleSubmit = async (content) => {
    createTest(content)
      .unwrap()
      .then((content) => console.log(content))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {isLoading ? (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
          <Card
            loading={isLoading}
            style={{ height: "100%", width: "100%" }}
          ></Card>
          <Card
            loading={isLoading}
            style={{ height: "100%", width: "100%" }}
          ></Card>
        </div>
      ) : (
        <>
          <TestLists handleSubmit={handleSubmit}>
            <TestList data={data} />
          </TestLists>
        </>
      )}
    </div>
  );
};

export default TestsListPage;
