import { create } from "zustand";
import { Order } from "@/types/Order";
import { getDocs, collection, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebase";

interface OrdersStore {
  orders: Order[];
  fetchOrders: () => Promise<void>;
}

export const useOrdersStore = create<OrdersStore>((set) => ({
  orders: [],
  fetchOrders: async () => {
    try {
      const ordersCollectionRef = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollectionRef);

      const orderList: Order[] = await Promise.all(
        ordersSnapshot.docs.map(async (orderDoc) => {
          const orderData = orderDoc.data();

          let saleDate: Date = new Date();
          if (orderData.createdAt instanceof Timestamp)
            saleDate = orderData.createdAt.toDate();

          return {
            id: orderData.id,
            createdAt: saleDate,
            customerName: orderData.customerName,
            items: orderData.items,
            price: orderData.price,
            shippingAddress: orderData.shippingAddress,
          };
        })
      );

      set({ orders: orderList });
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  },
}));
