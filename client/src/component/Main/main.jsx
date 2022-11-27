import React from "react";
import "./main.css";
import {useGetUsersQuery} from "../../services/userService";
import {Card, Avatar, Button, Modal} from "antd";
import {useGetTestsQuery} from "../../services/testService";
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import { getRole } from '../../services/tokenService';

const info = () => {
  Modal.info({
    title: 'АО «Гринатом»',
    content: (
      <div>
        <p>Адрес: 115230, г. Москва, 1-й Нагатинский проезд, д.10, стр. 1, БЦ «Ньютон Плаза»</p>
        <p>Управление коммуникаций АО «Гринатом»</p>
        <p>E-mail: gren-a-communication@greenatom.ru</p>
        <p>Для резюме соискателей:</p>
        <p>E-mail: rabota@greenatom.ru</p>
      </div>
    ),
    onOk() {
    },
  });
};


const Main = () => {
  // const {data, error, isLoading} = useGetUsersQuery();
  const role = useSelector(getRole());
  const {
    data: dataTests,
    error: dataErrors,
    isLoading: dataLoading,
  } = useGetTestsQuery();
  console.log("err", dataErrors);

  if ( dataLoading) {
    return <h2>Loading</h2>;
  }
  // console.log(data, error);
  return (
    <div className={"main-wrapper"}>
      <div className={"brand-info"}>
        <Avatar src={require("./logo.png")} size={300}/>
        <hr style={{border: "none"}}/>
        <div style={{fontSize: '28px', fontWeight: 'bold'}}>
          Гринатом
        </div>
        <hr style={{border: "1px solid whitesmoke"}}/>
        <div className={'brand-description'}>
          Ведущий ИТ-интегратор Госкорпорации «Росатом». Компания ведет собственную разработку ПО,
          осуществляет поддержку и развитие корпоративных ИТ-систем, разрабатывает программных роботов,
          занимается проектным управлением, импортозамещением, применяет искусственный интеллект и машинное
          обучение. Сегодня Гринатом создает самые современные решения для цифровизации атомной отрасли и
          становится одной из самых динамично развивающихся ИТ-компаний России.
        </div>
      </div>
      <div className={"tests"}>
        <Card title={"Тесты"}>
          <div className={"testcard-wrapper"}>
            {dataTests.map((test) => (
              <Card key={test._id} title={test.name} style={{width: "100%", marginTop: '5px'}}>
                <div
                  style={{display: "flex", justifyContent: "space-between"}}
                >
                  {test.description}
                  <Link to={role ? `/test/${test._id}` : '/login'}>
                    <Button type="primary">Пройти тест!</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Card>
        <Button style={{width: '100%', marginTop: '5px'}} onClick={info}>Контактная информация</Button>
      </div>
    </div>
  );
};

export default Main;
