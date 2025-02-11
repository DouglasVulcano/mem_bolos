"use client";

import { Share, ShoppingCart, CheckCircle, Eye } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { handleShare } from "@/utils/shareUtils";
import { useRouter } from "next/navigation";
import { Product } from "@/types/Product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, removeFromCart, isInCart } = useCartStore();
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
      {/* Imagem */}
      <div className="relative w-full h-48">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Informações */}
      <div className="mt-4 flex flex-col gap-1">
        <h4 className="text-lg font-semibold truncate">{product.title}</h4>
        <p className="text-gray-500 text-sm line-clamp-2">
          {product.description}
        </p>
        <p className="font-bold text-pink-600 text-xl">
          R$ {product.price.toFixed(2)}
        </p>
      </div>

      {/* Ações */}
      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={() =>
            isInCart(product.id)
              ? removeFromCart(product.id)
              : addToCart(product)
          }
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all active:scale-95 ${
            isInCart(product.id)
              ? "bg-green-100 text-green-600 hover:bg-green-200"
              : "bg-pink-500 text-white hover:bg-pink-600"
          }`}
        >
          {isInCart(product.id) ? (
            <CheckCircle size={18} />
          ) : (
            <ShoppingCart size={18} />
          )}
          {isInCart(product.id) ? "Remover" : "Comprar"}
        </button>

        {/* Ações secundárias */}
        <div className="flex gap-2">
          <button
            onClick={() => handleShare(product)}
            className="w-1/3 flex items-center justify-center text-gray-600 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all active:scale-95"
          >
            <Share size={18} />
          </button>

          <button
            onClick={() => router.push(`/prod/${product.id}`)}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-800 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-all active:scale-95"
          >
            <Eye size={18} />
            Ver
          </button>
        </div>
      </div>
    </div>
  );
}
