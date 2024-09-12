import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, List, message, Skeleton } from "antd";
import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

function Blogs() {

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);



  const allBlogs = async () => {
    await fetch("https://wiko.pythonanywhere.com/content/blogs").then((res) => {
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

  const {refetch} = useQuery('Blogs',allBlogs)

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

  const DeleteBlog = (blogId) => {
    fetch(`https://wiko.pythonanywhere.com/panel/delete/blog/${blogId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => {
      if (res.ok) {
        message.success("blog deleted sucessfully");
        allBlogs();
      } else {
        res.text().then((err) => console.log(err));
      }
    });
  };

  
  return (
    <React.Fragment>
      <div className="bg-white p-3 rounded-xl">
        <div className="text-right">
          <Link to={"addBlog"}>
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
                <div className="flex gap-2" key={item.id}>
                  <Link to={`editBlog/${item.slug}`}>
                    <EditOutlined twoToneColor="#52c41a" />
                  </Link>
                  <Link onClick={() => DeleteBlog(item.id)}>
                    <DeleteOutlined twoToneColor="#eb2f96" />
                  </Link>
                </div>,
              ]}
            >
              <Skeleton avatar title={false} loading={item?.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={<Link to={`editBlog/${item.slug}`}>{item.title}</Link>}
                  description=""
                />
                <List.Item.Meta
                  title={"publish date"}
                  description={item?.publish_date.slice(0, 10)}
                />
                <List.Item.Meta title={"title"} description={item?.title} />

                {/* <div>
                 <p>conetnt</p>
                 <p>content desc</p>
               </div> */}
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </React.Fragment>
  );
}

export default Blogs;
