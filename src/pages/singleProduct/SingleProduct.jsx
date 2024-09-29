import { Link, useParams } from "react-router-dom";
import PagesHeader from "../../components/Module/PagesHeader/PagesHeader";
import RelatedProducts from "../../components/Module/RelatedProducts/RelatedProducts";
import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./SingleProducts.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import extractPlainText from "../../Hooks/extractPlainText";
import { Alert, Modal } from "antd";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";
import { useQuery } from "react-query";
import basketCart from "../../Contexts/basketCartContext";
import { setCookie } from "../../Funcs/setCookie";
import { CommentOutlined, UserOutlined } from "@ant-design/icons";
import authContext from "../../Contexts/authContext";

function SingleProduct() {
  const { productSlug } = useParams();
  const [ProductActive, setProductActive] = useState("details");
  const [message, setMessage] = useState();
  const [comments, setComments] = useState([]);

 

  const { data } = useQuery(["singleProduct", productSlug], ()  => 
  fetch(`https://wiko.pythonanywhere.com/content/product/${productSlug}`).then(res => 
    res.json()
  )
  );



  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { basket, setBasket } = useContext(basketCart);

  const success = () => {
    Modal.success({
      content: "محصول شما با موفقیت اضافه شد",
    });
  };

  const AddToCard = async (event) => {
    event.preventDefault();
    let updatedBasket;
    if (basket) {
      const existingProduct = basket?.find((item) => item.slug === productSlug);
      if (existingProduct) {
        existingProduct.quantity = existingProduct.quantity || 0;
        existingProduct.quantity += 1;
        updatedBasket = [...basket]
        success();
      } else {
        updatedBasket = [...basket, {...data, quantity: 1}];
        success();
      }
      setBasket(updatedBasket)
      setCookie("basketCart", JSON.stringify(updatedBasket), 365 * 100);
    }
  };

 
  const fetchComments = async () => {

    const token = localStorage.getItem('accessToken')

    if(!token){
      console.log('you must login to see comments');
      
    } else  {
      await fetch(`https://wiko.pythonanywhere.com/options/comment/products/${data?.id}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setComments(data);
          });
        } else {
          res.text().then((err) => console.error(err));
        }
      });
    }
    
  };
 

  const {refetch} =useQuery("Comments", fetchComments);

 
 const {isLogedin} = useContext(authContext)
  

 const SendComment = async (event) => {
  event.preventDefault();
  await fetch(
    `https://wiko.pythonanywhere.com/options/add/comment/${data?.id}/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    }
  ).then((res) => {
    if (res.ok) {
      Modal.success({
        content: "پیام شما با موفقیت ارسال شد",
      });
      setMessage("");
      refetch()
    } else {
      console.log(res.statusText);
    }
  });
};
  

  return (
    <>
      <PagesHeader
        currentRoute={data?.title}
        prevRoute={"محصولات"}
        prevRouteLink="/products"
        bg={'/assets/images/bandeau-access-2021-desktop.jpg'}
      />
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1  lg:grid-cols-[400px_minmax(900px,_1fr)] gap-3 my-10">
          <div>
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
             
            >
              {data?.galerys?.map((galery , index) => {
                return (
                  <SwiperSlide key={index}>
                    <div>
                      <img src={galery.image} style={{ maxWidth : '100%'}}/>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              zoom={true}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs, Zoom]}
              className="mySwiper"
            >
              {data?.galerys?.map((galery) => {
                return (
                  <SwiperSlide key={galery.id}>
                    <div>
                      <img src={galery.image} />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="product-detail mt-20">
            <div className="product-detail__title font-bold text-3xl text-end">
              {data?.title}
            </div>
            <div className="flex gap-2 flex-col mt-5 text-end">
              <p>
                قیمت:{" "}
                <span className="product-price text-lg font-bold">
                  {data?.price.toLocaleString()}
                </span>
              </p>
              <p className=" text-xl">
                موجودی در انبار: {data?.is_avalable ? "موجود" : "ناموجود"}
              </p>
            </div>
            <div className="flex my-10 gap-5 justify-end">
              <div className="collectionButtonDetail text-center">
                <form
                  className="flex gap-5"
                  onSubmit={(event) => AddToCard(event)}
                >
                  <button
                    className="custom-btn text-xl"
                    href="/collection"
                    title="Shop the collection"
                  >
                    اضافه به سبد خرید
                  </button>
                </form>
              </div>
            </div>
            <div className="share text-xl">
              <ul className="flex gap-3 justify-end">
                <span className="font-bold ">اشتراک گذاری:</span>
                <li>
                  <Link href="/">
                    <i
                      className="fa-brands fa-facebook-f"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <i className="fa-brands fa-twitter" aria-hidden="true"></i>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <i
                      className="fa-brands fa-instagram"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <i
                      className="fa-brands fa-pinterest"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <i className="fa-brands fa-youtube" aria-hidden="true"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tabs">
          <ul className="flex gap-5 justify-start ">
            <Link
              className="relative"
              onClick={() => setProductActive("details")}
            >
              <li
                className={`font-bold text-3xl products-tabs ${
                  ProductActive === "details" ? "active" : ""
                }`}
              >
                جزییات
              </li>
            </Link>
          </ul>
        </div>
        <div className="tabs-content  mt-5 py-5">
          {extractPlainText(data?.body)}
        </div>
        {
          isLogedin ? (
        <div className="comments text-right">
          <h1 className="text-bold text-2xl">نظر خود را بنویسید</h1>
          <form className="flex flex-col gap-5 my-10" onSubmit={SendComment}>
            <textarea
              name=""
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-control form-text-area"
              id=""
            ></textarea>
            <div className="text-center">
              {" "}
              <button
                className="btnVelaOne btn-contact"
                style={{ width: "300px" }}
              >
                ارسال
              </button>
            </div>
          </form>
          <div className="showComents mb-10">
            <h2 className="mb-10 text-2xl font-bold">
              {" "}
              <span style={{ color: "#00b2a9" }}>
                <CommentOutlined />
              </span>{" "}
              کامنت ها{" "}
            </h2>
            {comments?.map((item) => {
              return (
                <div key={item.id} className="eachCommets">
                  <h5 className="font-bold text-lg mb-2">
                    {item.reply_complete === true ? 'admin' : item?.user}{" "}
                    <span style={{ color: "#00b2a9" }}>
                      <UserOutlined />
                    </span>
                  </h5>
                <p>{item.message}</p>
                </div>
              );
            })}
          </div>
        </div>

          ) : (
              <Alert className="text-end" message="لطفا اول ثبت نام کنید و سپس مجاز به کامنت گذاشتن هستید" type="warning" />
          )
        }
        <hr />
      </div>
      <RelatedProducts productSlug={productSlug} />
    </>
  );
}

export default SingleProduct;
