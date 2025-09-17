"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Sử dụng dynamic import vì ApexCharts chỉ chạy client
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart: React.FC = () => {
  const series = [44, 55, 13, 43, 22,44, 55, 13, 43, 22,44, 55, 13, 43, 22]; // dữ liệu
  const labels = [
    "Hoàn thành sản phẩm a này hơi dài để xem có xấu không",
    "Hủy bởi khách",
    "Thu nhập",
    "Tổng sản phẩm",
    "Bị hủy",
    "Hoàn thành sản phẩm a này hơi dài để xem có xấu không",
    "Hủy bởi khách",
    "Thu nhập",
    "Tổng sản phẩm",
    "Bị hủy",
    "Hoàn thành sản phẩm a này hơi dài để xem có xấu không",
    "Hủy bởi khách",
    "Thu nhập",
    "Tổng sản phẩm",
    "Bị hủy"
  ];

  const options: ApexOptions = {
    chart: {
      id: "traffic-pie-chart",
      type: "pie",
      height: 350,
    toolbar: { show: false }

    },
    labels: labels,
    legend: {
    position: "right",
    show:false,
    formatter: (seriesName: string, opts: any) => {
        return seriesName.length > 15 ? seriesName.slice(0, 15) + "..." : seriesName;
    }
    },

    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const label = opts.w.globals.labels[opts.seriesIndex];
        return label.length > 10 ? label.slice(0, 10) + "..."  : label ;
      },
      style: {
        fontSize: "12px"
      }
    },
    
    responsive: [
      {
        breakpoint: 768, // mobile
        options: {
          chart: { width: 300 },
          legend: { position: "bottom" }
        }
      }
    ]
  };

  return <Chart options={options} series={series} type="pie" height={350} />;
};

export default PieChart;
