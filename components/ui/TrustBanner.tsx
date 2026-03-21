import React from 'react';

interface TrustItem {
  icon: string;
  title: string;
  subtitle: string;
}

const TRUST_ITEMS: TrustItem[] = [
  { icon: '🚚', title: 'Free Delivery', subtitle: 'Orders over AED 100' },
  { icon: '✅', title: 'Delivery Guarantee', subtitle: 'On-time or refund' },
  { icon: '🔄', title: 'Easy Returns', subtitle: 'Hassle-free' },
  { icon: '🔒', title: 'Safe Payment', subtitle: 'Secure checkout' },
];

export default function TrustBanner() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex overflow-x-auto no-scrollbar">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-2 px-4 py-2.5 shrink-0 min-w-[140px]"
            >
              <span className="text-base">{item.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 whitespace-nowrap">{item.title}</p>
                <p className="text-[10px] text-gray-400 whitespace-nowrap">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
