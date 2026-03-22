"use client";

import React, { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { toast } from '@/components/ui/Toast';

interface StickyAddToCartProps {
  productId: number;
  name: string;
  price: number;
  image?: string;
}

export default function StickyAddToCart({ productId, name, price, image }: StickyAddToCartProps) {
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    addToCart({ id: productId, name, price, quantity: 1, image });
    toast(`Added ${name} to cart!`, 'success');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="md:hidden fixed bottom-14 left-0 right-0 z-70 bg-white border-t border-gray-100 px-3 py-2.5 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-gray-500 truncate">{name}</div>
          <div className="text-lg font-extrabold text-[#E53935]">AED {price.toFixed(0)}</div>
        </div>
        <button
          onClick={handleAdd}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shrink-0 ${
            added
              ? 'bg-[#00B578] text-white'
              : 'bg-[#E53935] text-white hover:bg-[#C62828] active:scale-[0.98]'
          }`}
        >
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
