import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Read BalloonsMall terms and conditions including orders, payment, delivery, returns, and refund policies for balloon purchases in Dubai.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 max-md:px-3 max-md:py-6 max-md:pb-20">
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Terms & Conditions', href: '/terms' },
      ]} />
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#F26522]">Home</Link>
        <span>&gt;</span>
        <span className="text-gray-600 font-medium">Terms &amp; Conditions</span>
      </nav>

      <div className="bg-white rounded-2xl p-8 max-md:p-5 border border-gray-100">
        <h1 className="text-2xl max-md:text-xl font-extrabold text-gray-900 mb-2">Terms &amp; Conditions</h1>
        <p className="text-xs text-gray-400 mb-8">Last updated: March 2026</p>

        <div className="prose max-w-none text-gray-600 text-sm leading-relaxed space-y-6">
          <section>
            <h2 className="text-base font-bold text-gray-900">1. General</h2>
            <p>By accessing and using BalloonsMall (&quot;the Website&quot;), you agree to be bound by these Terms and Conditions. BalloonsMall is operated in Dubai, UAE, and primarily serves customers within the Dubai region.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">2. Products &amp; Pricing</h2>
            <p>All prices are listed in UAE Dirhams (AED) and include VAT where applicable. We reserve the right to modify prices without prior notice. Product images are for illustration purposes and the actual product may vary slightly in color or arrangement.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">3. Orders &amp; Payment</h2>
            <p>All orders are subject to availability. Payment is processed securely through Ziina payment gateway. By placing an order, you confirm that the payment details provided are valid and that you are authorized to use the payment method.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">4. Delivery</h2>
            <p>We offer same-day delivery for orders placed before 2:00 PM. Delivery is available across Dubai. Free delivery applies to orders over AED 100. Delivery times are estimates and may vary due to traffic or weather conditions.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">5. Returns &amp; Refunds</h2>
            <p>Due to the perishable nature of balloon products, we do not accept returns. However, if your order arrives damaged or incorrect, please contact us within 2 hours of delivery via WhatsApp for a full refund or replacement.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">6. Cancellation</h2>
            <p>Orders may be cancelled at least 4 hours before the scheduled delivery window for a full refund. Cancellations within 4 hours of delivery may be subject to a cancellation fee.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">7. Product Variations</h2>
            <p>Please review your selected product variations carefully before placing your order. Orders with specific variations cannot be modified once processing has begun.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900">8. Contact</h2>
            <p>For any questions regarding these terms, please contact us via WhatsApp at +971 56 355 4303 or email at hello@balloonsmall.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
