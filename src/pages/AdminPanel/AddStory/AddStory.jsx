import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Image, Input, message, Row, Spin, Upload } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStory() {

    const [storyMedia , setStoryMedia] = useState() 
    const [storyTitle , setStoryTitle] = useState()
    const [loading , setLoading] = useState()

    const [fileList, setFileList] = useState([
        {
          uid: "-1",
          name: "default-image.png",
          status: "done",
          url: storyMedia,
        },
      ]);

      const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setStoryMedia(newFileList[0].originFileObj);
      };

      const navigate = useNavigate()

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

      const AddStory = () => {

        setLoading(true)

      const formData = new FormData()

      formData.append('title',storyTitle)
      formData.append('media',storyMedia)

        if(!storyTitle){
            message.error('please enter story title')
        }else if (!storyMedia) {
            message.error('please select story media')
        }else {
            fetch('https://wiko.pythonanywhere.com/panel/add/story/',{
                method: 'POST',
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('accessToken')}`
                },
                body : formData
            }).then(res => {
                if(res.ok){
                    setLoading(false)
                    message.success('story added successfully')
                    navigate('/p-admin/stories')
                }else {
                    setLoading(false)
                    res.text().then(err => console.log(err)
                    )
                }
            })
        }
      }

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
                    <div className="flex gap-2 items-center">
                        <label style={{textWrap : 'nowrap'}} htmlFor="title">Story title</label>
                        <Input placeholder="enter title" value={storyTitle} onChange={e => setStoryTitle(e.target.value)} />
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
                          ? URL.createObjectURL(storyMedia)
                          : ""
                      }
                    />
                  </div>
                </Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mt-5 px-10 py-5"
                  onClick={AddStory}
                >
                  Save
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default AddStory;
