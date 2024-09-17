
import {  useState } from "react";
import Chart from "react-apexcharts";
import { useQuery } from "react-query";

function ChartPanel({title}) {

  const [products , setProducts] = useState()

  const [series , setSeries] = useState([
   { name: "Jan", 
    data: [30, 40, 45, 50, 49, 60, 70, 91]}
  ])


  

  const [options,setOptions] = useState({
    chart: {
      id: "basic-bar",
      toolbar : {
        show : false,
       },
       background : '#fff',
          height: 'auto',
          width : '100%',
    },
   
    xaxis: {
      categories: ['wiki20', 'wiki10', 'wiki50', 'wiki60', 'wiki35', 'wiki2', 'wiki34', 'wiki50']
    },
    title: {
      text: title,
      align: 'left'
    },
  })
 
  

  return (
    <div className="my-3 w-full" >
       <div className="bg-white">
       <div className="app py-3">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type="bar"
              width={'100%'}
              height={340}
            />
          </div>
        </div>
      </div>
       </div>
    </div>
  )
}

export default ChartPanel
