import Link from 'next/link';
import WhatsAppFab from '@/components/ui/WhatsAppFab';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-2xl text-blue-600 tracking-tight flex items-center gap-2">
              <span className="text-3xl">🎈</span> BalloonsMall
            </Link>
            <nav className="flex gap-6 items-center">
              <Link href="/shop" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                Shop
              </Link>
              <Link href="/checkout" className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
                Cart
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <WhatsAppFab />
    </div>
  );
}
