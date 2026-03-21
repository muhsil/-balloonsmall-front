import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
  slug: string;
  name: string;
  price: number;
  regularPrice?: number | null;
  imageSrc?: string;
  categoryName?: string;
  categoryIcon?: string;
  categoryGradient?: string;
  onSale?: boolean;
  featured?: boolean;
  trending?: boolean;
  shortDescription?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export default function ProductCard({
  slug,
  name,
  price,
  regularPrice,
  imageSrc,
  categoryName,
  categoryIcon = '🎈',
  categoryGradient = 'from-gray-400 to-gray-600',
  onSale,
  featured,
  trending,
  shortDescription,
  variant = 'default',
}: ProductCardProps) {
  const isCompact = variant === 'compact';
  const paddingBottom = variant === 'featured' ? '56%' : '72%';

  return (
    <Link href={`/product/${slug}`} className="product-card group block">
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ paddingBottom: isCompact ? undefined : paddingBottom }}
      >
        <div className={isCompact ? 'aspect-video' : 'absolute inset-0'}>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${categoryGradient} flex items-center justify-center`}
            >
              <span className="text-8xl opacity-60 max-md:text-5xl">{categoryIcon}</span>
            </div>
          )}
          {/* Hover overlay - hidden on mobile for performance */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block" />
          <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-1 duration-300 hidden md:block">
            <span className="bg-white text-violet-700 text-sm font-bold px-5 py-2 rounded-full shadow-lg inline-block">
              Customize & Order
            </span>
          </div>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 max-md:top-2 max-md:left-2">
          {onSale && <span className="badge badge-pink text-xs">Sale</span>}
          {featured && <span className="badge badge-accent text-xs">Featured</span>}
          {trending && <span className="badge badge-brand text-xs">Trending</span>}
        </div>
      </div>

      {/* Card body */}
      <div className={isCompact ? 'p-4' : 'p-5 max-md:p-3'}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            {categoryName && (
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--color-brand)' }}
              >
                {categoryIcon} {categoryName}
              </span>
            )}
            <h3 className="font-extrabold text-gray-900 mt-0.5 text-lg leading-snug line-clamp-2 max-md:text-base">
              {name}
            </h3>
          </div>
        </div>
        {shortDescription && !isCompact && (
          <p
            className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: shortDescription }}
          />
        )}
        <div className="flex items-center justify-between mt-3 max-md:mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold gradient-text max-md:text-lg">
              AED {price.toFixed(0)}
            </span>
            {onSale && regularPrice && (
              <span className="text-gray-400 text-sm line-through">
                AED {regularPrice.toFixed(0)}
              </span>
            )}
          </div>
          <div
            className={`w-9 h-9 max-md:w-7 max-md:h-7 rounded-full bg-gradient-to-br ${categoryGradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform text-white text-lg max-md:text-sm`}
          >
            →
          </div>
        </div>
      </div>
    </Link>
  );
}
