import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Order } from "@/types/Order";
import { generateWeeklyPeriods } from "../utils/dateUtils";
import { prepareChartData } from "../utils/chartUtils";
import ChartTooltip from "./ChartTooltip";

interface WeeklySalesChartProps {
  orders: Order[];
  numberOfWeeks?: number;
  className?: string;
}

export default function WeeklySalesChart({
  orders,
  numberOfWeeks = 4,
  className = "bg-white p-6 rounded-lg shadow-sm col-span-2",
}: WeeklySalesChartProps) {
  const chartData = useMemo(
    () => prepareChartData(orders, generateWeeklyPeriods(numberOfWeeks)),
    [orders, numberOfWeeks]
  );

  return (
    <div className={className}>
      <div className="mb-4">
        <h2 className="text-md text-gray-500">Número de vendas semanais</h2>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="text-gray-200" />
            <XAxis
              dataKey="period"
              tick={{ fill: "#6B7280", fontSize: 11 }}
              tickLine={{ stroke: "#6B7280" }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fill: "#6B7280" }}
              tickLine={{ stroke: "#6B7280" }}
              allowDecimals={false}
              domain={[0, "auto"]}
            />
            <ChartTooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              name="Volume de Vendas"
              strokeWidth={2}
              dot={{ fill: "#8884d8", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
