"use client";

import React from 'react';
import QuantitySelector from './QuantitySelector';

interface CartItemCardProps {
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variantLabel?: string;
  variant?: 'drawer' | 'summary';
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
}

export default function CartItemCard({
  name,
  price,
  quantity,
  image,
  variantLabel,
  variant = 'drawer',
  onQuantityChange,
  onRemove,
}: CartItemCardProps) {
  const isSummary = variant === 'summary';

  return (
    <div className={`flex gap-3 ${isSummary ? 'group' : 'py-3 border-b border-gray-50'}`}>
      {image ? (
        <img
          src={image}
          alt={name}
          className={`w-14 h-14 rounded-lg object-cover flex-shrink-0 ${
            isSummary ? 'border border-gray-100' : ''
          }`}
        />
      ) : (
        <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 text-xl ${
          isSummary ? 'bg-gray-50 border border-gray-100' : 'bg-[#FFF3EC]'
        }`}>
          {'\u{1F388}'}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p className="font-bold text-gray-900 text-sm leading-tight truncate">
            {name}
          </p>
          <p className="font-bold text-sm whitespace-nowrap text-[#F26522]">
            AED {(price * quantity).toFixed(0)}
          </p>
        </div>
        {variantLabel && (
          <p className="text-xs mt-0.5 text-gray-400">
            {variantLabel}
          </p>
        )}
        <p className="text-gray-400 text-[10px] font-medium mt-1">
          AED {price.toFixed(0)} x {quantity}
        </p>
        {onQuantityChange && (
          <div className="mt-2">
            <QuantitySelector value={quantity} onChange={onQuantityChange} size="sm" />
          </div>
        )}
      </div>
      {onRemove && (
        <button
          onClick={onRemove}
          className="p-1 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 self-start"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
}
