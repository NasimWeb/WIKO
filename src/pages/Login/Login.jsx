import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import authContext from "../../Contexts/authContext";
import parseJwt from "../../Hooks/jwtParseToken";
import PagesHeader from "../../components/Module/PagesHeader/PagesHeader";
import { Col, Modal, Row } from "antd";
// import PagesHeader from "../../components/Module/PagesHeader/PagesHeader";


function Login() {
  const {  setIsLogedin, setUserInfo, userInfo } =
    useContext(authContext);

    const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = async (data) => {
    const { phone, password } = data;

    const localStorageAcssessToken = localStorage.getItem("accessToken");
    const localStorageRefreshToken = localStorage.getItem("refreshToken");

    if (localStorageAcssessToken && localStorageRefreshToken) {
      // toast.error("شما قبلا لاگین کردید");
      Modal.error({
        content: "شما قبلا لاگین کردید",
      })
    } else {
      await fetch("https://wiko.pythonanywhere.com/accounts/login/", {
        method: "POST",
        body: JSON.stringify({
          phone,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
          if (res.status === 401) {
          Modal.error({
          content: "شماره تلفن یا رمز عبور اشتباه است",
         })
        } else {
          return res.json().then((data) => {
            setIsLogedin(true);
            const decodedToken = parseJwt(data.access);
            setUserInfo(decodedToken);
            localStorage.setItem("userInfo", JSON.stringify(decodedToken));
            localStorage.setItem("accessToken", data.access);
            localStorage.setItem("refreshToken", data.refresh);
            navigate('/')
           return Modal.success({
            content: "شما با موفقیت لاگین شدید",
           })
           
          });
        }
      });
    }
  };

  const registerUser = (data) => {
    const {
      username,
      phone,
      password,
      password2 = data.confirmPassword,
    } = data;

    if (password !== password2) {
      Modal.error({
        content: "رمز عبور شما همخوانی ندارد"
      })
    }

    if (userInfo?.length) {
      Modal.error({
        content: "شما قبلا لاگین کردید ابتدا از حساب خود خارج شوید سپس لاگین کنید"
      })
    } else {
      fetch("https://wiko.pythonanywhere.com/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          username,
          password,
          password2,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json().then((result) => {
              localStorage.setItem(
                "userInfo",
                JSON.stringify({
                  username: result.username,
                  phone: result.phone,
                  password: result.password,
                  is_admin:result.role,
                  user_id:result.user_id
                })
              );
              setIsLogedin(true);
              localStorage.setItem("accessToken", result.access);
              localStorage.setItem("refreshToken", result.refresh);
              Modal.success({
                content: "ثبت نام با موفقیت انجام شد",
              })
              navigate('/')
            });
          } else if (res.status === 400) {
            return res.text().then(() => {
              Modal.error({
                content : 'این شماره تماس  یا نام کاربری از قبل وجود دارد'
              })
            });
          } else {
            return res.text().then((err) => {
              throw new Error(err);
            });
          }
        })
        .catch((err) => {
          return Modal.error({
            content: err.message
          });
        });
    }
  };




  const [loginContent, setLoginContent] = useState(false);
  const [registerContent, setRegisterContent] = useState(true);
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <PagesHeader currentRoute={"ورود"} bg={'/assets/images/pngtree-blue-fluid-gradient-jingdong-good-things-festival-e-commerce-banner-image_178041.jpg'}/>
      <div className="container mx-auto ">
        <ToastContainer theme="dark" autoClose={2000} />
        <div
          className="flex justify-center items-center"
          style={{ paddingBlock: "60px" }}
        >
          <Row>
             <Col span={24}>
             
          <div className="form-container-login">
            <div className="tabs mb-5">
              <ul className="flex ">
                <li
                  className={`register-tabs p-5 text-center ${
                    !registerContent ? "bg-white" : ""
                  }`}
                >
                  <Link
                    to={""}
                    onClick={() => {
                      setLoginContent(false);
                      setRegisterContent(true);
                    }}
                    className="font-bold"
                  >
                    {" "}
                    ثبت نام
                  </Link>
                </li>
                <li
                  className={`login-tabs p-5 text-center ${
                    !loginContent ? "bg-white" : ""
                  }`}
                >
                  <Link
                    to={""}
                    onClick={() => {
                      setLoginContent(true);
                      setRegisterContent(false);
                    }}
                    className="font-bold"
                  >
                    ورود
                  </Link>
                </li>
              </ul>
            </div>
            <div className="content-tab mb-5">
              {registerContent ? (
                <form
                  className="flex flex-col gap-5"
                  onSubmit={handleSubmit(registerUser)}
                >
                  
                    <div className="flex flex-col gap-2">
                      <input
                        className="form-control  text-bold"
                        {...register("username", { required: true })}
                        type="text"
                        placeholder=" نام کاربری*"
                      />
                      {errors.username && (
                        <span
                          className="text-rose-500 "
                          style={{ direction: "rtl" }}
                        >
                          وارد کردن این بخش الزامی است
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <input
                        className="form-control  text-bold"
                        {...register("phone", { required: true })}
                        type="text"
                        placeholder="  شماره تماس*"
                      />
                      {errors.phone && (
                        <span
                          className="text-rose-500 "
                          style={{ direction: "rtl" }}
                        >
                          وارد کردن این بخش الزامی است
                        </span>
                      )}
                    </div>
                  
                  <div className="flex flex-col gap-2">
                    <input
                      className="form-control  text-bold"
                      {...register("password", { required: true })}
                      type={"password"}
                      placeholder="رمز عبور*"
                    />
                    {errors.password && (
                      <span
                        className="text-rose-500 "
                        style={{ direction: "rtl" }}
                      >
                        وارد کردن این بخش الزامی است
                      </span>
                    )}
                  </div>
                  <div className="relative" style={{ direction: "rtl" }}>
                    <input
                      className="form-control  text-bold"
                      {...register("confirmPassword", { required: true })}
                      type={showPass ? "text" : "password"}
                      placeholder=" تکرار مز عبور*"
                    />
                    <span
                      className="velaShowPassword"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {" "}
                      {showPass ? "نمایش" : "پنهان"}
                    </span>
                  </div>
                  {errors.confirmPassword && (
                    <span
                      className="text-rose-500 "
                      style={{ direction: "rtl" }}
                    >
                      وارد کردن این بخش الزامی است
                    </span>
                  )}
                  <button className="btnVelaOne">ثبت نام</button>
                </form>
              ) : (
                <form
                  className="flex flex-col gap-5 relative"
                  onSubmit={handleSubmit(loginUser)}
                  action=""
                >
                  <input
                    className="form-control  text-bold"
                    {...register("phone", { required: true, maxLength: 20 })}
                    type="text"
                    placeholder=" شماره تماس*"
                  />
                  {errors.phone && (
                    <span
                      className="text-rose-500 "
                      style={{ direction: "rtl" }}
                    >
                      وارد کردن این بخش الزامی است
                    </span>
                  )}
                  <input
                    className="form-control  text-bold"
                    {...register("password", { required: true, maxLength: 20 })}
                    type={showPass ? "text" : "password"}
                    placeholder="رمز عبور*"
                  />
                  <span
                    className="velaShowPassword"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {" "}
                    {showPass ? "نمایش" : "پنهان"}
                  </span>
                  {errors.password && (
                    <span
                      className="text-rose-500 "
                      style={{ direction: "rtl" }}
                    >
                      وارد کردن این بخش الزامی است
                    </span>
                  )}
                  <button className="btnVelaOne">ورود</button>
                </form>
              )}
            </div>
          </div>
             </Col>

          </Row>
        </div>
      </div>
    </>
  );
}

export default Login;
