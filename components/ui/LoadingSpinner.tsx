import React from 'react';

interface LoadingSpinnerProps {
  title?: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({
  title,
  subtitle,
  size = 'md',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <svg
        className={`animate-spin ${sizeClasses[size]} text-violet-600 mb-6`}
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
      {title && <h2 className="text-2xl font-black text-gray-900 mb-2">{title}</h2>}
      {subtitle && <p className="text-gray-500">{subtitle}</p>}
    </div>
  );
}
