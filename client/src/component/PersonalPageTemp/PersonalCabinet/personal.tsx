import React, {useState} from "react";
import "./personal.css";
import {
    Layout,
    Input,
    Card,
    Button,
    Select,
    InputNumber,
    message,
    Upload,
} from "antd";
import {
    FileAddOutlined,
    LoadingOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import type {UploadChangeParam} from "antd/es/upload";
import type {RcFile, UploadFile, UploadProps} from "antd/es/upload/interface";
import type {SizeType} from "antd/es/config-provider/SizeContext";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useGetUserQuery} from "../../../services/userService";
import {getUser} from "../../../services/tokenService";

const {Header, Content, Footer} = Layout;
const {TextArea} = Input;
const {Option} = Select;
const UserList = ["Макс", "Никита", "Антон", "Яна"];
const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

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

    const userId = useSelector(getUser());

    const {data: currentUser, error, isLoading} = useGetUserQuery(userId);

    console.log("curr", currentUser);

    const handleChange: UploadProps["onChange"] = (
        info: UploadChangeParam<UploadFile>
    ) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

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
    if (isLoading) {
        return <h2>Loading...</h2>;
    }
    return (
        <Layout>
            <Content
                className="site-layout"
                style={{padding: "0 50px", marginTop: 32}}
            >
                <div
                    className="site-layout-background"
                    style={{padding: 0, minHeight: 380}}
                >
                    <Card
                    >
                        <div className="card-redact">
                            <Card type="inner" title="Данные" style={{width: "100%"}}>
                                <div className={'info-wrapper'}>
                                    <div>
                                        <h1>Попов Жопа Очкович</h1>
                                        <div className="input-age">
                                            <InputNumber style={{width: '100%'}} placeholder={'Возраст'}/>
                                            <Select style={{marginTop: "5px"}} placeholder="Пол">
                                                <Option value="Option1">Мужской</Option>
                                                <Option value="Option2">Женский</Option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className={'upload'}>
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            beforeUpload={beforeUpload}
                                            onChange={handleChange}
                                        >
                                            {imageUrl ? (
                                                <img src={imageUrl} alt="avatar" style={{width: "100%"}}/>
                                            ) : (
                                                uploadButton
                                            )}
                                        </Upload>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <Card
                            style={{width: "100%", marginTop: "15px"}}
                            title="Пройденные тесты"
                            extra={<a href="#">Подробности</a>}
                            tabList={tabList}
                            activeTabKey={activeTabKey1}
                            onTabChange={(key) => {
                                onTab1Change(key);
                            }}
                        >
                            {contentList[activeTabKey1]}
                        </Card>
                        <Card type="inner" title="Заметки" style={{marginTop: "15px"}}>
                            <TextArea rows={4}/>
                        </Card>
                    </Card>
                </div>
            </Content>
            <Footer style={{textAlign: "center"}}>
                <Link to={"/createtest"}>
                    <Button type="primary" icon={<FileAddOutlined/>} size={size}>
                        Создать тест
                    </Button>
                </Link>
            </Footer>
        </Layout>
    );
};

export default Personal;
