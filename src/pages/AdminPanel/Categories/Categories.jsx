import { Avatar, Button, List, message, Skeleton } from "antd";
import React, {  useState } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";


function Categories() {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const fetchCategories = async () => {
    await fetch("https://wiko.pythonanywhere.com/content/categorys").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setInitLoading(false);
          setData(data);
          setList(data);
          return data
        });
      } else {
        res.text().then((err) => console.error(err));
      }
    });
  };

  const { refetch } = useQuery("Categories", fetchCategories);
  
  console.log(list);
  

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

    refetch().then((newData) => {
      const updatedData = data.concat(newData);
      setData(updatedData);
      setList(updatedData);
      setLoading(false);

      // Resetting window's offsetTop
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

  const DeleteCategory = (categoryId) => {
    fetch(`https://wiko.pythonanywhere.com/panel/delete/category/${categoryId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => {
      if (res.ok) {
        message.success("category deleted sucessfully");
        refetch();
      } else {
        res.text().then((err) => console.log(err));
      }
    });
  };

  return (
    <React.Fragment>
      <div className="bg-white p-3 rounded-xl">
        <div className="text-right">
          <Link to={"addCaregory"}>
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
                <Link to={`editCategory/${item.id}`} key="list-loadmore-edit">
                  <EditOutlined />
                </Link>,
                <Link
                  onClick={() => DeleteCategory(item.id)}
                  key="list-loadmore-more"
                >
                  <DeleteOutlined />
                </Link>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.baner} />}
                  title={<Link to={`editCategory/${item.id}`}>{item.title}</Link>}
                  description=""
                />
                <List.Item.Meta
                  title={"created"}
                  description={item.created.slice(0, 10)}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </React.Fragment>
  );
}

export default Categories;
