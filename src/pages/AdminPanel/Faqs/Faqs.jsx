import React, { useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, List, message, Skeleton } from "antd";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";


function Faqs() {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const fetchFags = async () => {
    await fetch("https://wiko.pythonanywhere.com/content/faqs/").then((res) => {
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

  const { refetch } = useQuery("Fags", fetchFags);

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

 
    const {mutate:deletefaq} = useMutation((itemId) => {
        return fetch(`https://wiko.pythonanywhere.com/panel/delete/faq/${itemId}/`,{
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            if(res.ok) {
                return res.json().then(() => {
                    message.success('faq deleted successfully')
                    refetch()
                })
            }else {
                return res.text().then(err => console.log(err)
                )
            }
        })
    })
    


  return (
    <React.Fragment>
      <div className="bg-white p-5">
        <div className="text-right">
          <Link to={"addFaq"}>
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
                <Link to={`editFaq/${item.id}`} key="list-loadmore-edit">
                  <EditOutlined />
                </Link>,
                <Link onClick={() => deletefaq(item.id)} key="list-loadmore-more">
                  <DeleteOutlined />
                </Link>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.media} />}
                  title={<Link to={""}>question</Link>}
                  description={item.question}
                />
                <List.Item.Meta
                  title={<Link to={""}>answer</Link>}
                  description={item.answer}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </React.Fragment>
  );
}

export default Faqs;
