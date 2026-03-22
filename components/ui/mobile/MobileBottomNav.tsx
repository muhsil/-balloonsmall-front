"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
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

function HeartIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function AccountIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
  const wishlistItems = useWishlistStore((s) => s.items);
  const wishlistCount = wishlistItems.length;
  const [menuOpen, setMenuOpen] = useState(false);

  const searchParams = useSearchParams();

  const isHome = pathname === '/';
  const isShop = pathname.startsWith('/shop');
  const isCart = pathname === '/checkout';
  const isWishlist = pathname === '/account/wishlist';
  const isAccount = pathname.startsWith('/account') && !isWishlist;
  const isMenu = ['/about', '/contact', '/faq', '/shipping', '/terms', '/privacy'].includes(pathname);

  return (
    <>
      {/* Bottom sheet menu overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-handle" />
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#f0f0f0]">
              <span className="font-bold text-[#191919] text-sm">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#f5f5f5] transition-colors"
              >
                <svg className="w-5 h-5 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors active:bg-[#f5f5f5] ${
                    pathname === link.href ? 'text-[#E53935] bg-[#FFEBEE]' : 'text-[#333]'
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-[#f0f0f0] mt-2 pt-2">
                <a
                  href="https://wa.me/971563554303"
                  className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-[#333] active:bg-[#f5f5f5]"
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

        <Link href="/account/wishlist" className={`mobile-nav-item ${isWishlist ? 'mobile-nav-active' : ''}`}>
          <div className="relative">
            <HeartIcon active={isWishlist} />
            {wishlistCount > 0 && (
              <span className="mobile-cart-badge">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </div>
          <span className="mobile-nav-label">Wishlist</span>
        </Link>

        <Link href="/account" className={`mobile-nav-item ${isAccount || isMenu || menuOpen ? 'mobile-nav-active' : ''}`}>
          <AccountIcon active={isAccount || isMenu || menuOpen} />
          <span className="mobile-nav-label">Account</span>
        </Link>
      </nav>
    </>
  );
}
