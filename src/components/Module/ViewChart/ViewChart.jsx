import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";



function ViewChart() {



  const [chartData, setChartData] = useState({
    series: [{
      name: 'Products',
      data: []
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + " views";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: [],
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + " views";
          }
        }
      },
      fill: {
        colors: []
      },
      title: {
        text: 'Most Visited Product',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    },
  });

  const fetchViews = async () => {
    const res = await fetch(`https://wiko.pythonanywhere.com/panel/view/products/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const result = await res.json();
    return result;
  };

  const { data, isLoading, isError } = useQuery("productsView", fetchViews);

  useEffect(() => {
    if (isLoading || isError || !data) return;

    // مرتب‌سازی داده‌ها بر اساس view_by از بالا به پایین
    const sortedData = data.sort((a, b) => b.view_by - a.view_by);

    // استخراج داده‌های مورد نیاز برای چارت
    const categories = sortedData.map(item => item.title);
    const seriesData = sortedData.map(item => item.view_by);

    // تولید رنگ‌های تصادفی برای هر ستون
    const generateRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const colors = seriesData.map(() => generateRandomColor());

    // تنظیم داده‌های چارت
    setChartData(prevState => ({
      ...prevState,
      series: [{
        ...prevState.series[0],
        data: seriesData
      }],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: categories
        },
        fill: {
          colors: colors
        }
      }
    }));
  }, [data, isLoading, isError]);
    


 
  return (
    <div>
    <div id="chart" className="flex justify-center">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} width={'1000px'} />
    </div>
    <div id="html-dist"></div>
  </div>
  )
}

export default ViewChart
