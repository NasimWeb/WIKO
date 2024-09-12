import {
  Col,
  Form,
  Row,
  Input,
  Select,
  Checkbox,
  Button,
  Upload,
  Image,
  message,
  Spin,
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { UploadOutlined } from "@ant-design/icons";
import "./AddProduct.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState();
  const [SubCategories, setSubCategories] = useState();
  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productcategory, setProductCategory] = useState();
  const [productSubCategory, setProductSubCategory] = useState();
  const [status, setStatus] = useState();
  const [isAvailible, setIsAvailible] = useState(true);
  const [productImage, setProductImage] = useState();
  const [productDesc, setProductDesc] = useState("");
  

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "default-image.png",
      status: "done",
      url: productImage,
    },
  ]);

  const handleChangeProduct = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setProductImage(newFileList[0].originFileObj);
  };

  const handleChange = (value) => {
    setProductCategory(value.value);
  };

  const changeSubcategory = (value) => {
    setProductSubCategory(value.value);
  };

  const onChange = (e) => {
    setIsAvailible(e.target.checked);
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://wiko.pythonanywhere.com/content/categorys/");
        if (res.ok) {
          const categories = await res.json();
          setCategories(categories);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchSubCategories() {
      try {
        const res = await fetch("https://wiko.pythonanywhere.com/content/subcategorys/");
        if (res.ok) {
          const categories = await res.json();
          setSubCategories(categories);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchSubCategories();
  }, []);

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
    onChange: handleChangeProduct,
  };

  const addProduct = async () => {
    setLoading(true);

    if (!productcategory) {
      setLoading(false)
      message.warning("please enter Category");
    } else if (!productSubCategory) {
      setLoading(false)
      message.warning("please enter subCategory");
    } else if (!productName) {
      setLoading(false)
      message.warning("please enter pdoductName");
    } else if (!productPrice) {
      setLoading(false)
      message.warning("please enter productPrice");
    } else if (!status) {
      setLoading(false)
      message.warning("please enter status");
    } else if (!productImage) {
      setLoading(false)
      message.warning("please upload productImage");
    } else {
      const formData = new FormData();

      formData.append("title", productName);
      formData.append("body", productDesc);
      formData.append("baner", productImage);
      formData.append("price", productPrice);
      formData.append("status", status);
      formData.append("is_avalable", isAvailible);
      formData.append("category", productcategory);
      formData.append("sub_category", productSubCategory);

      try {
        const res = await fetch("https://wiko.pythonanywhere.com/panel/add/product/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')} `,
          },
          body: formData,
        });
        if (res.ok) {
          setLoading(false);
          // const data = await res.json();
          message.success("product added sucessfully");
          navigate("/p-admin/productsList");
        } else {
          setLoading(false);
          res.text().then((err) => message.error(err));
          message.error()
        }
      } catch (error) {
        console.error(error);
      }
    }
  };



  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {loading && (
        <div className="overlay">
          <Spin size="large" />
        </div>
      )}
      <div className="bg-white p-5 rounded">
        <Row>
          <Col span={24}>
            <Form
              onFinish={addProduct}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Row>
                <Col span={18}>
                  <Row className="justify-evenly gap-1 ">
                    <Col span={11}>
                      <Form.Item>
                        <div className="flex gap-2 items-center">
                          <label htmlFor="name" style={{ textWrap: "nowrap" }}>
                             title{" "}
                          </label>
                          <Input
                            placeholder="enter title"
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </div>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <div className="flex gap-2 items-center">
                          <label htmlFor="name" style={{ textWrap: "nowrap" }}>
                             price
                          </label>
                          <Input
                            placeholder="enter price"
                            type="text"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                          />
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                
                  <Row className="mt-10 gap-9 items-center justify-center">
                    <Col span={6}>
                      <Form.Item>
                        <div className="flex gap-2 items-center">
                          <label
                            htmlFor="category"
                            style={{ textWrap: "nowrap" }}
                          >
                            category
                          </label>
                          <Select
                            defaultValue={"category"}
                            style={{
                              width: "100%",
                            }}
                            labelInValue
                            onChange={handleChange}
                            options={categories?.map((category) => {
                              return {
                                value: category.id,
                                label: category.title,
                              };
                            })}
                          />
                        </div>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item>
                        <div className="flex gap-2 items-center">
                          <label
                            htmlFor="subcategory"
                            style={{ textWrap: "nowrap" }}
                          >
                            subcategory
                          </label>
                          <Select
                            style={{
                              width: "100%",
                            }}
                            defaultValue={"subcategory"}
                            labelInValue
                            onChange={changeSubcategory}
                            options={SubCategories?.map((subcategory) => {
                              return {
                                value: subcategory.id,
                                label: subcategory.title,
                              };
                            })}
                          />
                        </div>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item>
                        <div className="flex gap-2 items-center">
                          <label htmlFor="وضعیت" style={{ textWrap: "nowrap" }}>
                            status
                          </label>
                          <Select
                            style={{
                              width: "100%",
                            }}
                            defaultValue={"status"}
                            value={status}
                            onChange={(value) => setStatus(value)}
                            options={[
                              {
                                value: "definite",
                                label: "definite",
                              },
                              {
                                value: "off",
                                label: "off",
                              },
                            ]}
                          />
                        </div>
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item>
                        <Checkbox checked={isAvailible} onChange={onChange}>
                          isAvailible
                        </Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row className="mt-9">
                    <Col span={24}>
                      <div className="flex gap-3">
                        <label htmlFor="desc">description</label>
                        <CKEditor
                          id={"desc"}
                          placeholder="enter description"
                          editor={ClassicEditor}
                          data={productDesc}
                          config={{
                            toolbar: ["heading", "|", "bold", "italic", "link"],
                          }}
                          style={{ Height: "200px", width: "100%" }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setProductDesc(data);
                            // console.log({ event, editor, data });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={4} offset={1}>
                  <Form.Item>
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                  <div style={{ marginTop: 74 }}>
                    <Image
                      width={200}
                      src={
                        fileList[0]?.originFileObj
                          ? URL.createObjectURL(productImage)
                          : ""
                      }
                    />
                  </div>
                </Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mt-5 px-10 py-5"
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

export default AddProduct;
