import Link from 'next/link';
import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ icon, title, description, message, actionLabel, actionHref }: EmptyStateProps) {
  const defaultIcon = (
    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
  );
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <span className="mb-4">{icon || defaultIcon}</span>
      <h3 className="text-lg font-bold text-[#191919] mb-2">{title}</h3>
      {(description || message) && <p className="text-sm text-[#999] mb-4 max-w-sm">{description || message}</p>}
      {actionLabel && actionHref && (
        <Link href={actionHref} className="btn-primary text-sm">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
