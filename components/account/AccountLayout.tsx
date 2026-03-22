"use client";

import React from 'react';
import AccountNav from '@/components/account/AccountNav';
import PageHeader from '@/components/ui/PageHeader';

interface AccountLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AccountLayout({ title, children }: AccountLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 max-md:py-4">
      <PageHeader title={title} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
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
