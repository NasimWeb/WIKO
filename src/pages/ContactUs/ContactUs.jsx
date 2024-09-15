import PagesHeader from "../../components/Module/PagesHeader/PagesHeader";
import "./ContactUs.css";
import { useForm } from "react-hook-form";
import {  Modal } from "antd";
import getTokenLocal from "../../Funcs/getTokenLocal";
import { useState } from "react";

function ContactUs() {
  
  const [modal, contextHolder] = Modal.useModal();

  const countDown = () => {
    let secondsToGo = 2;
    const instance = modal.success({
      title: `پیام شما با موفقیت ارسال شد`,
      // content: `پیام شما با موفقیت ارسال شد`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      // instance.update({
      //   content: `This modal will be destroyed after ${secondsToGo} second.`,
      // });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: " ",
    },
  });

  const [message, setMessage] = useState();

  const onSubmit = (data) => {
    fetch(`https://wiko.pythonanywhere.com/options/contact/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenLocal("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        subject: data.subject,
        message: message,
      }),
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        return countDown() 
      } else {
        res.text().then((err) => console.log(err));
      }
    });
  };



  return (
    <>
      <PagesHeader currentRoute={"ارتباط با ما"} bg={'/assets/images/photo_2024-09-13_10-02-10.jpg'}/>
      <iframe
        className="mb-10"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12950.809955302842!2d51.364098807378454!3d35.75811661099663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0798050e5be3%3A0xcbf7426c83471fd1!2sShahrak-e%20Gharb%2C%20District%202%2C%20Tehran%2C%20Tehran%20Province%2C%20Iran!5e0!3m2!1sen!2suk!4v1718741400225!5m2!1sen!2suk"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="container mx-auto px-20 my-20">
        <div className="grid lg:grid-cols-2">
          <div className="conact-form">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <input
                type="email"
                className={`form-control ${errors.email ? "error" : ""}`}
                {...register("email", {
                  required: "لطفا ایمیل خود را وارد کنید",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "لطفا ایمیل را درست وارد کنید",
                  },
                })}
                placeholder="ایمیل"
              />
              {errors.email && (
                <span className="text-red-500 text-right">
                  {errors.email.message}
                </span>
              )}
              <select
                type="select"
                className={`form-control ${errors.subject ? "error" : ""}`}
                {...register("subject", { required: true })}
                placeholder="موضوع"
              >
                <option value="a">پشتیبانی فنی</option>
                <option value="b">سوالات درباره محصولات</option>
                <option value="c">مشکلات حساب کاربران</option>
                <option value="d">نظرات و پیشنهادات</option>
                <option value="e">شکایت و انتقاد</option>
                <option value="f">همکاری و شراکت</option>
                <option value="g">درخواست اطلاعات بیشتر</option>
                <option value="h">پرسش های عمومی</option>
              </select>
              {errors.subject && (
                <span className="text-red-500 text-right">
                  لطفا موضوع را وارد کنید
                </span>
              )}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="پیغام"
                rows={6}
                name=""
                className="form-control form-text-area"
                height={500}
                id=""
              ></textarea>
              <button className="btnVelaOne btn-contact">ارسال</button>
              {contextHolder}
            </form>
          </div>
          <div className="conact-details flex flex-col gap-5">
            <p style={{ direction: "rtl" }} className="text-2xl">
              ارتباط با ما
            </p>
            <p style={{ direction: "rtl" }}>
              جهت ارتباط با btrand-shop میتوانید از طریق این فرم با ما در تماس
              باشید
            </p>
            <div className="flex justify-end gap-2">
              <p>تهران, شهرک غرب </p>
              <p className="text-l font-bold"> :آدرس</p>
            </div>
            <div className="flex justify-end gap-2">
              <p>08398983939</p>
              <p className="text-l font-bold"> :شماره تماس</p>
            </div>
            <div className="flex justify-end gap-2">
              <p>btrens-shop@info.com</p>
              <p className="text-l font-bold"> :ایمیل</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
