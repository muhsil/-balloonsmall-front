"use client";

import React from 'react';
import { useWishlistStore, WishlistItem } from '@/store/useWishlistStore';

interface WishlistButtonProps {
  item: WishlistItem;
  size?: 'sm' | 'md';
  className?: string;
}

export default function WishlistButton({ item, size = 'md', className = '' }: WishlistButtonProps) {
  const { isInWishlist, toggleItem } = useWishlistStore();
  const active = isInWishlist(item.id);

  const sizeClass = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(item);
      }}
      className={`${sizeClass} rounded-full flex items-center justify-center transition-all ${
        active
          ? 'bg-red-50 text-[#E53935]'
          : 'bg-white/80 text-gray-400 hover:text-[#E53935] hover:bg-red-50'
      } shadow-sm backdrop-blur-sm ${className}`}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg
        className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={active ? 0 : 2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
