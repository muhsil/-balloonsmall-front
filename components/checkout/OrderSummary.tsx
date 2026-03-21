"use client";

import React from 'react';
import { CartItem } from '@/store/useCartStore';
import CartItemCard from '@/components/ui/CartItemCard';
import PriceDisplay from '@/components/ui/PriceDisplay';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
}

export default function OrderSummary({ items, subtotal }: OrderSummaryProps) {
  return (
    <div className="bg-white p-5 max-md:p-4 rounded-xl border border-gray-100">
      <h3 className="text-base font-extrabold text-gray-900 mb-4 flex items-center gap-2">
        Order Summary <span className="text-[#F26522]">({items.length})</span>
      </h3>

      <div className="space-y-3 mb-4 max-h-[40vh] overflow-y-auto pr-1">
        {items.map((item, idx) => (
          <CartItemCard
            key={idx}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            customText={item.customText}
            variant="summary"
          />
        ))}
      </div>

      <div className="space-y-2.5 pt-4 border-t border-dashed border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-medium">Subtotal</span>
          <span className="text-gray-900 font-bold">AED {subtotal.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-medium">Delivery</span>
          <span className="text-[#00B578] font-bold">FREE</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-gray-900 font-extrabold text-base">Total</span>
          <PriceDisplay amount={subtotal} size="xl" />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Promo code"
          className="form-input text-xs py-2 bg-gray-50 border-gray-100"
        />
        <button className="text-xs font-bold text-[#F26522] border border-[#F26522]/20 px-4 rounded-lg hover:bg-[#FFF3EC]">
          Apply
        </button>
      </div>
    </div>
  );
}
