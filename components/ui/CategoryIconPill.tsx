import Link from 'next/link';
import React from 'react';

interface CategoryIconPillProps {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}

export default function CategoryIconPill({ icon, label, href, active }: CategoryIconPillProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 shrink-0 min-w-[56px] px-2 py-1.5 rounded-lg transition-colors ${
        active
          ? 'bg-[#FFEBEE] text-[#E53935]'
          : 'text-[#666] hover:bg-[#f5f5f5]'
      }`}
    >
      <span className="text-xl max-md:text-lg">{icon}</span>
      <span className="text-[10px] font-medium whitespace-nowrap">{label}</span>
    </Link>
  );
}
