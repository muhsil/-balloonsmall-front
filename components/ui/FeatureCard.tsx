import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center p-8 max-md:p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-50">
      <div className="text-5xl max-md:text-4xl mb-5 max-md:mb-3">{icon}</div>
      <h3 className="font-bold text-gray-900 mb-2 text-lg max-md:text-base">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed max-md:text-xs">{description}</p>
    </div>
  );
}
