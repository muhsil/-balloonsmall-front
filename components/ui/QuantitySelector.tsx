"use client";

import React from 'react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
}: QuantitySelectorProps) {
  const btnSize = size === 'sm' ? 'w-7 h-7 text-sm' : 'w-10 h-10 text-lg';
  const textSize = size === 'sm' ? 'text-sm w-6' : 'text-xl w-8';

  return (
    <div className="flex items-center gap-3 max-md:gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`${btnSize} rounded-xl bg-gray-100 hover:bg-violet-100 text-gray-700 font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        &minus;
      </button>
      <span className={`${textSize} font-extrabold text-gray-900 text-center`}>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={`${btnSize} rounded-xl bg-gray-100 hover:bg-violet-100 text-gray-700 font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        +
      </button>
    </div>
  );
}
