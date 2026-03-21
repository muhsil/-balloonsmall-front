import React from 'react';

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export default function TestimonialCard({ name, role, text, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 max-md:p-5 shadow-sm border border-white">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-400">
            ★
          </span>
        ))}
      </div>
      <p className="text-gray-600 mb-6 max-md:mb-4 leading-relaxed italic text-sm md:text-base">
        &quot;{text}&quot;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 max-md:w-9 max-md:h-9 rounded-full bg-violet-100 flex items-center justify-center text-2xl max-md:text-xl">
          {avatar}
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm">{name}</p>
          <p className="text-gray-400 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}
