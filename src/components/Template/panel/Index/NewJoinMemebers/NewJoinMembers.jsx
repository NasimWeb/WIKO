import { Avatar, List } from "antd";

function NewJoinMembers() {
  const data = [
    {
      title: "Terrance Moreno",
      desc : 'Software Engineer'
    },
    {
      title: "Ron Vargas",
      desc: 'UI/UX Designer'
    },
    {
      title: "Luke Cook",
      desc: 'HR Executive'
    },
    {
      title: "Joyce Freeman",
      desc: 'Frontend Developer'
    },
    {
      title: "Samantha Phillips",
      desc: 'Compliance Manager'
    },
  ];
  return (
    <>
    <p className="font-bold my-5 text-lg">New Join Members</p>
    <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description={data.desc}
        />
      </List.Item>
    )}
  />
    </>
  );
}

export default NewJoinMembers;
