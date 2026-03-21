import React from 'react';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

export default function RatingStars({ rating, count, size = 'sm' }: RatingStarsProps) {
  const starSize = size === 'sm' ? 'text-[10px]' : 'text-sm';
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-xs';

  return (
    <div className="flex items-center gap-1">
      <div className={`flex ${starSize}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= Math.round(rating) ? 'text-[#FF9F00]' : 'text-gray-200'}>
            ★
          </span>
        ))}
      </div>
      {count !== undefined && (
        <span className={`${textSize} text-gray-400`}>({count})</span>
      )}
    </div>
  );
}
