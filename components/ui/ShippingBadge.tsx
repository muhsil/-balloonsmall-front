import React from 'react';

interface ShippingBadgeProps {
  variant: 'free' | 'same-day' | 'fast';
}

const BADGE_ICONS = {
  free: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
  'same-day': <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  fast: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
};

const BADGE_CONFIG = {
  free: { text: 'Free Shipping', color: 'text-[#00B578]' },
  'same-day': { text: 'Same-Day Delivery', color: 'text-[#FF6D00]' },
  fast: { text: 'Fast Delivery', color: 'text-[#1976D2]' },
};

export default function ShippingBadge({ variant }: ShippingBadgeProps) {
  const config = BADGE_CONFIG[variant];
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${config.color}`}>
      {BADGE_ICONS[variant]}
      {config.text}
    </span>
  );
}
