"use client";

import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Doashboardtopproductrevenue } from "../../service/order.service";

interface BiaxialBarChartProp {
  month: number;
  year: number;
}

export default function BiaxialBarChart({ month, year }: BiaxialBarChartProp) {
  const [uData, setUData] = React.useState<number[]>([]);
  const [pData, setPData] = React.useState<number[]>([]);
  const [xLabels, setXLabels] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetchData();
  }, [month, year]);

  const fetchData = async () => {
    try {
      const res = await Doashboardtopproductrevenue(month, year);

      if (res?.data) {
        const labels = res.data.map((item: any) => item.productName);
        const soluongArr = res.data.map((item: any) => item.soluong);
        const doanhthuArr = res.data.map((item: any) => item.tongdoanhthu);

        setXLabels(labels);
        setUData(soluongArr);
        setPData(doanhthuArr);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BarChart
      height={600}
      series={[
        {
          data: pData,
          label: "Doanh thu",
          id: "dtId",
          yAxisId: "leftAxisId",
        },
        {
          data: uData,
          label: "Số lượng",
          id: "slId",
          yAxisId: "rightAxisId",
        },
      ]}
      xAxis={[{ data: xLabels }]}
      yAxis={[
        { id: "leftAxisId", width: 80, label: "Doanh thu (VNĐ)" },
        { id: "rightAxisId", position: "right", label: "Số lượng" },
      ]}
    />
  );
}
