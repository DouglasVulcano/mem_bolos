"use client";

import { Product } from "@/types/Product";
import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";

interface ProductListProps {
  groupedProducts: Record<string, Array<Product>>;
}

export default function ProductList({ groupedProducts }: ProductListProps) {
  return (
    <section className="py-16 px-8 max-w-5xl mx-auto">
      <SectionTitle title="Nossos Produtos" bgColor="SaddleBrown" />
      <div className="space-y-12">
        {Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category}>
            <SectionTitle
              title={category}
              bgColor={"LightCoral"}
              margin={"0"}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
