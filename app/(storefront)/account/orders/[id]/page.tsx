"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AccountLayout from '@/components/account/AccountLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Link from 'next/link';
import { useStoreSettings } from '@/components/providers/StoreSettingsProvider';

interface OrderLineItem {
  id: number;
  name: string;
  quantity: number;
  total: string;
  price: number;
  image?: { src: string };
  sku: string;
}

interface OrderMeta {
  key: string;
  value: string;
}

interface OrderData {
  id: number;
  status: string;
  date_created: string;
  date_modified: string;
  total: string;
  subtotal?: string;
  shipping_total: string;
  discount_total: string;
  payment_method_title: string;
  currency: string;
  customer_note: string;
  line_items: OrderLineItem[];
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    country: string;
    phone?: string;
  };
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    state: string;
    country: string;
  };
  meta_data: OrderMeta[];
}

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: string; label: string }> = {
  pending: { color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200', icon: '⏳', label: 'Pending Payment' },
  processing: { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: '📦', label: 'Processing' },
  'on-hold': { color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200', icon: '⏸️', label: 'On Hold' },
  completed: { color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: '✅', label: 'Completed' },
  cancelled: { color: 'text-red-700', bg: 'bg-red-50 border-red-200', icon: '❌', label: 'Cancelled' },
  refunded: { color: 'text-gray-600', bg: 'bg-gray-50 border-gray-200', icon: '💰', label: 'Refunded' },
  failed: { color: 'text-red-700', bg: 'bg-red-50 border-red-200', icon: '⚠️', label: 'Failed' },
};

const STATUS_STEPS = ['pending', 'processing', 'completed'];

function StatusTimeline({ current }: { current: string }) {
  const stepLabels: Record<string, string> = {
    pending: 'Order Placed',
    processing: 'Processing',
    completed: 'Delivered',
  };

  const isCancelled = current === 'cancelled' || current === 'failed' || current === 'refunded';
  const currentIdx = STATUS_STEPS.indexOf(current);
  // For statuses not in the steps array (like 'on-hold'), show at least the first step as active
  const effectiveIdx = currentIdx === -1 && !isCancelled ? 0 : currentIdx;

  return (
    <div className="flex items-center gap-1 mt-4">
      {STATUS_STEPS.map((step, idx) => {
        const isActive = !isCancelled && idx <= effectiveIdx;
        const isCurrent = step === current;
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  isActive
                    ? 'bg-[#E53935] border-[#E53935] text-white'
                    : 'bg-white border-gray-200 text-gray-400'
                } ${isCurrent ? 'ring-2 ring-[#E53935]/30' : ''}`}
              >
                {isActive ? '✓' : idx + 1}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-[#191919]' : 'text-gray-400'}`}>
                {stepLabels[step]}
              </span>
            </div>
            {idx < STATUS_STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 mt-[-16px] ${!isCancelled && idx < currentIdx ? 'bg-[#E53935]' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { currency } = useStoreSettings();

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/woo-order?id=${orderId}`);
        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data.order);
      } catch {
        setError('Could not load order details');
      } finally {
        setLoading(false);
      }
    }
    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <AccountLayout title="Order Details">
        <div className="flex justify-center py-12"><LoadingSpinner /></div>
      </AccountLayout>
    );
  }

  if (error || !order) {
    return (
      <AccountLayout title="Order Details">
        <div className="text-center py-12">
          <p className="text-[#999] text-sm">{error || 'Order not found'}</p>
          <Link href="/account/orders" className="text-[#E53935] text-sm font-semibold mt-2 inline-block">
            Back to Orders
          </Link>
        </div>
      </AccountLayout>
    );
  }

  const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
  const deliveryDate = order.meta_data.find((m) => m.key === 'delivery_date')?.value;
  const deliveryTime = order.meta_data.find((m) => m.key === 'delivery_time')?.value;
  const paymentIntentId = order.meta_data.find((m) => m.key === 'ziina_payment_intent_id')?.value;

  return (
    <AccountLayout title={`Order #${order.id}`}>
      <div className="space-y-4">
        {/* Back link */}
        <Link href="/account/orders" className="inline-flex items-center gap-1 text-sm text-[#999] hover:text-[#E53935] transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Orders
        </Link>

        {/* Status Card */}
        <div className={`rounded-xl border p-4 ${statusConfig.bg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">{statusConfig.icon}</span>
              <div>
                <span className={`text-sm font-bold ${statusConfig.color}`}>{statusConfig.label}</span>
                <p className="text-xs text-[#999] mt-0.5">
                  Placed on {new Date(order.date_created).toLocaleDateString('en-AE', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <span className="text-lg font-bold text-[#191919]">{currency} {order.total}</span>
          </div>
          <StatusTimeline current={order.status} />
        </div>

        {/* Delivery Schedule */}
        {(deliveryDate || deliveryTime) && (
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="text-sm font-bold text-[#191919] mb-2 flex items-center gap-2">
              <span>📅</span> Delivery Schedule
            </h3>
            <div className="flex gap-4 text-sm text-[#666]">
              {deliveryDate && (
                <div>
                  <span className="text-xs text-[#999] block">Date</span>
                  <span className="font-medium">{new Date(deliveryDate).toLocaleDateString('en-AE', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                </div>
              )}
              {deliveryTime && (
                <div>
                  <span className="text-xs text-[#999] block">Time</span>
                  <span className="font-medium">{deliveryTime}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Line Items */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-bold text-[#191919] mb-3 flex items-center gap-2">
            <span>🛒</span> Items ({order.line_items.length})
          </h3>
          <div className="divide-y divide-gray-50">
            {order.line_items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="w-14 h-14 rounded-lg bg-[#f5f5f5] overflow-hidden flex-shrink-0">
                  {item.image?.src ? (
                    <img src={item.image.src} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl text-gray-300">🎈</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#191919] truncate">{item.name}</p>
                  <p className="text-xs text-[#999]">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-bold text-[#191919] flex-shrink-0">{currency} {item.total}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-gray-100 mt-3 pt-3 space-y-1.5">
            <div className="flex justify-between text-xs text-[#999]">
              <span>Subtotal</span>
              <span>{currency} {(parseFloat(order.total) - parseFloat(order.shipping_total) + parseFloat(order.discount_total)).toFixed(0)}</span>
            </div>
            {parseFloat(order.shipping_total) > 0 && (
              <div className="flex justify-between text-xs text-[#999]">
                <span>Shipping</span>
                <span>{currency} {order.shipping_total}</span>
              </div>
            )}
            {parseFloat(order.discount_total) > 0 && (
              <div className="flex justify-between text-xs text-green-600">
                <span>Discount</span>
                <span>-{currency} {order.discount_total}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-[#191919] pt-1">
              <span>Total</span>
              <span>{currency} {order.total}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-bold text-[#191919] mb-2 flex items-center gap-2">
            <span>📦</span> Shipping Address
          </h3>
          <div className="text-sm text-[#666] space-y-0.5">
            <p className="font-medium text-[#333]">{order.shipping.first_name} {order.shipping.last_name}</p>
            {order.shipping.address_1 && <p>{order.shipping.address_1}</p>}
            <p>{[order.shipping.city, order.shipping.state, order.shipping.country].filter(Boolean).join(', ')}</p>
            {order.shipping.phone && <p>{order.shipping.phone}</p>}
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-bold text-[#191919] mb-2 flex items-center gap-2">
            <span>💳</span> Payment
          </h3>
          <div className="text-sm text-[#666] space-y-1">
            <div className="flex justify-between">
              <span>Method</span>
              <span className="font-medium text-[#333]">{order.payment_method_title || 'N/A'}</span>
            </div>
            {paymentIntentId && (
              <div className="flex justify-between">
                <span>Transaction ID</span>
                <span className="font-mono text-xs text-[#999]">{paymentIntentId.slice(0, 16)}...</span>
              </div>
            )}
          </div>
        </div>

        {/* Customer Note */}
        {order.customer_note && (
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="text-sm font-bold text-[#191919] mb-2 flex items-center gap-2">
              <span>📝</span> Order Notes
            </h3>
            <p className="text-sm text-[#666]">{order.customer_note}</p>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
