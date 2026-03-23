"use client";

import React from 'react';
import Link from 'next/link';

interface OrderCardProps {
  orderId: number;
  date: string;
  status: string;
  total: string;
  currency: string;
  itemCount: number;
}

const STATUS_COLORS: Record<string, string> = {
  completed: 'bg-green-100 text-green-700',
  processing: 'bg-blue-100 text-blue-700',
  pending: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-gray-100 text-gray-600',
  failed: 'bg-red-100 text-red-700',
  'on-hold': 'bg-orange-100 text-orange-700',
};

export default function OrderCard({ orderId, date, status, total, currency, itemCount }: OrderCardProps) {
  const statusColor = STATUS_COLORS[status] || 'bg-gray-100 text-gray-600';

  return (
    <Link href={`/account/orders/${orderId}`} className="block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-[#E53935]/20 transition-all cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-[#191919] text-sm">#{orderId}</span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${statusColor}`}>
          {status.replace('-', ' ')}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs text-[#999]">
        <span>{new Date(date).toLocaleDateString('en-AE', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        <span>{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-50 flex items-center justify-between">
        <span className="text-sm font-bold text-[#191919]">{currency} {total}</span>
        <span className="text-xs text-[#E53935] font-medium">View Details &rarr;</span>
      </div>
    </Link>
  );
}
