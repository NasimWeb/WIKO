import { Button, Col, Form, Input, message, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";


function EditMenu() {
  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [hasSubMenus, setHasSubMenu] = useState();
  const [allMenu, setAllMenu] = useState();
  const [loading, setLoading] = useState(false);

  const { menuId } = useParams();

  const fetchMenus = async () => {
    await fetch("https://wiko.pythonanywhere.com/content/navbar/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setAllMenu(data);
        });
      } else {
        res.text().then((err) => console.error(err));
      }
    });
  };

  useQuery("Menus", fetchMenus);


  useEffect(() => {
    const mainMenu = allMenu?.find((menu) => menu.id === +menuId);
    setTitle(mainMenu?.title);
    setLink(mainMenu?.link);
    setHasSubMenu(mainMenu?.sub_menu)
  }, [allMenu]);

  
 
  

  const navigate = useNavigate();

  const { mutate: editMenu } = useMutation(() => {
    setLoading(true);
    return fetch(`https://wiko.pythonanywhere.com/panel/update/menu/${menuId}/`, {
      method: "PUT",
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
        setLoading(false);
        return res.json().then(() => {
          message.success("menu edited sucessfully");
          navigate(-1);
        });
      } else {
        setLoading(false);
        return res.text().then((err) => console.error(err));
      }
    });
  });



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
              <Row className="justify-between gap-5">
                <Col span={11}>
                  <Form.Item>
                    <div className="flex gap-2 items-center">
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
                    <div className="flex gap-2 items-center">
                      <label htmlFor="title">link</label>
                      <Input
                        placeholder="enter link"
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
                    <input checked={hasSubMenus} onChange={e => setHasSubMenu(e.target.checked)} type="checkbox" name="" id="" />
                  </div>
                </Form.Item>
              </Col>
            </Row>
              <Button className="mt-10" type="primary" onClick={editMenu}>
                save
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default EditMenu;
