"use client";

import React from 'react';

interface PromoStripProps {
  messages: string[];
}

export default function PromoStrip({ messages }: PromoStripProps) {
  const doubled = [...messages, ...messages];

  return (
    <div className="bg-[#F26522] text-white overflow-hidden h-8 flex items-center">
      <div className="flex whitespace-nowrap promo-scroll">
        {doubled.map((msg, i) => (
          <span key={i} className="inline-flex items-center text-xs font-bold px-8">
            ✨ {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
