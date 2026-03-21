import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'brand' | 'accent' | 'pink';
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  badge,
  badgeVariant = 'brand',
  title,
  highlight,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  const badgeClass = `badge badge-${badgeVariant}`;

  return (
    <div className={centered ? 'text-center' : ''}>
      {badge && <div className={`${badgeClass} mb-3`}>{badge}</div>}
      <h2 className="section-title">
        {title} {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm md:text-base">{subtitle}</p>
      )}
    </div>
  );
}
