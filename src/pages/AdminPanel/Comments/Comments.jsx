import { CheckCircleTwoTone, CloseCircleOutlined, EditOutlined } from "@ant-design/icons";
import {  Button, List, Skeleton } from "antd"
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom"




function Comments() {

  const fetchComments = async () => {
    await fetch("https://wiko.pythonanywhere.com/panel/comments/",{
      method: "GET",
        headers: {
          Authorization : `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setInitLoading(false);
          const filterComments = data.filter(item => item.reply_complete === false) 
          setData(filterComments);
          setList(filterComments);
          return filterComments
        });
      } else {
        res.text().then((err) => console.error(err));
      }
    });
  };

  const {refetch} = useQuery("Comments", fetchComments);

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


  
  

  return (
    <div className="bg-white p-5">
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
                  to={`reply/${item.product.id}/${item.id}`}
                  key="list-loadmore-edit"
                >
                  <EditOutlined twoToneColor="#52c41a" />
                </Link>,
               
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  // avatar={<Avatar src={item.baner} />}
                  title='user'
                  description={item.user}
                />
                <List.Item.Meta title={"product"} description = {item.product.title} />
                <List.Item.Meta title={"message"} description = {item.message} />
                <List.Item.Meta title={"isReply"} description={item.is_reply? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleOutlined twoToneColor="#eb2f96" className="text-red-500" />} />
                <List.Item.Meta
                  title={"created"}
                  description={item.created.slice(0, 10)}
                />
                <List.Item.Meta
                  title={"updated"}
                  description={item.updated.slice(0, 10)}
                />
                
              </Skeleton>
            </List.Item>
          )}
        />
    </div>
  )
}

export default Comments
