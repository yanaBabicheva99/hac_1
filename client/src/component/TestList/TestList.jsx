import { CloseOutlined, EditFilled } from '@ant-design/icons';
import React, {useState} from 'react';
import './TestList.css'
import Modal from '../modal/Modal';
import TestForm from '../form/testForm';
import {toast} from 'react-toastify';
import { useChangeTestMutation, useDeleteTestMutation } from '../../services/testService';

export const TestList = ({data}) => {

  const [currentTest, setCurrentTest] = useState(null);

  const [visible, setVisible] = useState(false);
  const [changeTest] = useChangeTestMutation();
  const [deleteTest] = useDeleteTestMutation();

  const handleVisible = () => {
    setVisible(prevState => !prevState);
  };

  const handleEdit = (id) => {
    const { name, description} = data.find(item => item._id === id);
    setCurrentTest({id, data: {name, description}} );
    handleVisible();
  };

  const handleDelete = async (id) => {
    deleteTest(id)
      .unwrap()
      .then(data => console.log(data))
      .catch(err => toast.error('Произошла ошибка. Попробуйте позже'))
  }

  const handleSubmit = async (content) => {
    changeTest({id: currentTest.id, data: content})
      .unwrap()
      .then(data => console.log(data))
      .catch(err => toast.error('Произошла ошибка. Попробуйте позже'))
  }

    return (
        <div className={'main-wrapper'}>
            <div className={'tasks'}>
                {data.map(item => (
                  <div key={item._id} className={'task'}>
                      <div>
                          {item.name}
                      </div>
                      <div className={'buttons'}>
                          <div onClick={() => handleEdit(item._id)} className={'button-element'}>
                              <EditFilled style={{color: '#4096ff', fontSize: '18px'}}/>
                          </div>
                          <div onClick={() => handleDelete(item._id)} className={'button-element'}>
                              <CloseOutlined style={{color: '#ff4d4f', fontSize: '18px'}}/>
                          </div>
                      </div>
                  </div>
                ))}
            </div>
          <Modal visible={visible} handleVisible={handleVisible}>
            {currentTest &&
              <TestForm
                initialValues={currentTest.data}
                title='Изменить тест'
                handleSubmit={handleSubmit}
                handleVisible={handleVisible}
              />
            }
          </Modal>
        </div>
    );
};