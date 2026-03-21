import React from 'react';

interface DealBadgeProps {
  text: string;
  variant?: 'red' | 'orange' | 'green';
  size?: 'sm' | 'md';
}

const VARIANT_STYLES = {
  red: 'bg-[#FF4747] text-white',
  orange: 'bg-[#F26522] text-white',
  green: 'bg-[#00B578] text-white',
};

export default function DealBadge({ text, variant = 'red', size = 'sm' }: DealBadgeProps) {
  const sizeClass = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-1';
  return (
    <span className={`inline-flex items-center font-bold rounded-sm ${VARIANT_STYLES[variant]} ${sizeClass}`}>
      {text}
    </span>
  );
}
