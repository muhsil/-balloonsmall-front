import React from 'react';

interface ShippingBadgeProps {
  variant: 'free' | 'same-day' | 'fast';
}

const BADGE_CONFIG = {
  free: { icon: '🚚', text: 'Free Shipping', color: 'text-[#00B578]' },
  'same-day': { icon: '⚡', text: 'Same-Day Delivery', color: 'text-[#FF6D00]' },
  fast: { icon: '📦', text: 'Fast Delivery', color: 'text-[#1976D2]' },
};

export default function ShippingBadge({ variant }: ShippingBadgeProps) {
  const config = BADGE_CONFIG[variant];
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${config.color}`}>
      <span className="text-xs">{config.icon}</span>
      {config.text}
    </span>
  );
}
