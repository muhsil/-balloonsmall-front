"use client";

import React from 'react';

interface AddressCardProps {
  type: 'billing' | 'shipping';
  name: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  phone?: string;
  email?: string;
}

export default function AddressCard({
  type,
  name,
  address,
  city,
  state,
  country,
  phone,
  email,
}: AddressCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">{type === 'billing' ? '🧾' : '📦'}</span>
        <h3 className="font-bold text-sm text-[#191919] capitalize">{type} Address</h3>
      </div>
      <div className="text-sm text-[#666] space-y-1">
        <p className="font-medium text-[#333]">{name || 'Not set'}</p>
        {address && <p>{address}</p>}
        {city && (
          <p>
            {city}
            {state ? `, ${state}` : ''}
          </p>
        )}
        {country && <p>{country}</p>}
        {phone && <p>{phone}</p>}
        {email && <p>{email}</p>}
        {!name && !address && (
          <p className="text-[#999] italic">No address saved yet</p>
        )}
      </div>
    </div>
  );
}
