import { Avatar, Button, List, message, Skeleton } from 'antd';
import {  useState} from 'react';
import './Users.css'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

function Users() {

 

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);


  const getAllUsers = async () => {
   await fetch('https://wiko.pythonanywhere.com/panel/users/', {
      method : 'GET',
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => {
      if(res.ok) {
        res.json().then(data => {
          setInitLoading(false);
          setData(data);
          setList(data)
        })
      }else {
        res.text().then(err => console.error(err))
      }
    })
  }

   const {refetch} = useQuery('Users',getAllUsers)

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    refetch().then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };

  

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;


    const DeleteUser = async (userId) => {
     
        await fetch(`https://wiko.pythonanywhere.com/panel/delete/user/${userId}/`,{
          method : 'DELETE',
          headers : {
            Authorization : `Bearer ${localStorage.getItem('accessToken')}`
          }
        }).then(res => {
          if(res.ok){
            message.success('user deleted sucessfully')
            getAllUsers()
          }else {
            res.text().then(err => console.log(err))
          }
        })
       
    }



  return (
   
   <div className="bg-white p-3 rounded-xl">
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[
            <div className='flex gap-2' key={item.id}>
              <Link to={`${item.id}`}><EditOutlined twoToneColor="#52c41a" /></Link>
              <Link onClick={() =>  DeleteUser(item.id)}><DeleteOutlined twoToneColor="#eb2f96" /></Link>
              </div>
          ]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.baner} />}
              title={<Link to={`${item.id}`}>{item.username}</Link>}
              description=""
            />
             <List.Item.Meta
              title={'phone'}
              description={item.phone}
            />
             <List.Item.Meta
              title={'role'}
              description={item.is_admin ? 'admin' : 'user'}
            />
             <List.Item.Meta
              title={'last login'}
              description={item.last_login?.slice(0,10)}
            />
            <List.Item.Meta
              title={'created'}
              description={item.created.slice(0,10)}
            />
           
            <List.Item.Meta
              title={'updated'}
              description={item.updated.slice(0,10)}
            />
            {/* <div>
              <p>conetnt</p>
              <p>content desc</p>
            </div> */}
          </Skeleton>
        </List.Item>
      )}
    />
    </div>
    
  )
}

export default Users
