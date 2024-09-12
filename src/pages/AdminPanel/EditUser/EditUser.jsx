import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";
import {  useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";

function EditUser() {

  const { userId } = useParams();
  const [username,setUsername] = useState()
  const [phone,setPhone] = useState()
  const [isAdmin,setIsAdmin] = useState()
  const naviaget = useNavigate()


   async function mainUser () {
     await fetch(`https://wiko.pythonanywhere.com/panel/user/${userId}/`,{
        method: 'GET',
        headers: {
          Authorization : `Bearer ${localStorage.getItem('accessToken')}`
        }
      }).then(res => {
        if(res.ok){
          res.json().then(data => {
            setUsername(data.username)
            setPhone(data.phone)
            setIsAdmin(data.is_admin)
          })
        }else {
           res.text().then(err => console.log(err))
        }
      })
    }
    
  

  useQuery(['SingleUser',userId],mainUser)

  const EditUser = async () => {
    await fetch(`https://wiko.pythonanywhere.com/panel/update/user/${userId}/`,{
      method : 'PUT',
      headers : {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      },
      body :  JSON.stringify({
        phone : phone,
        username : username,
        is_admin : isAdmin
      })
    }).then(res => {
      if(res.ok){
        message.success('user updated successfully')
        naviaget('/p-admin/users')
      }else {
        res.text().then(err => console.log(err))
      }
    })
  }

  

  return (
    <div>
      <div className="bg-white p-5">
        <Row>
          <Col span={24}>
            <Form>
              <Row className="justify-between">
                <Col span={11}>
                  <Form.Item>
                    <div className="flex gap-2 items-center">
                      <label style={{ textWrap: "nowrap" }} htmlFor="username">
                        username
                      </label>
                      <Input value={username} onChange={e => {
                        
                        setUsername(e.target.value)
                        
                      }} placeholder="enter username" type="text" />
                    </div>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item>
                  <div className="flex gap-2 items-center">
                      <label style={{ textWrap: "nowrap" }} htmlFor="phone">
                       phone
                      </label>
                      <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="enter phone" type="text" />
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Row className="mt-5"> 
                <Col span={8} offset={1}>
                  <Form.Item>
                    <Checkbox checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)
                    
                    }>is admin</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" className="mt-10" onClick={EditUser}>save</Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default EditUser;
