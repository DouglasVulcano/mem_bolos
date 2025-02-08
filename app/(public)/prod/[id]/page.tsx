"use client";

import SectionTitle from "@/app/(public)/components/SectionTitle";
import { ShoppingCart, CheckCircle, Share } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useProducts } from "@/hooks/useProducts";
import { handleShare } from "@/utils/shareUtils";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function DetailsPage() {
  const params = useParams(),
    id = params?.id as string;

  const { getProductById } = useProducts();
  const { cart, addToCart, removeFromCart } = useCartStore();
  const product = getProductById(id);

  const isInCart = cart.some((item) => item.id === product?.id);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-xl overflow-hidden p-6">
        <SectionTitle
          title={`${product.category}`}
          bgColor="LightCoral"
          margin={"0"}
        />
        <div className="relative w-full h-64 sm:h-80 md:h-96">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Informações do Produto */}
        <div className="mt-6 space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {product.title}
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            {product.description}
          </p>
          <p className="text-xl font-bold text-pink-600">
            R$ {product.price.toFixed(2)}
          </p>
        </div>

        {/* Ações */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <button
            onClick={() =>
              isInCart ? removeFromCart(product.id) : addToCart(product)
            }
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all active:scale-95 ${
              isInCart
                ? "bg-green-100 text-green-600 hover:bg-green-200"
                : "bg-pink-500 text-white hover:bg-pink-600"
            }`}
          >
            {isInCart ? <CheckCircle size={18} /> : <ShoppingCart size={18} />}
            {isInCart ? "Remover" : "Comprar"}
          </button>
          <button
            onClick={() => handleShare(product)}
            className="flex-1 flex items-center justify-center gap-2 text-pink-500 border border-pink-500 px-4 py-2 rounded-lg hover:bg-pink-50 transition-all active:scale-95"
          >
            <Share size={20} />
            Compartilhar
          </button>
        </div>
      </div>
    </main>
  );
}
