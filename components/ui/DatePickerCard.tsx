"use client";

import React from 'react';

interface DatePickerCardProps {
  month: string;
  day: string;
  weekday: string;
  selected: boolean;
  onClick: () => void;
}

export default function DatePickerCard({ month, day, weekday, selected, onClick }: DatePickerCardProps) {
  return (
    <button
      onClick={onClick}
      className={`min-w-[80px] max-md:min-w-[68px] p-4 max-md:p-3 rounded-2xl max-md:rounded-xl border-2 text-center transition-all duration-300 ${
        selected
          ? 'border-violet-600 bg-violet-600 text-white shadow-xl shadow-violet-200 scale-105'
          : 'border-gray-100 bg-white text-gray-600 hover:border-violet-200 hover:shadow-lg'
      }`}
    >
      <div className={`text-[10px] max-md:text-[9px] uppercase font-black tracking-widest mb-1 ${selected ? 'text-white/80' : 'text-gray-400'}`}>
        {month}
      </div>
      <div className="text-3xl max-md:text-2xl font-black mb-1">{day}</div>
      <div className={`text-[10px] max-md:text-[9px] font-bold ${selected ? 'text-white/80' : 'text-gray-400'}`}>
        {weekday}
      </div>
    </button>
  );
}
