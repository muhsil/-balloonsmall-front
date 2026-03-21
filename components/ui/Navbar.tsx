"use client";
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';
import CartDrawer from '@/components/cart/CartDrawer';
import { ToastContainer } from '@/components/ui/Toast';

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="glass sticky top-0 z-50 border-b border-white/60" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between" style={{ height: '72px' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl group-hover:scale-110 transition-transform">🎈</span>
            <div>
              <span className="font-extrabold text-xl gradient-text tracking-tight">BalloonsMall</span>
              <div className="text-[10px] text-gray-400 font-medium tracking-widest uppercase -mt-0.5">Dubai's Premium Balloons</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: '/shop', label: 'Shop' },
              { href: '/shop?category=birthday', label: 'Birthday' },
              { href: '/shop?category=wedding', label: 'Wedding' },
              { href: '/shop?category=events', label: 'Events' },
            ].map(link => (
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

            <button className="md:hidden p-2 rounded-xl hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3">
            {['Shop', 'Birthday', 'Wedding', 'Events'].map(label => (
              <Link key={label} href={`/shop${label !== 'Shop' ? `?category=${label.toLowerCase()}` : ''}`}
                className="text-gray-700 font-medium py-2" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <button onClick={() => { setMenuOpen(false); setCartOpen(true); }}
              className="text-gray-700 font-medium py-2 text-left">
              🛒 Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      
      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
}
