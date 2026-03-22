import React from 'react';

interface SoldCountProps {
  count: number;
  className?: string;
}

export default function SoldCount({ count, className = '' }: SoldCountProps) {
  const formatted = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
  return (
    <span className={`text-[11px] text-[#999] ${className}`}>
      {formatted}+ sold
    </span>
  );
}
