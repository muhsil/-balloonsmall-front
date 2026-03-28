"use client";

import React, { useEffect, useState } from 'react';
import AccountLayout from '@/components/account/AccountLayout';
import OrderCard from '@/components/account/OrderCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import { useStoreSettings } from '@/components/providers/StoreSettingsProvider';
import { useAuthStore } from '@/store/useAuthStore';

interface WooOrder {
  id: number;
  date_created: string;
  status: string;
  total: string;
  currency: string;
  line_items: { id: number }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<WooOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { currency } = useStoreSettings();
  const customer = useAuthStore((s) => s.customer);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const url = customer?.id ? `/api/woo-orders?customer_id=${customer.id}` : '/api/woo-orders';
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <AccountLayout title="My Orders">
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          message="When you place an order, it will appear here."
          actionLabel="Start Shopping"
          actionHref="/shop"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              orderId={order.id}
              date={order.date_created}
              status={order.status}
              total={order.total}
              currency={currency}
              itemCount={order.line_items.length}
            />
          ))}
        </div>
      )}
    </AccountLayout>
  );
}
