"use client";

import React from 'react';
import { CustomerInfo } from './PersonalInfoForm';

interface OrderSuccessProps {
  deliveryDate: string;
  deliveryTime: string;
  customer: CustomerInfo;
}

export default function OrderSuccess({ deliveryDate, deliveryTime, customer }: OrderSuccessProps) {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-white to-violet-50">
      <div className="max-w-2xl w-full bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-violet-100 border border-violet-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400" />

        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-inner animate-in zoom-in-50 duration-500">
          ✓
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
          Woohoo! Order Confirmed
        </h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">
          Your customized balloons are being prepared with love and will arrive on
          <span className="text-violet-600 block sm:inline">
            {' '}
            {new Date(deliveryDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}{' '}
          </span>
          at <span className="text-violet-600">{deliveryTime}</span>.
        </p>

        <div className="bg-gray-50 p-6 rounded-2xl mb-10 text-left border border-gray-100">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
            Delivery To
          </h4>
          <p className="font-bold text-gray-800 text-lg">
            {customer.firstName} {customer.lastName}
          </p>
          <p className="text-gray-600">
            {customer.address}, {customer.city}
          </p>
        </div>

        <div className="mb-8 p-6 bg-violet-50 rounded-2xl border border-violet-100 flex items-start gap-4">
          <span className="text-2xl">💡</span>
          <p className="text-sm text-violet-700 leading-relaxed font-medium">
            Need help with your order? Our team is available on WhatsApp to assist you with
            customization or any questions you may have.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => (window.location.href = '/')}
            className="px-8 py-4 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
          >
            Continue Shopping
          </button>
          <a
            href="https://wa.me/971500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-violet-600 font-bold rounded-2xl border-2 border-violet-100 hover:bg-violet-50 transition-all text-center"
          >
            Contact Support 💬
          </a>
        </div>
      </div>
    </div>
  );
}
