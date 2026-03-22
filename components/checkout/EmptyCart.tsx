"use client";

import React from 'react';
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="text-8xl mb-8 animate-bounce">🎈</div>
      <h1 className="text-2xl font-extrabold text-[#191919] mb-4">Your Cart is Empty</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        It looks like you haven&apos;t added any magic to your cart yet.
      </p>
      <Link href="/shop" className="btn-primary">
        Discover Balloons 🛍️
      </Link>
    </div>
  );
}
