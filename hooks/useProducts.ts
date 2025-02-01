import { useEffect } from "react";
import { useProductStore } from "@/stores/useProductStore";

export function useProducts() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  return { products };
}
