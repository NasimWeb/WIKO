import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Spin,
  Upload,
} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddSubCategory() {

  
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState();
  const [image, setImage] = useState();

  const naviagte = useNavigate();

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "default-image.png",
      status: "done",
      url: "",
    },
  ]);

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
      return false;
    },
    fileList,
    onChange: handleChange,
  };

  const AddSubcategory = () => {
    setLoading(true);

    if (!title) {
      setLoading(false);
      message.error("please enter title");
    } else if (!image) {
      setLoading(false);
      message.error("please upload image");
    } else {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("baner", image);

      fetch(`https://wiko.pythonanywhere.com/panel/add/sub/category/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          setLoading(false);
          message.success("subcategory added successfully");
          naviagte(-1);
        } else {
          setLoading(false);
          res.text().then((err) => console.log(err));
        }
      });
    }
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
          <Col span={24}>
            <Form>
              <Row className="justify-between">
                <Col span={11}>
                  <Form.Item>
                    <div className="flex items-center gap-2">
                      <label htmlFor="title">title</label>
                      <Input
                        placeholder="enter title"
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
                          ? URL.createObjectURL(image)
                          : ""
                      }
                    />
                  </div>
                </Col>
              </Row>
            </Form>
            <Button
              type="primary"
              htmlType="submit"
              className="mt-5 px-10 py-5"
              onClick={AddSubcategory}
              disabled={loading}
            >
              save
            </Button>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default AddSubCategory;
