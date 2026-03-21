import Navbar from '@/components/ui/Navbar';
import WhatsAppFab from '@/components/ui/WhatsAppFab';
import MobileBottomNav from '@/components/ui/mobile/MobileBottomNav';
import Link from 'next/link';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Navbar />

      <main className="flex-1 mobile-body-padding">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 max-md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  { label: 'Birthday', href: '/shop?category=birthday' },
                  { label: 'Wedding', href: '/shop?category=wedding' },
                  { label: 'Events', href: '/shop?category=events' },
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
            </div>
          </div>

          <div className="border-t border-gray-100 mt-8 pt-6 text-center">
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
          <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
            <Link href="/shop" className="hover:text-[#F26522]">Shop</Link>
            <span className="text-gray-200">|</span>
            <a href="https://wa.me/971585501786" className="hover:text-[#F26522]">WhatsApp</a>
            <span className="text-gray-200">|</span>
            <a href="mailto:muhsilv@gmail.com" className="hover:text-[#F26522]">Email</a>
          </div>
          <p className="text-gray-300 text-[10px] mt-2">&copy; {new Date().getFullYear()} BalloonsMall</p>
        </div>
      </footer>

      <WhatsAppFab />
      <MobileBottomNav />
    </div>
  );
}
