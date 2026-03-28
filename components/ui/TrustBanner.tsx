import React from 'react';

const TRUST_ICONS = {
  shipping: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
  delivery: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  returns: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  prices: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
};

function getTrustItems(currency: string) {
  return [
    { icon: TRUST_ICONS.shipping, title: 'Free shipping', subtitle: `On orders over ${currency} 100` },
    { icon: TRUST_ICONS.delivery, title: 'Same-day delivery', subtitle: 'Order before 2 PM' },
    { icon: TRUST_ICONS.returns, title: 'Easy returns', subtitle: 'Hassle-free exchanges' },
    { icon: TRUST_ICONS.prices, title: 'Best prices', subtitle: 'Guaranteed savings' },
  ];
}

export default function TrustBanner({ currency = 'AED' }: { currency?: string }) {
  return (
    <div className="bg-white border-b border-[#f0f0f0]">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between max-md:justify-start max-md:gap-4 max-md:overflow-x-auto no-scrollbar">
          {getTrustItems(currency).map((item) => (
            <div key={item.title} className="flex items-center gap-2 shrink-0">
              <span className="text-[#E53935]">{item.icon}</span>
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
