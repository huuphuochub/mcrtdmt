"use client"

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const uData = [40, 30, 20, 27, 10, 20, 90,10, 20, 90];
const pData = [24000000, 13900008, 90000800, 39000008, 48000000, 38000000, 43000000,24000000, 13900008, 90000800,];

const xLabels = [
  'Sản phẩm 1',
  'Sản phẩm 2',
  'Sản phẩm 3',
  'Sản phẩm 4',
  'Sản phẩm 5',
  'Sản phẩm 6',
  'Sản phẩm 7',
  'Sản phẩm 8',
  'Sản phẩm 9',
  'Sản phẩm 10',

];

export default function BiaxialBarChart() {
  return (
    <BarChart
      height={600}
      series={[
        {
          data: pData,
          label: 'Doanh thu',
          id: 'dtId',

          yAxisId: 'leftAxisId',
        },
        {
          data: uData,
          label: 'Số lượng',
          id: 'slId',

          yAxisId: 'rightAxisId',
        },
      ]}
      xAxis={[{ data: xLabels }]}
      yAxis={[
        { id: 'leftAxisId', width: 50 },
        { id: 'rightAxisId', position: 'right' },
      ]}
    />
  );
}
