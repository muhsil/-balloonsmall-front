"use client";

import React, { useState } from 'react';
import DealBadge from '@/components/ui/DealBadge';

interface ProductImageGalleryProps {
  images: { id: number; src: string }[];
  name: string;
  discount?: number;
  fallbackIcon?: string;
}

export default function ProductImageGallery({ images, name, discount, fallbackIcon = '🎈' }: ProductImageGalleryProps) {
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
          <span className="text-[100px] max-md:text-[70px]">{fallbackIcon}</span>
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
