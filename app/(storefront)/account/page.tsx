"use client";

import React from 'react';
import AccountLayout from '@/components/account/AccountLayout';
import Link from 'next/link';

const ACCOUNT_ICONS: Record<string, React.ReactNode> = {
  orders: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  addresses: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  details: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  wishlist: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
};

const QUICK_LINKS = [
  { href: '/account/orders', label: 'My Orders', key: 'orders', desc: 'Track and manage your orders' },
  { href: '/account/addresses', label: 'Addresses', key: 'addresses', desc: 'Manage shipping & billing addresses' },
  { href: '/account/details', label: 'Account Details', key: 'details', desc: 'Update your personal information' },
  { href: '/account/wishlist', label: 'Wishlist', key: 'wishlist', desc: 'View your saved items' },
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
                <div className="w-10 h-10 bg-[#FFEBEE] rounded-lg flex items-center justify-center text-[#E53935] group-hover:scale-110 transition-transform">
                  {ACCOUNT_ICONS[link.key]}
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
