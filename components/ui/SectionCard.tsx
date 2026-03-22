"use client";

import React from 'react';

interface SectionCardProps {
  icon?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionCard({ icon, title, children, className = '' }: SectionCardProps) {
  return (
    <div className={`bg-white p-5 max-md:p-4 rounded-xl border border-gray-100 ${className}`}>
      <div className="flex items-center gap-2 mb-4 max-md:mb-3">
        {icon && (
          <div className="w-8 h-8 bg-[#FFEBEE] text-[#E53935] rounded-lg flex items-center justify-center text-base font-bold">
            {icon}
          </div>
        )}
        <h3 className="text-base max-md:text-sm font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}
