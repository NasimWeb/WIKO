import { Button, Col, Form, Input, message, Row } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";


function EditFaq() {

    const {faqId} = useParams()
  
    const [question , setQuestion] = useState()
    const [answer , setAnswer]  = useState()
     
    const fetchFags = async () => {
        await fetch("https://wiko.pythonanywhere.com/content/faqs/").then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              setQuestion(data.find(item => item.id === +faqId).question)
              setAnswer(data.find(item => item.id === +faqId).answer)
            });
          } else {
            res.text().then((err) => console.error(err));
          }
        });
      };
    
      useQuery("Fags", fetchFags);

      const navigate = useNavigate()

      
  const {mutate:editFaq} = useMutation(() => {
    return fetch(`https://wiko.pythonanywhere.com/panel/update/faq/${faqId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
        },
        body : JSON.stringify({
            question : question ,
            answer : answer
        })
    }).then(res => {
        if(res.ok) {
            return res.json().then(() => {
                message.success('faq updated sucessfully')
                navigate(-1)
            })
        }else {
            return res.text().then(err => console.log(err))
        }
    })
  })

  

  return (
    <div className="bg-white p-5">
      <Row>
        <Col span={24}>
          <Form>
            <Row className="justify-between">
              <Col span={11}>
                <Form.Item >
                    <div className="flex gap-2 items-center">
                     <label htmlFor="question">question</label>
                    <Input type="text" onChange={e => setQuestion(e.target.value)} value={question} placeholder="Enter question" />
                    </div>
                </Form.Item>
              </Col>
              <Col span={11}>
              <Form.Item >
                <div className="flex gap-2 items-center">
                    <label htmlFor="answer">answer</label>
                    <Input type="text" onChange={e => setAnswer(e.target.value)} value={answer} placeholder="Enter answer" />
                </div>
               </Form.Item>
              </Col>
            </Row>
            <Button type="primary" onClick={editFaq} className="mt-10">
                save
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default EditFaq;
