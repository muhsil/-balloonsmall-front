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
      { q: 'How do I place an order?', a: 'Browse our shop, add items to your cart, and proceed to checkout. Fill in your delivery details and pay securely with Ziina.' },
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
      { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards through our secure Ziina payment gateway.' },
      { q: 'Is my payment information secure?', a: 'Absolutely. All payments are processed through Ziina\'s PCI-compliant, bank-grade encrypted payment system.' },
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
            💬 WhatsApp
          </a>
          <a href="mailto:hello@balloonsmall.com" className="bg-white text-[#E53935] border border-[#E53935] font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#FFEBEE] transition-colors">
            📧 Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
