import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 p-4 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold tracking-wide uppercase border border-blue-100 shadow-sm">
        Premium Gifting & Events
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-center mb-6 leading-tight pb-2">
        Elevate Your <br /> Celebrations
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl text-center mb-10 leading-relaxed font-light">
        Customized premium balloons, bespoke event decorations, and seamless gifting experiences delivered directly to your door in Dubai.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/shop" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center text-lg"
        >
          Shop Now
        </Link>
        <Link 
          href="/shop" 
          className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-4 px-10 rounded-full shadow-md border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center text-lg"
        >
          Event Packages
        </Link>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-2xl mb-4">🎨</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Live Customization</h3>
          <p className="text-gray-500 text-sm">Design your balloons with real-time text and color previews before you buy.</p>
        </div>
        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-2xl mb-4">⏰</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Scheduled Deliveries</h3>
          <p className="text-gray-500 text-sm">Pick the exact date and time slot for your surprise deliveries.</p>
        </div>
        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-2xl mb-4">⚡</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Lightning Fast</h3>
          <p className="text-gray-500 text-sm">Enjoy instant browsing and secure seamless checkout powered by Next.js.</p>
        </div>
      </div>
    </div>
  );
}
