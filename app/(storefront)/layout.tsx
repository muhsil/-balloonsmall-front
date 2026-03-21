import Navbar from '@/components/ui/Navbar';
import WhatsAppFab from '@/components/ui/WhatsAppFab';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎈</span>
                <span className="font-bold text-white text-lg">BalloonsMall</span>
              </div>
              <p className="text-sm leading-relaxed">Dubai's premier destination for premium customized balloons and event decorations. Same-day delivery available.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/shop" className="hover:text-violet-400 transition-colors">Shop All</a></li>
                <li><a href="/shop?category=birthday" className="hover:text-violet-400 transition-colors">Birthday Balloons</a></li>
                <li><a href="/shop?category=wedding" className="hover:text-violet-400 transition-colors">Wedding Decor</a></li>
                <li><a href="/checkout" className="hover:text-violet-400 transition-colors">My Cart</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>📍 Dubai, UAE</li>
                <li>📞 <a href="tel:+971500000000" className="hover:text-violet-400 transition-colors">+971 50 000 0000</a></li>
                <li>✉️ <a href="mailto:hello@balloonsmall.com" className="hover:text-violet-400 transition-colors">hello@balloonsmall.com</a></li>
                <li className="pt-2">Operating Hours: 10 AM – 8 PM daily</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs">
            © {new Date().getFullYear()} BalloonsMall. All rights reserved. Made with ❤️ in Dubai.
          </div>
        </div>
      </footer>
      <WhatsAppFab />
    </div>
  );
}
