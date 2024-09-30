import Heading from '../../Module/Heading/Heading'
import "./RelatedProducts.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';



function RelatedProducts({productSlug}) {

  const [similarProducts, setSimilarProducts] = useState([]);
    
  useEffect(() => {
    async function fetchData() {
      await fetch(`https://wiko.pythonanywhere.com/content/related/products/${productSlug}/`).then(res => res.json()).then(result => setSimilarProducts(result))
    }
    fetchData();
  }, []);



  return (
    <div className="container px-5 my-10 mx-auto">
       <Heading title={"محصولات مشابه"} desc={"محصولات مشابه این محصول را دیدن کنید"} />
     
       <div className='my-10'>
      <Swiper
        spaceBetween={25}
        grabCursor={true}
        slidesPerView={4}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          300 : {
            slidesPerView : 1,
            spaceBetween : 5
          },
          // برای صفحه‌های بزرگتر از 640 پیکسل
          640: {
            slidesPerView: 2,  // دو اسلاید در یک لحظه نمایش داده شوند
            spaceBetween: 20,  // فاصله بین اسلایدها
          },
          // برای صفحه‌های بزرگتر از 768 پیکسل
          768: {
            slidesPerView: 3,  
            spaceBetween: 30,  
          },
          // برای صفحه‌های بزرگتر از 1024 پیکسل
          1024: {
            slidesPerView: 4,  
            spaceBetween: 40,  
          },
        }}
      >
        {
         similarProducts && similarProducts.map(product => {
            return (
              
              <SwiperSlide key={product.id} >
              <div
                className={` flex-col text-center `}
              >
                <div
                  className={`text-center card flex flex-col`}
                >
                  <Link to={`/products/${product.slug}`}>
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
                  <>
                    <div className="product-title font-bold">
                      {product.title}
                    </div>
                    <div className="product-price">{product.price.toLocaleString()}</div>
                  </>
               
              </div>
              </SwiperSlide>
              
            )
          })
        }
       
      </Swiper>
       </div>
    </div>
  );
}

export default RelatedProducts;
