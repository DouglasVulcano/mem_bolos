import { Product } from "@/types/Product";

export const handleShare = async (product: Product) => {
  const url = `${window.location.origin}/prod/${product.id}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: product.title, url });
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  } else {
    navigator.clipboard.writeText(url);
  }
};
