import React from 'react';

interface DealBadgeProps {
  text: string;
  variant?: 'red' | 'orange' | 'green';
}

const VARIANT_CLASSES: Record<string, string> = {
  red: 'bg-[#E53935] text-white',
  orange: 'bg-[#FF6D00] text-white',
  green: 'bg-[#00B578] text-white',
};

export default function DealBadge({ text, variant = 'red' }: DealBadgeProps) {
  return (
    <span className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${VARIANT_CLASSES[variant]}`}>
      {text}
    </span>
  );
}
