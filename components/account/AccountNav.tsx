"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from '@/components/ui/Toast';

const NAV_ITEMS = [
  { href: '/account', label: 'Dashboard', icon: '📊' },
  { href: '/account/orders', label: 'Orders', icon: '📦' },
  { href: '/account/addresses', label: 'Addresses', icon: '📍' },
  { href: '/account/details', label: 'Account Details', icon: '👤' },
  { href: '/account/wishlist', label: 'Wishlist', icon: '❤️' },
];

export default function AccountNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { customer, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast('You have been logged out');
    router.push('/');
  };

  return (
    <nav className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-bold text-[#191919] text-sm">My Account</h2>
        {customer && (
          <p className="text-xs text-[#666] mt-0.5 truncate">{customer.email}</p>
        )}
      </div>
      <div className="flex flex-col">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-gray-50 ${
                isActive
                  ? 'bg-[#FFEBEE] text-[#E53935] font-semibold'
                  : 'text-[#333] hover:bg-gray-50'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-sm text-[#999] hover:text-[#E53935] hover:bg-[#FFEBEE] transition-colors w-full text-left"
        >
          <span className="text-base">🚪</span>
          Logout
        </button>
      </div>
    </nav>
  );
}
