import Link from 'next/link';
import React from 'react';

interface CategoryCardProps {
  name: string;
  image: string;
  slug: string;
  color: string;
}

export default function CategoryCard({ name, image, slug, color }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${slug}`}
      className="group relative rounded-2xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all hover:-translate-y-2 max-md:rounded-xl max-md:hover:-translate-y-0 max-md:active:scale-[0.97]"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t ${color} opacity-50 group-hover:opacity-70 transition-opacity`}
      />
      <div className="absolute inset-0 flex items-end p-5 max-md:p-3">
        <span className="text-white font-bold text-lg max-md:text-sm drop-shadow-md">{name}</span>
      </div>
    </Link>
  );
}
