import { Button, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddKeywords() {
  const [tagTitle, setTagTitle] = useState();
  const [link , setLink] = useState();

  const navigate = useNavigate()

  const AddKeyword = () => {
    if(!tagTitle) {
        message.warning('please enter title')
    }else if (!link) {
      message.warning('please enter link')
    }else {
        // Add keyword to database
        const formData = new FormData()

        formData.append('name',tagTitle)
        formData.append('link',link)

        fetch('https://wiko.pythonanywhere.com/panel/add/tag/', {
            method: 'POST',
            headers : {
                Authorization : `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: formData
        }).then(res => {
            if(res.ok) {
                message.success('keyword added sucessfully')
                setTagTitle('')
                navigate('/p-admin/keywords')
            }else {
                res.text().then(err => console.error(err))
            }
        }
        )
    }
  };

  

  return (
    <React.Fragment>
      <div className="bg-white p-5">
        <Row>
          <Col span={24}>
            <Form onFinish={AddKeyword}>
              <Row className="justify-between gap-5">
                <Col span={11}>
                  <Form.Item>
                    <div className="flex gap-2 items-center">
                      <label style={{ textWrap: "noWrap" }} htmlFor="tagName">
                        name
                      </label>
                      <Input
                        value={tagTitle}
                        onChange={(e) => setTagTitle(e.target.value)}
                        placeholder="Enter keywords"
                      />
                    </div>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item>
                    <div className="flex gap-2 items-center">
                      <label style={{ textWrap: "noWrap" }} htmlFor="tagName">
                        link
                      </label>
                      <Input
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Enter link"
                      />
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col span={24}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="mt-5 px-10 py-5"
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default AddKeywords;
