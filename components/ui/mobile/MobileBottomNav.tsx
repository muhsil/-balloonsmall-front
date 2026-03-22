"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function CategoryIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function CartIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

function DealsIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 1.8} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

function MenuIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 1.8} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

const MENU_LINKS = [
  { href: '/about', label: 'About Us', icon: '📖' },
  { href: '/contact', label: 'Contact', icon: '📞' },
  { href: '/faq', label: 'FAQ', icon: '❓' },
  { href: '/shipping', label: 'Shipping', icon: '🚚' },
  { href: '/terms', label: 'Terms', icon: '📋' },
  { href: '/privacy', label: 'Privacy', icon: '🔒' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === '/';
  const isShop = pathname.startsWith('/shop');
  const isCart = pathname === '/checkout';
  const isMenu = ['/about', '/contact', '/faq', '/shipping', '/terms', '/privacy'].includes(pathname);

  return (
    <>
      {/* Bottom sheet menu overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-handle" />
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-sm">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="py-2 max-h-[50vh] overflow-y-auto">
              {MENU_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors active:bg-gray-50 ${
                    pathname === link.href ? 'text-[#F26522] bg-[#FFF3EC]' : 'text-gray-700'
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <a
                  href="https://wa.me/971563554303"
                  className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-gray-700 active:bg-gray-50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-base">💬</span>
                  WhatsApp Support
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Bottom Nav Bar */}
      <nav className="mobile-bottom-nav">
        <Link href="/" className={`mobile-nav-item ${isHome ? 'mobile-nav-active' : ''}`}>
          <HomeIcon active={isHome} />
          <span className="mobile-nav-label">Home</span>
        </Link>

        <Link href="/shop" className={`mobile-nav-item ${isShop ? 'mobile-nav-active' : ''}`}>
          <CategoryIcon active={isShop} />
          <span className="mobile-nav-label">Shop</span>
        </Link>

        <Link href="/checkout" className={`mobile-nav-item ${isCart ? 'mobile-nav-active' : ''}`}>
          <div className="relative">
            <CartIcon active={isCart} />
            {cartCount > 0 && (
              <span className="mobile-cart-badge">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="mobile-nav-label">Cart</span>
        </Link>

        <Link href="/shop?featured=true" className="mobile-nav-item">
          <DealsIcon active={false} />
          <span className="mobile-nav-label">Deals</span>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`mobile-nav-item ${isMenu || menuOpen ? 'mobile-nav-active' : ''}`}
        >
          <MenuIcon active={isMenu || menuOpen} />
          <span className="mobile-nav-label">Menu</span>
        </button>
      </nav>
    </>
  );
}
