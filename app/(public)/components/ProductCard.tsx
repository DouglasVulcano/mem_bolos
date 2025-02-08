"use client";

import { Share, ShoppingCart, CheckCircle } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { handleShare } from "@/utils/shareUtils";
import { Product } from "@/types/Product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart } = useCartStore();
  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 transition-all hover:shadow-xl hover:scale-[1.02]">
      {/* Imagem do Produto */}
      <div className="relative w-full h-48">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Detalhes do Produto */}
      <div className="mt-4 space-y-2">
        <h4 className="text-lg font-semibold truncate">{product.title}</h4>
        <p className="text-gray-500 text-sm line-clamp-2">
          {product.description}
        </p>
        <p className="font-bold text-pink-600 text-xl">
          R$ {product.price.toFixed(2)}
        </p>
      </div>

      {/* Seção de Ações */}
      <div className="mt-4 flex flex-col gap-3">
        {isInCart ? (
          <div className="w-full flex items-center justify-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-lg">
            <CheckCircle size={18} />
            Já foi adicionado
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-all active:scale-95"
          >
            <ShoppingCart size={18} />
            Adicionar ao Carrinho
          </button>
        )}

        {/* Botão de Compartilhar */}
        <button
          onClick={() => handleShare(product)}
          className="w-full flex items-center justify-center gap-2 text-pink-500 border border-pink-500 px-4 py-2 rounded-lg hover:bg-pink-50 transition-all active:scale-95"
        >
          <Share size={18} />
          Compartilhar
        </button>
      </div>
    </div>
  );
}
