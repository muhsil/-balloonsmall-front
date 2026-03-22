"use client";

import React from 'react';
import { useStoreSettings } from '@/components/providers/StoreSettingsProvider';

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCurrency?: boolean;
  originalAmount?: number | null;
  onSale?: boolean;
}

export default function PriceDisplay({
  amount,
  currency: currencyProp,
  size = 'md',
  showCurrency = true,
  originalAmount,
  onSale,
}: PriceDisplayProps) {
  const settings = useStoreSettings();
  const currency = currencyProp || settings.currency;
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl max-md:text-2xl',
  };

  return (
    <div className="flex items-baseline gap-2">
      <span className={`${sizeClasses[size]} font-extrabold text-[#E53935]`}>
        {showCurrency && `${currency} `}{amount.toFixed(0)}
      </span>
      {onSale && originalAmount && (
        <span className="text-gray-400 text-sm line-through">
          {showCurrency && `${currency} `}{originalAmount.toFixed(0)}
        </span>
      )}
    </div>
  );
}
