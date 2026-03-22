import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'BalloonsMall privacy policy. Learn how we collect, use, and protect your personal information.',
  alternates: { canonical: '/privacy' },
};

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: 'We collect information you provide when placing an order: name, email, phone number, delivery address, and payment details. We also collect usage data through cookies and analytics to improve our service.',
  },
  {
    title: '2. How We Use Your Information',
    content: 'Your information is used to process orders, arrange delivery, send order confirmations, provide customer support, and improve our products and services. We may send promotional emails which you can opt out of at any time.',
  },
  {
    title: '3. Payment Security',
    content: 'All payments are processed through Ziina, a PCI-DSS compliant payment gateway. We do not store your credit card details on our servers. All transactions are encrypted using industry-standard SSL technology.',
  },
  {
    title: '4. Data Sharing',
    content: 'We do not sell or rent your personal information to third parties. We may share your data with delivery partners to fulfill your order and with payment processors to complete transactions.',
  },
  {
    title: '5. Cookies',
    content: 'We use cookies to enhance your browsing experience, remember your cart contents, and analyze site traffic. You can control cookie settings through your browser preferences.',
  },
  {
    title: '6. Your Rights',
    content: 'You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at hello@balloonsmall.com.',
  },
  {
    title: '7. Contact',
    content: 'For privacy-related inquiries, email hello@balloonsmall.com or WhatsApp +971 56 355 4303.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 max-md:px-3 py-8 max-md:py-5 max-md:pb-20">
      <nav className="flex items-center gap-2 text-xs text-[#999] mb-6">
        <Link href="/" className="hover:text-[#E53935]">Home</Link>
        <span>&gt;</span>
        <span className="text-[#191919] font-medium">Privacy Policy</span>
      </nav>

      <h1 className="text-2xl max-md:text-xl font-bold text-[#191919] mb-6">Privacy Policy</h1>

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
