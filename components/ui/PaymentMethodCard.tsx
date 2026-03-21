"use client";

import React from 'react';

interface PaymentMethodCardProps {
  selected?: boolean;
  onClick?: () => void;
}

export default function PaymentMethodCard({ selected = true, onClick }: PaymentMethodCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-5 max-md:p-4 rounded-2xl max-md:rounded-xl border-2 transition-all ${
        selected
          ? 'border-violet-600 bg-violet-50/50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-violet-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 max-md:w-8 max-md:h-8 rounded-xl max-md:rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-lg max-md:text-sm font-bold shadow-sm">
            💳
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm max-md:text-xs">Ziina Payment</p>
            <p className="text-xs max-md:text-[10px] text-gray-400">Credit/Debit Card &bull; Apple Pay &bull; Google Pay</p>
          </div>
        </div>
        {selected && (
          <div className="w-6 h-6 max-md:w-5 max-md:h-5 rounded-full bg-violet-600 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      <div className="mt-3 max-md:mt-2 flex items-center gap-2">
        <div className="flex -space-x-1">
          {['Visa', 'MC', 'AP'].map((brand) => (
            <div
              key={brand}
              className="w-8 h-5 max-md:w-6 max-md:h-4 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-[8px] max-md:text-[6px] font-bold text-gray-500"
            >
              {brand}
            </div>
          ))}
        </div>
        <span className="text-[10px] max-md:text-[9px] text-gray-400 font-medium">Secure checkout powered by Ziina</span>
      </div>
    </button>
  );
}
