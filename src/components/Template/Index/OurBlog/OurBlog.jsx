import Heading from "../../../Module/Heading/Heading";
import "./OurBlog.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import {useQuery} from 'react-query'
import extractPlainText from '../../../../Hooks/extractPlainText'


function OurBlog() {

  
  const allBlogs = async () => {
   const res =   await fetch("https://wiko.pythonanywhere.com/content/blogs")
   const result = await res.json().then(data => data)
   return result
  };

  const {data} = useQuery('Blogs',allBlogs)

  console.log(data);
  

  return (
    <div className="container px-20 my-20 mx-auto">
      <Heading title={"اخبار"} desc={"بروز ترین مطالب را مشاهده کنید"} />
      <Swiper
        className="flex justify-center"
        spaceBetween={20}
        grabCursor={true}
        slidesPerView={2}
        navigation={true}
        
        modules={[Navigation]}
        breakpoints={{
          120 : {
            slidesPerView: 1,
            spaceBetween : 10
          },
          768: {
            slidesPerView : 2,
            spaceBetween : 20
          },
          1024 : {
            slidesPerView : 2,
            spaceBetween : 20
          }
        }}
      >

        {
          data?.map(item => {
            return (
       <SwiperSlide key={item.id} className="flex justify-center mx-20">
          <div className="wrapper-slid flex items-center gap-5">
            <div className="blogimg relative">
              <Link to={`/blog/${item.title}`}>
                <img
                  src={item.image}
                  className=""
                  alt=""
                  style={{width : '400px', maxWidth: '100%'}}
                />
              </Link>
            </div>
            <div className="content-slid">
              <div className="font-bold">{item.title}</div>
              <p>
                {extractPlainText(item.content.slice(0,61))}
              </p>
              <button className="read-more relative ">
                <Link to={"/"} className="flex items-center gap-10">
                  <p> مشاهده بیشتر </p> 
                </Link>
              </button>
            </div>
          </div>
        </SwiperSlide>
            )

          })
        }
       
        
      </Swiper>
    </div>
  );
}

export default OurBlog;
