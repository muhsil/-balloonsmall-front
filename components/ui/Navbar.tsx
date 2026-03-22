"use client";
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useEffect } from 'react';
import CartDrawer from '@/components/cart/CartDrawer';
import { ToastContainer } from '@/components/ui/Toast';

const NAV_LINKS = [
  { href: '/shop', label: 'All', icon: '🎈' },
  { href: '/shop?category=birthday', label: 'Birthday', icon: '🎂' },
  { href: '/shop?category=wedding', label: 'Wedding', icon: '💒' },
  { href: '/shop?category=baby-shower', label: 'Baby Shower', icon: '👶' },
  { href: '/shop?category=events', label: 'Events', icon: '🎉' },
  { href: '/shop?category=graduation', label: 'Graduation', icon: '🎓' },
];

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const authCustomer = useAuthStore((s) => s.customer);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* Top bar */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        {/* Main row */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center gap-3 h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <span className="text-xl">🎈</span>
            <span className="font-bold text-lg text-[#E53935] tracking-tight">BalloonsMall</span>
          </Link>

          {/* Desktop Search Bar */}
          <form method="GET" action="/shop" className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="flex w-full rounded-full overflow-hidden border border-[#e8e8e8] bg-[#f5f5f5] focus-within:border-[#E53935] transition-colors">
              <input
                name="search"
                placeholder="Search balloons, decorations..."
                className="flex-1 px-4 py-2 text-sm outline-none bg-transparent"
              />
              <button type="submit" className="bg-[#E53935] text-white px-4 hover:bg-[#C62828] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Wishlist */}
            <Link href="/account/wishlist" className="hidden md:flex relative p-2 rounded-full hover:bg-[#f5f5f5] transition-colors">
              <svg className="w-5 h-5 text-[#333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#E53935] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link href={isLoggedIn ? '/account' : '/account/login'} className="hidden md:flex items-center gap-1.5 p-2 rounded-full hover:bg-[#f5f5f5] transition-colors">
              <svg className="w-5 h-5 text-[#333]" fill={isLoggedIn ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {isLoggedIn && authCustomer && (
                <span className="text-xs font-medium text-[#333] max-w-[80px] truncate hidden lg:inline">{authCustomer.firstName}</span>
              )}
            </Link>

            {/* Cart */}
            <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-full hover:bg-[#f5f5f5] transition-colors">
              <svg className="w-5 h-5 text-[#333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#E53935] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Desktop Shop CTA */}
            <Link href="/shop" className="hidden md:inline-flex items-center gap-1 bg-[#E53935] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#C62828] transition-colors">
              Shop Now
            </Link>

            {/* Mobile hamburger */}
            <button className="md:hidden p-2 rounded-full hover:bg-[#f5f5f5] transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-5 h-5 text-[#333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Category Strip */}
        <div className="hidden md:block border-t border-[#f0f0f0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 h-9 overflow-x-auto no-scrollbar">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} className="text-[#333] hover:text-[#E53935] text-sm whitespace-nowrap transition-colors">
                  {link.icon} {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Mobile Slide-in Menu Panel */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-72 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-[#f0f0f0]">
          <span className="font-bold text-base text-[#E53935]">Menu</span>
          <button onClick={() => setMenuOpen(false)} className="p-2 rounded-full hover:bg-[#f5f5f5]">
            <svg className="w-5 h-5 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Search */}
        <form method="GET" action="/shop" className="p-4 border-b border-[#f0f0f0]">
          <div className="flex rounded-lg overflow-hidden bg-[#f5f5f5]">
            <input name="search" placeholder="Search..." className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent" />
            <button type="submit" className="bg-[#E53935] text-white px-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        <nav className="p-3 flex flex-col gap-0.5">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#333] text-sm hover:bg-[#FFEBEE] hover:text-[#E53935] transition-all"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <div className="border-t border-[#f0f0f0] my-1" />
          <button
            onClick={() => { setMenuOpen(false); setCartOpen(true); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#333] text-sm hover:bg-[#FFEBEE] hover:text-[#E53935] transition-all w-full text-left"
          >
            <span className="text-base">🛒</span>
            Cart
            {cartCount > 0 && (
              <span className="ml-auto bg-[#E53935] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        <div className="absolute bottom-8 left-3 right-3">
          <Link
            href="/shop"
            className="btn-primary w-full text-center text-sm py-2.5"
            onClick={() => setMenuOpen(false)}
          >
            Shop Now
          </Link>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <ToastContainer />
    </>
  );
}
