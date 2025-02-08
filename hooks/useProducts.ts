import { useEffect } from "react";
import { useProductStore } from "@/stores/useProductStore";
import { Product } from "@/types/Product";

export function useProducts() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  const groupedProducts = products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return { products, groupedProducts };
}
