import "./App.css";
import router from "./Routes";
import { useRoutes } from "react-router-dom";
import Navbar from "./components/Module/Navbar/Navbar";
import Footer from "./components/Module/Footer/Footer";
import "animate.css";
import "react-toastify/dist/ReactToastify.css";
import authContext from "../src/Contexts/authContext";
import { useEffect, useRef, useState } from "react";
import "animate.css";
import Topbar from "./components/Module/Topbar/Topbar";
import { useLocation } from "react-router-dom";
import basketCart from "./Contexts/basketCartContext";
import { getCookie } from "./Funcs/getCookie";
import { Modal } from "antd";

function App() {
  const routes = useRoutes(router);
  const userInfoLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

  const location = useLocation();

  const userAccessToken = localStorage.getItem("accessToken");

  const [isLogedin, setIsLogedin] = useState(() => {
    if (userAccessToken) {
      return true;
    }
    return false;
  });
  
  const [userInfo, setUserInfo] = useState(userInfoLocalStorage);
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState(() => {
    const cookieValue = getCookie('basketCart');
    try {
      return cookieValue ? JSON.parse(cookieValue) : [];
    } catch (e) {
      console.error('Invalid JSON in basketCart cookie:', e);
      return [];
    }
  });

  
  const login = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsLogedin(true);
  };

  const logout = () => {
    fetch(`https://wiko.pythonanywhere.com/accounts/logout/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body : JSON.stringify({'refresh': localStorage.getItem('refreshToken')})
    }).then(res => {
      if (res.ok) {
        Modal.success({
          content: 'شما با موفقیت از حساب خود خارج شدید',
        })
      }
    })
    localStorage.clear();
    setIsLogedin(false);
    setUserInfo(null);
  };

  const decodeToken = (token) => {
    // جداسازی payload توکن (JWT دارای سه بخش است: header.payload.signature)
    const tokenPayload = token.split(".")[1];

    // رمزگشایی base64
    const decodedPayload = JSON.parse(atob(tokenPayload));

    return decodedPayload;
  };

// تابعی برای محاسبه زمان انقضای توکن
const getTokenExpiration = (token) => {
  const decodedToken = decodeToken(token);
  
  if (!decodedToken) return 0;

  const exp = decodedToken.exp; // زمان انقضا به صورت timestamp یونیکس
  const currentTime = Math.floor(Date.now() / 1000); // زمان فعلی به ثانیه (یونیکس تایم)
  const timeToExpire = exp - currentTime; // مدت زمان باقی‌مانده تا انقضا به ثانیه

  if (timeToExpire > 0) {
    console.log(`Token expires in ${timeToExpire} seconds.`);
    return timeToExpire;
  } else {
    console.log("Token has expired.");
    return 0;
  }
};

// تابع برای رفرش کردن توکن
const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");

  if (!refresh) {
    console.error("No refresh token available");
    return;
  }

  try {
    const res = await fetch(
      `https://wiko.pythonanywhere.com/accounts/api/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refresh,
        }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      const { access, refresh } = data;

      if (access) {
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);

        const timeToExpire = getTokenExpiration(access);
        if (timeToExpire > 0) {
          startTokenTimer(timeToExpire); // زمان‌بندی رفرش توکن بر اساس زمان انقضا
        }
      } else {
        console.error("Invalid token data received");
      }
    } else {
      const errorText = await res.text();
      console.error("Failed to refresh token:", errorText);
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

// تابع برای شروع تایمر جهت رفرش توکن
const startTokenTimer = (expiresIn) => {
  setTimeout(() => {
    refreshToken();
  }, expiresIn * 1000);
};

// استفاده از useEffect برای بررسی و تنظیم تایمر بر اساس زمان انقضا
useEffect(() => {
  const token = localStorage.getItem("accessToken");
    
  if (token) {
    const timeToExpire = getTokenExpiration(token);

    if (timeToExpire > 0) {
      startTokenTimer(timeToExpire); // زمان‌بندی رفرش توکن بر اساس زمان انقضا
    } else {
      // رفرش توکن انجام شود چون توکن منقضی شده است
      refreshToken();
    }
  }
}, []);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false); 
  }, 500); 

  return () => clearTimeout(timer); 
  }, []);

  const goToTop = useRef(null)

  useEffect(() => {

    function handleScroll () {
      if (window.scrollY > 500) {
        if (goToTop.current) {
            goToTop.current.style.display = 'block';
        }
    } else {
        if (goToTop.current) {
            goToTop.current.style.display = 'none';
        }
    }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

     

   const goToUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
   }

   const { pathname } = useLocation();

   
   useEffect(() => {
     window.scrollTo(0, 0);
   }, [pathname]);




  return (
    <>
      {loading ? (
        /* From Uiverse.io by Yaya12085 */
        <div
          className="flex justify-center items-center"
          style={{ height: "100vh", overflow: "hidden" }}
        >
          <div className="loader"></div>
        </div>
      ) : (
        <authContext.Provider
          value={{
            isLogedin,
            setIsLogedin,
            userInfo,
            setUserInfo,
            login,
            logout,
          }}
        >
          <basketCart.Provider value={{
            setBasket,
            basket,
          }} >
            {location.pathname.startsWith("/p-admin") ? (
              <div>{routes}</div>
            ) : (
              <>
                <Topbar />
                <Navbar />
                {routes}
                <div id="goToTop" onClick={goToUp} ref={goToTop} className=""><span className="fa fa-angle-up"></span></div>
                <Footer />
              </>
            )}
          </basketCart.Provider>
        </authContext.Provider>
      )}
    </>
  );
}

export default App;
