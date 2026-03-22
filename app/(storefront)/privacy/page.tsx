import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'BalloonsMall privacy policy. Learn how we collect, use, and protect your personal information when you shop for balloons in Dubai.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 max-md:px-3 max-md:py-6 max-md:pb-20">
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Privacy Policy', href: '/privacy' },
      ]} />
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#F26522]">Home</Link>
        <span>&gt;</span>
        <span className="text-gray-600 font-medium">Privacy Policy</span>
      </nav>

      <div className="bg-white rounded-2xl p-8 max-md:p-5 border border-gray-100">
        <h1 className="text-2xl max-md:text-xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-xs text-gray-400 mb-8">Last updated: March 2026</p>

        <div className="prose max-w-none text-gray-600 text-sm leading-relaxed space-y-6">
          <section>
            <h2 className="text-base font-bold text-gray-900">1. Information We Collect</h2>
            <p>We collect information you provide when placing an order, including your name, email address, delivery address, and phone number. We also collect payment information which is processed securely by our payment provider, Ziina.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">2. How We Use Your Information</h2>
            <p>Your information is used to:</p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Process and deliver your orders</li>
              <li>Send order confirmations and delivery updates</li>
              <li>Provide customer support</li>
              <li>Improve our products and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">3. Payment Security</h2>
            <p>All payment transactions are processed through Ziina, a PCI-compliant payment gateway. We do not store credit card numbers or sensitive payment data on our servers.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">4. Data Sharing</h2>
            <p>We do not sell or share your personal information with third parties for marketing purposes. We may share information with delivery partners solely for the purpose of completing your order delivery.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">5. Cookies</h2>
            <p>We use cookies and local storage to maintain your shopping cart and improve your browsing experience. You can disable cookies in your browser settings, but this may affect site functionality.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. Contact us via WhatsApp or email to exercise these rights.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">7. Contact</h2>
            <p>For privacy-related inquiries, contact us at hello@balloonsmall.com or via WhatsApp at +971 56 355 4303.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
