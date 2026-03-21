"use client";

import React from 'react';
import FormField from '@/components/ui/FormField';

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
    <div className="bg-white p-8 md:p-10 max-md:p-5 rounded-[2rem] max-md:rounded-2xl shadow-sm border border-gray-100 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 max-md:gap-2 mb-8 max-md:mb-5">
        <div className="w-10 h-10 max-md:w-8 max-md:h-8 bg-violet-50 text-violet-600 rounded-xl max-md:rounded-lg flex items-center justify-center text-xl max-md:text-base font-bold">
          👤
        </div>
        <h3 className="text-2xl max-md:text-lg font-bold text-gray-900">Personal Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-md:gap-4 mb-6 max-md:mb-4">
        <FormField
          label="First Name"
          type="text"
          value={customer.firstName}
          onChange={(v) => update('firstName', v)}
          placeholder="e.g. Sarah"
        />
        <FormField
          label="Last Name"
          type="text"
          value={customer.lastName}
          onChange={(v) => update('lastName', v)}
          placeholder="e.g. Al Maktoum"
        />
      </div>

      <div className="mb-6 max-md:mb-4">
        <FormField
          label="Email Address"
          type="email"
          value={customer.email}
          onChange={(v) => update('email', v)}
          placeholder="your@email.com"
        />
      </div>

      <FormField
        label="Street Address (Dubai Only)"
        type="text"
        value={customer.address}
        onChange={(v) => update('address', v)}
        placeholder="Building/Villa No, Street, Community"
      />
    </div>
  );
}
