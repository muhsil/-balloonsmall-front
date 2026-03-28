"use client";

import React from 'react';
import FormField from '@/components/ui/FormField';
import CountrySelect from '@/components/ui/CountrySelect';
import PhoneInput from '@/components/ui/PhoneInput';
import SectionCard from '@/components/ui/SectionCard';

export interface BillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

interface BillingAddressFormProps {
  sameAsShipping: boolean;
  onSameAsShippingChange: (same: boolean) => void;
  billing: BillingInfo;
  onChange: (billing: BillingInfo) => void;
}

export default function BillingAddressForm({
  sameAsShipping,
  onSameAsShippingChange,
  billing,
  onChange,
}: BillingAddressFormProps) {
  const update = (field: keyof BillingInfo, value: string) => {
    onChange({ ...billing, [field]: value });
  };

  return (
    <SectionCard title="Billing Address">
      <label className="flex items-center gap-3 cursor-pointer mb-4">
        <input
          type="checkbox"
          checked={sameAsShipping}
          onChange={(e) => onSameAsShippingChange(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-[#E53935] focus:ring-[#E53935] cursor-pointer"
        />
        <span className="text-sm text-gray-700 font-medium">Same as shipping address</span>
      </label>

      {!sameAsShipping && (
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField
              label="First Name"
              value={billing.firstName}
              onChange={(v) => update('firstName', v)}
              placeholder="First name"
              required
            />
            <FormField
              label="Last Name"
              value={billing.lastName}
              onChange={(v) => update('lastName', v)}
              placeholder="Last name"
            />
          </div>

          <FormField
            label="Email"
            type="email"
            value={billing.email}
            onChange={(v) => update('email', v)}
            placeholder="billing@email.com"
            required
          />

          <PhoneInput
            countryCode={billing.countryCode}
            phone={billing.phone}
            onCountryCodeChange={(v) => update('countryCode', v)}
            onPhoneChange={(v) => update('phone', v)}
            required
          />

          <FormField
            label="Address"
            value={billing.address}
            onChange={(v) => update('address', v)}
            placeholder="Street address"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="City"
              value={billing.city}
              onChange={(v) => update('city', v)}
              placeholder="City"
              required
            />
            <FormField
              label="State / Province"
              value={billing.state}
              onChange={(v) => update('state', v)}
              placeholder="State or province"
            />
          </div>

          <CountrySelect
            value={billing.country}
            onChange={(v) => update('country', v)}
            required
          />
        </div>
      )}
    </SectionCard>
  );
}
