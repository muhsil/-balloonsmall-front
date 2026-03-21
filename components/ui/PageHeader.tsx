import Link from 'next/link';
import React from 'react';

interface PageHeaderProps {
  backHref?: string;
  backLabel?: string;
  title: string;
  highlight?: string;
  badge?: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
}

export default function PageHeader({
  backHref,
  backLabel = 'Back',
  title,
  highlight,
  badge,
  subtitle,
  rightContent,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 max-md:gap-3 mb-12 max-md:mb-6">
      <div>
        {backHref && (
          <Link
            href={backHref}
            className="text-sm max-md:text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors flex items-center gap-2 mb-2 max-md:mb-1"
          >
            &larr; {backLabel}
          </Link>
        )}
        {badge && <div className="badge badge-brand mb-3 max-md:mb-2">{badge}</div>}
        <h1 className="section-title max-md:text-2xl">
          {title} {highlight && <span className="gradient-text">{highlight}</span>}
        </h1>
        {subtitle && (
          <p className="text-gray-500 max-w-md mx-auto max-md:text-sm mt-2">{subtitle}</p>
        )}
      </div>
      {rightContent && <div>{rightContent}</div>}
    </div>
  );
}
