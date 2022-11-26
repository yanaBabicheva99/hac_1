import React from 'react';
import { useCreateTestMutation, useGetTestsQuery } from '../../services/testService';

import { TestList } from '../TestList/TestList';
import TestLists from '../TaskLists/TestLists';



const TestsListPage = () => {
  const [createTest] = useCreateTestMutation();
  const {data, error, isLoading} = useGetTestsQuery();

  const handleSubmit = async (content) => {
    createTest(content)
      .unwrap()
      .then(content => console.log(content))
      .catch(err => console.log(err))
  }

  return (
    <div>
      {isLoading
       ? <h2>Loading...</h2>
       : <>
          <TestLists handleSubmit={handleSubmit}>
            <TestList data={data}/>
          </TestLists>
        </>}
    </div>
  );
};

export default TestsListPage;