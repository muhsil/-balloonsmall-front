"use client";
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useState, useEffect } from 'react';
import CartDrawer from '@/components/cart/CartDrawer';
import { ToastContainer } from '@/components/ui/Toast';

const NAV_LINKS = [
  { href: '/shop', label: 'Shop', icon: '🛍️' },
  { href: '/shop?category=birthday', label: 'Birthday', icon: '🎂' },
  { href: '/shop?category=wedding', label: 'Wedding', icon: '💒' },
  { href: '/shop?category=events', label: 'Events', icon: '🎉' },
];

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Lock body scroll when mobile menu is open
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
      <header className="glass sticky top-0 z-50 border-b border-white/60" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between" style={{ height: '72px' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl max-md:text-2xl group-hover:scale-110 transition-transform">🎈</span>
            <div>
              <span className="font-extrabold text-xl max-md:text-lg gradient-text tracking-tight">BalloonsMall</span>
              <div className="text-[10px] max-md:text-[8px] text-gray-400 font-medium tracking-widest uppercase -mt-0.5">Dubai&apos;s Premium Balloons</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} className="text-gray-600 hover:text-violet-600 font-medium transition-colors text-sm relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 rounded-full group-hover:w-full transition-all" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <button onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-xl hover:bg-violet-50 transition-colors group">
              <svg className="w-6 h-6 text-gray-700 group-hover:text-violet-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-violet-500 to-pink-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            <Link href="/shop" className="hidden md:inline-flex btn-primary text-sm py-2.5 px-5">
              Shop Now ✨
            </Link>

            {/* Mobile hamburger */}
            <button className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile Slide-in Menu Panel */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-72 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <span className="font-extrabold text-lg gradient-text">Menu</span>
          <button onClick={() => setMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4 flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-700 font-semibold text-sm hover:bg-violet-50 hover:text-violet-600 transition-all active:scale-[0.98]"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 my-2" />
          <button
            onClick={() => { setMenuOpen(false); setCartOpen(true); }}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-700 font-semibold text-sm hover:bg-violet-50 hover:text-violet-600 transition-all active:scale-[0.98] w-full text-left"
          >
            <span className="text-lg">🛒</span>
            Cart
            {cartCount > 0 && (
              <span className="ml-auto bg-violet-100 text-violet-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
        <div className="absolute bottom-8 left-4 right-4">
          <Link
            href="/shop"
            className="btn-primary w-full text-center text-sm py-3"
            onClick={() => setMenuOpen(false)}
          >
            Shop Now ✨
          </Link>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      
      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
}
