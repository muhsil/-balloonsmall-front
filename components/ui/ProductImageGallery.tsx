"use client";

import React, { useState } from 'react';
import DealBadge from '@/components/ui/DealBadge';

interface ProductImageGalleryProps {
  images: { id: number; src: string }[];
  name: string;
  discount?: number;
  fallbackIcon?: string;
}

export default function ProductImageGallery({ images, name, discount }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = images && images.length > 0;
  const activeSrc = hasImages ? images[activeIndex]?.src : null;

  return (
    <div className="max-md:mb-0">
      {/* Main Image */}
      <div className="rounded-2xl max-md:rounded-none overflow-hidden bg-gray-50 aspect-square flex items-center justify-center relative">
        {activeSrc ? (
          <img src={activeSrc} alt={name} className="w-full h-full object-cover" />
        ) : (
          <svg className="w-24 h-24 max-md:w-16 max-md:h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        )}
        {discount !== undefined && discount > 0 && (
          <div className="absolute top-3 left-3 max-md:top-2 max-md:left-2">
            <DealBadge text={`-${discount}%`} variant="red" />
          </div>
        )}
        {/* Image counter */}
        {hasImages && images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            {activeIndex + 1}/{images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {hasImages && images.length > 1 && (
        <div className="flex gap-2 mt-3 max-md:mt-2 px-0 max-md:px-3 overflow-x-auto no-scrollbar">
          {images.slice(0, 6).map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(idx)}
              className={`w-16 h-16 max-md:w-14 max-md:h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                idx === activeIndex
                  ? 'border-[#E53935] ring-1 ring-[#E53935]/30'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img src={img.src} alt={`${name} ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
