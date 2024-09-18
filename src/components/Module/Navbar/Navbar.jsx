import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import authContext from "../../../Contexts/authContext";
import basketCart from "../../../Contexts/basketCartContext";
import logo from '/assets/logo.svg';
import { useQuery } from "react-query";

function Navbar() {
  const navbar = useRef();
  const { isLogedin, logout } = useContext(authContext);

  useEffect(() => {
    window.addEventListener("scroll", fixedNavbar);

    function fixedNavbar() {
      if (window.scrollY > 5) {
        navbar?.current.classList.add("animate__fadeInDown");
        navbar?.current.classList.add("fix-navbar");
      } else {
        navbar?.current.classList.remove("animate__fadeInDown");
        navbar?.current.classList.remove("fix-navbar");
      }
    }

    return () => window.removeEventListener("scroll", fixedNavbar);
  }, []);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch("https://wiko.pythonanywhere.com/content/categorys").then((res) => {
        if (res.ok) {
          return res.json().then((categories) => setCategories(categories));
        }
        return res.text().then((err) => console.error(err));
      });
    }
    fetchData();
  }, []);

  const dropdownmenu = useRef();

  useEffect(() => {
    dropdownmenu.current?.addEventListener("mouseout", mouseOut);

    function mouseOut() {
      if(dropdownmenu) {

        dropdownmenu.current.style.display = "none";
      }
    }

    window.addEventListener("scroll", hiddenDropdown);

    function hiddenDropdown() {
      dropdownmenu.current.style.display = "none";
    }

    return () => {
      window.removeEventListener("mouseout", mouseOut);
      window.removeEventListener("scroll", hiddenDropdown);
    };
  }, []);

  const [isShowDrop, setIsShowDrop] = useState(false);
  const {basket } = useContext(basketCart);
  const [productCount, setProductCount] = useState(basket.length);

  useEffect(() => {
    setProductCount(basket.length)
  },[basket])

  

  const logOutUser = () => {
    logout();
  };

  const fetchMenus = async () => {
   const res = await fetch("https://wiko.pythonanywhere.com/content/navbar/", {
      method: "GET",
    })
    
    const result = await res.json()
    return result
  };

  const { data } = useQuery("Menus", fetchMenus);


  
  

  return (
    <div ref={navbar} className=" navbar animate__animated ">
      <div className="container  mx-auto px-5 xl:px-20">
        <div className="flex  justify-between p-1 items-center">
          <div className="logo">
            <Link to={"/"}>
              <img
                style={{ width: "60px", height: "60px" }}
                className="max-w-full h-auto	"
                src={logo}
                alt=""
              />
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden ml-5">
            {/* <AlignLeftOutlined  /> */}
            <div className="menuButton">
              <input type="checkbox" id="navcheck" role="button" title="menu" />
              <label htmlFor="navcheck" aria-hidden="true" title="menu">
                <span className="burger right">
                  <span className="bar">
                    <span className="visuallyhidden">Wiko</span>
                  </span>
                </span>
              </label>
              <ul id="menu" className="menuNav">
                <li>
                  <Link to="/">صفجه اصلی</Link>
                </li>
                <li>
                  <Link to="/about">درباره ما</Link>
                </li>
                <li>
                  <Link to="/contact">ارتباط با ما</Link>
                </li>
                <li>
                  <Link to="/blog">بلاگ</Link>
                </li>
                {
                  isLogedin ? (
                    <li>
                      <Link to={`/userPanel/${
                            JSON.parse(localStorage.getItem("userInfo"))?.user_id
                          }`}>پنل کاربری</Link>
                    </li>
                  ) : (
                <li>
                  <Link to="/login">ثبت نام / لاگین</Link>
                </li>
                  )
                }
                <li>

                <Link  to={"/products"}>
                 فروشگاه
              </Link>
                </li>
                <li>
                  <Link to="/faq">سوالات متداول</Link>
                </li>
                <li>
                  <Link to='/basketCard'>سبد خربد</Link>
                </li>
                <li>
                  <Link to="/collection">کالکشن</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="menus hidden lg:flex">
            <ul className="flex gap-5">
              {
                data?.slice().reverse().map(link => {
                  if(link.sub_menu) {
                    return (
                    <Link key={link.id} to={link.link}>
                    <li className="relative drop">
                      {link.title}
                      <i className="fa-solid fa-chevron-down text-xs"></i>
                      <div className="flex">
                        <div className="categories flex">
                          <div
                            ref={dropdownmenu}
                            className="grid gap-5 animate__animated animate__fadeInUp grid-cols-[400px,600px] dropdown-menu"
                          >
                            <div className="flex gap-3">
                              {categories
                                ? categories.map((category) => {
                                    if (!category.is_sub) {
                                      return (
                                        <div key={category.slug} className="">
                                          <div key={category.slug}>
                                            <p className="text-l titleSidebar">
                                              {category.title}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    }
                                    return (
                                      <p
                                        key={category.id}
                                        className="sidebarCateItem"
                                      >
                                        <Link to={"/"}>{category.title}</Link>
                                      </p>
                                    );
                                  })
                                : ""}
                            </div>
                            <img
                              src="assets/images/accessories-home-3.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>

                    )
                  }else {
                    return (
                      <Link  key={link.id} to={link.link}>
                      <li>{link.title}</li>
                      </Link>
                    )
                  }
                })
              }
               
            </ul>
          </div>
          <div className="searchbar relative lg:flex gap-7 hidden">
            <Link>
              {isLogedin ? (
                <>
                  <i
                    className="fa-solid fa-user text-xl"
                    onClick={() => setIsShowDrop(!isShowDrop)}
                  ></i>
                  <div
                    className={`drop-menu animate__animated animate__fadeInUp ${
                      isShowDrop ? "block" : ""
                    }`}
                  >
                    <ul className="flex flex-col gap-2">
                      <li>
                        <Link
                          to={`/userPanel/${
                            JSON.parse(localStorage.getItem("userInfo"))?.user_id
                          }`}
                        >
                          پنل کاربری
                        </Link>
                      </li>
                      <li>
                        <Link to={"/p-admin"}>پنل مدیریت</Link>
                      </li>
                      <li>
                        <Link to={""} onClick={logOutUser}>
                          خروج از حساب
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <Link to={"/login"}>ثبت نام / ورود </Link>
              )}
            </Link>
            <Link to={""}>
              {" "}
              <i className="fa-solid fa-magnifying-glass text-xl"></i>
            </Link>
            <Link className="relative" to={"/basketCard"}>
              <div className="relative card-hover">
                <i className="fa-solid fa-bag-shopping  text-xl cart-hover"></i>
                <div className="drop-card animate__animated animate__fadeInUp">
                  {basket.length > 0 ? (
                    <span >  محصول  {productCount.toLocaleString('fa-IR')} در کارت شما وجود دارد  </span>
                  ) : (
                    <span>کارت شما در حال حاضر خالی است </span>
                  )}
                </div>
                <span className="absolute flex justify-center items-center  count-basket px-1">
                  <div>{basket.length > 0 ? basket.length : "0"}</div>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
