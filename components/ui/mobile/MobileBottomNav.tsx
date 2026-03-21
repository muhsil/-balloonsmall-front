"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function ShopIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  );
}

function CartIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

function HeartIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function SupportIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const tabs: NavItem[] = [
    { href: '/', label: 'Home', icon: <HomeIcon active={false} />, activeIcon: <HomeIcon active={true} /> },
    { href: '/shop', label: 'Shop', icon: <ShopIcon active={false} />, activeIcon: <ShopIcon active={true} /> },
    { href: '/checkout', label: 'Cart', icon: <CartIcon active={false} />, activeIcon: <CartIcon active={true} /> },
    { href: '/shop?featured=true', label: 'Deals', icon: <HeartIcon active={false} />, activeIcon: <HeartIcon active={true} /> },
    { href: 'https://wa.me/971585501786', label: 'Support', icon: <SupportIcon active={false} />, activeIcon: <SupportIcon active={true} /> },
  ];

  return (
    <nav className="md:hidden mobile-bottom-nav">
      {tabs.map((tab) => {
        const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href.split('?')[0]);
        const isExternal = tab.href.startsWith('http');
        const Wrapper = isExternal ? 'a' : Link;
        const extraProps = isExternal ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {};

        return (
          <Wrapper
            key={tab.label}
            href={tab.href}
            {...extraProps}
            className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 relative transition-colors ${
              isActive ? 'text-[#F26522]' : 'text-gray-400'
            }`}
          >
            <div className="relative">
              {isActive ? tab.activeIcon : tab.icon}
              {tab.label === 'Cart' && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#FF4747] text-white text-[8px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5">
                  {cartCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-semibold ${isActive ? 'text-[#F26522]' : 'text-gray-400'}`}>
              {tab.label}
            </span>
          </Wrapper>
        );
      })}
    </nav>
  );
}
