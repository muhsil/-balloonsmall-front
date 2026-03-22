"use client";

import React, { useEffect, useState } from 'react';
import AccountLayout from '@/components/account/AccountLayout';
import AddressCard from '@/components/account/AddressCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuthStore } from '@/store/useAuthStore';

interface AddressData {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email?: string;
}

interface CustomerData {
  billing: AddressData;
  shipping: AddressData;
}

export default function AddressesPage() {
  const [data, setData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);
  const authCustomer = useAuthStore((s) => s.customer);

  useEffect(() => {
    async function fetchAddresses() {
      try {
        const url = authCustomer?.id ? `/api/woo-customer?id=${authCustomer.id}` : '/api/woo-customer';
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          setData(json.customer);
        }
      } catch (err) {
        console.error('Failed to fetch addresses:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAddresses();
  }, []);

  return (
    <AccountLayout title="My Addresses">
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AddressCard
            type="shipping"
            name={data ? `${data.shipping.first_name} ${data.shipping.last_name}`.trim() : ''}
            address={data?.shipping.address_1 || ''}
            city={data?.shipping.city || ''}
            state={data?.shipping.state}
            country={data?.shipping.country || ''}
            phone={data?.shipping.phone}
          />
          <AddressCard
            type="billing"
            name={data ? `${data.billing.first_name} ${data.billing.last_name}`.trim() : ''}
            address={data?.billing.address_1 || ''}
            city={data?.billing.city || ''}
            state={data?.billing.state}
            country={data?.billing.country || ''}
            phone={data?.billing.phone}
            email={data?.billing.email}
          />
        </div>
      )}
    </AccountLayout>
  );
}
