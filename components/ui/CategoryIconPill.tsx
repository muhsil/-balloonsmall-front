import Link from 'next/link';
import React from 'react';

interface CategoryIconPillProps {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
}

export default function CategoryIconPill({ icon, label, href, active = false }: CategoryIconPillProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 min-w-[60px] max-md:min-w-[56px] py-2 transition-all ${
        active ? 'text-[#F26522]' : 'text-gray-600 hover:text-[#F26522]'
      }`}
    >
      <div className={`w-12 h-12 max-md:w-10 max-md:h-10 rounded-full flex items-center justify-center text-xl max-md:text-lg ${
        active ? 'bg-[#FFF3EC] ring-2 ring-[#F26522]' : 'bg-gray-50'
      }`}>
        {icon}
      </div>
      <span className={`text-[10px] font-semibold whitespace-nowrap ${active ? 'text-[#F26522]' : 'text-gray-600'}`}>
        {label}
      </span>
    </Link>
  );
}
