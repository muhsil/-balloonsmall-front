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
                <svg className="w-6 h-6 text-[#E53935]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
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
                <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Dubai, UAE</span>
                <a href="https://wa.me/971563554303" className="hover:text-[#E53935] transition-colors flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> WhatsApp Support</a>
                <a href="mailto:hello@balloonsmall.com" className="hover:text-[#E53935] transition-colors flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> hello@balloonsmall.com</a>
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
            <svg className="w-4 h-4 text-[#E53935]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
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
