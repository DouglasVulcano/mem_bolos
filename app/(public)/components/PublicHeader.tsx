"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import Link from "next/link";

export function PublicHeader() {
  const { totalItems, validateCart } = useCartStore();
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    validateCart();
    setClientReady(true);
  }, [validateCart]);

  return (
    <header className="bg-orange-100 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div></div> {/* Espaço vazio para alinhamento correto */}
        {/* Ícone do Carrinho */}
        <div className="relative">
          <Link href="/cart">
            {" "}
            {/* Adicione o Link aqui */}
            <button className="flex items-center space-x-2 hover:bg-orange-200 p-2 rounded-full transition">
              <div className="w-10 h-10 rounded-full bg-orange-900 flex items-center justify-center shadow-md relative">
                <ShoppingCart className="h-6 w-6 text-white" />

                {/* Renderizar contador somente no cliente */}
                {clientReady && totalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems()}
                  </span>
                )}
              </div>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
