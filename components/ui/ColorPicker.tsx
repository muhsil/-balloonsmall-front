"use client";

import React from 'react';

interface ColorPickerProps {
  colors: string[];
  selected: string;
  onChange: (color: string) => void;
  showCustom?: boolean;
}

export default function ColorPicker({ colors, selected, onChange, showCustom = true }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2 max-md:gap-1.5">
      {colors.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className="w-9 h-9 max-md:w-8 max-md:h-8 rounded-full border-2 transition-all hover:scale-110"
          style={{
            backgroundColor: c,
            borderColor: selected === c ? '#7C3AED' : '#e5e7eb',
            boxShadow: selected === c ? '0 0 0 3px #ede9fe' : 'none',
          }}
        />
      ))}
      {showCustom && (
        <input
          type="color"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="w-9 h-9 max-md:w-8 max-md:h-8 rounded-full cursor-pointer border-2 border-gray-200 p-0.5"
          title="Custom color"
        />
      )}
    </div>
  );
}
