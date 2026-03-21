"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import React from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  matchPaths: string[];
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-violet-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function ShopIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-violet-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function CartIcon({ active, count }: { active: boolean; count: number }) {
  return (
    <div className="relative">
      <svg className={`w-6 h-6 ${active ? 'text-violet-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-gradient-to-br from-violet-500 to-pink-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </div>
  );
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-violet-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 2.5 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'Home',
      icon: <HomeIcon active={pathname === '/'} />,
      matchPaths: ['/'],
    },
    {
      href: '/shop',
      label: 'Shop',
      icon: <ShopIcon active={pathname.startsWith('/shop') || pathname.startsWith('/product')} />,
      matchPaths: ['/shop', '/product'],
    },
    {
      href: '/checkout',
      label: 'Cart',
      icon: <CartIcon active={pathname === '/checkout'} count={cartCount} />,
      matchPaths: ['/checkout'],
    },
    {
      href: 'https://wa.me/971500000000',
      label: 'Support',
      icon: <UserIcon active={false} />,
      matchPaths: [],
    },
  ];

  const isActive = (item: NavItem) => {
    return item.matchPaths.some((path) =>
      path === '/' ? pathname === '/' : pathname.startsWith(path)
    );
  };

  return (
    <nav className="mobile-bottom-nav md:hidden">
      {navItems.map((item) => {
        const active = isActive(item);
        const isExternal = item.href.startsWith('http');

        const content = (
          <div className="flex flex-col items-center gap-0.5 pt-1">
            {item.icon}
            <span
              className={`text-[10px] font-semibold ${
                active ? 'text-violet-600' : 'text-gray-400'
              }`}
            >
              {item.label}
            </span>
            {active && (
              <div className="w-1 h-1 rounded-full bg-violet-600 mt-0.5" />
            )}
          </div>
        );

        if (isExternal) {
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex justify-center"
            >
              {content}
            </a>
          );
        }

        return (
          <Link key={item.href} href={item.href} className="flex-1 flex justify-center">
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
