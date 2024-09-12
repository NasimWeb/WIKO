import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Features from "../../components/Template/Index/Features/Features";
import NewProducts from "../../components/Template/Index/NewProducts/NewProducts";
import Banner from "../../components/Template/Index/Banner/Banner";
import Advertisment from "../../components/Template/Index/Advertisment/Advertisment";
import OurBlog from "../../components/Template/Index/OurBlog/OurBlog";
import Stories from "../../components/Template/Index/Stories/Stories";



function Home() {


  return (
    <>
    <Stories />
      <Swiper
        className="flex justify-center"
        spaceBetween={0}
        grabCursor={true}
        slidesPerView={1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide className="flex justify-center">
          <img src="./src/assets/images/cbcfeae4440e92ddd7e6ed2eb9ced401.jpg"  className="w-full" alt="" />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <img src="./src/assets/images/a1a233bab70f0501dc9f7ed754406954.jpg"  className="w-full" alt="" />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <img src="./src/assets/images/01bc06252e2175b0b4ad4225f5300b96.jpg"  className="w-full" alt="" />
        </SwiperSlide>
      </Swiper>
      <Features />
      <NewProducts title={'جدیدترین محصولات'}  desc={'پرفروش ترین محصولات این هفته '} />
      <Banner />
      <NewProducts title={'پر فروش ترین محصولات'} desc={'پرفروش ترین محصولات از دید کاربران'} />
      <Advertisment />
      <OurBlog  />
    </>
  );
}

export default Home;
