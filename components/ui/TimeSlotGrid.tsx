"use client";

import React from 'react';

interface TimeSlotGridProps {
  slots: string[];
  selected: string | null;
  onSelect: (time: string) => void;
}

export default function TimeSlotGrid({ slots, selected, onSelect }: TimeSlotGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 max-md:gap-2">
      {slots.map((time) => {
        const isSelected = selected === time;
        return (
          <button
            key={time}
            onClick={() => onSelect(time)}
            className={`p-3.5 max-md:p-2.5 rounded-xl max-md:rounded-lg border-2 text-sm max-md:text-xs font-black transition-all ${
              isSelected
                ? 'border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-200'
                : 'border-gray-100 bg-white text-gray-600 hover:border-violet-100 hover:bg-violet-50/30'
            }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
