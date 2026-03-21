import React from 'react';

interface StatBadgeProps {
  value: string;
  label: string;
}

export default function StatBadge({ value, label }: StatBadgeProps) {
  return (
    <div>
      <div className="text-2xl max-md:text-xl font-extrabold gradient-text">{value}</div>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
    </div>
  );
}
