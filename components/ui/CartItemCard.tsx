"use client";

import React from 'react';
import QuantitySelector from './QuantitySelector';

interface CartItemCardProps {
  name: string;
  price: number;
  quantity: number;
  customText?: string;
  variant?: 'drawer' | 'summary';
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
}

export default function CartItemCard({
  name,
  price,
  quantity,
  customText,
  variant = 'drawer',
  onQuantityChange,
  onRemove,
}: CartItemCardProps) {
  const isSummary = variant === 'summary';
  const iconSize = isSummary
    ? 'w-16 h-16 max-md:w-12 max-md:h-12 text-2xl max-md:text-lg rounded-2xl max-md:rounded-xl'
    : 'w-16 h-16 max-md:w-12 max-md:h-12 text-3xl max-md:text-xl rounded-xl';

  return (
    <div className={`flex gap-4 max-md:gap-3 ${isSummary ? 'group' : 'py-4 border-b border-gray-50'}`}>
      <div className={`${iconSize} bg-gray-50 flex items-center justify-center flex-shrink-0 ${isSummary ? 'group-hover:scale-105 transition-transform border border-gray-100' : 'bg-violet-50'}`}>
        {'\u{1F388}'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p className={`font-bold text-gray-900 text-sm leading-tight truncate ${isSummary ? 'font-extrabold' : ''}`}>
            {name}
          </p>
          <p className={`font-bold text-sm whitespace-nowrap ${isSummary ? 'text-violet-600' : 'text-violet-600'}`}>
            AED {(price * quantity).toFixed(0)}
          </p>
        </div>
        {customText && (
          <p className={`text-xs mt-0.5 ${isSummary ? '' : 'text-gray-400'}`}>
            {isSummary ? (
              <span className="mt-2 text-[10px] bg-violet-50 text-violet-700 px-2 py-1.5 rounded-lg border border-violet-100/50 inline-block max-w-full italic">
                &quot;{customText}&quot;
              </span>
            ) : (
              <span>&quot;{customText}&quot;</span>
            )}
          </p>
        )}
        <p className="text-gray-400 text-xs font-medium mt-1">Qty: {quantity}</p>
        {onQuantityChange && (
          <div className="mt-2">
            <QuantitySelector value={quantity} onChange={onQuantityChange} size="sm" />
          </div>
        )}
      </div>
      {onRemove && (
        <button
          onClick={onRemove}
          className="p-1.5 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 self-start"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
}
