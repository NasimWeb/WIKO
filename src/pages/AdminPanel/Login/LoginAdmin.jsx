import "./LoginAdmin.css";
import { Alert, Button, Form, Input, Space } from "antd";
import { AntDesignOutlined, PhoneOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import parseJwt from "../../../Hooks/jwtParseToken";
import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import authContext from "../../../Contexts/authContext";
import Marquee from "react-fast-marquee";

function LoginAdmin({ children }) {
  const [decodedToken, setDecodedToken] = useState();
  const { userInfo, logout } = useContext(authContext);

  const onFinish = async (values) => {
    // console.log("Success:", values);
    await fetch("https://wiko.pythonanywhere.com/accounts/login/", {
      method: "POST",
      body: JSON.stringify({
        phone: values.Phone,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((result) => {
          const decodedToken = parseJwt(result.access);
          setDecodedToken(decodedToken);
          if (!decodedToken?.is_admin) {
            message.error("You are not admin");
          } else {
            message.success("Successful");
            // setAccessToken(result.access);
            localStorage.setItem("accessToken", result.access);
            localStorage.setItem("refreshToken", result.refresh);
            const decodedToken = parseJwt(result.access);
            localStorage.setItem("userInfo", JSON.stringify(decodedToken));
          }
        });
      } else if (res.status === 401) {
        return res
          .text()
          .then(() => message.error("username or password is incorrect"));
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  React.useEffect(() => {
    if (decodedToken?.is_admin === false) {
      navigate("/p-admin");
    }
  }, [decodedToken]);

  const navigate = useNavigate();

  return (
    <>
      {userInfo?.is_admin === false ? (
        <div className="bg-login-panel">
          <div className="container mx-auto flex px-5 justify-center items-center">
            <Alert
              banner
              message={
                <Marquee pauseOnHover gradient={false}>
                  you are not admin so Please LogOut first then LogIn again
                </Marquee>
              }
            />
            <Button
              type="primary"
              size="large"
              onClick={logout}
              icon={<AntDesignOutlined />}
            >
              LogOut
            </Button>
          </div>
        </div>
      ) : (
        <>
          {userInfo?.is_admin === true ? (
            children
          ) : decodedToken?.is_admin ? (
            children
          ) : (
            <React.Fragment>
              <div className="bg-login-panel">
                <div className="container mx-auto flex px-5 justify-center items-center">
                  <div className="form-container text-center">
                    <img
                      src="/src/assets/images/logo.svg"
                      style={{ width: "100px", maxWidth: "100%" }}
                      className="mx-auto mb-10"
                      alt=""
                    />
                    <Form
                      layout="vertical"
                      name="basic"
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                      style={{
                        width: "100%",
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Form.Item
                        label="Phone"
                        name="Phone"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Phone!",
                          },
                        ]}
                      >
                        <Input
                          className="pb-2"
                          prefix={<PhoneOutlined className="text-blue " />}
                          style={{ width: "300px" }}
                        />
                      </Form.Item>

                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input.Password
                          className="pb-2"
                          prefix={<LockOutlined className="text-blue " />}
                          style={{ width: "300px" }}
                        />
                      </Form.Item>

                      <Form.Item style={{ marginTop: "40px" }}>
                        <Space>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: "300px", paddingBlock: "20px" }}
                          >
                            login
                          </Button>
                        </Space>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </>
      )}
    </>
  );
}

export default LoginAdmin;
