"use client";

import { Trash, Plus, Minus } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  item: {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
  };
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-sm">
      {/* Ícone da Imagem do Produto */}
      <div className="w-12 h-12 flex-shrink-0 relative">
        <Image
          src={item.image}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>

      {/* Informações do Produto */}
      <div className="flex-1 flex items-center justify-between">
        <div className="min-w-0">
          <h4 className="text-lg font-semibold leading-tight">{item.title}</h4>
          <p className="text-gray-500 text-sm">R$ {item.price.toFixed(2)}</p>
        </div>

        {/* Controles de Quantidade */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-lg">
            <button
              onClick={() => onDecrease(item.id)}
              className="p-2 rounded-lg hover:bg-gray-300 transition-all"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-semibold text-lg">
              {item.quantity}
            </span>
            <button
              onClick={() => onIncrease(item.id)}
              className="p-2 rounded-lg hover:bg-gray-300 transition-all"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Remover Item */}
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
