"use client";
import React, { useEffect, useState, useMemo } from "react";
import Chart from "react-apexcharts";
import { DoashboardRevenue } from "../../service/order.service";

interface TrafficChartProp {
  month: number;
  year: number;
}

const TrafficChart = ({ month, year }: TrafficChartProp) => {
  const [chartData, setChartData] = useState<{ day: string; revenue: number; totalOrders: number }[]>([]);

  // Tính số ngày trong tháng
  const daysInMonth = useMemo(() => {
    return new Date(year, month, 0).getDate(); 
  }, [month, year]);

  const labels = Array.from({ length: daysInMonth }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  useEffect(() => {
    fetchData();
  }, [month, year]);

  const fetchData = async () => {
    try {
      const data = await DoashboardRevenue(month, year);
      setChartData(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Chuẩn bị dữ liệu cho chart
  const { revenueData, ordersData } = useMemo(() => {
    const revenueArr = Array(daysInMonth).fill(0);
    const ordersArr = Array(daysInMonth).fill(0);

    chartData.forEach((item) => {
      const dayIndex = new Date(item.day).getDate() - 1; // chuyển ngày -> index
      revenueArr[dayIndex] = item.revenue;
      ordersArr[dayIndex] = item.totalOrders;
    });

    return { revenueData: revenueArr, ordersData: ordersArr };
  }, [chartData, daysInMonth]);

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
    labels,
    yaxis: [
      {
        title: { text: "Doanh thu" },
        labels: {
          formatter: (value: number) => value.toLocaleString("vi-VN") + " đ",
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
      name: "Doanh thu",
      type: "column",
      data: revenueData,
    },
    {
      name: "Số đơn",
      type: "line",
      data: ordersData,
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default TrafficChart;
