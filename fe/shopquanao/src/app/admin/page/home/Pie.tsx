"use client";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Doashboardtopproductsell } from "../../service/order.service";
import { useEffect, useState } from "react";

interface PieChartProp {
  month: number;
  year: number;
  limit:number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

export default function MyPieChart({ month, year ,limit}: PieChartProp) {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  // const [limit,setLimit] = useState<number>(5)

  useEffect(() => {
    fetchData();
  }, [month, year,limit]);

  const fetchData = async () => {
    try {
      const res = await Doashboardtopproductsell(month, year,limit);
      // map lại dữ liệu từ API
      const formatted = res.data.map((item: any) => ({
        name: item.productName,
        value: item.totalSold,
      }));
      setChartData(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center bg-white p-4 rounded-xl shadow">
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
