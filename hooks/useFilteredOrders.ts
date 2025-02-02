import { useMemo } from "react";
import { useOrders } from "@/hooks/useOrders";

export type DateFilterType =
  | "total"
  | "today"
  | "yesterday"
  | "7days"
  | "15days"
  | "30days";

interface FilteredData {
  totalSales: number;
  totalRevenue: number;
  topProducts: { id: string; title: string; sales: number }[];
}

export function useFilteredOrders(dateFilter: DateFilterType): FilteredData {
  const { orders } = useOrders();

  const getFilteredData = useMemo((): FilteredData => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const getDateRange = () => {
      switch (dateFilter) {
        case "today":
          return { start: new Date(today.setHours(0, 0, 0, 0)), end: today };
        case "yesterday":
          return {
            start: new Date(yesterday.setHours(0, 0, 0, 0)),
            end: new Date(yesterday.setHours(23, 59, 59, 999)),
          };
        case "7days":
          return {
            start: new Date(new Date().setDate(today.getDate() - 7)),
            end: today,
          };
        case "15days":
          return {
            start: new Date(new Date().setDate(today.getDate() - 15)),
            end: today,
          };
        case "30days":
          return {
            start: new Date(new Date().setDate(today.getDate() - 30)),
            end: today,
          };
        default:
          return null;
      }
    };

    const dateRange = getDateRange();
    const filteredOrders = dateRange
      ? orders.filter(
          (order) =>
            order.sale_date &&
            new Date(order.sale_date) >= dateRange.start &&
            new Date(order.sale_date) <= dateRange.end
        )
      : orders;

    const totalSales = filteredOrders.reduce(
      (sum, order) => sum + order.quantity,
      0
    );
    const totalRevenue = filteredOrders.reduce(
      (sum, order) => sum + order.price * order.quantity,
      0
    );

    const productSales = filteredOrders.reduce<
      Record<string, { id: string; title: string; sales: number }>
    >((acc, order) => {
      if (!acc[order.id]) {
        acc[order.id] = { id: order.id, title: order.title, sales: 0 };
      }
      acc[order.id].sales += order.quantity;
      return acc;
    }, {});

    return {
      totalSales,
      totalRevenue,
      topProducts: Object.values(productSales)
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5),
    };
  }, [dateFilter, orders]);

  return getFilteredData;
}
