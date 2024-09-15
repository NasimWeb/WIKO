import { Table } from "antd";
import { useQuery } from "react-query";
import ViewChart from "../../../components/Module/ViewChart/ViewChart";


function Analytic() {
  const fetchViews = async () => {
    const res = await fetch(`https://wiko.pythonanywhere.com/panel/view/products/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const result = await res.json().then((data) => data);
    return result;
  };

  const { data } = useQuery("productsView", fetchViews);


  const { Column, ColumnGroup } = Table;

  return (
    <div className="bg-white p-5">
      <div className="grid grid-cols-1">
        <h2 className="mb-5 font-bold text-xl"> Products Views</h2>
        <Table dataSource={data}>
          <ColumnGroup>
            <Column title="View" dataIndex="view_by" key="view_by" />
            <Column title="Product" dataIndex="title" key="title" />
          </ColumnGroup>
        </Table>
        <div style={{maxWidth : '100%', overflow : 'hidden', textAlign : 'center'}}>
         <ViewChart  />
        </div>
      </div>
    </div>
  );
}

export default Analytic;
