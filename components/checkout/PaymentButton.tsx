"use client";

import React from 'react';

interface PaymentButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  label?: string;
  loadingLabel?: string;
}

export default function PaymentButton({ onClick, disabled, isLoading, label = 'Place Order', loadingLabel = 'Preparing Payment...' }: PaymentButtonProps) {
  return (
    <div className="px-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className="btn-primary w-full py-6 text-xl shadow-2xl shadow-violet-200 mt-4 disabled:grayscale"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <svg
              className="animate-spin h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {loadingLabel}
          </span>
        ) : (
          label
        )}
      </button>
      <p className="text-center text-xs text-gray-400 mt-6 font-medium">
        By proceeding, you agree to our terms of service and delivery policy.
      </p>
    </div>
  );
}
