"use client";

import React from 'react';

interface Step {
  n: number;
  label: string;
  active: boolean;
}

interface CheckoutStepsProps {
  paymentReady: boolean;
}

export default function CheckoutSteps({ paymentReady }: CheckoutStepsProps) {
  const steps: Step[] = [
    { n: 1, label: 'Contact', active: true },
    { n: 2, label: 'Delivery', active: true },
    { n: 3, label: 'Payment', active: paymentReady },
  ];

  return (
    <div className="flex items-center gap-3 max-md:gap-1.5 overflow-x-auto pb-1 no-scrollbar">
      {steps.map((s) => (
        <div key={s.n} className="flex items-center gap-1.5 shrink-0">
          <div
            className={`w-7 h-7 max-md:w-6 max-md:h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
              s.active
                ? 'bg-[#E53935] text-white'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            {s.n}
          </div>
          <span
            className={`text-xs font-bold ${
              s.active ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            {s.label}
          </span>
          {s.n < 3 && <div className="w-6 h-0.5 bg-gray-200 mx-0.5" />}
        </div>
      ))}
    </div>
  );
}
