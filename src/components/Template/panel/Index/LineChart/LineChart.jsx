import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function LineChart() {
  const [series, setSeries] = useState([
    { name: "Series 1", data: [] },
    { name: "Series 2", data: [] },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData1 = { x: new Date(), y: Math.floor(Math.random() * 100) };
      const newData2 = { x: new Date(), y: Math.floor(Math.random() * 100) };

      setSeries((prevSeries) => [
        {
          name: "Order",
          data: [...prevSeries[0].data, newData1].slice(-10),
        },
        {
          name: "Date",
          data: [...prevSeries[1].data, newData2].slice(-10),
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    chart: {
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: { speed: 1000 },
      },
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    xaxis: {
      type: "datetime",
      range: 10000,
    },
    yaxis: {
      max: 100,
    },
    colors: ["#FF4560", "#4ADEA1"],
  };

  

  return (
    <div className="my-3">
      <div className="bg-white">
        <div className="app py-3">
          <div className="row">
            <div className="mixed-chart" style={{ maxWidth: "100%" }}>
              <Chart
                options={chartOptions}
                series={series}
                type="line"
                height={340}
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LineChart;
