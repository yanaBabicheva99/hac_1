import React from 'react';
import { Layout } from 'antd';
import { NavLink} from 'react-router-dom';
import './Headline.css';

const { Header } = Layout;

const Headline: React.FC = () => (
  <Layout>
    <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', backgroundColor: "white", border: '1px solid whitesmoke' }}>
      <div className="logo" />

        <NavLink to='/personalpage'>Личный кабинет</NavLink>
        <NavLink to='/'>Главная страница</NavLink>
        <NavLink to='/'>Тесты</NavLink>

    </Header>
  </Layout>
);

export default Headline;