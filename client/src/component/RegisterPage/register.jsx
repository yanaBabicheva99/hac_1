import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, Button, Card, Radio, Checkbox } from "antd";
import { useSignUpMutation } from "../../services/authService";
import { createToken, getToken } from "../../services/tokenService";
import { useDispatch, useSelector } from "react-redux";
import "../LoginPage/login";
import { Layout } from "antd";
import { toast } from 'react-toastify';
const { Header, Footer, Sider, Content } = Layout;

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("is required"),
  age: Yup.string().required("is required"),
  email: Yup.string().email("invalid").required("is required"),
  password:  Yup
    .string()
    .required('is required')
    .matches(
      /(?=.*[A-Z])/,
      'add a capital letter'
    )
    .matches(
      /(?=.*[0-9])/,
      'add a digit'
    )
    .matches(
      /(?=.*[!@#$%^&*])/,
      'add a symbol !@#$%^&*'
    )
    .matches(
      /(?=.{8,})/,
      'at least 8 characters'
    )
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [signUp] = useSignUpMutation();
  const select = useSelector(getToken());

  const navigate = useNavigate('/');

  const [agree, setAgree] = useState(false);

  const initialValues = {
    name: "",
    age: '',
    email: "",
    password: "",
  };

  const handleSubmit = async (content) => {
    console.log(content);
    signUp(content)
      .unwrap()
      .then((data) => {
        dispatch(createToken(data));
        navigate('/');
      })
      .catch(({ data: { message } }) => toast.error(message));
  };

  // const {data, error, isLoading} = useGetUsersQuery();
  // console.log(data, error);

  return (
    <Layout>
      <Header>Header</Header>
      <div className="login__wrapper">
        <Card className="login__container">
          <h1>Быстрая регистрация</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>

                <Input
                  className="login__input"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Имя"
                />
                {errors.name && touched.name && <p>{errors.name}</p>}

                <Input
                  className="login__input"
                  type="number"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Возраст"
                />
                {errors.age && touched.age && <p>{errors.age}</p>}

                <Input
                  className="login__input"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                />
                {errors.email && touched.email && <p>{errors.email}</p>}

                <Input
                  className="login__input"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Пароль"
                />
                {errors.password && touched.password && <p>{errors.password}</p>}

                <div>
                  <Checkbox
                    onChange={() => {
                      setAgree((prev) => !prev);
                    }}
                  >
                    Я согласен с условиями конфиденциальности
                  </Checkbox>
                </div>

                <Button
                  disabled={!agree}
                  type="primary"
                  htmlType="submit"
                  className="login__button"
                >
                  Создать аккаунт
                </Button>
              </form>
            )}
          </Formik>
          <p>
            Есть аккаунт? <Link to="/login">Войти!</Link>
          </p>
        </Card>
      </div>
    </Layout>
  );
};

export default RegisterForm;
