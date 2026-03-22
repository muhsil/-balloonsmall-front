"use client";

import React from 'react';
import AccountLayout from '@/components/account/AccountLayout';
import Link from 'next/link';

const QUICK_LINKS = [
  { href: '/account/orders', label: 'My Orders', icon: '📦', desc: 'Track and manage your orders' },
  { href: '/account/addresses', label: 'Addresses', icon: '📍', desc: 'Manage shipping & billing addresses' },
  { href: '/account/details', label: 'Account Details', icon: '👤', desc: 'Update your personal information' },
  { href: '/account/wishlist', label: 'Wishlist', icon: '❤️', desc: 'View your saved items' },
];

export default function AccountPage() {
  return (
    <AccountLayout title="My Account">
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-[#191919] mb-1">Welcome back!</h2>
          <p className="text-sm text-[#666]">
            Manage your orders, addresses, and account settings from your dashboard.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-[#E53935]/20 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFEBEE] rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#191919]">{link.label}</h3>
                  <p className="text-xs text-[#999]">{link.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
}
