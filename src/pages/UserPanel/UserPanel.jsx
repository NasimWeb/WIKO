import {
  LogoutOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./UserPanel.css";
import authContext from "../../Contexts/authContext";

function UserPanel() {
  
  const [activeMenu, setActiveMenu] = useState("itemOne");
  const {username , phone } = JSON.parse(localStorage.getItem('userInfo'))
  const { logout  } = useContext(authContext);


  

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error loading user data.</p>;

  return (
    <div className="container mx-auto px-20 mb-60 mt-10 gap-5">
      <div className="grid xl:grid-cols-userPanel gap-10">
        <section className="w-full max-w-[1432px] mx-auto bg-gray-100 dark:bg-gray md:p-10 border rounded lg:rounded-xl">
          <div className="flex justify-between">
            <img
              src="https://secure.gravatar.com/avatar/9ac3255069a99f297f61ea46ef432728?s=96&amp;d=mm&amp;r=g"
              alt="nasim"
              className="object-cover w-12 h-12 md:w-14 md:h-14 rounded-full inline-block cursor-pointer"
            />
            <h1 className="text-right text-xl ">
              <span className="font-bold"> 🙌 {username ? username : "کاربر"}</span> خوش اومدی
            </h1>
          </div>
          <Outlet  />
        </section>
        <div className="text-right">
          <div className="flex justify-end">
            <img
              src="../src/assets/images/logo.svg"
              style={{ width: "100px", maxWidth: "100%" }}
              alt=""
            />
          </div>
          <div
            onClick={() => setActiveMenu("itemOne")}
            className={`item ${
              activeMenu === "itemOne" ? "active" : ""
            } flex gap-3 justify-end mt-10 items-center`}
          >
            <Link to={""} className="flex gap-2 text-lg">
              جزئیات حساب
              <UserOutlined />
            </Link>
          </div>
          <div
            onClick={() => setActiveMenu("itemTwo")}
            className={`item ${
              activeMenu === "itemTwo" ? "active" : ""
            } flex gap-3 justify-end mt-3 items-center`}
          >
            <Link to={"orders"} className="flex gap-2 text-lg">
              سفارشات
              <ProductOutlined />
            </Link>
          </div>
          <div
            onClick={() => setActiveMenu("itemThree")}
            className={`item ${
              activeMenu === "itemThree" ? "active" : ""
            } flex gap-3 justify-end mt-4 items-center`}
          >
            <Link className="flex gap-2 text-lg" to={"/"} onClick={logout}>
              خروج
              <LogoutOutlined />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;