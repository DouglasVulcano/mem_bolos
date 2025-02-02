import React from "react";

interface Product {
  id: string;
  title: string;
  sales: number;
}

interface TopProductsListProps {
  topProducts: Product[];
}

export default function TopProductsList({ topProducts }: TopProductsListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-sm font-medium text-gray-500 mb-4">Top 5 Produtos</h2>
      <div className="space-y-3">
        {topProducts.length > 0 ? (
          topProducts.map((product, index) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 w-6">
                  {index + 1}.
                </span>
                <span className="text-sm text-gray-600">{product.title}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {product.sales} unidades
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">
            Nenhum produto vendido neste período.
          </p>
        )}
      </div>
    </div>
  );
}
