
import React, { useState } from 'react'
import { Card, Checkbox, Space } from 'antd';
import './createTask.css'
import { Input, Button, Radio } from 'antd';
import Modal from '../modal/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateAnswer from './createAnswer';
import {toast} from 'react-toastify';
import { useCreateTaskMutation } from '../../services/taskService';

const CreateTask = () => {
  const [createTask] = useCreateTaskMutation();
  const lacationState = useLocation();
  const navigate = useNavigate();
  const {id} = lacationState.state;

  if (!id) {
    navigate.push('/tests');
  }

  const [visible, setVisible] = useState(false);
  const [numberAnswer, setNumberAnswer] = useState(1);
  const [ownAnswer, setOwnAnswer] = useState(false);

  const [variants, setVariants] = useState([]);

  // console.log(variants, 'variants');

  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  const handleChangeTask = ({target}) => {
    setTask(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  // console.log(task);

  const handleOwnAnswer = () => {
    setOwnAnswer(prevState => !prevState);
  }

  const handleVisible = () => {
    setVisible(prevState => !prevState)
  }

  const handleClick = async (data) => {
    setVariants([...variants, data]);
    setNumberAnswer(prevState => prevState + 1);
    //logick
    handleVisible();
  }

  const handleSaveTask = async () => {

    const objectTask = {
      test_id: id,
      ...task,
      variants
    }

    const checkType = objectTask.variants.reduce((total, item) => {
       if (item.isAnswer) {
        total += 1
      }
       return total
    }, 0);


    const updateTask = {
      ...objectTask,
      type: checkType === 2 ? 'many' : checkType === 1 ? 'one' : 'input'
    }

    console.log('OBJECT', objectTask);

    createTask(updateTask)
      .unwrap()
      .then(data => toast.info('Задача добавлена'))
      .catch(err => toast.error('Произошла ошибка'))

    setNumberAnswer(1);
    setVariants([]);
    setTask({
      title: '',
      description: ''
    })
    setOwnAnswer(false);
  }

  return (
    <div className="TestContainer">
      <Card
        title="Создание задачи"
        style={{
          width: "100%",
        }}

      >
        <div className="TestContainer__content">
          <div className="TestContainer__inputs">
            <Input
              placeholder="Название"
              name='title'
              value={task.title}
              onChange={handleChangeTask}
            />
            <div className='wrapper__area'>
            <textarea
              name='description'
              value={task.description}
              onChange={handleChangeTask}
              style={{ width: "100%", borderRadius: "10px" }}
              placeholder="Описание"
            />
              </div>
            <div className='wrapper__number_answer'>
              <div>
                <Checkbox checked={ownAnswer} onClick={handleOwnAnswer}>Письменный ответ</Checkbox>
              </div>

              { !ownAnswer &&
                <div className="TestContainer__btns">
                  <Button
                    onClick={handleVisible}
                    disabled={numberAnswer > 3}
                  >Добавление варианта</Button>
                 </div>
              }
            </div>
          </div>
        </div>

        <div style={{ justifyContent: "center", display: "flex" }}>
          <Button onClick={handleSaveTask}>Сохранить задачу</Button>
        </div>
      </Card>
      <Modal visible={visible} handleVisible={handleVisible} subtitle='Введите название ответа'>
        <CreateAnswer
          id={id}
          numberAnswer={numberAnswer}
          handleClick={handleClick}
        />
      </Modal>
    </div>
  );
};

export default CreateTask;
