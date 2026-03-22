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
        <div className="absolute top-2 right-2 text-6xl">🎈</div>
        <div className="absolute bottom-2 right-8 text-4xl">🎉</div>
      </div>
    </div>
  );
}
