"use client";

import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";

export default function AdminDashboard() {
  const { products } = useProducts();

  return (
    <>
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
    </>
  );
}
