import { useEffect } from "react";
import { useOrdersStore } from "@/stores/useOrdersStore";

export function useOrders() {
  const { orders, fetchOrders } = useOrdersStore();

  useEffect(() => {
    if (orders.length === 0) {
      fetchOrders();
    }
  }, [fetchOrders, orders.length]);

  return { orders };
}
