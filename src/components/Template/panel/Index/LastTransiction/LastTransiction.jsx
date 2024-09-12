import {  Table  } from 'antd';

function LastTransiction() {

    const columns = [
        {
          title: 'Customer',
          dataIndex: 'Customer',
          key: 'Customer',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Date',
          dataIndex: 'Date',
          key: 'Date',
        },
        {
          title: 'Amount',
          dataIndex: 'Amount',
          key: 'Amount',
        },
        {
          title: 'Status',
          key: 'Status',
          dataIndex: 'Status',
        
        },
      ];

      const data = [
        {
          key: '1',
          Customer: 'John Brown',
          Date: 32,
          Amount: 'New York No. 1 Lake Park',
          Status : <div className='bg-red-100 border rounded text-center text-red-500 border-red-100'>Rejected</div>
        },
        {
          key: '2',
          Customer: 'Jim Green',
          Date: 42,
          Amount: 'London No. 1 Lake Park',
          Status : <div className='bg-blue-100 border rounded text-center text-blue-500 border-blue-100'>Pending</div>
        },
        {
          key: '3',
          Customer: 'Joe Black',
          Date: 32,
          Amount: 'Sydney No. 1 Lake Park',
          Status : <div className='bg-green-100 border rounded text-center text-green-500 border-green-100'>Approved</div>
        },
      ];

  return (
    <div className='w-full'>
    <p className='font-bold text-lg my-5'>Latest Transactions</p>
    <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default LastTransiction
