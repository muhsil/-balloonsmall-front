import Link from 'next/link';
import React from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="text-center py-28 max-md:py-16 space-y-4 px-4">
      <div className="text-7xl max-md:text-5xl">{icon}</div>
      <h3 className="text-2xl max-md:text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="btn-primary mt-4 inline-flex">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
