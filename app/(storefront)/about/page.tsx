import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

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

const VALUE_ICONS: Record<string, React.ReactNode> = {
  quality: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
  delivery: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  love: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  eco: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

const VALUES = [
  { key: 'quality', title: 'Quality First', description: 'We source only premium-grade latex and foil balloons that last longer and look better.' },
  { key: 'delivery', title: 'Fast Delivery', description: 'Same-day delivery across Dubai. Order before 2 PM and get it the same day.' },
  { key: 'love', title: 'Customer Love', description: 'Every arrangement is crafted with care. Your satisfaction is our top priority.' },
  { key: 'eco', title: 'Eco-Conscious', description: 'We use biodegradable balloons wherever possible and minimize packaging waste.' },
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
        <span className="text-[#E53935] mb-3 block"><svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg></span>
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
              <span className="text-[#E53935] shrink-0">{VALUE_ICONS[v.key]}</span>
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
