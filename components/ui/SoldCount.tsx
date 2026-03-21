import React from 'react';

interface SoldCountProps {
  count: number;
  className?: string;
}

function formatCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K+`;
  if (count >= 100) return `${count}+`;
  return `${count}`;
}

export default function SoldCount({ count, className = '' }: SoldCountProps) {
  return (
    <span className={`text-[10px] text-gray-400 font-medium ${className}`}>
      {formatCount(count)} sold
    </span>
  );
}
