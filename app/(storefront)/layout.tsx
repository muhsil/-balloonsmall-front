import Navbar from '@/components/ui/Navbar';
import WhatsAppFab from '@/components/ui/WhatsAppFab';
import MobileBottomNav from '@/components/ui/mobile/MobileBottomNav';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      <Navbar />
      <main className="flex-1 max-md:pb-20">
        {children}
      </main>
      <footer className="bg-gray-900 text-gray-400 py-12 max-md:py-8 mt-20 max-md:mt-10 max-md:mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-md:gap-6">
            <div className="max-md:text-center">
              <div className="flex items-center gap-2 mb-4 max-md:mb-2 max-md:justify-center">
                <span className="text-2xl max-md:text-xl">🎈</span>
                <span className="font-bold text-white text-lg max-md:text-base">BalloonsMall</span>
              </div>
              <p className="text-sm max-md:text-xs leading-relaxed max-md:max-w-xs max-md:mx-auto">Dubai&apos;s premier destination for premium customized balloons and event decorations. Same-day delivery available.</p>
            </div>
            {/* Quick Links - horizontal on mobile */}
            <div className="max-md:text-center">
              <h4 className="text-white font-semibold mb-4 max-md:mb-2 max-md:text-sm">Quick Links</h4>
              <ul className="space-y-2 max-md:space-y-0 text-sm max-md:text-xs max-md:flex max-md:flex-wrap max-md:justify-center max-md:gap-x-4 max-md:gap-y-1">
                <li><a href="/shop" className="hover:text-violet-400 transition-colors">Shop All</a></li>
                <li><a href="/shop?category=birthday" className="hover:text-violet-400 transition-colors">Birthday</a></li>
                <li><a href="/shop?category=wedding" className="hover:text-violet-400 transition-colors">Wedding</a></li>
                <li><a href="/checkout" className="hover:text-violet-400 transition-colors">Cart</a></li>
              </ul>
            </div>
            {/* Contact - compact on mobile */}
            <div className="max-md:text-center">
              <h4 className="text-white font-semibold mb-4 max-md:mb-2 max-md:text-sm">Contact</h4>
              <ul className="space-y-2 max-md:space-y-1 text-sm max-md:text-xs">
                <li>📍 Dubai, UAE</li>
                <li>📞 <a href="tel:+971500000000" className="hover:text-violet-400 transition-colors">+971 50 000 0000</a></li>
                <li>✉️ <a href="mailto:hello@balloonsmall.com" className="hover:text-violet-400 transition-colors">hello@balloonsmall.com</a></li>
                <li className="pt-1 max-md:pt-0 text-gray-500 max-md:text-[10px]">10 AM – 8 PM daily</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 max-md:mt-6 pt-6 max-md:pt-4 text-center text-xs max-md:text-[10px]">
            © {new Date().getFullYear()} BalloonsMall. All rights reserved. Made with ❤️ in Dubai.
          </div>
        </div>
      </footer>
      <WhatsAppFab />
      <MobileBottomNav />
    </div>
  );
}
