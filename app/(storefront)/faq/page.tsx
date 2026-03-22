import Link from 'next/link';

const FAQ_SECTIONS = [
  {
    title: 'Orders & Delivery',
    items: [
      { q: 'What areas do you deliver to?', a: 'We deliver across all areas of Dubai, UAE. For locations outside Dubai, please contact us via WhatsApp for availability.' },
      { q: 'Do you offer same-day delivery?', a: 'Yes! Place your order before 2:00 PM and we will deliver your balloons the same day. Orders placed after 2 PM will be delivered the next day.' },
      { q: 'How much does delivery cost?', a: 'Delivery is FREE on all orders over AED 100. For orders under AED 100, a standard delivery fee of AED 15 applies.' },
      { q: 'What are your delivery hours?', a: 'Our delivery hours are from 10:00 AM to 8:00 PM, Saturday through Thursday. Friday deliveries are available upon request.' },
      { q: 'Can I track my order?', a: 'Once your order is dispatched, you will receive a WhatsApp notification with delivery updates. You can also contact us for real-time tracking.' },
    ],
  },
  {
    title: 'Products & Variations',
    items: [
      { q: 'What product variations are available?', a: 'Many of our products come with different size, color, and style variations. Select your preferred option on the product page before adding to cart.' },
      { q: 'What types of balloons do you offer?', a: 'We offer latex balloons, foil balloons, number balloons, balloon arches, garland kits, and complete decoration packages for all occasions.' },
      { q: 'How long do helium balloons last?', a: 'Standard latex helium balloons last 8-12 hours. Foil helium balloons can last 3-5 days. We recommend ordering for day-of delivery for the best experience.' },
      { q: 'Do you offer bulk pricing?', a: 'Yes! Contact us via WhatsApp for special pricing on bulk and corporate orders.' },
    ],
  },
  {
    title: 'Payment & Refunds',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure Ziina payment gateway. Apple Pay and Google Pay are also supported.' },
      { q: 'Is my payment information secure?', a: 'Yes, all payments are processed through Ziina, a PCI-compliant payment gateway. We never store your card details on our servers.' },
      { q: 'What is your refund policy?', a: 'If your order arrives damaged or incorrect, contact us within 2 hours of delivery for a full refund or replacement. For cancellations, contact us at least 4 hours before your delivery window.' },
      { q: 'Do you offer cash on delivery?', a: 'Currently, we only accept online payments through our secure payment gateway. This ensures faster order processing and delivery.' },
    ],
  },
  {
    title: 'General',
    items: [
      { q: 'How do I contact customer support?', a: 'The fastest way is via WhatsApp at +971 56 355 4303. You can also email us at hello@balloonsmall.com. We typically respond within minutes on WhatsApp.' },
      { q: 'Can I place a bulk order for events?', a: 'Yes! We offer special pricing for bulk and corporate orders. Contact us via WhatsApp or email with your requirements for a custom quote.' },
      { q: 'Do you set up the decorations?', a: 'Our Luxury Event Decoration Package includes a setup guide. For professional on-site setup services, please contact us for pricing and availability.' },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 max-md:px-3 max-md:py-6 max-md:pb-20">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#F26522]">Home</Link>
        <span>&gt;</span>
        <span className="text-gray-600 font-medium">FAQ</span>
      </nav>

      <div className="bg-white rounded-2xl p-8 max-md:p-5 border border-gray-100">
        <h1 className="text-2xl max-md:text-xl font-extrabold text-gray-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-sm text-gray-500 mb-8">Find answers to the most common questions about our products and services.</p>

        <div className="space-y-8">
          {FAQ_SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-base font-bold text-[#F26522] mb-4 flex items-center gap-2">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <details key={item.q} className="group border border-gray-100 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                      <span className="text-sm font-semibold text-gray-800 pr-4">{item.q}</span>
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-50 rounded-xl p-6 text-center">
          <h3 className="font-bold text-gray-900 text-sm mb-2">Still have questions?</h3>
          <p className="text-xs text-gray-500 mb-4">Our support team is always happy to help.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="https://wa.me/971563554303" className="btn-primary text-xs px-4 py-2">
              WhatsApp Us
            </a>
            <Link href="/contact" className="btn-outline text-xs px-4 py-2">
              Contact Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
