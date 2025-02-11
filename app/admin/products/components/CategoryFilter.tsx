"use client";

import { PlusCircle } from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddCategory: () => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      <select
        className="border p-3 rounded w-full md:w-auto bg-white shadow-sm text-gray-700"
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">Categorias</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        onClick={onAddCategory}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition"
      >
        <PlusCircle size={20} />
        Criar Categoria
      </button>
    </div>
  );
}
