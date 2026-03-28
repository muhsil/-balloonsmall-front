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
        <span className="text-[#E53935]">{type === 'billing' ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}</span>
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
