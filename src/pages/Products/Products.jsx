import { useContext,  useState } from "react";
import PagesHeader from "../../components/Module/PagesHeader/PagesHeader";
import "./Products.css";
import { Link } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { useMutation, useQuery } from "react-query";
import { Modal } from "antd";
import extractPlainText from "../../Hooks/extractPlainText";
import basketCart from "../../Contexts/basketCartContext";
import { setCookie } from "../../Funcs/setCookie";
import Pagination from "../../Hooks/pagination";

function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [gridViewType, setGridViewType] = useState("col");
  const [range, setRange] = useState([12, 80]);
  const [filteredProducts, setFilterProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const success = () => {
    Modal.success({
      content: 'محصول شما با موفقیت اضافه شد',
    });
  };

  async function fetchCategories() {
    const response = await fetch("https://wiko.pythonanywhere.com/content/categorys");
    if (response.ok) {
      const data = await response.json();
      setCategories(data);
      return data;
    } else {
      console.error(response.statusText);
    }
  }

  useQuery("Categories", fetchCategories);

  async function fetchData() {
    const response = await fetch("https://wiko.pythonanywhere.com/content/products/");

    if (response.ok) {
      const data = await response.json();
      setProducts(data);
      return data;
    } else {
      console.error(response.statusText);
    }
  }

 const  {data} = useQuery("Products", fetchData);


  

  const filterProducts = (slug) => {

    async function fetchData() {
      await fetch(`https://wiko.pythonanywhere.com/content/products/filter/${slug}`).then(
        (res) => {
          if (res.ok) {
            res.json().then((data) => setProducts(data));
          }
        }
      );
    }
    fetchData();
  };

  async function fetchSubCategories() {
    const response = await fetch("https://wiko.pythonanywhere.com/content/subcategorys");
    if (response.ok) {
      const data = await response.json();
      setSubCategories(data);
      return data;
    } else {
      console.error(response.statusText);
    }
  }

  useQuery("SubCategories", fetchSubCategories);

  const handleChanges = (event, newValue) => {
    setRange(newValue);
  };

  const filterProductsPrice = () => {
    const mainProduct = products.filter(
      (product) =>
        product.price >= range[0] * 1000 && product.price <= range[1] * 1000
    );
    setFilterProducts(mainProduct);
  };

  const filterProductsAsSubcategories = (ProductSlug) => {
  
    async function fetchData() {
      await fetch(
        `https://wiko.pythonanywhere.com/content/products/filter/subcategory/${ProductSlug}/`
      ).then((res) => {
        if (res.ok) {
          res.json().then((result) => setFilterProducts(result));
        } else {
          res.text().then((err) => console.error(err));
        }
      });
    }
    fetchData();
  };

  

  const {basket , setBasket} = useContext(basketCart);


  const AddToCard = async (productSlug) => {
    
    const response = await fetch(
      `https://wiko.pythonanywhere.com/content/product/${productSlug}`
    );
    if (response.ok) {
      const data = await response.json();
      if (basket) {
        const existingProduct  = basket?.find(item => item.slug === productSlug)
        if(existingProduct) {
          existingProduct.quantity = existingProduct.quantity || 0;
          existingProduct.quantity += 1;
          success()
        }else {
          setBasket([...basket,{...data,quantity : 1}])
          success()
        }
      }
      setCookie("basketCart", JSON.stringify(basket), 365 * 100);
    } else {
      console.Error();
    }
  };

 const {mutate:postView} = useMutation( async (productId) => {
   const res =  await fetch(`https://wiko.pythonanywhere.com/content/add/view/${productId}/`)   
 })

 const [currentPage , setCurrentPage] = useState(1)

 const getCurrentPageItems = () => {
  const startIndex = (currentPage - 1) * 6
  const endIndex = startIndex + 6
  const items = products?.slice(startIndex,endIndex)
  return items
 }
 



  return (
    <>
      <PagesHeader currentRoute={"فروشگاه"} bg={'/assets/images/photo_2024-09-13_10-19-45.jpg'}/>
      <div className="container mx-auto px-20 my-10">
        <div className="grid xl:grid-cols-custom gap-10">
          <div className="sidebar hidden xl:block">
            <p className="text-2xl titleSidebar">دسته بندی ها</p>
            <ul>
              {categories.length &&
                categories.map((categoryProduct) => {   
                  return (
                    <li key={categoryProduct.id} className="sidebarCateItem">
                      <div
                        className="cursor-pointer "
                        onClick={() => filterProducts(categoryProduct?.slug)}
                      >
                        <p className="category-links">
                          {categoryProduct.title}
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>

            <div className="mt-5 filter-brands">
              <p className="text-2xl titleSidebar">برند</p>
              <ul className="flex flex-wrap gap-2">
                <div className="flex gap-2 items-center">
                  {subCategories.length &&
                    subCategories.map((subCategory) => {                   
                      return (
                        <div
                          key={subCategory.id}
                          className="checkbox-wrapper-46"
                        >
                          <input
                            type="checkbox"
                            id={subCategory.id}
                            className="inp-cbx"
                            onChange={() =>
                              filterProductsAsSubcategories(subCategory?.slug)
                            }
                          />
                          <label htmlFor={subCategory.id} className="cbx">
                            <span>
                              <svg
                                viewBox="0 0 12 10"
                                height="10px"
                                width="12px"
                              >
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                              </svg>
                            </span>
                            <span>{subCategory.title}</span>
                          </label>
                        </div>
                      );
                    })}
                </div>
              </ul>
            </div>
            <div className="mt-10 filter-brands">
              <p className="text-2xl titleSidebar">فیلتر بر اساس قیمت</p>
              <div className="collectionButtonDetail mt-3">
                <Slider
                  value={range}
                  onChange={handleChanges}
                  valueLabelDisplay="auto"
                />
                <Link
                  onClick={() => {
                    filterProductsPrice();
                  }}
                >
                  فیلتر
                </Link>
              </div>
            </div>
            <div className="recent-products my-10">
              <p className="text-2xl titleSidebar">آخرین محصولات</p>
              <div className="products-wrapper flex flex-col gap-2">
                {
                  products?.slice().reverse().slice(0,3).map(product => {
                    return (
  
                <div key={product.id} className="productSidebar flex items-center gap-2">
                  <img
                    className="img-product"
                    src={product?.baner}
                    alt=""
                  />
                  <div className="flex flex-col gap-2">
                    <p className="title-product font-bold">
                      <Link to={`/products/${product.slug}`}>{product?.title}</Link>
                    </p>
                    <p className="pric-product font-bold">{product?.price}$</p>
                  </div>
                </div>
                    )
                  })
                }
                
              </div>
            </div>
            <div className="advertisment effectFour relative">
              <Link to={""}>
                <img
                  className="advertisement-img w-full"
                  src="./src/assets/images/5c644b08439de7915e2067141cb45ad6.jpg"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className="main-content">
            <div className="grid-type">
              <div className="flex gap-2">
                <button
                  onClick={() => setGridViewType("col")}
                  className={`changeView ${
                    gridViewType === "col" ? "active" : ""
                  }`}
                >
                  <svg
                    aria-hidden="true"
                    width={14}
                    height={14}
                    focusable="false"
                    data-prefix="fas"
                    data-icon="grid"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="svg-inline--fa fa-grid "
                  >
                    <path
                      fill="currentColor"
                      d="M0 72C0 49.9 17.9 32 40 32H88c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H40c-22.1 0-40-17.9-40-40V72zM0 232c0-22.1 17.9-40 40-40H88c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H40c-22.1 0-40-17.9-40-40V232zM128 392v48c0 22.1-17.9 40-40 40H40c-22.1 0-40-17.9-40-40V392c0-22.1 17.9-40 40-40H88c22.1 0 40 17.9 40 40zM160 72c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V72zM288 232v48c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V232c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40zM160 392c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V392zM448 72v48c0 22.1-17.9 40-40 40H360c-22.1 0-40-17.9-40-40V72c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40zM320 232c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40v48c0 22.1-17.9 40-40 40H360c-22.1 0-40-17.9-40-40V232zM448 392v48c0 22.1-17.9 40-40 40H360c-22.1 0-40-17.9-40-40V392c0-22.1 17.9-40 40-40h48c22.1 0 40 17.9 40 40z"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => setGridViewType("row")}
                  className={`changeView ${
                    gridViewType === "row" ? "active" : ""
                  }`}
                >
                  <svg
                    aria-hidden="true"
                    width={14}
                    height={14}
                    focusable="false"
                    data-prefix="fas"
                    data-icon="list-ul"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="svg-inline--fa fa-list-ul "
                  >
                    <path
                      fill="currentColor"
                      d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div
              className={`grid ${
                gridViewType === "row" ? "grid-cols-1 gap-40" : "lg:grid-cols-3"
              }  my-10 `}
              style={{ gap: "120px" }}
            >
              {filteredProducts.length
                ? filteredProducts.map((product) => {
                    return (
                      <div
                        key={product.slug}
                        className={`flex ${
                          gridViewType === "row"
                            ? "lg:flex-row lg:gap-0 gap-40 flex-wrap justify-between lg:flew-no-wrap  flex-col "
                            : "flex-col"
                        } text-center `}
                      >
                        <div
                          className={`text-center card flex flex-col ${
                            gridViewType === "row" ? "row-card" : ""
                          }`}
                        >
                          <Link to={`/products/${product?.slug}`} onClick={ () => postView(product?.id)}>
                            <img
                              src={product?.baner}
                              alt=""
                              className={`image ${
                                gridViewType === "row" ? "row-image" : ""
                              }`}
                            />
                            <img
                              src={product.galerys[0]?.image}
                              alt=""
                              className={`image hover-image ${
                                gridViewType === "row" ? "row-image" : ""
                              }`}
                            />
                          </Link>
                          <div className="detail flex flex-col gap-1 ">
                            <Link
                              className="hover-btns bg-main flex justify-center items-center"
                              to={""}
                            >
                              <i className="fa-solid fa-eye text-white"></i>
                            </Link>
                            <Link
                              className="hover-btns  bg-main flex justify-center items-center"
                              to={""}
                              onClick={(event) => {
                                event.preventDefault();
                                AddToCard(product.slug);
                              }}
                            >
                              <i className="fa-solid fa-basket-shopping text-white"></i>
                            </Link>
                          </div>
                        </div>
                        {gridViewType === "row" ? (
                          <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 items-baseline" onClick={ () => postView(product?.id)}>
                            <div className="flex flex-col">
                              <div className="product-title font-bold text-2xl">
                                {product?.title}
                              </div>
                              <div className="product-price">
                                {product?.price.toLocaleString()}
                              </div>
                              <div className="desc-pro">{product?.body}</div>
                            </div>
                            <div className="btns flex flex-col gap-3 justify-center">
                              <button className="btn-products ">
                                جزییات محصول
                              </button>
                              <button className="btn-products ">
                                نمایش جزییات
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="product-title font-bold">
                              {product?.title}
                            </div>
                            <div className="product-price">
                              {product?.price.toLocaleString()}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })
                : getCurrentPageItems()?.map((product) => {
                    return (
                      <div
                        key={product?.slug}
                        className={`flex ${
                          gridViewType === "row"
                            ? "lg:flex-row lg:gap-0 gap-40 flex-wrap justify-between lg:flew-no-wrap flex-col "
                            : "flex-col"
                        } text-center `}
                      >
                        <div
                          className={`text-center card flex flex-col ${
                            gridViewType === "row" ? "row-card" : ""
                          }`}
                          onClick={ () => postView(product?.id)}
                        >
                          <Link to={`/products/${product?.slug}`}>
                            <img
                              src={product?.baner}
                              alt=""
                              className={`image ${
                                gridViewType === "row" ? "row-image" : ""
                              }`}
                            />
                            <img
                              src={product.galerys[0]?.image}
                              alt=""
                              className={`image hover-image ${
                                gridViewType === "row" ? "row-image" : ""
                              }`}
                            />
                          </Link>
                          <div className="detail flex flex-col gap-1 ">
                            <Link
                              className="hover-btns bg-main flex justify-center items-center"
                              to={""}
                            >
                              <i className="fa-solid fa-eye text-white"></i>
                            </Link>
                            <Link
                              className="hover-btns  bg-main flex justify-center items-center"
                              to={""}
                              onClick={(event) => {
                                event.preventDefault();
                                AddToCard(product?.slug);
                              }}
                            >
                              <i className="fa-solid fa-basket-shopping text-white"></i>
                            </Link>
                          </div>
                        </div>
                      
                        {gridViewType === "row" ? (
                          <div className="flex flex-col lg:flex-row gap-5 lg:gap-5 items-baseline">
                            <div className="flex flex-col">
                              <div className="product-title font-bold text-2xl">
                                {product?.title}
                              </div>
                              <div className="product-price">
                                {product?.price.toLocaleString()}
                              </div>
                              <div className="desc-pro">
                                {extractPlainText(product?.body)}
                              </div>
                            </div>
                            <div className="btns flex flex-col gap-3 justify-center">
                              <button className="btn-products ">
                                جزییات محصول
                              </button>
                              <button className="btn-products ">
                                نمایش جزییات
                              </button>
                            </div>
                          </div>
                         
                        ) : (
                          <>
                            <div className="product-title font-bold">
                              {product?.title}
                            </div>
                            <div className="product-price">
                              {product?.price.toLocaleString()}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
            </div>
                 <div className="w-full">
                 {
                    getCurrentPageItems().length > 0 && 
                    <Pagination totalItems={products?.length -  1} itemsPerPage={6} pagesPerGroup={5}  currentPage={currentPage} setCurrentPage={setCurrentPage} />
                  }
                 </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
