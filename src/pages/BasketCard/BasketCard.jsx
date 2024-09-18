import { Avatar, Button, List, Skeleton } from "antd";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import basketCart from "../../Contexts/basketCartContext";
import PagesHeader from "../../components/Module/PagesHeader/PagesHeader";
import { DeleteOutlined } from "@ant-design/icons";
import { setCookie } from "../../Funcs/setCookie";
import { Modal } from "antd";

function BasketCard() {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { basket, setBasket } = useContext(basketCart);
  const [list, setList] = useState(basket);

  const success = () => {
    Modal.success({
      content: "محصول شما با موفقیت حذف شد",
    });
  };

  const onLoadMore = () => {
    setLoading(true);
    setList(
      basket?.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    basket?.then((res) => {
      const newData = data.concat(res.results);
      setData(newData);
      setList(newData);
      setInitLoading(false);
      setLoading(false);
      // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
      // In real scene, you can using public method of react-virtualized:
      // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
      window.dispatchEvent(new Event("resize"));
    });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        {basket?.length ? (
          <Button onClick={onLoadMore}>loading more</Button>
        ) : (
          <p className="text-red-500">هیچ محصولی در سبد خرید وجود ندارد</p>
        )}
      </div>
    ) : null;

  const totalPrice = basket?.reduce((accumulator, product) => {
    return accumulator + product.price * product.quantity;
  }, 0);

  const deleteproduct = (id) => {
    const updatedList = list?.filter((item) => item.id !== id);
    setList(updatedList);
    setCookie("basketCart", JSON.stringify(updatedList));
    setBasket(updatedList);
    return success();
  };

  const clearBasketCart = () => {
    setList([]);
    setBasket([]);
    setCookie("basketCart", JSON.stringify([]));
  }

  return (
    <>
      <PagesHeader currentRoute={"سبد خرید"} bg={'/assets/images/photo_2024-09-13_10-19-45.jpg'} />
      <div className="bg-white p-10 rounded-lg my-20">
        <div className="container mx-auto px-20">
          <div className="grid xl:grid-cols-userPanel gap-5">
            <section>
              <List
                className="demo-loadmore-list"
                loading={false}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Link
                        onClick={() => deleteproduct(item.id)}
                        className="text-red-500"
                        key="list-loadmore-edit"
                      >
                        <DeleteOutlined />
                      </Link>,
                    ]}
                  >
                    <Skeleton
                      avatar
                      title={false}
                      loading={item.loading}
                      active
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.baner} />}
                        title={<Link>نام محصول</Link>}
                        description={item.price}
                      />
                      <List.Item.Meta
                        title={<Link>قیمت محصول</Link>}
                        description={item.price.toLocaleString()}
                      />
                      <List.Item.Meta
                        title={<Link>موجودی</Link>}
                        description={
                          item.is_avalable === true ? "موجود" : "موجود نیست"
                        }
                      />
                    </Skeleton>
                  </List.Item>
                )}
              />
            </section>
            <div className="sidebar">
              <h1 className="text-right text-xl mb-11">سبد خرید</h1>
              <h2 className="text-right text-xl mb-11">
                {" "}
                {totalPrice?.toLocaleString()}: جمع کل
              </h2>
              <hr />
              <div className="flex justify-end">
                {" "}
                <button onClick={clearBasketCart} className="p-4 mt-10 bg-main text-white rounded-lg text-lg">
                  حذف همه محصولات
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasketCard;
