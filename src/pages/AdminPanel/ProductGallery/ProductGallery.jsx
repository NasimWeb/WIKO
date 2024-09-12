import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image, message, Upload, Spin } from "antd";
import "./ProductGallery.css";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ProductGallery() {
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState();
  const { productSlug } = useParams();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const ChangeGallery = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    mainProduct();
  }, []);

  async function mainProduct() {
    await fetch(`https://wiko.pythonanywhere.com/content/product/${productSlug}/`).then(
      (res) => {
        if (res.ok) {
          return res.json().then((data) => {
            const formatedFileList = data.galerys.map((gallery) => {
              return {
                uid: gallery.id,
                name: gallery.product,
                status: "done",
                url: gallery.image,
              };
            });
            setFileList(formatedFileList);
            setProductId(data.id);
          });
        } else {
          res.text().then((err) => console.log(err));
        }
      }
    );
  }

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const navigate = useNavigate();

  const AddGallery = async () => {
    setLoading(true);

    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append("image", file.originFileObj);
    });

   await fetch(`https://wiko.pythonanywhere.com/panel/add/galery/product/${productId}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
    })
    .then((res) => {
      console.log("Response received:", res); // لاگ گرفتن از پاسخ در هر حالت
      if (res.ok) {
        return res.json(); // اگر پاسخ JSON باشد
      } else {
        return res.text().then((err) => {
          throw new Error(err); // پرتاب خطا در صورت وجود مشکل
        });
      }
    })
    .then((data) => {
      console.log("Data:", data); // لاگ گرفتن از داده‌های موفق
      message.success("uploaded successfully");
      navigate(-1);
    })
    .catch((error) => {
      console.error("Error:", error); // لاگ گرفتن از خطاها
      message.error("Upload failed");
    })
    .finally(() => {
      setLoading(false); // اطمینان از متوقف شدن حالت بارگذاری
    });
  };

  const deleteGalleryFile = async (file) => {
    setLoading(true);
    await fetch(
      `https://wiko.pythonanywhere.com/panel/delete/galery/product/${file.uid}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    ).then((res) => {
      if (res.ok) {
        setLoading(false);
        message.success("gallery deleted sucessfully");
        navigate("/p-admin/productsList");
        mainProduct();
      } else {
        res.text().then((err) => console.log(err));
      }
    });
  };



  return (
    <>
      {loading && (
        <div className="overlay">
          <Spin size="large" />
        </div>
      )}
      <div className="bg-white p-5">
        <h1 className="text-left mb-5">Product Gallery</h1>
        <div className="text-left relative">
          <Upload
            customRequest = {AddGallery}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={ChangeGallery}
            onRemove={deleteGalleryFile}
            // beforeUpload={() => false} // Prevent auto upload
          >
            {uploadButton}
          </Upload>

          {fileList &&
            fileList?.map((gallery) => {
              return (
                <div
                  key={gallery.id}
                  style={{
                    position: "absolute left-0" ,
                    display: "inline",
                    marginInline : '44px',
                    marginTop : '10px'
                  }}
                >
                  <Image
                    className="img-gallery"
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage || gallery.url}
                  />
                  <Link to={`editGallery/${gallery.uid}`}>
                  <EditOutlined
                    
                    twoToneColor="#52c41a"
                    style={{
                      fontSize : '17px',
                      
                    }}
                  />
                  </Link>
                </div>
              );
            })}
        </div>
        <div className="mt-10">
          <Button onClick={AddGallery} disabled={loading}>
            save
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProductGallery;
