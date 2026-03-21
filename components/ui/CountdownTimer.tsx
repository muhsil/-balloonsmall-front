"use client";

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endTime: Date;
  label?: string;
}

export default function CountdownTimer({ endTime, label = 'Ends in' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, endTime.getTime() - now.getTime());
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] font-bold text-[#FF4747]">{label}</span>
      <div className="flex items-center gap-0.5">
        {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((val, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-[10px] font-bold text-[#FF4747]">:</span>}
            <span className="bg-[#FF4747] text-white text-[10px] font-bold px-1 py-0.5 rounded min-w-[20px] text-center">
              {pad(val)}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
