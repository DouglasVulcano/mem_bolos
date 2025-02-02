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
    today.setHours(0, 0, 0, 0); // Zera as horas para evitar problemas

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const createDateRange = (days: number) => {
      const start = new Date();
      start.setDate(today.getDate() - days);
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      return { start, end };
    };

    const dateRanges: Record<
      DateFilterType,
      { start: Date; end: Date } | null
    > = {
      today: {
        start: today,
        end: new Date(new Date(today).setHours(23, 59, 59, 999)),
      },
      yesterday: {
        start: yesterday,
        end: new Date(new Date(yesterday).setHours(23, 59, 59, 999)),
      },
      "7days": createDateRange(7),
      "15days": createDateRange(15),
      "30days": createDateRange(30),
      total: null,
    };

    const dateRange = dateRanges[dateFilter];
    const filteredOrders = dateRange
      ? orders.filter((order) => {
          const saleDate = new Date(order.createdAt);
          return saleDate >= dateRange.start && saleDate <= dateRange.end;
        })
      : orders;

    const totalSales = filteredOrders.length;

    const totalRevenue = filteredOrders.reduce(
      (sum, order) => sum + order.price,
      0
    );

    const productSales = filteredOrders.reduce<
      Record<string, { id: string; title: string; sales: number }>
    >((acc, order) => {
      order.items.forEach(({ id, title, quantity }) => {
        if (!acc[id]) acc[id] = { id, title, sales: 0 };
        acc[id].sales += quantity;
      });
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
