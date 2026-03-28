"use client";

import React from 'react';
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8 animate-bounce text-gray-300"><svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg></div>
      <h1 className="text-2xl font-extrabold text-[#191919] mb-4">Your Cart is Empty</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        It looks like you haven&apos;t added any magic to your cart yet.
      </p>
      <Link href="/shop" className="btn-primary">
        Discover Balloons
      </Link>
    </div>
  );
}
