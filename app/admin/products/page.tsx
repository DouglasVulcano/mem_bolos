"use client";

import { Plus } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/Product";
import { useState } from "react";
import { CategoryFilter } from "./components/CategoryFilter";
import { CategoryList } from "./components/CategoryList";
import { ProductCard } from "./components/ProductCard";

export default function ProductsPage() {
  const { groupedProducts } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = Object.keys(groupedProducts);

  const handleAddCategory = () =>
    alert("Funcionalidade de criar categoria ainda não implementada!");
  const handleAddProduct = (category: string) =>
    alert(`Adicionar novo produto na categoria: ${category}`);
  const handleEditProduct = (product: Product) =>
    alert(`Editar produto: ${product.title}`);
  const handleDeleteProduct = (productId: string) =>
    alert(`Deletar produto com ID: ${productId}`);

  return (
    <>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddCategory={handleAddCategory}
      />

      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {categories
        .filter(
          (category) => !selectedCategory || category === selectedCategory
        )
        .map((category) => (
          <div key={category} className="mb-6">
            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {category}
              </h2>
              <button
                onClick={() => handleAddProduct(category)}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md transition"
              >
                <Plus size={22} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              {groupedProducts[category].map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
        ))}
    </>
  );
}
