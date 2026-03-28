"use client";

import React from 'react';
import AccountLayout from '@/components/account/AccountLayout';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import EmptyState from '@/components/ui/EmptyState';
import Link from 'next/link';
import { toast } from '@/components/ui/Toast';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addToCart);

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
    toast(`${item.name} added to cart!`);
  };

  return (
    <AccountLayout title="My Wishlist">
      {items.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          message="Save items you love by tapping the heart icon on any product."
          actionLabel="Browse Products"
          actionHref="/shop"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
              <Link href={`/product/${item.slug}`} className="block">
                <div className="aspect-square bg-[#f5f5f5] overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-3">
                <Link href={`/product/${item.slug}`}>
                  <h3 className="text-sm text-[#191919] font-medium line-clamp-2 mb-2 hover:text-[#E53935] transition-colors">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-base font-bold text-[#191919] mb-3">
                  AED {item.price.toFixed(0)}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-[#E53935] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#C62828] transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-gray-400 hover:text-[#E53935] hover:border-[#E53935] transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AccountLayout>
  );
}
