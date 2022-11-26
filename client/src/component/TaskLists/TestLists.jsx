import React from 'react';

import './TestLists.css'
import TestForm from '../form/testForm';

import {Card } from 'antd';


const TaskLists = ({children, handleSubmit}) => {
    return (

        <div className='taskLists' style={{
            display: 'flex',
            margin: '0 auto',
            justifyContent: 'center',

        }}>
            <Card title='Список тестов'
                  headStyle={{
                      textAlign: 'center',
                      width: '800px',

                  }}
                  style={{
                      width: '800px',
                      height: '800px'
                  }}
            >
                <div className='taskLists__Content'>
                    <Card title='Добавление тестов'
                          style={{textAlign: 'center', height: '700px'}}
                    >
                      <TestForm handleSubmit={handleSubmit}/>
                    </Card>

                    <Card title='Список Тестов'
                          style={{textAlign: 'center'}}
                    >
                      {children}
                    </Card>

                </div>
            </Card>
        </div>
    );
}

export default TaskLists;
