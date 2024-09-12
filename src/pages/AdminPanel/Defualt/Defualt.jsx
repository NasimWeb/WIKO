import ChartPanel from "../../../components/Template/panel/Index/Chart/ChartPanel";
import LineChart from "../../../components/Template/panel/Index/LineChart/LineChart";
import LastTransiction from "../../../components/Template/panel/Index/LastTransiction/LastTransiction";
import NewJoinMembers from "../../../components/Template/panel/Index/NewJoinMemebers/NewJoinMembers";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import './Defualt.css'
function Defualt() {


  return (
    <>
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 align-center content-center" >
        <div
          className="bg-white p-5 px-10  rounded"
          style={{ maxWidth: "100%" }}
        >
          <p className="mb-3  text-lg">Revenue</p>
          <div className="flex gap-3 items-center mb-2">
            <span className="font-bold text-2xl">$2,454</span>
            <span className="text-red-400 text-md font-bold">
              -11.4
              <ArrowDownOutlined />
            </span>
          </div>
          <div>
            <p className="p-desc">Compare to last year (2019)</p>
          </div>
        </div>
        <div
          className="bg-white p-5 px-10 rounded"
          style={{ maxWidth: "100%" }}
        >
          <p className="mb-3  text-lg">Sales</p>
          <div className="flex gap-3 items-center mb-2">
            <span className="font-bold text-2xl">$6,982</span>
            <span className="text-green-400 text-md font-bold">
              8.2
              <ArrowUpOutlined />
            </span>
          </div>
          <div>
            <p className="p-desc">Compare to last year (2019)</p>
          </div>
        </div>
        <div
          className="bg-white p-5 px-10 rounded"
          style={{ maxWidth: "100%" }}
        >
          <p className="mb-3  text-lg">Costs</p>
          <div className="flex gap-3 items-center mb-2">
            <span className="font-bold text-2xl">$8,310</span>
            <span className="text-green-400 text-md font-bold">
              0.7
              <ArrowUpOutlined />
            </span>
          </div>
          <div>
            <p className="p-desc">Compare to last year (2019)</p>
          </div>
        </div>
        <div
          className="bg-white p-5 px-10 rounded"
          style={{ maxWidth: "100%" }}
        >
          <p className="mb-3  text-lg">Costs</p>
          <div className="flex gap-3 items-center mb-2">
            <span className="font-bold text-2xl">$8,310</span>
            <span className="text-green-400 text-md font-bold">
              0.7
              <ArrowUpOutlined />
            </span>
          </div>
          <div>
            <p className="p-desc">Compare to last year (2019)</p>
          </div>
        </div>
      </div>

      <div className="grid custom-grid gap-3" style={{overflow : 'hidden', maxWidth : '100%'}}>
        <div  style={{maxWidth : '100%'}}>
          <ChartPanel title={' Top Products'} />
        </div>
        <div  style={{maxWidth : '100%'}}>
          <LineChart />
        </div>
      </div>


      <div
        className="grid   gap-3 custom-grid ">
        <div className="bg-white rounded p-5">
          <NewJoinMembers />
        </div>
        <div className="bg-white rounded p-5">
          <LastTransiction />
        </div>
      </div>
    </>
  );
}

export default Defualt;
