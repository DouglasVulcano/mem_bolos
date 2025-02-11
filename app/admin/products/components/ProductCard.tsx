"use client";

import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/Product";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  priority: boolean;
}

export function ProductCard({
  product,
  onEdit,
  onDelete,
  priority,
}: ProductCardProps) {
  return (
    <div className="flex items-center bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <Image
        src={product.image}
        alt={product.title}
        width={64}
        height={64}
        className="rounded-lg object-cover"
        priority={priority}
        unoptimized={process.env.NODE_ENV === "development"}
      />
      <div className="ml-4 flex-1">
        <p className="font-medium text-gray-900">{product.title}</p>
        <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(product)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow transition"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow transition"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}
