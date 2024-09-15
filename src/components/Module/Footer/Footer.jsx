import { useContext } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import authContext from "../../../Contexts/authContext";

function Footer() {

  const {isLogedin} = useContext(authContext)

  return (
    <footer style={{ background: "#F5F5F5" }}>
      <div className="container mx-auto px-20">
        <div className="grid lg:grid-cols-4 py-10 gap-5">
          <div>
          <div className="flex justify-center flex-col flex-wrap">
            <h4 className="font-bold mb-3">مارا در شبکه های اجتماعی دنبال کنید</h4>
             <div className="flex gap-2">
              <Link className="bullet-media flex justify-center items-center"><i className="fa-brands fa-facebook-f"></i></Link>
              <Link className="bullet-media flex justify-center items-center"><i className="fa-brands fa-twitter"></i></Link>
              <Link className="bullet-media flex justify-center items-center"><i className="fa-brands fa-instagram"></i></Link>
              <Link className="bullet-media flex justify-center items-center"><i className="fa-brands fa-pinterest"></i></Link>
              <Link className="bullet-media flex justify-center items-center"><i className="fa-brands fa-youtube"></i></Link>
             </div>
          </div>
          <div className="form-group relative">
          <h4 className="font-bold mt-10">خبرنامه</h4>
          <input type="text" className="form-control mt-3" placeholder="ایمیل خود را وارد کنید" style={{direction : 'ltr'}} />
          <i className="fa-solid fa-paper-plane absolute right-2 bottom-4"></i>
          </div>
          </div>
          <div className="flex justify-center flex-col lg:text-center">
            <h4 className="font-bold">عمومی</h4>
            <ul className="mt-5">
              <Link to={"/products"}>
                <li>فروشگاه</li>
              </Link>
              <Link to={"/collection"}>
                <li>کالکشن</li>
              </Link>
              <Link to={"/faq"}>
                <li>سوالات متداول</li>
              </Link>
              <Link to={"/contact"}>
                <li>ارتباط با ما</li>
              </Link>
              
            </ul>
          </div>
          <div className="flex justify-center flex-col lg:text-center">
            <h4 className="font-bold">لینک های مفید</h4>
            <ul className="mt-5">
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
              <Link to={"/products"}>
                <li>محصولات</li>
              </Link>
              <Link to={"/about"}>
                <li>درباره ما</li>
              </Link>
              
            </ul>
          </div>
         
          <div className="details flex flex-col gap-5">
            <img
              style={{ width: "60px", height: "60px" }}
              src="/assets/logo.svg"
              alt=""
            />
            <div className="address flex gap-2">
              <i className="fa-solid fa-house"></i>
              <span>Btrend-shop,بلوار دانشجو,خیابان بهشتی , شهرک غرب</span>
            </div>
            <div className="phone flex gap-2">
              <i className="fa-solid fa-phone"></i>
              <span>98387837837</span>
            </div>
            <div className="email flex gap-2">
              <i className="fa-solid fa-envelope"></i>
              <span>Btrend@shop.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
