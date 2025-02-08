"use client";

import { Product } from "@/types/Product";
import SectionTitle from "./SectionTitle";
import ProductCarousel from "./ProductCarousel";

interface ProductListProps {
  groupedProducts: Record<string, Array<Product>>;
}

export default function ProductList({ groupedProducts }: ProductListProps) {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <SectionTitle title="Nossos Produtos" bgColor="SaddleBrown" />
      <div className="space-y-12">
        {Object.entries(groupedProducts).map(([category, items]) => (
          <ProductCarousel key={category} category={category} items={items} />
        ))}
      </div>
    </section>
  );
}
