/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { formatPrice } from '@/lib/helpers/formatPrice';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ChartProps {
  data: {
    date: string;
    revenue: string;
  }[];
}

export function Chart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={420}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(value) => formatPrice(value)} />
        <Tooltip
          contentStyle={{
            background:
              'linear-gradient(145deg, rgba(50,50,50,0.9), rgba(70,70,70,0.9))',
            border: 'none',
            borderRadius: '6px',
            padding: '8px',
            color: '#fff',
          }}
          cursor={{ fill: 'transparent' }} // optional: subtle hover
          formatter={(value: number) => formatPrice(value)}
        />
        <Legend />
        <Bar dataKey="revenue" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  );
}
