import { Button, Col, Form, Input, message, Row } from "antd";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

function ReplyComment() {
  const { productId, commentId } = useParams();
  const [replyMessage, setReplyMessage] = useState();

  const navigate = useNavigate();
  const { mutate: replyComment } = useMutation(() => {
    // API call to reply comment
    fetch(
      `https://wiko.pythonanywhere.com/panel/reply/comments/${productId}/${commentId}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: replyMessage,
        }),
      }
    ).then((res) => {
      if (res.ok) {
        message.success("send sucessfully");
        navigate(-1)
      } else {
        res.text().then((err) => console.log(err));
      }
    });
  });

  return (
    <div className="bg-white p-5">
      <Row style={{ height: "100%" }}>
        <Col span={24} style={{ height: "100%" }}>
          <Form style={{ height: "100%" }}>
            <Row style={{ height: "100%" }}>
              <Col span={24} className="mb-20 pb-10" style={{ height: "100%" }}>
                <Form.Item style={{ height: "100%" }}>
                  <div className="flex gap-2 " style={{ height: "100%" }}>
                    <label htmlFor="">Reply</label>
                    <Input.TextArea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows={4}
                      placeholder="Reply to comment"
                    />
                  </div>
                </Form.Item>
              </Col>
              <Button type="primary" onClick={replyComment}>
                save
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ReplyComment;
