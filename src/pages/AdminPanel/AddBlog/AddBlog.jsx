import { UploadOutlined } from "@ant-design/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Upload,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [blogTitle, setBlogTitle] = useState();
  const [blogImg, setBlogImg] = useState();
  const [blogContent, setBlogContent] = useState();
  const [blogAuthor, setBlogAuthor] = useState();
  const [blogUrl, setBlogUrl] = useState();
  const [blogTags, setBlogTags] = useState([]);
  const [blogKeywords, setBlogkeywords] = useState([]);

  useEffect(() => {
    fetch("https://wiko.pythonanywhere.com/panel/users/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => setUsers(data));
      }
    });
  }, []);

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image1.png",
      status: "done",
      url: "#",
    },
  ]);

  const handleChangeImage = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setBlogImg(newFileList[0].originFileObj);
  };

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
    onChange: handleChangeImage,
  };

  const handleChange = (value) => {
    setBlogAuthor(value);
  };

  useEffect(() => {
    fetch("https://wiko.pythonanywhere.com/panel/tags/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => setBlogTags(data));
      } else {
        res.text().then((err) => console.log(err));
      }
    });
  }, []);

  const options = blogTags;
  const newOptions = [];
  options?.forEach((keyword) => {
    newOptions.push({
      value: keyword?.id,
      label: keyword?.name,
    });
  });

  const admins = users?.filter((user) => user.is_admin === true);

  const navigate = useNavigate();

  const handleChangeTags = (value) => {
    setBlogkeywords(value);
  };

  const addBlog = () => {
    setLoading(true)
    if (!blogTitle) {
      message.warning("please enter blog title");
    } else if (!blogImg) {
      message.warning("please upload blog image");
    } else if (!blogAuthor) {
      message.warning("please enter blog author");
    } else if (!blogUrl) {
      message.warning("please enter blog url");
    } else {
      const formData = new FormData();

      formData.append("title", blogTitle);
      formData.append("content", blogContent);
      formData.append("image", blogImg);
      formData.append("slug", blogUrl);
      formData.append("author", blogAuthor);
      blogKeywords.forEach((tag) => formData.append("tags", tag));

      fetch("https://wiko.pythonanywhere.com/panel/add/blog/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          setLoading(false)
          res.json().then(() => {
            message.success("blog added sucessfully");
            navigate("/p-admin/blogsList");
          });
        }else if (res.status === 400) {
          setLoading(false)
           message.warning('please enter a valid url without space')
        }else {
          setLoading(false)
          res.text().then((err) => console.log(err));
        }
      });
    }
  };

  return (
    <>
      {loading && (
        <div className="overlay">
          <Spin size="large" />
        </div>
      )}
      <div className="bg-white p-5">
        <Row>
          <Col span={24}>
            <Form onFinish={addBlog}>
              <Row>
                <Col span={18}>
                  <Row className="justify-between items-center felx-wrap">
                    <Col span={11}>
                      <Form.Item>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="title"
                            style={{ textWrap: "nowrap" }}
                          >
                            title
                          </label>
                          <Input
                            value={blogTitle}
                            onChange={(e) => setBlogTitle(e.target.value)}
                            placeholder="title"
                            type="text"
                          />
                        </div>
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="author"
                            style={{ textWrap: "nowrap" }}
                          >
                            author
                          </label>
                          <Select
                            defaultValue="users"
                            onChange={handleChange}
                            options={admins?.map((admin) => {
                              return {
                                value: admin.id,
                                label: admin.username,
                              };
                            })}
                          />
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col span={24}>
                      <div className="flex gap-2 items-center">
                        <label
                          htmlFor="url"
                          style={{ textWrap: "nowrap" }}
                        >
                          url
                        </label>
                        <Input
                          value={blogUrl}
                          onChange={(e) => setBlogUrl(e.target.value)}
                          placeholder="enter url"
                          type="text"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col span={24}>
                      <div className="flex gap-2">
                        <label
                          style={{ textWrap: "nowrap" }}
                          htmlFor="keywords"
                        >
                           keywords
                        </label>
                        <Select
                          mode="tags"
                          style={{
                            width: "100%",
                          }}
                          placeholder="Enter Keywords"
                          onChange={handleChangeTags}
                          options={newOptions}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col span={24}>
                      <div className="flex gap-3">
                        <label htmlFor="desc">description</label>
                        <CKEditor
                          id={"desc"}
                          placeholder="enter description"
                          editor={ClassicEditor}
                          data={blogContent}
                          config={{
                            toolbar: ["heading", "|", "bold", "italic", "link"],
                          }}
                          style={{ Height: "200px", width: "100%" }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setBlogContent(data);
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={4} offset={1}>
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
                          ? URL.createObjectURL(blogImg)
                          : ""
                      }
                    />
                  </div>
                </Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mt-5 px-10 py-5"
                  disabled = {loading}
                >
                  Save
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddBlog;
