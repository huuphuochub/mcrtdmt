"use client";
import React from "react";
import Chart from "react-apexcharts";

const TrafficChart = () => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "traffic-chart",
      height: 350,
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "Báo cáo",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    tooltip: {
      y: {
        formatter: (value: number) => value.toLocaleString("vi-VN") + " đ",
      },
    },
    labels: [
      "01","02 ","03","04","05","06",
      "07","08","09","10","11","12","13","14",
      "15","16","17","18","19","20","21","22","23","24","25","26","26","27","28","29","30"
    ],
    yaxis: [
      {
        title: { text: "Thu nhập" },
        labels: {
        formatter: (value: number) => {
          // format số thành dạng có dấu chấm ngăn cách + " đ"
          return value.toLocaleString("vi-VN") + " đ";
        },
      },
      },
       
      {
        opposite: true,
        title: { text: "Số đơn" },
      },
    ],
  };

  const series = [
    {
      name: "Thu nhập",
      type: "column",
      data: [440000000, 505000000, 414000000, 671, 227, 413, 201, 352, 752, 320, 257, 160,220,170,345,215,323,424,342,543,511,422,250000000,231,421,412,0,0,0,321,212],
    },
    {
      name: "Số đơn",
      type: "line",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16,22,43,0,23,44,33,11,33,23,14,31,54,23,55,0,0,34,42,12],
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
};

// const Piechart=() =>{
    
// }

export default TrafficChart;
