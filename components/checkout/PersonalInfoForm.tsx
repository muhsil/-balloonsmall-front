"use client";

import React from 'react';
import FormField from '@/components/ui/FormField';
import SectionCard from '@/components/ui/SectionCard';

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
    <SectionCard icon="👤" title="Personal Information">
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
    </SectionCard>
  );
}
