import type { Metadata } from 'next';
import Link from 'next/link';
import { getStoreSettings } from '@/lib/store-settings';

export const metadata: Metadata = {
  title: 'Shipping & Delivery',
  description: 'BalloonsMall shipping and delivery information. Same-day delivery across Dubai. Free shipping on eligible orders.',
  alternates: { canonical: '/shipping' },
};

function getDeliveryOptions(currency: string) {
  return [
    { icon: '⚡', title: 'Same-Day Delivery', description: 'Order before 2:00 PM for same-day delivery across Dubai.', price: `Free on orders over ${currency} 100` },
    { icon: '📦', title: 'Standard Delivery', description: 'Next-day delivery for orders placed after 2:00 PM.', price: `Free on orders over ${currency} 100` },
    { icon: '🎯', title: 'Scheduled Delivery', description: 'Choose a specific date and time slot for your delivery.', price: `Free on orders over ${currency} 100` },
  ];
}

const DELIVERY_AREAS = [
  'Downtown Dubai', 'Dubai Marina', 'JBR', 'Palm Jumeirah',
  'Business Bay', 'JLT', 'DIFC', 'Jumeirah',
  'Al Barsha', 'Arabian Ranches', 'Dubai Hills', 'Silicon Oasis',
];

export default async function ShippingPage() {
  const settings = await getStoreSettings();
  const { currency } = settings;

  return (
    <div className="max-w-4xl mx-auto px-4 max-md:px-3 py-8 max-md:py-5 max-md:pb-20">
      <nav className="flex items-center gap-2 text-xs text-[#999] mb-6">
        <Link href="/" className="hover:text-[#E53935]">Home</Link>
        <span>&gt;</span>
        <span className="text-[#191919] font-medium">Shipping &amp; Delivery</span>
      </nav>

      <h1 className="text-2xl max-md:text-xl font-bold text-[#191919] mb-6">Shipping &amp; Delivery</h1>

      {/* Delivery Options */}
      <div className="space-y-3 mb-6">
        {getDeliveryOptions(currency).map((opt) => (
          <div key={opt.title} className="bg-white rounded-lg border border-[#f0f0f0] p-4 flex gap-3">
            <span className="text-2xl shrink-0">{opt.icon}</span>
            <div className="flex-1">
              <h2 className="text-sm font-bold text-[#191919]">{opt.title}</h2>
              <p className="text-xs text-[#666] mt-1">{opt.description}</p>
              <span className="text-xs text-[#00B578] font-medium mt-1 inline-block">{opt.price}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Areas */}
      <div className="bg-white rounded-lg border border-[#f0f0f0] p-6 max-md:p-4 mb-6">
        <h2 className="text-lg font-bold text-[#191919] mb-3">Delivery Areas</h2>
        <p className="text-sm text-[#666] mb-3">We deliver across all areas in Dubai, including:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {DELIVERY_AREAS.map((area) => (
            <div key={area} className="flex items-center gap-1.5 text-sm text-[#666]">
              <span className="w-1.5 h-1.5 bg-[#E53935] rounded-full shrink-0" />
              {area}
            </div>
          ))}
        </div>
        <p className="text-xs text-[#999] mt-3">Don&apos;t see your area? Contact us — we likely deliver there too!</p>
      </div>

      {/* Important Notes */}
      <div className="bg-[#FFEBEE] rounded-lg p-6 max-md:p-4">
        <h2 className="text-lg font-bold text-[#E53935] mb-3">Important Notes</h2>
        <ul className="space-y-2 text-sm text-[#666]">
          <li className="flex gap-2"><span className="text-[#E53935]">•</span> Delivery times may vary during peak seasons and holidays.</li>
          <li className="flex gap-2"><span className="text-[#E53935]">•</span> Someone must be available to receive the delivery at the specified address.</li>
          <li className="flex gap-2"><span className="text-[#E53935]">•</span> For bulk orders (50+ balloons), please contact us for special delivery arrangements.</li>
          <li className="flex gap-2"><span className="text-[#E53935]">•</span> Helium balloons have a float time of 8-12 hours depending on size and conditions.</li>
        </ul>
      </div>
    </div>
  );
}
