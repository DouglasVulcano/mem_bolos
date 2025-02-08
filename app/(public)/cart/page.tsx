"use client";

import SectionTitle from "../components/SectionTitle";
import CartAddress from "./components/CartAddress";
import CartList from "./components/CartList";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <main className="min-h-screen bg-white p-6">
      <SectionTitle title="Meu Carrinho" bgColor={"LightCoral"} margin={"0"} />
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          <p className="text-gray-500 text-lg">Seu carrinho está vazio.</p>
          <Link href="/">
            <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-all active:scale-95">
              Continuar comprando
            </button>
          </Link>
        </div>
      ) : (
        <>
          <CartList />
          <CartAddress />
        </>
      )}
    </main>
  );
}
