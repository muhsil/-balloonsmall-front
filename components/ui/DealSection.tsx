import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';

interface DealSectionProps {
  title: string;
  subtitle?: string;
  href: string;
  products: any[];
  icon?: string;
  accentColor?: string;
  children?: React.ReactNode;
  currency?: string;
}

export default function DealSection({
  title,
  subtitle,
  href,
  products,
  icon,
  accentColor = '#E53935',
  children,
  currency = 'AED',
}: DealSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="bg-white rounded-lg border border-[#f0f0f0] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2">
          {icon && <span className="text-base">{icon}</span>}
          <h2 className="text-base font-bold" style={{ color: accentColor }}>{title}</h2>
          {subtitle && <span className="text-xs text-[#999]">{subtitle}</span>}
          {children}
        </div>
        <Link href={href} className="text-xs text-[#999] hover:text-[#E53935] flex items-center gap-0.5">
          View all
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Product scroll */}
      <div className="flex overflow-x-auto no-scrollbar gap-0 p-0">
        {products.map((p: any) => (
          <div key={p.id} className="w-[180px] max-md:w-[145px] shrink-0 border-r border-[#f0f0f0] last:border-r-0">
            <ProductCard
              slug={p.slug}
              name={p.name}
              price={parseFloat(p.price || '0')}
              regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
              imageSrc={p.images?.[0]?.src}
              onSale={p.on_sale}
              featured={p.featured}
              variant="compact"
              currency={currency}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
