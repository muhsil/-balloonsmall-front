"use client";

import React from 'react';
import Link from 'next/link';
import AccountNav from '@/components/account/AccountNav';
import PageHeader from '@/components/ui/PageHeader';
import { useAuthStore } from '@/store/useAuthStore';

interface AccountLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AccountLayout({ title, children }: AccountLayoutProps) {
  const { isLoggedIn, customer } = useAuthStore();

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-[#FFEBEE] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#E53935]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#191919] mb-2">Sign in to your account</h2>
          <p className="text-sm text-[#666] mb-6">
            Log in to view your orders, manage addresses, and update your account details.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/account/login" className="btn-primary py-3 text-sm font-semibold text-center">
              Sign In
            </Link>
            <Link href="/account/register" className="border border-gray-200 rounded-xl py-3 text-sm font-semibold text-[#333] hover:bg-gray-50 text-center transition-colors">
              Create Account
            </Link>
          </div>
          <Link href="/shop" className="text-sm text-[#999] hover:text-[#666] mt-4 inline-block">
            Continue shopping as guest
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 max-md:py-4">
      <PageHeader title={title} />
      {customer && (
        <p className="text-sm text-[#666] -mt-4 mb-4">
          Welcome, <span className="font-semibold text-[#191919]">{customer.firstName}</span>
        </p>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-2">
        <div className="lg:col-span-1 max-lg:order-2">
          <AccountNav />
        </div>
        <div className="lg:col-span-3 max-lg:order-1">
          {children}
        </div>
      </div>
    </div>
  );
}
