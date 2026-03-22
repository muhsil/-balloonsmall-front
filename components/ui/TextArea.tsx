"use client";

import React from 'react';

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
}

export default function TextArea({
  label,
  value,
  onChange,
  placeholder,
  required,
  rows = 3,
  maxLength,
}: TextAreaProps) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input w-full resize-none"
        placeholder={placeholder}
        required={required}
        rows={rows}
        maxLength={maxLength}
      />
      {maxLength && (
        <p className="text-xs text-gray-400 mt-1 text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
}
