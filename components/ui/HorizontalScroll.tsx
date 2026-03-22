import React from 'react';

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export default function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  return (
    <div className={`flex overflow-x-auto no-scrollbar gap-2 ${className}`}>
      {children}
    </div>
  );
}
