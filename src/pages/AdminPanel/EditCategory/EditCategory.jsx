import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Row,
  Upload,
  Input,
  message,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";



function EditCategory() {
  const { categoryId } = useParams();
  const [title, setTitle] = useState();
  const [categoryImage, setCategoryImage] = useState();
  const [loading, setLoading] = useState(false);

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "default-image.png",
      status: "done",
      url: categoryImage,
    },
  ]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      setCategoryImage(newFileList[0].originFileObj); 
    }
  };

  
  const props = {
    onRemove: (file) => {
      setFileList((prevFileList) => {
        const index = prevFileList.indexOf(file);
        const newFileList = prevFileList.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (file) => {
    setFileList([file]);  
    setCategoryImage(file);
    return false; 
    },
    fileList,
    onChange: handleChange,
  };

  const fetchAllCategories = async () => {
    try {
      const res = await fetch("https://wiko.pythonanywhere.com/content/categorys/");
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        const errorText = await res.text();
        console.error(errorText);
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const { data } = useQuery("Categories", fetchAllCategories);

  const mainCategory = data?.find((item) => item.id == categoryId);

  useEffect(() => {
    setTitle(mainCategory?.title);
  }, [mainCategory]);



  const navigate = useNavigate();

  const EditMainCategory = async () => {

    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);


      if (categoryImage instanceof File) {
        formData.append("baner", categoryImage);
      }
    
     

    try {
      const res = await fetch(
        `https://wiko.pythonanywhere.com/panel/update/category/${categoryId}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: formData,
        }
      );
      if (res.ok) {
        setLoading(false);
        const data = await res.json();
        console.log(data);
        message.success("category updated sucessfully");
        navigate(-1);
      } else {
        setLoading(false);
        const errorText = await res.text();
        console.error(errorText);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <React.Fragment>
      {loading && (
        <div className="overlay">
          <Spin size="large"></Spin>
        </div>
      )}
      <div className="bg-white p-5">
        <Row>
          <Col span={24}>
            <Form>
              <Row className="justify-between">
                <Col span={11}>
                  <Form.Item>
                    <div className="flex gap-2 items-center">
                      <label htmlFor="title">title</label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item>
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>upload</Button>
                    </Upload>
                  </Form.Item>
                  <div style={{ marginTop: 74 }}>
                    <Image
                      width={200}
                      src={
                        fileList[0]?.originFileObj
                          ? URL.createObjectURL(fileList[0]?.originFileObj)
                          : fileList[0]?.url || mainCategory?.baner
                      }
                    />
                  </div>
                </Col>
              </Row>
              <Button
                type="primary"
                htmlType="submit"
                className="mt-5 px-10 py-5"
                onClick={EditMainCategory}
              >
                save
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default EditCategory;
