import { Button, Col, Form, Input, message, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function EditKeyword() {
  const { keywordId } = useParams();
  const [tagName, setTagName] = useState();
  const [link, setLink] = useState()


  const navigate = useNavigate();

  useEffect(() => {
    async function GetMainKeyword() {
      // Fetch data from API
      await fetch(`https://wiko.pythonanywhere.com/panel/tag/${keywordId}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setTagName(data.name)
            setLink(data.link)
          });
        } else {
          res.text().then((err) => console.log(err));
        }
      });
    }
    GetMainKeyword();
  }, []);

  

  const editTagName = async () => {
    if (!tagName) {
      message.error("please enter title");
    } else {
      await fetch(`https://wiko.pythonanywhere.com/panel/update/tag/${keywordId}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: tagName,
          link : link
        }),
      }).then((res) => {
        if (res.ok) {
          res.json().then(() => {
            message.success("keyword updated sucessfully");
            navigate("/p-admin/keywords");
          });
        } else {
          res.text().then((err) => console.log(err));
        }
      });
    }
  };



  return (
    <div className="bg-white p-5">
      <Row>
        <Col span={24}>
          <Form>
            <Row className="mb-5 justify-between">
              <Col span={11}>
                <Form.Item>
                  <div className="flex gap-2 items-center">
                    <label style={{ textWrap: "nowrap" }} htmlFor="tagName">
                      title
                    </label>
                    <Input
                      value={tagName}
                      onChange={(e) => setTagName(e.target.value)}
                      type="text"
                      placeholder="enter title"
                    />
                  </div>
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item>
                  <div className="flex gap-2 items-center">
                    <label style={{ textWrap: "nowrap" }} htmlFor="tagName">
                      link
                    </label>
                    <Input
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      type="text"
                      placeholder="enter link"
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" onClick={editTagName}>save</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default EditKeyword;
