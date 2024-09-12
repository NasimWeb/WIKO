import { Col, Input, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Image, Form, Spin } from "antd";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./ProductsEdit.css";
import { useEffect, useState } from "react";
import { Checkbox, message } from "antd";


function ProductsEdit() {
  const [loading, setLoading] = useState(false);
  const { productSlug } = useParams();
  const [mainProduct, setMainProduct] = useState();
  const [productTitle, setProductTitle] = useState();
  const [is_avaliable, setIs_avalible] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productSubCategory, setProductSubCategory] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productImg, setProductImg] = useState();
  const [allCategories, setAllCategories] = useState();
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [productDesc, setProductDesc] = useState();
  const [status, setStatus] = useState();
  const [mainCategoryId, setMainCategoryId] = useState();
  const [mainSubCategoryId, setMainSubCategoryId] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();

  const onChangeSelect = (value) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    async function fetchData() {
      await fetch(`https://wiko.pythonanywhere.com/content/product/${productSlug}`).then(
        (res) => {
          if (res.ok) {
            res.json().then((data) => {
              setMainProduct(data);
              setIs_avalible(data.is_avalable);
              setProductCategory(data.category);
              setProductTitle(data.title);
              setProductSubCategory(data.sub_category);
              setProductPrice(data.price);
              setProductImg(data.baner);
              setProductDesc(data.body);
              setStatus(data.status);
            });
          } else {
            res.text().then((err) => console.error(err));
          }
        }
      );
    }
    fetchData();

    async function fetchSubCategories() {
      await fetch("https://wiko.pythonanywhere.com/content/subcategorys/").then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setAllSubCategory(data);
            const mainSubCategory = data.find(
              (subcategory) => subcategory.title === productSubCategory
            );
            if (mainSubCategory) {
              console.log(mainSubCategory);
              setMainSubCategoryId(mainSubCategory.id);
            }
          });
        } else {
          res.text().then((err) => console.error(err));
        }
      });
    }
    fetchSubCategories();
  }, [productSubCategory]);

  useEffect(() => {
    setSelectedSubCategory({
      label: mainProduct?.sub_category,
      value: mainSubCategoryId,
    });
  }, [mainSubCategoryId]);

  useEffect(() => {
    async function fetchCategoryes() {
      try {
        const res = await fetch("https://wiko.pythonanywhere.com/content/categorys/");
        if (res.ok) {
          const data = await res.json();
          setAllCategories(data);
          const mainCategory = data.find(
            (category) => category.title === productCategory
          );
          if (mainCategory) {
            setMainCategoryId(mainCategory.id);
          }
        } else {
          const err = await res.text();
          console.error(err);
        }
      } catch (error) {
        console.error(`Error fetching categories:, ${error}`);
      }
    }
    fetchCategoryes();
  }, [productCategory]);

  useEffect(() => {
    setSelectedCategory({
      label: mainProduct?.category,
      value: mainCategoryId,
    });
  }, [mainCategoryId]);

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "default-image.png",
      status: "done",
      url: productImg ? productImg : mainProduct?.baner,
    },
  ]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setProductImg(newFileList[0].originFileObj);
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
    onChange: handleChange,
  };

  // const convertUrlToFile = async (url, filename) => {
  //   const response = await fetch(url, { mode: 'no-cors' });
  //   const blob = await response.blob();
  //   return new File([blob], filename, { type: blob.type });
  // };

  const navigate = useNavigate();

  const editProduct = async () => {
    setLoading(true);

    const formData = new FormData();

    formData.append("title", productTitle);
    formData.append("body", productDesc);
    if (productImg instanceof File) {
      formData.append("baner", productImg);
    }
    formData.append("price", productPrice);
    formData.append("status", "off");
    formData.append("is_avalable", is_avaliable);
    formData.append("slug", productSlug);
    formData.append("category", selectedCategory.value);
    formData.append("sub_category", selectedSubCategory.value);
    formData.append("status", status);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    if (!selectedCategory.value) {
      message.error("please enter category");
    } else if (!selectedSubCategory.value) {
      message.error("please enter subcategory");
    } else {
      fetch(`https://wiko.pythonanywhere.com/panel/update/product/${mainProduct.id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')} `,
        },
        body: formData,
      }).then((res) => {
        console.log(res);
        if (res.ok) {
          setLoading(false);
          message.success("product updated sucessfully");
          navigate("/p-admin/productsList");
        } else {
          res.text().then((err) => console.error(err));
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

      <div className="bg-white rounded-lg p-5">
        <Row justify={"space-between"}>
          <Col span={24}>
            <Form
              autoComplete="off"
              onFinish={editProduct}
              enctype="multipart/form-data"
            >
              <Row>
                <Col span={18}>
                  <Row justify={"space-between"}>
                    <Col span={11}>
                      <Form.Item>
                        <div className="flex gap-3 items-center ">
                          <label htmlFor="title">title</label>
                          <Input
                            id="title"
                            placeholder="enter title"
                            value={productTitle}
                            
                            onChange={(e) => setProductTitle(e.target.value)}
                          />
                        </div>
                      </Form.Item>
                    </Col>
                    <Col span={11}>
                      <Form.Item>
                        <div className="flex gap-3 items-center">
                          <label htmlFor="">price</label>
                          <Input
                            placeholder="enter price"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                          />
                        </div>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row className="mt-10" justify={"space-evenly"}>
                    <Form.Item>
                      <div className="flex items-center gap-2">
                        <label htmlFor="category">category</label>
                        <Select
                          style={{ width: "150px" }}
                          labelInValue
                          value={selectedCategory}
                          onChange={onChangeSelect}
                          options={allCategories?.map((category) => {
                            return {
                              value: category.id,
                              label: category.title,
                            };
                          })}
                        ></Select>
                      </div>
                    </Form.Item>

                    <Form.Item>
                      <div className="flex gap-2 items-center">
                        <label htmlFor="category">subcategory</label>
                        <Select
                          style={{ width: "150px" }}
                          labelInValue
                          value={selectedSubCategory}
                          onChange={(value) => {
                            setSelectedSubCategory(value);
                          }}
                          options={allSubCategory?.map((subcategory) => {
                            return {
                              value: subcategory.id,
                              label: subcategory.title,
                            };
                          })}
                        ></Select>
                      </div>
                    </Form.Item>
                    <Form.Item>
                      <div className="flex gap-2 items-center">
                        <label htmlFor="status">status</label>
                        <Select
                          id="status"
                          style={{ width: "150px" }}
                          defaultValue={status}
                          value={status}
                          onChange={(value) => setStatus(value)}
                          options={[
                            { value: "definite", label: "definite" },
                            { value: "off", label: "off" },
                          ]}
                        ></Select>
                      </div>
                    </Form.Item>
                    <Form.Item>
                      <Checkbox
                        checked={is_avaliable}
                        onChange={(e) => setIs_avalible(e.target.checked)}
                      >
                        isAvaliable
                      </Checkbox>
                    </Form.Item>
                  </Row>
                  <Row className="mt-10">
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
                          style={{ minHeight: "200px" }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setProductDesc(data)
                            console.log({ event, editor, data });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="mt-5 px-10 py-5"
                  >
                    Save
                  </Button>
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
                          ? URL.createObjectURL(fileList[0]?.originFileObj)
                          : fileList[0]?.url || productImg
                      }
                    />
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProductsEdit;
