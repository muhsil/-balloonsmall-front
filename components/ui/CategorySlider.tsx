"use client";

import Link from 'next/link';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PILL_ICONS } from '@/components/ui/CategoryIconPill';

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: { src: string } | null;
  count: number;
}

interface CategorySliderProps {
  categories: Category[];
}

const ICON_MAP: Record<string, string> = {
  birthday: 'birthday',
  wedding: 'wedding',
  'baby-shower': 'baby-shower',
  events: 'events',
  anniversary: 'anniversary',
  graduation: 'graduation',
};

export default function CategorySlider({ categories }: CategorySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="relative group">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-[#E53935] rounded-full" />
          <h2 className="text-base font-bold text-[#191919]">Shop by Category</h2>
        </div>
        <Link href="/shop" className="text-xs font-medium text-[#999] hover:text-[#E53935] transition-colors flex items-center gap-1">
          View All
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-gray-600 hover:text-[#E53935] hover:border-[#E53935]/20 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          className="flex gap-3 max-md:gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {/* All Categories Card */}
          <Link
            href="/shop"
            className="shrink-0 w-[130px] max-md:w-[100px] group/card"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-gradient-to-br from-[#E53935] to-[#C62828] flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all group-hover/card:-translate-y-0.5">
              <div className="w-10 h-10 max-md:w-8 max-md:h-8 rounded-full bg-white/20 flex items-center justify-center text-white mb-2">
                {PILL_ICONS.all}
              </div>
              <span className="text-white font-bold text-xs">All Products</span>
              <span className="text-white/70 text-[10px] mt-0.5">Browse all</span>
            </div>
          </Link>

          {/* Category Cards */}
          {categories.map((cat) => {
            const iconKey = ICON_MAP[cat.slug] || 'all';
            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="shrink-0 w-[130px] max-md:w-[100px] group/card"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#E53935]/20 transition-all group-hover/card:-translate-y-0.5">
                  {/* Category Image */}
                  {cat.image?.src ? (
                    <img
                      src={cat.image.src}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <span className="text-[#E53935] opacity-40 scale-150">
                        {PILL_ICONS[iconKey] || PILL_ICONS.all}
                      </span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 max-md:p-2">
                    <p className="text-white font-semibold text-xs max-md:text-[10px] leading-tight line-clamp-2">{cat.name}</p>
                    <p className="text-white/60 text-[10px] max-md:text-[9px] mt-0.5">{cat.count} items</p>
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-2 right-2 w-7 h-7 max-md:w-6 max-md:h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#E53935] shadow-sm">
                    <span className="scale-75">{PILL_ICONS[iconKey] || PILL_ICONS.all}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-gray-600 hover:text-[#E53935] hover:border-[#E53935]/20 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}
