import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about BalloonsMall — Dubai\'s premium balloon delivery service. We bring joy to every celebration with beautiful balloon arrangements.',
  alternates: { canonical: '/about' },
};

const STATS = [
  { value: '5,000+', label: 'Happy Customers' },
  { value: '10,000+', label: 'Balloons Delivered' },
  { value: '4.9', label: 'Average Rating' },
  { value: '2hr', label: 'Fastest Delivery' },
];

const VALUES = [
  { icon: '🎈', title: 'Quality First', description: 'We source only premium-grade latex and foil balloons that last longer and look better.' },
  { icon: '🚀', title: 'Fast Delivery', description: 'Same-day delivery across Dubai. Order before 2 PM and get it the same day.' },
  { icon: '💖', title: 'Customer Love', description: 'Every arrangement is crafted with care. Your satisfaction is our top priority.' },
  { icon: '🌍', title: 'Eco-Conscious', description: 'We use biodegradable balloons wherever possible and minimize packaging waste.' },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 max-md:px-3 py-8 max-md:py-5 max-md:pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#999] mb-6">
        <Link href="/" className="hover:text-[#E53935]">Home</Link>
        <span>&gt;</span>
        <span className="text-[#191919] font-medium">About Us</span>
      </nav>

      {/* Hero */}
      <div className="bg-white rounded-lg border border-[#f0f0f0] p-6 max-md:p-4 mb-6 text-center">
        <span className="text-4xl mb-3 block">🎈</span>
        <h1 className="text-2xl max-md:text-xl font-bold text-[#191919] mb-2">About BalloonsMall</h1>
        <p className="text-[#666] text-sm max-w-lg mx-auto leading-relaxed">
          Dubai&apos;s premier balloon delivery service. We make every celebration special with premium balloon arrangements delivered right to your door.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-[#f0f0f0] p-4 text-center">
            <div className="text-xl font-bold text-[#E53935]">{stat.value}</div>
            <div className="text-xs text-[#999] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Our Values */}
      <div className="bg-white rounded-lg border border-[#f0f0f0] p-6 max-md:p-4 mb-6">
        <h2 className="text-lg font-bold text-[#191919] mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VALUES.map((v) => (
            <div key={v.title} className="flex gap-3">
              <span className="text-2xl shrink-0">{v.icon}</span>
              <div>
                <h3 className="text-sm font-bold text-[#191919]">{v.title}</h3>
                <p className="text-xs text-[#666] leading-relaxed mt-1">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#FFEBEE] rounded-lg p-6 max-md:p-4 text-center">
        <h2 className="text-lg font-bold text-[#E53935] mb-2">Ready to Celebrate?</h2>
        <p className="text-sm text-[#666] mb-4">Browse our collection and find the perfect balloons for your occasion.</p>
        <Link href="/shop" className="btn-primary text-sm">Shop Now</Link>
      </div>
    </div>
  );
}
