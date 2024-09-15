import { Button, Col, Form, Input, message, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

function AddMenu() {
  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [hasSubMenus, setHasSubMenu] = useState(false);

  
  

  const navigate = useNavigate();

  const { mutate: addMenu } = useMutation(() => {
    fetch("https://wiko.pythonanywhere.com/panel/add/menu/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        link: link,
        sub_menu : hasSubMenus
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then(() => {
          message.success("menu added sucessfully");
          navigate(-1);
        });
      } else {
        res.text().then((err) => console.log(err));
      }
    });
  });

  

  const editHandler = () => {
    if (!title) {
      message.error("please enter title");
    } else if (!link) {
      message.error("please enter link");
    } else {
      addMenu();
    }
  };

  return (
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
                  <div className="flex items-center gap-2">
                    <label htmlFor="title">link</label>
                    <Input
                      placeholder="enter title"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </div>
                </Form.Item>
              </Col>
             
            </Row>
            <Row className="mt-5">
            <Col span={11}>
                <Form.Item>
                  <div className="flex items-center gap-2">
                    <label htmlFor="title">HasSubmenu</label>
                    <input value={hasSubMenus} onChange={e => setHasSubMenu(e.target.checked)} type="checkbox" name="" id="" />
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" className="mt-10" onClick={editHandler}>
              save
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AddMenu;
