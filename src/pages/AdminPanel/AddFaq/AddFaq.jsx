import { Button, Col, Form, Input, message, Row } from "antd";
import { useMutation } from "react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function AddFaq() {
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();


 const navigate = useNavigate()


 
 // Add your logic here to add a new FAQ

 const { mutate:addNewfaq } = useMutation(() => {
    if(!question) {
        message.error('please enter question')
     }else if (!answer) {
        message.error('please enter answer')
     }else {
         return fetch(`https://wiko.pythonanywhere.com/panel/add/faq/`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
           },
           body: JSON.stringify({
             question: question,
             answer: answer,
           }),
         }).then(res => {
             if(res.ok) {
                 return res.json().then(() => {
                     message.success('faq added Sucessfully')
                     navigate(-1)
                 })
             }else {
                 return res.text().then(err => console.log(err))
             }
         })
    
     }
 });




  return (
    <div className="bg-white p-5">
      <Row>
        <Col span={24}>
          <Form>
            <Row className="justify-between">
              <Col span={11}>
                <Form.Item>
                  <div className="flex items-center gap-2">
                    <label htmlFor="answer">question</label>
                    <Input placeholder="add question" value={question} onChange={e => setQuestion(e.target.value)} />
                  </div>
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item>
                  <div className="flex items-center gap-2">
                    <label htmlFor="answer">answer</label>
                    <Input placeholder="add answer" value={answer} onChange={e => setAnswer(e.target.value)} />
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Button className="mt-10" type="primary" onClick={addNewfaq}>
              save
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AddFaq;
