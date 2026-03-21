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
      className={`w-full text-left p-4 max-md:p-3 rounded-lg border-2 transition-all ${
        selected
          ? 'border-[#F26522] bg-[#FFF3EC]'
          : 'border-gray-200 bg-white hover:border-[#F26522]/30'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 max-md:w-8 max-md:h-8 rounded-lg bg-gradient-to-br from-[#F26522] to-[#FF4747] flex items-center justify-center text-white text-base max-md:text-sm font-bold">
            💳
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm max-md:text-xs">Ziina Payment</p>
            <p className="text-[10px] text-gray-400">Card &bull; Apple Pay &bull; Google Pay</p>
          </div>
        </div>
        {selected && (
          <div className="w-5 h-5 rounded-full bg-[#F26522] flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex -space-x-1">
          {['Visa', 'MC', 'AP'].map((brand) => (
            <div
              key={brand}
              className="w-7 h-4 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-[7px] font-bold text-gray-500"
            >
              {brand}
            </div>
          ))}
        </div>
        <span className="text-[9px] text-gray-400 font-medium">Secure checkout by Ziina</span>
      </div>
    </button>
  );
}
