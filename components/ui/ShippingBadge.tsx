import React from 'react';

interface ShippingBadgeProps {
  text?: string;
  variant?: 'free' | 'fast' | 'same-day';
}

const VARIANTS = {
  free: { bg: 'bg-[#E8F8F0]', text: 'text-[#00B578]', icon: '🚚', label: 'Free Shipping' },
  fast: { bg: 'bg-[#FFF8E6]', text: 'text-[#FF9F00]', icon: '⚡', label: 'Fast Delivery' },
  'same-day': { bg: 'bg-[#FFF3EC]', text: 'text-[#F26522]', icon: '🏃', label: 'Same-Day' },
};

export default function ShippingBadge({ text, variant = 'free' }: ShippingBadgeProps) {
  const style = VARIANTS[variant];
  return (
    <span className={`inline-flex items-center gap-1 ${style.bg} ${style.text} text-[10px] font-bold px-2 py-1 rounded`}>
      <span>{style.icon}</span>
      {text || style.label}
    </span>
  );
}
