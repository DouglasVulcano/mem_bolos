"use client";

import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";

export default function AdminDashboard() {
  const { products } = useProducts();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-geist-sans">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full max-w-xs">
          <h1>Admin Dashboard</h1>
          <div>
            {products.map((product) => (
              <div key={product.id}>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <p>{product.category}</p>
                <p>{product.category_id}</p>
                <Image
                  src={product.image}
                  width={500}
                  height={500}
                  alt={product.title}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
