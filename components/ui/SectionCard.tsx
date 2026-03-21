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
    <div className={`bg-white p-8 md:p-10 max-md:p-5 rounded-[2rem] max-md:rounded-2xl shadow-sm border border-gray-100 animate-in fade-in duration-500 ${className}`}>
      <div className="flex items-center gap-3 max-md:gap-2 mb-8 max-md:mb-5">
        {icon && (
          <div className="w-10 h-10 max-md:w-8 max-md:h-8 bg-violet-50 text-violet-600 rounded-xl max-md:rounded-lg flex items-center justify-center text-xl max-md:text-base font-bold">
            {icon}
          </div>
        )}
        <h3 className="text-2xl max-md:text-lg font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}
