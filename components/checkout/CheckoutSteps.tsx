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
    <div className="flex items-center gap-4 max-md:gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
      {steps.map((s) => (
        <div key={s.n} className="flex items-center gap-2 shrink-0">
          <div
            className={`w-8 h-8 max-md:w-7 max-md:h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              s.active
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-200'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {s.n}
          </div>
          <span
            className={`text-sm max-md:text-xs font-bold ${
              s.active ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            {s.label}
          </span>
          {s.n < 3 && <div className="w-8 h-0.5 bg-gray-200 mx-1" />}
        </div>
      ))}
    </div>
  );
}
