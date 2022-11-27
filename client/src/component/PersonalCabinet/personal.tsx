import React, { useState } from "react";
import "./personal.css";
import {toast} from "react-toastify";

import {
  Layout,
  Input,
  Card,
  Avatar,
  Button,
  Select,
  InputNumber,
  message,
  Upload,
  Image,
} from "antd";
import {
  FileAddOutlined,
  LoadingOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import Headline from "../Head/Headline";
import { Link } from "react-router-dom";
import {
  useChangeUserInfMutation,
  useGetAvatarQuery,
  useGetUserQuery,
  useUpdateImgMutation,
} from "../../services/userService";
import { useSelector } from "react-redux";
import { getUser } from "../../services/tokenService";
import { UploadMy } from "./../Upload/UploadMy";

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Option } = Select;
const UserList = ["Макс", "Никита", "Антон", "Яна"];
const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Файл должен быть в формате JPG/PNG!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Изображение меньше 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const options = [
  {
    value: "мужской",
    label: "Мужской",
    children: [
      {
        value: "женский",
        label: "Женский",
      },
    ],
  },
];
const tabList = [
  {
    key: "tab1",
    tab: "1 тест",
  },
  {
    key: "tab2",
    tab: "2 тест",
  },
];
const contentList: Record<string, React.ReactNode> = {
  tab1: <p>Тест про пингвинов</p>,
  tab2: <p>Тоже тест про пингвинов</p>,
};

const Personal: React.FC = () => {
  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const changeUser = () => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(
      index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]
    );
  };

  const [activeTabKey1, setActiveTabKey1] = useState<string>("tab1");
  const [activeTabKey2, setActiveTabKey2] = useState<string>("app");

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };

  const [size, setSize] = useState<SizeType>("large");
  //   if (isLoading) {
  //     return <h2>Loading...</h2>;
  const userId = useSelector(getUser());

  console.log(userId)
  const { data: currentUser, error, isLoading } = useGetUserQuery<any>(userId);

  //   }

  const [changeUserInf] = useChangeUserInfMutation();

  const [ infoUser, setInfoUser] = useState({
    name: '',
    age: '',
    gender: 'пол'
  })


  const handleChange = (e: any) => {
    if (typeof e === 'object') {
      setInfoUser(prevState => ({
        ...prevState,
        [e.target.name] : e.target.value
      }))
    } else if (typeof e === 'string') {
      setInfoUser(prevState => ({
            ...prevState,
            gender: e
          }))
    } else {
      setInfoUser(prevState => ({
        ...prevState,
        age: e
      }))
    }
  }

  const handleUpdateUser = async () => {
    changeUserInf(infoUser)
        .unwrap()
        .then(data => toast.info('Данные о пользователе обновлены'))
        .catch(err => toast.error('Ошибка, попробуйте позже'))
  }


  // return (
  //     <h3>User</h3>
  // )

  return (
    <Content
      className="site-layout"
      style={{ padding: "0 50px", marginTop: 32 }}
    >
      {!isLoading ? (
        <div
          className="site-layout-background"
          style={{ padding: 0, minHeight: 380 }}
        >
          <Card
            title={currentUser.email}
            extra={
              <div>
                <div style={{ color: "gray", fontSize: "13px" }}>
                  id: {currentUser._id}
                </div>
                <div
                  style={{
                    color: "gray",
                    fontSize: "13px",
                    textAlign: "right",
                  }}
                >
                  {currentUser.role}
                </div>
              </div>
            }
          >
            <div style={{ display: "flex" }}>
              <Card
                title="Информация"
                style={{ width: "100%", marginRight: "20px" }}
              >
                {currentUser.avatar && (
                  <Avatar
                    size={100}
                    src={`http://localhost:5000/files/${currentUser.avatar}`}
                    shape="square"
                    icon={<UserOutlined />}
                  />
                )}
                <h4>Имя: {currentUser.name}</h4>
                <h4>Возраст: {currentUser.age}</h4>
                <h4>Пол: {currentUser.gender}</h4>
                <Button type={"primary"}>Изменить</Button>
              </Card>
              <div className="card-redact">
                <Card
                  title="Редактировать"
                  style={{ width: "100%", marginRight: "20px" }}
                >
                  <div className="input-age">
                    <Input
                        value={infoUser.name}
                        name='name'
                        placeholder="Имя"
                        onChange={handleChange}
                    />
                    <InputNumber
                      name='age'
                      value={infoUser.age}
                      placeholder="Возраст"
                      style={{ width: "100%", marginBottom: "10px" }}
                      onChange={handleChange}
                    />
                    <Select
                        value={infoUser.gender}
                        // name='gender'
                        style={{ marginBottom: "10px" }}
                        onChange={handleChange}
                        placeholder="Пол"
                    >
                      <Option value="mail">Мужской</Option>
                      <Option value="female">Женский</Option>
                    </Select>
                    <div style={{ display: "flex" }}>
                      <UploadMy />
                    </div>
                  </div>
                  <Button onClick={handleUpdateUser} type={"primary"}>Изменить</Button>
                </Card>
              </div>
            </div>

            {/*{*/}

            {/*  currentUser.role === 'USER' && (currentUser?.tests?.length !== 0 ) ? (*/}
            {/*  <Card*/}
            {/*    title="Пройденные тесты"*/}
            {/*    extra={<Button type="ghost">Подробности</Button>}*/}
            {/*    tabList={tabList}*/}
            {/*    activeTabKey={activeTabKey1}*/}
            {/*    onTabChange={(key) => {*/}
            {/*      onTab1Change(key);*/}
            {/*    }}*/}
            {/*    style={{ minWidth: "500px" }}*/}
            {/*  >*/}
            {/*    /!*{currentUser.tests}*!/*/}
            {/*  </Card>*/}
            {/*) : (*/}
            {/*  <Card title="Пройденные тесты" style={{ minWidth: "500px" }}>*/}
            {/*    Нет тестов*/}
            {/*  </Card>*/}
            {/*)}*/}


          </Card>
        </div>
      ) : (
        <Card loading={isLoading} style={{ height: "100%" }}></Card>
      )}
    </Content>
  );
};

export default Personal;
