"use client";

import React from 'react';

interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  disabled,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
