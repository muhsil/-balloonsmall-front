import Link from 'next/link';
import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ icon = '🎈', title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-lg font-bold text-[#191919] mb-2">{title}</h3>
      {description && <p className="text-sm text-[#999] mb-4 max-w-sm">{description}</p>}
      {actionLabel && actionHref && (
        <Link href={actionHref} className="btn-primary text-sm">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
