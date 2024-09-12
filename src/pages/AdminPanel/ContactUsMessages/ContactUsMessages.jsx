import { CheckCircleTwoTone, CloseCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Skeleton } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";


function ContactUsMessages() {
 

  const fetchMessages = async () => {
    await fetch("https://wiko.pythonanywhere.com/panel/contact/messages/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const subjectMap = {
            'a': 'پشتیبانی فنی',
            'b': 'سوالات درباره محصولات',
            'c': 'مشکلات حساب کاربران',
            'd': 'نظرات و پیشنهادات',
            'e': 'شکایت و انتقاد',
            'f': 'همکاری و شراکت',
            'g': 'درخواست اطلاعات بیشتر',
            'h': 'پرسش های عمومی'
          };
         
          const updatedData = data.map(message => {
            return {
              ...message,
              subject: subjectMap[message.subject] || message.subject  
            };
          });
          
          setInitLoading(false);
          setData(updatedData);  
          setList(updatedData);
        });
      } else {
        res.text().then((err) => console.error(err));
      }
    });
  };


  
  

  const { refetch } = useQuery("ContactMessages", fetchMessages);

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
                to={`reply/${item.id}`}
                key="list-loadmore-edit"
              >
                <EditOutlined twoToneColor="#52c41a" />
              </Link>,
              <Link
                to={""}
                key="list-loadmore-more"
               
              >
                
              </Link>,
            ]}
          >
            <Skeleton avatar  title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.baner} />}
              />

              <List.Item.Meta title={"email"} description={item?.email} className="mr-9" />
              <List.Item.Meta
                title={"subject"}
                description={item.subject}
              />
              <List.Item.Meta title={"user"} description={item?.user} />
              <List.Item.Meta title={"isAnsewer"} description={item?.is_reply == true ? <CheckCircleTwoTone twoToneColor="#52c41a" />: <CloseCircleOutlined twoToneColor="#eb2f96" className="text-red-500" />} />
              <List.Item.Meta title={"message"} description={item?.message} />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ContactUsMessages;
