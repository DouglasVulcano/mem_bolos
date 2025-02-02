import { Order } from "@/types/Order";
import { WeekPeriod, ChartData } from "@/types/Chart";

export const calculateTotalSales = (
  orders: Order[],
  startDate: Date,
  endDate: Date
): number => {
  return orders.filter(
    (order) => order.createdAt >= startDate && order.createdAt < endDate
  ).length;
};

export const prepareChartData = (orders: Order[], periods: WeekPeriod[]): ChartData[] => {
  return periods.map(({ startDate, endDate, label }) => ({
    period: label,
    sales: calculateTotalSales(orders, startDate, endDate),
  }));
};