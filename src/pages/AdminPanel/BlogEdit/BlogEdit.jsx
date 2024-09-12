import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Spin,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../../Funcs/getCookie";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

function BlogEdit() {
  const [users, setUsers] = useState();
  const [blogContent, setBlogContent] = useState();
  const [blogImg, setBlogImg] = useState();
  const [mainBlog, setMainBlog] = useState();
  const [blogTitle, setBlogTitle] = useState();
  const [blogAuthor, setBlogAuthor] = useState();
  const [blogUrl, setBlogUrl] = useState();
  const [blogsTagsId, setBlogsTagsId] = useState([]);
  const [allKeywords, setAllKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywprds] = useState([]);

  const { blogSlug } = useParams();

  useEffect(() => {
    async function mainBlog() {
      await fetch(`http://127.0.0.1:8000/content/blog/${blogSlug}`).then(
        (res) => {
          if (res.ok) {
            return res.json().then((data) => {
              setMainBlog(data);
              setBlogTitle(data.title);
              setBlogImg(data.image);
              setBlogContent(data.content);
              setBlogUrl(data.slug);
              setBlogAuthor(data.author);
              setBlogsTagsId(data.tags);
            });
          }
        }
      );
    }
    mainBlog();
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/panel/users/", {
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

  const [loading, setLoading] = useState(false);
  const admins = users?.filter((user) => user.is_admin === true);
  const mainuser = users?.find((user) => user.id === blogAuthor);

  const handleChange = (value) => {
    setBlogAuthor(value.value);
  };

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

  const navigate = useNavigate()

  useEffect(() => {
    async function getAllKeywords() {
      await fetch("http://127.0.0.1:8000/panel/tags/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((data) => setAllKeywords(data));
        }
      });
    }
    getAllKeywords();
  }, []);

  useEffect(() => {
    const mainKeywords = allKeywords?.filter((keyword) =>
      blogsTagsId.includes(keyword.id)
    );
    const keywordSelected = mainKeywords.map((keyword) => {
      return {
        label: keyword.name,
        value: keyword.id,
      };
    });
    setSelectedKeywprds(keywordSelected);
  }, [allKeywords, blogsTagsId]);

  const options = allKeywords;
  const newOptions = [];
  options?.forEach((keyword) => {
    newOptions.push({
      label: keyword?.name,
      value: keyword?.id,
    });
  });

  const handleChangeTags = (value) => {
    setBlogsTagsId(value);
  };

  const EditBlog = () => {
    setLoading(true)
    const formData = new FormData();

    formData.append("title", blogTitle);
    formData.append("content", blogContent);

    if (blogImg instanceof File) {
      formData.append("image", blogImg);
    }

    formData.append("slug", blogSlug);
    formData.append("author", blogAuthor);
    blogsTagsId.forEach((id) => formData.append("tags", id));

    async function fetchEditBlog() {
      await fetch(`http://127.0.0.1:8000/panel/update/blog/${mainBlog?.id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          setLoading(false)
          message.success("blog updated successfully");
          navigate('/p-admin/blogsList')
        } else {
          res.text().then((err) => console.log(err));
        }
      });
    }

    fetchEditBlog();
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
          <Form onFinish={EditBlog}>
            <Row>
              <Col span={18}>
                <Row className="gap-2 justify-between">
                  <Col span={11}>
                    <Form.Item>
                      <div className="flex items-center gap-2">
                        <label
                          style={{ textWrap: "noWrap" }}
                          htmlFor="blogTitle"
                        >
                           title
                        </label>
                        <Input
                          value={blogTitle}
                          onChange={(e) => setBlogTitle(e.target.value)}
                          placeholder="title"
                        />
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item>
                      <div className="flex items-center gap-2">
                        <label
                          style={{ textWrap: "noWrap" }}
                          htmlFor="blogTitle"
                        >
                          author
                        </label>
                        <Select
                          style={{
                            width: "100%",
                          }}
                          labelInValue
                          value={{
                            label: mainuser?.username,
                            value: mainuser?.id,
                          }}
                          onChange={handleChange}
                          options={admins?.map((admin) => {
                            return {
                              value: admin?.id,
                              label: admin?.username,
                            };
                          })}
                        />
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col span={24}>
                    <Form.Item>
                      <div className="flex gap-2 items-center ">
                        <label style={{ textWrap: "nowrap" }} htmlFor="url">
                           url
                        </label>
                        <Input
                          value={blogUrl}
                          onChange={(e) => setBlogUrl(e.target.value)}
                          placeholder="آدرس یکتا"
                        />
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col span={24}>
                    <Form.Item>
                      <div className="flex gap-2">
                        <label
                          style={{ textWrap: "nowrap" }}
                          htmlFor="keywords"
                        >
                           keyword
                        </label>
                        <Select
                           mode="tags"
                           allowClear
                          style={{
                            width: "100%",
                          }}
                          value={selectedKeywords}
                          placeholder="Enter Keywords"
                          onChange={handleChangeTags}
                          options={newOptions}
                        />
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col span={24}>
                    <div className="flex gap-3">
                      <label htmlFor="desc">description</label>
                      <CKEditor
                        id={"desc"}
                        placeholder="desription"
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
                    <Button icon={<UploadOutlined />}>آپلود</Button>
                  </Upload>
                </Form.Item>
                <div style={{ marginTop: 74 }}>
                  <Image
                    width={200}
                    src={
                      fileList[0]?.originFileObj
                        ? URL.createObjectURL(blogImg)
                        : blogImg
                    }
                  />
                </div>
              </Col>
              <Button
                type="primary"
                htmlType="submit"
                className="mt-5 px-10 py-5"
                disabled={loading}
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

export default BlogEdit;
