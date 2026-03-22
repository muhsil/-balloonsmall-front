"use client";

import React, { useEffect, useState } from 'react';

export default function TestModeBadge() {
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    fetch('/api/test-mode-status')
      .then((res) => res.json())
      .then((data) => setIsTestMode(data.testMode))
      .catch(() => setIsTestMode(false));
  }, []);

  if (!isTestMode) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-amber-500 text-white text-center py-1.5 px-4 text-xs font-bold tracking-wider shadow-md">
      <span className="inline-flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        TEST MODE — Payments use test cards, no real charges
      </span>
    </div>
  );
}
