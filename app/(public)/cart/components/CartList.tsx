"use client";

import { useCart } from "@/hooks/useCart";
import CartItem from "./CartItem";

export default function CartList() {
  const { cart, handleIncrease, handleDecrease, removeFromCart } = useCart();

  return (
    <div className="space-y-4">
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={removeFromCart}
        />
      ))}
    </div>
  );
}
