import { Button, Col, Form, Input, Row, Spin } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import {message} from 'antd'

function ReplyContactMessage() {

    const {messageId} = useParams()
    const [Message , setMessage] = useState()
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()

    const sendReply = () => {
        setLoading(true)
        fetch(`https://wiko.pythonanywhere.com/panel/reply/contact/${messageId}/`,{
            method: 'POST',
            headers : {
                Authorization : `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                message : Message
            })
        }).then(res => {
            if(res.ok){
                setLoading(false)
                message.success('replyed sucessfull')
                navigate(-1)
            }else {
                setLoading(false)
                res.text().then(err => console.log(err))
            }
        })
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
                <Row>
                    <Col span={24}>
                       <Form.Item>
                          <div className="flex gap-2 items-center">
                            <label htmlFor="answer">answer</label>
                            <Input placeholder="enter answer" value={Message} onChange={e => setMessage(e.target.value)} type="text"  />
                          </div>
                       </Form.Item>
                    </Col>
                </Row>
                    <Button onClick={sendReply} className="mt-10" type="primary">
                        save
                    </Button>
            </Form>
        </Col> 
      </Row>
    </div>

    </React.Fragment>
  )
}

export default ReplyContactMessage
