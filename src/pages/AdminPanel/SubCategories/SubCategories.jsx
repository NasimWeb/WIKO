import { Avatar, Button, List, message, Skeleton } from "antd";
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";


function SubCategories() {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const fetchSubCategories = () => {
    fetch("https://wiko.pythonanywhere.com/content/subcategorys").then((res) => {
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

  const { refetch } = useQuery("subCategories", fetchSubCategories);

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

  const DeleteSubcategory = (subId) => {
    fetch(`https://wiko.pythonanywhere.com/panel/delete/sub/category/${subId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => {
      if (res.ok) {
        message.success("subCategories deleted sucessfully");
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
          <Link to={"addSubCategory"}>
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
                <Link to={`editSubCategory/${item.id}`} key="list-loadmore-edit">
                  <EditOutlined />
                </Link>,
                <Link
                  onClick={() => DeleteSubcategory(item.id)}
                  key="list-loadmore-more"
                >
                  <DeleteOutlined />
                </Link>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.baner} />}
                  title={<a href="https://ant.design">{item.title}</a>}
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

export default SubCategories;
