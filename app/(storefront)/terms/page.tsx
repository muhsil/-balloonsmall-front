import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Read BalloonsMall\'s terms and conditions for ordering balloons and decorations in Dubai.',
  alternates: { canonical: '/terms' },
};

const SECTIONS = [
  {
    title: '1. General',
    content: 'By accessing and using BalloonsMall (balloonsmall.com), you agree to be bound by these Terms & Conditions. We reserve the right to modify these terms at any time without prior notice.',
  },
  {
    title: '2. Products & Pricing',
    content: 'All prices are listed in AED (UAE Dirhams) and include VAT where applicable. Prices are subject to change without notice. Product images are for illustration purposes and may vary slightly from the actual product.',
  },
  {
    title: '3. Orders & Payment',
    content: 'Orders are confirmed upon successful payment through our Ziina payment gateway. We accept all major credit and debit cards. Payment must be completed in full at the time of ordering.',
  },
  {
    title: '4. Delivery',
    content: 'We deliver across Dubai. Same-day delivery is available for orders placed before 2:00 PM. Delivery times are estimates and may vary due to traffic, weather, or other factors beyond our control. Free delivery on orders over AED 100.',
  },
  {
    title: '5. Returns & Refunds',
    content: 'Due to the perishable nature of balloon products, we do not accept returns. If your order arrives damaged or incorrect, please contact us within 2 hours of delivery for a replacement or refund.',
  },
  {
    title: '6. Liability',
    content: 'BalloonsMall shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our total liability shall not exceed the amount paid for the order in question.',
  },
  {
    title: '7. Contact',
    content: 'For questions about these terms, contact us at hello@balloonsmall.com or WhatsApp +971 56 355 4303.',
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 max-md:px-3 py-8 max-md:py-5 max-md:pb-20">
      <nav className="flex items-center gap-2 text-xs text-[#999] mb-6">
        <Link href="/" className="hover:text-[#E53935]">Home</Link>
        <span>&gt;</span>
        <span className="text-[#191919] font-medium">Terms &amp; Conditions</span>
      </nav>

      <h1 className="text-2xl max-md:text-xl font-bold text-[#191919] mb-6">Terms &amp; Conditions</h1>

      <div className="bg-white rounded-lg border border-[#f0f0f0] divide-y divide-[#f0f0f0]">
        {SECTIONS.map((section) => (
          <div key={section.title} className="p-4">
            <h2 className="text-sm font-bold text-[#191919] mb-2">{section.title}</h2>
            <p className="text-sm text-[#666] leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-[#999] mt-4 text-center">Last updated: January 2025</p>
    </div>
  );
}
