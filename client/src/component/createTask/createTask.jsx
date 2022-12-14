import React, {useState} from 'react'
import {Card, Checkbox, Input, Button} from 'antd';
import './createTask.css'
import Modal from '../modal/Modal';
import {useLocation, useNavigate} from 'react-router-dom';
import CreateAnswer from './createAnswer';
import {toast} from 'react-toastify';
import {useCreateTaskMutation} from '../../services/taskService';

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
            .then(data => toast.info('???????????? ??????????????????'))
            .catch(err => toast.error('?????????????????? ????????????'))

        setNumberAnswer(1);
        setVariants([]);
        setTask({
            title: '',
            description: ''
        })
        setOwnAnswer(false);
    }

    const { TextArea } = Input

    return (
        <div className="TestContainer">
            <Card
                title="???????????????? ????????????"
                style={{
                    width: "100%"
                }}

            >
                <div className="TestContainer__content">
                    <div className="TestContainer__inputs">
                        <Input
                            placeholder="????????????????"
                            name='title'
                            value={task.title}
                            onChange={handleChangeTask}
                            style={{width: '100%'}}
                        />
                        <div className='wrapper__area'>
                            <TextArea
                                rows={4}
                                name='description'
                                value={task.description}
                                onChange={handleChangeTask}
                                style={{width: "100%", borderRadius: "10px"}}
                                placeholder="????????????????"
                            />
                        </div>
                        <div className='wrapper__number_answer'>
                            <div>
                                <Checkbox checked={ownAnswer} onClick={handleOwnAnswer}>???????????????????? ??????????</Checkbox>
                            </div>

                        </div>
                    </div>
                </div>

                <div style={{display: "flex", marginTop: '5px', columnGap: '5px'}}>
                    <Button onClick={handleSaveTask}>?????????????????? ????????????</Button>
                    {!ownAnswer &&
                        <div className="TestContainer__btns">
                            <Button
                                onClick={handleVisible}
                                disabled={numberAnswer > 3}
                            >???????????????????? ????????????????</Button>
                        </div>
                    }
                </div>
            </Card>
            <Modal visible={visible} handleVisible={handleVisible} subtitle='?????????????? ???????????????? ????????????'>
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
