"use client";

import { AddressSchema } from "@/validations/addressSchema";
import { useAddressForm } from "@/hooks/useAddressForm";
import SectionTitle from "../components/SectionTitle";
import useMercadoPago from "@/hooks/useMercadoPago";
import CartForm from "./components/CartForm";
import CartList from "./components/CartList";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import React from "react";

export default function CartPage() {
  const { cart } = useCart();

  // const router = useRouter();
  const { createMercadoPagoCheckout } = useMercadoPago();

  const {
    /*, cart, clearCart*/
  } = useCart();

  const { saveAddressToStorage } = useAddressForm();

  const handleSubmit = (data: AddressSchema) => {
    createMercadoPagoCheckout({
      payer: {
        name: data.customerName,
      },
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        unit_price: item.price,
        quantity: item.quantity,
        currency_id: "BRL",
        category: item.category,
      })),
    });

    saveAddressToStorage(data);
    /*
      sendWhatsappCheckoutNotification(data, cart);
      clearCart();
      router.push("/");
      */
  };

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
        <React.Fragment>
          <CartList />
          <CartForm onSubmit={handleSubmit} />
        </React.Fragment>
      )}
    </main>
  );
}
