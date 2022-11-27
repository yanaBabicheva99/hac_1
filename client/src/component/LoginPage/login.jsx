import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useSignInMutation } from "../../services/authService";
import { createToken, getToken } from "../../services/tokenService";

import { Input, Button, Card } from "antd";
import "./login.css";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("invalid").required("is required"),
  password: Yup.string().required("is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const [signIn] = useSignInMutation();
  const select = useSelector(getToken());
  const navigate = useNavigate();

  console.log(select);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (content) => {
    console.log("uiu3");
    console.log(content);
    signIn(content)
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
          <h1>Вход </h1>
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
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && <p>{errors.email}</p>}

                <Input
                  className="login__input"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <p>{errors.password}</p>
                )}

                <Button
                  type="primary"
                  htmlType="submit"
                  className="login__button"
                >
                  Войти
                </Button>
              </form>
            )}
          </Formik>
          <p>
            Нет аккаунта? <Link to="/register">Создать аккаунт!</Link>
          </p>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginForm;
