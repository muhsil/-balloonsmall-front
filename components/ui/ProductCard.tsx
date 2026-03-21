import Link from 'next/link';
import React from 'react';
import DealBadge from '@/components/ui/DealBadge';
import RatingStars from '@/components/ui/RatingStars';
import SoldCount from '@/components/ui/SoldCount';

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
  variant = 'default',
}: ProductCardProps) {
  const discount = onSale && regularPrice ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;
  const soldNum = Math.floor(Math.random() * 900 + 100);
  const rating = 4.5 + Math.random() * 0.5;

  return (
    <Link href={`/product/${slug}`} className="product-card group block">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${categoryGradient} flex items-center justify-center`}>
            <span className="text-6xl max-md:text-4xl opacity-60">{categoryIcon}</span>
          </div>
        )}

        {/* Desktop hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center">
          <span className="bg-white text-[#F26522] text-sm font-bold px-5 py-2 rounded-full shadow-lg">
            View Details
          </span>
        </div>

        {/* Badges - top left */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discount > 0 && <DealBadge text={`-${discount}%`} variant="red" />}
          {featured && <DealBadge text="HOT" variant="orange" />}
          {trending && <DealBadge text="TRENDING" variant="orange" />}
        </div>
      </div>

      {/* Card body - Temu style compact */}
      <div className={`p-3 max-md:p-2 ${variant === 'compact' ? 'p-2' : ''}`}>
        {/* Price row */}
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-base font-extrabold text-[#F26522] max-md:text-sm">
            AED {price.toFixed(0)}
          </span>
          {onSale && regularPrice && (
            <span className="text-xs text-gray-400 line-through">
              AED {regularPrice.toFixed(0)}
            </span>
          )}
        </div>

        {/* Product name */}
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight mb-1.5 max-md:text-xs">
          {name}
        </h3>

        {/* Rating + Sold */}
        <div className="flex items-center gap-2">
          <RatingStars rating={rating} />
          <SoldCount count={soldNum} />
        </div>

        {/* Category tag */}
        {categoryName && variant !== 'compact' && (
          <div className="mt-1.5">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              {categoryIcon} {categoryName}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
