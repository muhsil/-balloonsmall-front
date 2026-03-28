"use client";

import Link from 'next/link';
import React from 'react';

interface PromoBannerProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  bgColor?: string;
  discount?: string;
}

export default function PromoBanner({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  bgColor = 'bg-gradient-to-r from-[#E53935] to-[#EF5350]',
  discount,
}: PromoBannerProps) {
  return (
    <div className={`${bgColor} rounded-xl max-md:rounded-lg overflow-hidden relative`}>
      <div className="px-6 py-8 max-md:px-4 max-md:py-4 relative z-10">
        {discount && (
          <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded mb-2">
            {discount}
          </span>
        )}
        <h3 className="text-white font-extrabold text-2xl max-md:text-lg mb-1.5">{title}</h3>
        <p className="text-white/80 text-sm max-md:text-xs mb-4 max-w-md">{subtitle}</p>
        <Link
          href={ctaHref}
          className="inline-flex bg-white text-[#E53935] font-bold text-sm max-md:text-xs px-4 py-2 rounded-full hover:shadow-lg transition-all"
        >
          {ctaLabel}
        </Link>
      </div>
      <div className="absolute top-0 right-0 w-32 h-full opacity-20">
        <svg className="absolute top-4 right-4 w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
        <svg className="absolute bottom-4 right-10 w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
      </div>
    </div>
  );
}
