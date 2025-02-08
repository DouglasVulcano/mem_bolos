import React from "react";
import { Tooltip } from "recharts";

export default function ChartTooltip({ contentStyle = {}, ...props }) {
  return (
    <Tooltip
      {...props}
      contentStyle={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "6px",
        padding: "8px",
        ...contentStyle,
      }}
      formatter={(value: number) => [`${value} vendas`, "Volume"]}
    />
  );
}
