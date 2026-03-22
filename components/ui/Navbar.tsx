"use client";
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useState, useEffect } from 'react';
import CartDrawer from '@/components/cart/CartDrawer';
import { ToastContainer } from '@/components/ui/Toast';

const NAV_LINKS = [
  { href: '/shop', label: 'All', icon: '🎈' },
  { href: '/shop?category=birthday', label: 'Birthday', icon: '🎂' },
  { href: '/shop?category=wedding', label: 'Wedding', icon: '💒' },
  { href: '/shop?category=baby-shower', label: 'Baby', icon: '👶' },
  { href: '/shop?category=events', label: 'Events', icon: '🎉' },
  { href: '/shop?category=graduation', label: 'Graduation', icon: '🎓' },
];

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
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
      {/* Main Header */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <span className="text-2xl">🎈</span>
            <span className="font-extrabold text-lg text-[#F26522] tracking-tight">BalloonsMall</span>
          </Link>

          {/* Desktop Search Bar */}
          <form method="GET" action="/shop" className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="flex w-full border-2 border-[#F26522] rounded-full overflow-hidden">
              <input
                name="search"
                placeholder="Search balloons, occasions..."
                className="flex-1 px-4 py-2 text-sm outline-none bg-white"
              />
              <button type="submit" className="bg-[#F26522] text-white px-5 font-bold text-sm hover:bg-[#D4520F] transition-colors">
                Search
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Cart */}
            <button onClick={() => setCartOpen(true)} className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#FF4747] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center min-w-[18px] min-h-[18px]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Desktop CTA */}
            <Link href="/shop" className="hidden md:inline-flex btn-primary text-sm py-2 px-4">
              Shop Now
            </Link>

            {/* Mobile hamburger */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Category Strip */}
        <div className="hidden md:block border-t border-gray-50 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 h-10">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} className="text-gray-600 hover:text-[#F26522] font-medium transition-colors text-sm whitespace-nowrap">
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
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-extrabold text-lg text-[#F26522]">Menu</span>
          <button onClick={() => setMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-50">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Search */}
        <form method="GET" action="/shop" className="p-4 border-b border-gray-100">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <input name="search" placeholder="Search..." className="flex-1 px-3 py-2.5 text-sm outline-none" />
            <button type="submit" className="bg-[#F26522] text-white px-3">
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
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 font-semibold text-sm hover:bg-[#FFF3EC] hover:text-[#F26522] transition-all active:scale-[0.98]"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 my-1" />
          <button
            onClick={() => { setMenuOpen(false); setCartOpen(true); }}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 font-semibold text-sm hover:bg-[#FFF3EC] hover:text-[#F26522] transition-all active:scale-[0.98] w-full text-left"
          >
            <span className="text-lg">🛒</span>
            Cart
            {cartCount > 0 && (
              <span className="ml-auto bg-[#FF4747] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        <div className="absolute bottom-8 left-3 right-3">
          <Link
            href="/shop"
            className="btn-primary w-full text-center text-sm py-3"
            onClick={() => setMenuOpen(false)}
          >
            Shop Now 🎈
          </Link>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <ToastContainer />
    </>
  );
}
