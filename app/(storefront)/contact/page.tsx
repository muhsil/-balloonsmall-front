import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with BalloonsMall. We\'re here to help with your balloon orders, questions, and celebrations in Dubai.',
  alternates: { canonical: '/contact' },
};

const CONTACT_METHODS = [
  { icon: '📧', label: 'Email', value: 'hello@balloonsmall.com', href: 'mailto:hello@balloonsmall.com' },
  { icon: '📱', label: 'Phone', value: '56 355 4303', href: 'tel:+971563554303' },
  { icon: '💬', label: 'WhatsApp', value: '+971 56 355 4303', href: 'https://wa.me/971563554303' },
  { icon: '📍', label: 'Location', value: 'Dubai, UAE', href: null },
];

const HOURS = [
  { day: 'Saturday – Thursday', time: '9:00 AM – 9:00 PM' },
  { day: 'Friday', time: '2:00 PM – 9:00 PM' },
];

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 max-md:px-3 py-8 max-md:py-5 max-md:pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#999] mb-6">
        <Link href="/" className="hover:text-[#E53935]">Home</Link>
        <span>&gt;</span>
        <span className="text-[#191919] font-medium">Contact</span>
      </nav>

      <h1 className="text-2xl max-md:text-xl font-bold text-[#191919] mb-6">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {CONTACT_METHODS.map((m) => (
          <div key={m.label} className="bg-white rounded-lg border border-[#f0f0f0] p-4 flex items-start gap-3">
            <span className="text-2xl">{m.icon}</span>
            <div>
              <h3 className="text-sm font-bold text-[#191919]">{m.label}</h3>
              {m.href ? (
                <a href={m.href} className="text-sm text-[#E53935] hover:underline" target={m.href.startsWith('http') ? '_blank' : undefined} rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {m.value}
                </a>
              ) : (
                <p className="text-sm text-[#666]">{m.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Business Hours */}
      <div className="bg-white rounded-lg border border-[#f0f0f0] p-6 max-md:p-4 mb-6">
        <h2 className="text-lg font-bold text-[#191919] mb-3">Business Hours</h2>
        <div className="space-y-2">
          {HOURS.map((h) => (
            <div key={h.day} className="flex justify-between text-sm">
              <span className="text-[#666]">{h.day}</span>
              <span className="font-medium text-[#191919]">{h.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick CTA */}
      <div className="bg-[#FFEBEE] rounded-lg p-6 max-md:p-4 text-center">
        <h2 className="text-lg font-bold text-[#E53935] mb-2">Need Help Quickly?</h2>
        <p className="text-sm text-[#666] mb-4">Reach us on WhatsApp for the fastest response.</p>
        <a href="https://wa.me/971563554303" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm inline-flex items-center gap-2">
          💬 Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
