import React from 'react';

import './TestLists.css'
import TestForm from '../form/testForm';

import {Card} from 'antd';


const TaskLists = ({children, handleSubmit}) => {
    return (

        <div className='taskLists' style={{
            display: 'flex',
            margin: '0 auto',
            justifyContent: 'center',

        }}>
            <div className='taskLists__Content'>
                    <Card title='Добавление тестов'
                          style={{textAlign: 'center', width: '100%'}}
                    >
                        <TestForm handleSubmit={handleSubmit}/>
                    </Card>
                    <Card title='Список Тестов'
                          style={{textAlign: 'center', width: '100%'}}
                    >
                        {children}
                    </Card>
            </div>
        </div>
    );
}

export default TaskLists;
