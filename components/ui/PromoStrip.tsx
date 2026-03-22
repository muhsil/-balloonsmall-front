'use client';
import React from 'react';

interface PromoStripProps {
  messages: string[];
}

export default function PromoStrip({ messages }: PromoStripProps) {
  return (
    <div className="bg-[#E53935] text-white overflow-hidden h-8 flex items-center">
      <div className="flex whitespace-nowrap promo-scroll">
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="text-xs font-medium px-8">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
