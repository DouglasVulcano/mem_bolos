import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types/Product";

export interface CartItem extends Product {
  quantity: number;
  createdAt: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  validateCart: () => void;
  checkout: () => void;
  isInCart: (id: string) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id
          );
          const now = Date.now();

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                      createdAt: now,
                    }
                  : item
              ),
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity, createdAt: now }],
          };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }));
      },

      clearCart: () => set({ cart: [] }),

      totalItems: () => {
        return get().cart.length;
      },

      validateCart: () => {
        set((state) => {
          const now = Date.now();
          const twoDaysInMs = 2 * 24 * 60 * 60 * 1000; // 2 dias

          const validCart = state.cart.filter(
            (item) => now - item.createdAt < twoDaysInMs
          );

          return { cart: validCart };
        });
      },

      checkout: () => {
        localStorage.removeItem("cart-storage");
        set({ cart: [] });
      },

      isInCart: (id: string) => {
        return get().cart.some((item) => item.id === id);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
