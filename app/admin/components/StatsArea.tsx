import { useFilteredOrders, DateFilterType } from "@/hooks/useFilteredOrders";
import { TrendingUp, DollarSign } from "lucide-react";
import WeeklySalesChart from "./WeeklySalesChart";
import TopProductsList from "./TopProductsList";
import { useOrders } from "@/hooks/useOrders";
import { formatCurrency } from "@/utils";
import React, { useState } from "react";
import StatCard from "./StatsCard";

export default function StatsArea() {
  const [dateFilter, setDateFilter] = useState<DateFilterType>("total");
  const { totalSales, totalRevenue, topProducts } =
    useFilteredOrders(dateFilter);
  const { orders } = useOrders();

  return (
    <React.Fragment>
      <div className="mb-6">
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value as DateFilterType)}
          className="block w-48 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="total">Total</option>
          <option value="today">Hoje</option>
          <option value="yesterday">Ontem</option>
          <option value="7days">Últimos 7 dias</option>
          <option value="15days">Últimos 15 dias</option>
          <option value="30days">Últimos 30 dias</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-5">
          <StatCard
            icon={<TrendingUp className="h-10 w-10 text-indigo-600" />}
            label="Total de Vendas"
            value={`${totalSales}`}
          />
          <StatCard
            icon={<DollarSign className="h-10 w-10 text-emerald-600" />}
            label="Receita Total"
            value={formatCurrency(totalRevenue)}
          />
        </div>
        <TopProductsList topProducts={topProducts} />
      </div>

      <WeeklySalesChart orders={orders} />
    </React.Fragment>
  );
}
