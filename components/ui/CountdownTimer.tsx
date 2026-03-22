'use client';
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  hours?: number;
  className?: string;
}

export default function CountdownTimer({ hours = 12, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(hours * 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="text-xs text-[#999] font-medium">Ends in:</span>
      <div className="flex items-center gap-0.5">
        <span className="bg-[#191919] text-white text-[11px] font-bold px-1 py-0.5 rounded-sm min-w-[22px] text-center">{pad(h)}</span>
        <span className="text-[#191919] text-xs font-bold">:</span>
        <span className="bg-[#191919] text-white text-[11px] font-bold px-1 py-0.5 rounded-sm min-w-[22px] text-center">{pad(m)}</span>
        <span className="text-[#191919] text-xs font-bold">:</span>
        <span className="bg-[#191919] text-white text-[11px] font-bold px-1 py-0.5 rounded-sm min-w-[22px] text-center">{pad(s)}</span>
      </div>
    </div>
  );
}
