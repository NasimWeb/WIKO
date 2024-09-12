import { Avatar, Button, List, message, Skeleton } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

function Products() {
  

  const fetchPeoducts = async () => {
    await fetch("https://wiko.pythonanywhere.com/content/products/").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setInitLoading(false);
          setData(data);
          setList(data);
        });
      } else {
        res.text().then((err) => console.error(err));
      }
    });
  };

    const {refetch} =useQuery("Products", fetchPeoducts);

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );

    refetch().then((res) => {
          const newData = data.concat(res.results);
          setData(newData);
          setList(newData);
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
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

    const deleteProduct = async (id) => {
      await fetch(`https://wiko.pythonanywhere.com/panel/delete/product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then(() => {
            message.success("product deleted sucessfully");
            fetchPeoducts();
          });
        } else {
          res.text().then((err) => console.error(err));
        }
      });
    };


  
  return (
    <>
      <div className="mt-1 mb-2"></div>
      <div className="bg-white p-3 rounded-xl">
        <div className="text-right">
          <Link to={"addProduct"}>
            <PlusOutlined />
          </Link>
        </div>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Link
                  to={`productsListEdit/${item.slug}`}
                  key="list-loadmore-edit"
                >
                  <EditOutlined twoToneColor="#52c41a" />
                </Link>,
                <Link
                  to={""}
                  key="list-loadmore-more"
                  onClick={() => deleteProduct(item.id)}
                >
                  <DeleteOutlined twoToneColor="#eb2f96" />
                </Link>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.baner} />}
                  title={
                    <Link to={`productsListEdit/${item.slug}`}>
                      {item.title}
                    </Link>
                  }
                  description=""
                />
                <List.Item.Meta
                  title={"created"}
                  description={item.created.slice(0, 10)}
                />
                <List.Item.Meta title={"price"} description={item.price} />
                <List.Item.Meta title={"status"} description={item.status} />
                <List.Item.Meta
                  title={"updated"}
                  description={item.updated.slice(0, 10)}
                />
                <div>
                  <Link to={`Gallery/${item.slug}`}>Gallery</Link>
                </div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}

export default Products;
