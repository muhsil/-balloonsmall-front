import Navbar from '@/components/ui/Navbar';
import WhatsAppFab from '@/components/ui/WhatsAppFab';
import MobileBottomNav from '@/components/ui/mobile/MobileBottomNav';
import Link from 'next/link';
import { Suspense } from 'react';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Navbar />

      <main className="flex-1 mobile-body-padding">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 max-md:hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎈</span>
                <span className="font-extrabold text-lg text-[#F26522]">BalloonsMall</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Dubai&apos;s premium balloon delivery service. Making celebrations unforgettable with custom balloon arrangements.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Shop All', href: '/shop' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'FAQ', href: '/faq' },
                  { label: 'Shipping & Delivery', href: '/shipping' },
                ].map(link => (
                  <Link key={link.href} href={link.href} className="text-gray-500 text-sm hover:text-[#F26522] transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3">Contact Us</h4>
              <div className="flex flex-col gap-2 text-gray-500 text-sm">
                <span>📍 Dubai, UAE</span>
                <a href="https://wa.me/971585501786" className="hover:text-[#F26522] transition-colors">💬 WhatsApp Support</a>
                <a href="mailto:muhsilv@gmail.com" className="hover:text-[#F26522] transition-colors">📧 muhsilv@gmail.com</a>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <h4 className="font-bold text-gray-900 text-sm">Legal</h4>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Terms & Conditions', href: '/terms' },
                    { label: 'Privacy Policy', href: '/privacy' },
                  ].map(link => (
                    <Link key={link.href} href={link.href} className="text-gray-500 text-sm hover:text-[#F26522] transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-10 pt-6 text-center">
            <p className="text-gray-400 text-xs">&copy; {new Date().getFullYear()} BalloonsMall. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Footer - compact */}
      <footer className="md:hidden bg-white border-t border-gray-100 mb-14 px-4 py-4">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 mb-2">
            <span className="text-lg">🎈</span>
            <span className="font-bold text-sm text-[#F26522]">BalloonsMall</span>
          </Link>
          <p className="text-gray-400 text-[10px] mb-2">Dubai&apos;s Premium Balloon Delivery</p>
          <div className="flex items-center justify-center gap-3 text-xs text-gray-500 flex-wrap">
            <Link href="/shop" className="hover:text-[#F26522]">Shop</Link>
            <span className="text-gray-200">|</span>
            <Link href="/about" className="hover:text-[#F26522]">About</Link>
            <span className="text-gray-200">|</span>
            <Link href="/contact" className="hover:text-[#F26522]">Contact</Link>
            <span className="text-gray-200">|</span>
            <Link href="/faq" className="hover:text-[#F26522]">FAQ</Link>
            <span className="text-gray-200">|</span>
            <a href="https://wa.me/971585501786" className="hover:text-[#F26522]">WhatsApp</a>
          </div>
          <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400 mt-1.5">
            <Link href="/terms" className="hover:text-[#F26522]">Terms</Link>
            <span className="text-gray-200">|</span>
            <Link href="/privacy" className="hover:text-[#F26522]">Privacy</Link>
            <span className="text-gray-200">|</span>
            <Link href="/shipping" className="hover:text-[#F26522]">Shipping</Link>
          </div>
          <p className="text-gray-300 text-[10px] mt-2">&copy; {new Date().getFullYear()} BalloonsMall</p>
        </div>
      </footer>

      <WhatsAppFab />
      <Suspense fallback={null}>
        <MobileBottomNav />
      </Suspense>
    </div>
  );
}
