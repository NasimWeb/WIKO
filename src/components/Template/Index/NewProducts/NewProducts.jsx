import Heading from "../../../Module/Heading/Heading";
import "./NewProducts.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

function NewProducts({ title, desc }) {

  async function fetchData() {

    const response = await fetch("https://wiko.pythonanywhere.com/content/products/")

    if(response.ok){
      const data = await response.json()
      return data
    }else {
      console.error(response.statusText)
    }
  
  }
  fetchData();


  const {data} = useQuery('Products',fetchData)
  
  
  return (
    <div className="container px-20 my-10 mx-auto">
      <Heading title={title} desc={desc} />
      <Swiper
        spaceBetween={25}
        grabCursor={true}
        slidesPerView={4}
        navigation={true}
        modules={[Navigation]}
        loop={true}
        breakpoints={{
          120 : {
            slidesPerView : 1,
            spaceBetween : 10
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        className="flex justify-center"
      >
        {data?.map((product) => {
          return (
         
             <SwiperSlide key={product.id}>
              <div
                className={` flex-col text-center `}
              >
                <div
                  className={`text-center card flex flex-col`}
                >
                  <Link to={`products/${product.slug}`} className="flex justify-center">
                    <img
                      src={product.baner}
                      alt=""
                      className={`image `}
                    />
                    <img
                      src={product.galerys[0]?.image}
                      alt=""
                      className={`image hover-image`}
                    />
                  </Link>
                  <div className="detail flex flex-col gap-1 ">
                    <Link
                      className="hover-btns bg-main flex justify-center items-center"
                      to={""}
                    >
                      <i className="fa-solid fa-eye text-white"></i>
                    </Link>
                    <Link
                      className="hover-btns  bg-main flex justify-center items-center"
                      to={""}
                    >
                      <i className="fa-solid fa-basket-shopping text-white"></i>
                    </Link>
                  </div>
                </div>
                  <div>
                    <div className="product-title font-bold">
                      {product.title}
                    </div>
                    <div className="product-price">{product.price}</div>
                  </div>
              </div>
              </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default NewProducts;
