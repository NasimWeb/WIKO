import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./Stories.css";
import { Navigation } from "swiper/modules";
import { useQuery } from "react-query";
import { Image } from "antd";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import checkMediaType from "../../../../Hooks/cheackMediaType";


function Stories() {
  const fetchStories = async () => {
    const res = await fetch("https://wiko.pythonanywhere.com/options/storys/");
    const result = await res.json().then((data) => data);
    return result;
  };

  const { data } = useQuery("Stories", fetchStories);

  const onDownload = (imgUrl) => {
    fetch(imgUrl,{
      mode : 'no-cors'
    })
      .then((response) => response.blob())
      .then((blob) => {
        // استخراج پسوند از URL
        const urlParts = imgUrl.split('/');
        const fileName = urlParts[urlParts.length - 1].split('?')[0]; // حذف پارامترهای کوئری
        const link = document.createElement("a");
        const downloadName = fileName || "image"; // نام پیش‌فرض در صورت عدم وجود نام
        link.href = URL.createObjectURL(blob);
        link.download = downloadName;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        link.remove();
      });
  };



  return (
    <div className="container mx-auto px-5">
      <Swiper
        className="flex justify-center mb-5"
        spaceBetween={5}
        grabCursor={true}
        slidesPerView={12}
        modules={[Navigation]}
        breakpoints={{
          120: {
            slidesPerView: 4,
            spaceBetween: 2,
          },
          768: {
            slidesPerView: 7,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 12,
            spaceBetween: 20,
          },
        }}
      >
        {data?.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <div className="w-full ml-3 lg:ml-0 w-[84px] shrink-0 cursor-pointer">
                <div className="story-wrapp w-full">
                  <div className="styles_container__ipSg9 rounded-circle shrink-0 w-full aspect-square relative flex items-center justify-center">
                    <div className="rounded-circle overflow-hidden bg-white aspect-square styles_innerContainer__6FPF0 flex items-center justify-center">
                      <div className="rounded-circle overflow-hidden flex items-center justify-center styles_image__ggcBy">
                        {checkMediaType(item?.media) === "image" ? (
                          <Image
                            width={200}
                            src={item.media}
                            preview={{
                              toolbarRender: (
                                _,
                                {
                                  image,
                                  transform: { scale },
                                  actions: {
                                    onFlipY,
                                    onFlipX,
                                    onRotateLeft,
                                    onRotateRight,
                                    onZoomOut,
                                    onZoomIn,
                                    onReset,
                                  },
                                }
                              ) => (
                                <Space size={12} className="toolbar-wrapper">
                                  <DownloadOutlined
                                    onClick={() => onDownload(item.media)}
                                  />
                                  <SwapOutlined rotate={90} onClick={onFlipY} />
                                  <SwapOutlined onClick={onFlipX} />
                                  <RotateLeftOutlined onClick={onRotateLeft} />
                                  <RotateRightOutlined
                                    onClick={onRotateRight}
                                  />
                                  <ZoomOutOutlined
                                    disabled={scale === 1}
                                    onClick={onZoomOut}
                                  />
                                  <ZoomInOutlined
                                    disabled={scale === 50}
                                    onClick={onZoomIn}
                                  />
                                  <UndoOutlined onClick={onReset} />
                                </Space>
                              ),
                            }}
                          />
                        ) : (
                          <Image
                            width={200}
                            preview={{
                              destroyOnClose: true,
                              imageRender: () => (
                                <video
                                  muted
                                  width="100%"
                                  controls
                                  src={item.media}
                                />
                              ),
                              toolbarRender: () => null,
                            }}
                            src={item.media}
                          />
                        )}
                        {/* <img
                          className="w-full inline-block "
                          // src="https://picsum.photos/200/300"
                          src={item.media}
                          alt="story"
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-caption text-center text-neutral-800">
                    {item.title}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Stories;
