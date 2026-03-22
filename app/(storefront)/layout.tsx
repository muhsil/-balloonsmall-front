import Navbar from '@/components/ui/Navbar';
import WhatsAppFab from '@/components/ui/WhatsAppFab';
import MobileBottomNav from '@/components/ui/mobile/MobileBottomNav';
import Link from 'next/link';
import { Suspense } from 'react';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Navbar />

      <main className="flex-1 mobile-body-padding">{children}</main>

      {/* Footer - Desktop */}
      <footer className="bg-white border-t border-[#f0f0f0] max-md:hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎈</span>
                <span className="font-bold text-lg text-[#E53935]">BalloonsMall</span>
              </Link>
              <p className="text-[#999] text-sm leading-relaxed">
                Dubai&apos;s premium balloon delivery service. Making celebrations unforgettable with beautiful balloon arrangements.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-[#191919] text-sm mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Shop All', href: '/shop' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'FAQ', href: '/faq' },
                  { label: 'Shipping & Delivery', href: '/shipping' },
                ].map(link => (
                  <Link key={link.href} href={link.href} className="text-[#666] text-sm hover:text-[#E53935] transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-[#191919] text-sm mb-3">Contact Us</h4>
              <div className="flex flex-col gap-2 text-[#666] text-sm">
                <span>📍 Dubai, UAE</span>
                <a href="https://wa.me/971563554303" className="hover:text-[#E53935] transition-colors">💬 WhatsApp Support</a>
                <a href="mailto:hello@balloonsmall.com" className="hover:text-[#E53935] transition-colors">📧 hello@balloonsmall.com</a>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <h4 className="font-bold text-[#191919] text-sm">Legal</h4>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Terms & Conditions', href: '/terms' },
                    { label: 'Privacy Policy', href: '/privacy' },
                  ].map(link => (
                    <Link key={link.href} href={link.href} className="text-[#666] text-sm hover:text-[#E53935] transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#f0f0f0] mt-10 pt-6 text-center">
            <p className="text-[#999] text-xs">&copy; {new Date().getFullYear()} BalloonsMall. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Footer - compact */}
      <footer className="md:hidden bg-white border-t border-[#f0f0f0] mb-14 px-4 py-4">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 mb-2">
            <span className="text-lg">🎈</span>
            <span className="font-bold text-sm text-[#E53935]">BalloonsMall</span>
          </Link>
          <p className="text-[#999] text-[10px] mb-2">Dubai&apos;s Premium Balloon Delivery</p>
          <div className="flex items-center justify-center gap-3 text-xs text-[#666] flex-wrap">
            <Link href="/shop" className="hover:text-[#E53935]">Shop</Link>
            <span className="text-[#e8e8e8]">|</span>
            <Link href="/about" className="hover:text-[#E53935]">About</Link>
            <span className="text-[#e8e8e8]">|</span>
            <Link href="/contact" className="hover:text-[#E53935]">Contact</Link>
            <span className="text-[#e8e8e8]">|</span>
            <Link href="/faq" className="hover:text-[#E53935]">FAQ</Link>
            <span className="text-[#e8e8e8]">|</span>
            <a href="https://wa.me/971563554303" className="hover:text-[#E53935]">WhatsApp</a>
          </div>
          <div className="flex items-center justify-center gap-3 text-[10px] text-[#999] mt-1.5">
            <Link href="/terms" className="hover:text-[#E53935]">Terms</Link>
            <span className="text-[#e8e8e8]">|</span>
            <Link href="/privacy" className="hover:text-[#E53935]">Privacy</Link>
            <span className="text-[#e8e8e8]">|</span>
            <Link href="/shipping" className="hover:text-[#E53935]">Shipping</Link>
          </div>
          <p className="text-[#ccc] text-[10px] mt-2">&copy; {new Date().getFullYear()} BalloonsMall</p>
        </div>
      </footer>

      <WhatsAppFab />
      <Suspense fallback={null}>
        <MobileBottomNav />
      </Suspense>
    </div>
  );
}
