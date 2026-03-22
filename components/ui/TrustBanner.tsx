import React from 'react';

const TRUST_ITEMS = [
  { icon: '🚚', title: 'Free shipping', subtitle: 'On orders over AED 100' },
  { icon: '⚡', title: 'Same-day delivery', subtitle: 'Order before 2 PM' },
  { icon: '🔄', title: 'Easy returns', subtitle: 'Hassle-free exchanges' },
  { icon: '💰', title: 'Best prices', subtitle: 'Guaranteed savings' },
];

export default function TrustBanner() {
  return (
    <div className="bg-white border-b border-[#f0f0f0]">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between max-md:justify-start max-md:gap-4 max-md:overflow-x-auto no-scrollbar">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex items-center gap-2 shrink-0">
              <span className="text-sm">{item.icon}</span>
              <div>
                <span className="text-xs font-semibold text-[#191919]">{item.title}</span>
                <span className="hidden md:inline text-xs text-[#999] ml-1">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
