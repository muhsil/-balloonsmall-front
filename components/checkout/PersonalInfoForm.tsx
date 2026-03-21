"use client";

import React from 'react';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
}

interface PersonalInfoFormProps {
  customer: CustomerInfo;
  onChange: (customer: CustomerInfo) => void;
}

export default function PersonalInfoForm({ customer, onChange }: PersonalInfoFormProps) {
  const update = (field: keyof CustomerInfo, value: string) => {
    onChange({ ...customer, [field]: value });
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center text-xl font-bold">
          👤
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            First Name
          </label>
          <input
            type="text"
            value={customer.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="form-input"
            placeholder="e.g. Sarah"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={customer.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className="form-input"
            placeholder="e.g. Al Maktoum"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={customer.email}
          onChange={(e) => update('email', e.target.value)}
          className="form-input"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          Street Address (Dubai Only)
        </label>
        <input
          type="text"
          value={customer.address}
          onChange={(e) => update('address', e.target.value)}
          className="form-input"
          placeholder="Building/Villa No, Street, Community"
        />
      </div>
    </div>
  );
}
