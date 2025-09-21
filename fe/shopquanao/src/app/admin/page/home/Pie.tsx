"use client";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Hoàn thành", value: 400 },
  { name: "Hủy bởi khách", value: 300 },
  { name: "Thu nhập", value: 300 },
  { name: "Tổng sản phẩm", value: 200 },
  { name: "Bị hủy", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

export default function MyPieChart() {
  return (
    <div className="flex justify-center bg-white p-4 rounded-xl shadow">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
