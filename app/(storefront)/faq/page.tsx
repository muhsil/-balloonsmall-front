import type { Metadata } from 'next';
import Link from 'next/link';
import { getStoreSettings } from '@/lib/store-settings';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about BalloonsMall. Learn about ordering, delivery, payment, and more.',
  alternates: { canonical: '/faq' },
};

const FAQ_SECTIONS = [
  {
    title: 'Ordering',
    items: [
      { q: 'How do I place an order?', a: 'Browse our shop, add items to your cart, and proceed to checkout. Fill in your delivery details and complete your order with Cash on Delivery.' },
      { q: 'Can I modify my order after placing it?', a: 'Contact us on WhatsApp at +971 56 355 4303 as soon as possible. We\'ll do our best to accommodate changes before your order is prepared.' },
      { q: 'What product variations are available?', a: 'Many of our products come in different sizes, colors, and styles. Check each product page for available variations.' },
    ],
  },
  {
    title: 'Delivery',
    items: [
      { q: 'Do you offer same-day delivery?', a: 'Yes! Orders placed before 2:00 PM are eligible for same-day delivery within Dubai.' },
      { q: 'What are your delivery hours?', a: 'We deliver Saturday–Thursday from 9 AM to 9 PM, and Fridays from 2 PM to 9 PM.' },
      { q: 'Is delivery free?', a: 'DYNAMIC_DELIVERY_FAQ' },
    ],
  },
  {
    title: 'Payment',
    items: [
      { q: 'What payment methods do you accept?', a: 'We currently accept Cash on Delivery (COD). Pay conveniently when your order arrives at your doorstep.' },
      { q: 'Is Cash on Delivery available everywhere?', a: 'Yes, COD is available for all delivery areas across Dubai. Please have the exact amount ready at the time of delivery.' },
    ],
  },
  {
    title: 'Returns & Support',
    items: [
      { q: 'What is your return policy?', a: 'Due to the nature of balloon products, we cannot accept returns. However, if your order arrives damaged, contact us immediately for a replacement.' },
      { q: 'How can I contact support?', a: 'Reach us on WhatsApp at +971 56 355 4303 or email hello@balloonsmall.com. We typically respond within 30 minutes during business hours.' },
    ],
  },
];

export default async function FAQPage() {
  const settings = await getStoreSettings();
  const { currency } = settings;

  // Replace dynamic FAQ content
  const sections = FAQ_SECTIONS.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      a: item.a === 'DYNAMIC_DELIVERY_FAQ'
        ? `Delivery is free on orders over ${currency} 100. Orders under ${currency} 100 have a small delivery fee.`
        : item.a,
    })),
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 max-md:px-3 py-8 max-md:py-5 max-md:pb-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#999] mb-6">
        <Link href="/" className="hover:text-[#E53935]">Home</Link>
        <span>&gt;</span>
        <span className="text-[#191919] font-medium">FAQ</span>
      </nav>

      <h1 className="text-2xl max-md:text-xl font-bold text-[#191919] mb-6">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-lg border border-[#f0f0f0] overflow-hidden">
            <h2 className="text-sm font-bold text-[#191919] px-4 py-3 bg-[#fafafa] border-b border-[#f0f0f0]">
              {section.title}
            </h2>
            <div className="divide-y divide-[#f0f0f0]">
              {section.items.map((item) => (
                <details key={item.q} className="group">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-[#191919] hover:bg-[#fafafa] transition-colors">
                    {item.q}
                    <svg className="w-4 h-4 text-[#999] shrink-0 ml-2 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-4 pb-3 text-sm text-[#666] leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#FFEBEE] rounded-lg p-6 max-md:p-4 text-center mt-6">
        <h2 className="text-lg font-bold text-[#E53935] mb-2">Still Have Questions?</h2>
        <p className="text-sm text-[#666] mb-4">We&apos;re happy to help. Reach out anytime.</p>
        <div className="flex justify-center gap-3">
          <a href="https://wa.me/971563554303" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
            <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            WhatsApp
          </a>
          <a href="mailto:hello@balloonsmall.com" className="bg-white text-[#E53935] border border-[#E53935] font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#FFEBEE] transition-colors inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
