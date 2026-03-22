import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
  slug: string;
  name: string;
  price: number;
  regularPrice?: number | null;
  imageSrc?: string;
  categoryName?: string;
  onSale?: boolean;
  featured?: boolean;
  variant?: 'default' | 'compact';
}

export default function ProductCard({
  slug,
  name,
  price,
  regularPrice,
  imageSrc,
  onSale,
  featured,
  variant = 'default',
}: ProductCardProps) {
  const discount = onSale && regularPrice ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;
  const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const soldNum = Math.floor((hash * 7 + price * 3) % 900 + 100);
  const rating = (4.0 + ((hash % 10) / 10)).toFixed(1);

  return (
    <Link href={`/product/${slug}`} className="product-card group block">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-[#f5f5f5]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl max-md:text-4xl text-gray-300">
            🎈
          </div>
        )}

        {/* Discount badge - top left */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-[#E53935] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
            -{discount}%
          </span>
        )}

        {/* Featured badge */}
        {featured && !discount && (
          <span className="absolute top-2 left-2 bg-[#FF6D00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
            HOT
          </span>
        )}
      </div>

      {/* Card body */}
      <div className={variant === 'compact' ? 'p-2' : 'p-2.5'}>
        {/* Product name */}
        <h3 className="text-[13px] text-[#191919] line-clamp-2 leading-[1.4] mb-1.5 min-h-[36px]">
          {name}
        </h3>

        {/* Price row */}
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-lg font-bold text-[#191919] max-md:text-base">
            AED {price.toFixed(0)}
          </span>
          {onSale && regularPrice && (
            <span className="text-xs text-[#999] line-through">
              AED {regularPrice.toFixed(0)}
            </span>
          )}
        </div>

        {/* Rating + Sold row */}
        <div className="flex items-center gap-1.5 text-xs text-[#999]">
          <div className="flex items-center gap-0.5">
            <svg className="w-3 h-3 text-[#FFC107]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{rating}</span>
          </div>
          <span className="text-[#ccc]">|</span>
          <span>{soldNum}+ sold</span>
        </div>
      </div>
    </Link>
  );
}
