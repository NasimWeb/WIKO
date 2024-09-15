import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Image, Input, message, Row, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";


function EditSubCategory() {
  const [loading, setLoading] = useState();
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const { subId } = useParams();

  const [fileList, setFileList] = useState([
    {
      uid: -1,
      name: "image1.png",
      status: "done",
      url: image,
    },
  ]);

  const fetchSubCategories = async () => {
    const res = await fetch(`https://wiko.pythonanywhere.com/content/subcategorys/`);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  };

  const { data } = useQuery("subCategories", fetchSubCategories);

  const navigate = useNavigate();

  const mainCategory = data?.find((item) => item.id == subId);

  useEffect(() => {
    setTitle(mainCategory?.title);
    setImage(mainCategory?.baner);
  }, [mainCategory]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImage(newFileList[0].originFileObj);
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
      setImage(file);
      return false;
    },
    fileList,
    onChange: handleChange,
  };

  const editSubCategory = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("title", title);

    if (image instanceof File) {
      formData.append("baner", image);
    }

    await fetch(`https://wiko.pythonanywhere.com/panel/update/sub/category/${subId}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        setLoading(false);
        message.success("subcategory updated sucessfully");
        navigate(-1);
      } else {
        setLoading(false);
        const errMessage = res.text();
        throw new Error(errMessage);
      }
    });
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
                      <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="enter title" />
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
                          : fileList[0]?.url || image
                      }
                    />
                  </div>
                </Col>
              </Row>
            </Form>
            <Button onClick={editSubCategory} type="primary" className="mt-5">
              save
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default EditSubCategory;
