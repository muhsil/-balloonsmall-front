"use client";

import React from 'react';
import { CartItem } from '@/store/useCartStore';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
}

export default function OrderSummary({ items, subtotal }: OrderSummaryProps) {
  return (
    <div className="bg-white p-8 max-md:p-5 rounded-[2rem] max-md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-violet-50 rounded-bl-[4rem] -z-10 opacity-50" />

      <h3 className="text-xl max-md:text-lg font-black text-gray-900 mb-8 max-md:mb-5 flex items-center gap-2">
        Order Summary <span className="text-violet-600">({items.length})</span>
      </h3>

      <div className="space-y-6 max-md:space-y-4 mb-10 max-md:mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-4 group">
            <div className="w-16 h-16 max-md:w-12 max-md:h-12 bg-gray-50 rounded-2xl max-md:rounded-xl flex items-center justify-center text-2xl max-md:text-lg flex-shrink-0 group-hover:scale-105 transition-transform border border-gray-100">
              🎈
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <p className="font-extrabold text-gray-900 text-sm leading-tight truncate">
                  {item.name}
                </p>
                <p className="font-bold text-violet-600 text-sm whitespace-nowrap">
                  AED {item.price * item.quantity}
                </p>
              </div>
              <p className="text-gray-400 text-xs font-medium mt-1">
                Quantity: {item.quantity}
              </p>
              {item.customText && (
                <div className="mt-2 text-[10px] bg-violet-50 text-violet-700 px-2 py-1.5 rounded-lg border border-violet-100/50 inline-block max-w-full italic">
                  &quot;{item.customText}&quot;
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-6 border-t border-dashed border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-bold uppercase tracking-wider">Subtotal</span>
          <span className="text-gray-900 font-bold">AED {subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-bold uppercase tracking-wider">Delivery</span>
          <span className="text-green-500 font-bold">FREE</span>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-gray-900 font-black text-lg">Total</span>
          <span className="text-3xl max-md:text-2xl font-black gradient-text">AED {subtotal}</span>
        </div>
      </div>

      <div className="mt-8 flex gap-2">
        <input
          type="text"
          placeholder="Promo code"
          className="form-input text-xs py-2 bg-gray-50/50 border-gray-100"
        />
        <button className="text-xs font-bold text-violet-600 border border-violet-100 px-4 rounded-xl hover:bg-violet-50">
          Apply
        </button>
      </div>
    </div>
  );
}
