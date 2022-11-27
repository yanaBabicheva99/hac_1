import React, {useState} from 'react';
import { Button, Checkbox, Input } from 'antd';

const CreateAnswer = ({numberAnswer, handleClick, id, handleAddVariants}) => {

  const [answer, setAnswer] = useState({
    isAnswer: false,
    value: ''
  });

  // console.log(answer);

  const handleChangeRight = (isAnswer) => {
    setAnswer(prevState => ({
      ...prevState,
      isAnswer
    }))
  }

  const handleChangeAnswer = (e) => {
    const {target} = e;
    setAnswer(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  };

  const handleCreateAnswer = () => {
    handleClick(answer);
    setAnswer({
      isAnswer: false,
      value: ''
    })
  };

  return (
    <div className='wrapper__answer'>
      <Input
        name='value'
        value={answer.value}
        onChange={handleChangeAnswer}
        placeholder="Вариант ответа"
      />
      <div className='inner__answer'>
        <Checkbox
          checked={answer.isAnswer}
          onClick={() => handleChangeRight(!answer.isAnswer)}
        >
          Правильный ответ
        </Checkbox>
        <Button
          disabled={!answer.value}
          onClick={handleCreateAnswer}
          className='create__answer'>
          {`Добавить вариант ответа ${numberAnswer}`}
        </Button></div>
    </div>
  );
};

export default CreateAnswer;