import { create } from "zustand";
import { Order } from "@/types/Order";
import {
  getDocs,
  getDoc,
  collection,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
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

          let categoryTitle = "";
          let categoryId = "";
          if (orderData.category) {
            const categoryDoc = await getDoc(orderData.category);

            if (categoryDoc.exists()) {
              const categoryData = categoryDoc.data() as DocumentData;
              categoryTitle = categoryData.title;
              categoryId = categoryDoc.id;
            }
          }

          // Converte Firestore Timestamp para Date
          let saleDate: Date | null = null;
          if (orderData.sale_date instanceof Timestamp) {
            saleDate = orderData.sale_date.toDate();
          }

          return {
            id: orderDoc.id,
            title: orderData.title,
            price: orderData.price,
            quantity: orderData.quantity,
            sale_date: saleDate,
            category: categoryTitle,
            category_id: categoryId,
          };
        })
      );

      set({ orders: orderList });
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  },
}));
