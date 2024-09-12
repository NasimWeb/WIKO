import { Avatar, Button, List, message, Skeleton } from "antd";
import {  useState } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAccessToken } from "../../../Funcs/getCookie";
import { useQuery } from "react-query";

function Keywords() {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  
  

  const fetchTags = async () => {
    await fetch("https://wiko.pythonanywhere.com/panel/tags/", {
      method: "GET",
    }).then((res) => {
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

  const {refetch} = useQuery('Keywords',fetchTags)

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

  const DeleteKeyword = async (tagId) => {
    await fetch(`https://wiko.pythonanywhere.com/panel/delete/tag/${tagId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => {
      if (res.ok) {
        message.success("keyword deleted sucessfully");
        fetchTags();
      } else {
        res.text().then((err) => console.log(err));
      }
    });
  };

  
  

  return (
    <>
      <div className="mt-1 mb-2">
      </div>
      <div className="bg-white p-3 rounded-xl">
      <div className="text-right">
          <Link to={"addKeywords"}>
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
                <Link to={`${item.id}`} key="list-loadmore-edit">
                  <EditOutlined twoToneColor="#52c41a" />
                </Link>,
                <Link
                  onClick={() => DeleteKeyword(item.id)}
                  key="list-loadmore-more"
                >
                  <DeleteOutlined twoToneColor="#eb2f96" />
                </Link>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.baner} />}
                  title={<Link to={`${item.id}`}>{item.name}</Link>}
                  description=""
                />
                {/* <List.Item.Meta
                  title={"name"}
                  description={item.name}
                /> */}
                {/* <div>
                  <p>conetnt</p>
                  <p>content desc</p>
                </div> */}
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}

export default Keywords;
