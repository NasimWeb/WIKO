import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Image, message, Row, Spin, Upload } from "antd";
import React, {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function EditGallery() {
  const { galleryId } = useParams();

  const [loading, setLoading] = useState(false);
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



  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <EditOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const navigate = useNavigate()
  

  const editGalleryHandler = async () => {

    setLoading(true)

    const formData = new FormData()

    fileList.forEach(file => {
      formData.append('image',file.originFileObj)
    })


    await fetch(`http://127.0.0.1:8000/panel/update/galery/product/${galleryId}/`,{
      method: 'PUT',
      headers : {
        Authorization : `Bearer ${localStorage.getItem('accessToken')}`
      },
      body : formData
    }).then(res => {
      if(res.ok){
        setLoading(false)
        message.success('your gallery updated successfully')
        navigate(-1);
      }else {
        res.text().then(err => console.log(err)
        )
      }
    })
  };




  return (
    <React.Fragment>
    {loading && (
      <div className="overlay">
        <Spin size="large" />
      </div>
    )}
    <div className="bg-white p-5">
      <Row>
        <Col>
          <h1 className="text-left mb-5">Product Gallery</h1>
          <div className="text-left relative">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={ChangeGallery}
              beforeUpload={() => false} // Prevent auto upload
            >
             {fileList.length < 1 ? uploadButton : ''} 
            </Upload>

            {fileList &&
              fileList?.map((gallery) => {
                return (
                  <div
                    key={gallery.id}
                    style={{
                      position: "absolute left-0",
                      display: "inline",
                      marginInline: "44px",
                      marginTop: "10px",
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
                  </div>
                );
              })}
          </div>
          <div className="mt-10">
            <Button onClick={editGalleryHandler} disabled={loading}>
              save
            </Button>
          </div>
        </Col>
      </Row>
    </div>

    </React.Fragment>
  );
}

export default EditGallery;
