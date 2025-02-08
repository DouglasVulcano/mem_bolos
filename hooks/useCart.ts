import { useCartStore } from "@/stores/useCartStore";
import { useMemo } from "react";

export function useCart() {
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();

  const handleIncrease = (productId: string) => {
    const product = cart.find((item) => item.id === productId);
    if (product) {
      addToCart(product, 1);
    }
  };

  const handleDecrease = (productId: string) => {
    const product = cart.find((item) => item.id === productId);
    if (product) {
      if (product.quantity > 1) {
        addToCart(product, -1);
      } else {
        removeFromCart(productId);
      }
    }
  };

  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  return {
    cart,
    handleIncrease,
    handleDecrease,
    removeFromCart,
    clearCart,
    totalPrice,
  };
}
