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
      <div className="w-10 h-10 flex-shrink-0 relative">
        <Image
          src={item.image}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div className="min-w-0">
          <h4 className="text-base sm:text-lg font-semibold leading-tight truncate">
            {item.title}
          </h4>
          <p className="font-bold text-pink-600 text-md">
            R$ {item.price.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 bg-gray-200 p-1 sm:p-2 rounded-lg">
            <button
              onClick={() => onDecrease(item.id)}
              className="p-1 sm:p-2 rounded-lg hover:bg-gray-300 transition-all"
            >
              <Minus size={14} className="sm:size-4" />
            </button>
            <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-lg">
              {item.quantity}
            </span>
            <button
              onClick={() => onIncrease(item.id)}
              className="p-1 sm:p-2 rounded-lg hover:bg-gray-300 transition-all"
            >
              <Plus size={14} className="sm:size-4" />
            </button>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
