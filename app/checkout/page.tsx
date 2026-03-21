"use client";

import React, { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import DeliveryScheduler from '@/components/checkout/DeliveryScheduler';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_dummy');

function CheckoutForm({ clientSecret, onSuccess }: { clientSecret: string, onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout`,
      },
      redirect: 'if_required' 
    });

    if (error) {
      setError(error.message || 'An unexpected error occurred.');
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <PaymentElement />
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      <button 
        disabled={isProcessing || !stripe || !elements}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-md transition-colors disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { items, deliveryDate, deliveryTime, clearCart } = useCartStore();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderCreated, setOrderCreated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: 'Dubai' // Default for this store based on initial requirements
  });

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isDeliverySelected = !!(deliveryDate && deliveryTime);
  const isFormValid = customer.firstName && customer.email && customer.address && isDeliverySelected;

  const handleCreateOrder = async () => {
    if (!isFormValid) {
      alert("Please fill in all contact details and select a delivery schedule.");
      return;
    }

    try {
      setIsInitializing(true);
      const resWoo = await fetch('/api/woo-create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: 'stripe',
          paymentMethodTitle: 'Credit Card (Stripe)',
          isPaid: false,
          items,
          deliveryDate,
          deliveryTime,
          billing: { 
            first_name: customer.firstName, 
            last_name: customer.lastName,
            email: customer.email,
            address_1: customer.address,
            city: customer.city
          },
          shipping: { 
            first_name: customer.firstName,
            last_name: customer.lastName,
            address_1: customer.address,
            city: customer.city
          },
        })
      });

      if (!resWoo.ok && resWoo.status === 500) {
        console.warn("WooCommerce failed. Mocking payment intent.");
      }

      const resStripe = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: subtotal })
      });
      const data = await resStripe.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error(data.error || "No client secret returned");
      }
    } catch (err) {
      console.error(err);
      alert("Error initializing checkout. " + (err as Error).message);
    } finally {
      setIsInitializing(false);
    }
  };

  if (items.length === 0 && !orderCreated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <Link href="/shop" className="text-blue-600 hover:underline">Go back to Shop</Link>
      </div>
    );
  }

  if (orderCreated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 animate-in zoom-in-95">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">✓</div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">Your customized balloons are being prepared for delivery to <strong className="text-gray-900">{customer.address}</strong> on <strong className="text-gray-900">{new Date(deliveryDate!).toLocaleDateString()}</strong> at <strong className="text-gray-900">{deliveryTime}</strong>.</p>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl w-full block shadow-md transition-colors">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/shop" className="text-gray-500 hover:text-blue-600 transition-colors">← Back to Shop</Link>
          <h1 className="text-4xl font-extrabold text-gray-900">Secure Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact & Delivery Details</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" value={customer.firstName} onChange={e => setCustomer({...customer, firstName: e.target.value})} className="w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" value={customer.lastName} onChange={e => setCustomer({...customer, lastName: e.target.value})} className="w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Doe" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" value={customer.email} onChange={e => setCustomer({...customer, email: e.target.value})} className="w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="muhsiltomsher@gmail.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input type="text" value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} className="w-full border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="House 123, Street Name (Dubai)" />
              </div>
            </div>

            <DeliveryScheduler />

            {!clientSecret ? (
              <button 
                onClick={handleCreateOrder}
                disabled={!isFormValid || isInitializing}
                className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white font-bold py-5 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:-translate-y-1"
              >
                {isInitializing ? 'Preparing Checkout...' : 'Proceed to Payment Setup'}
              </button>
            ) : (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mt-6 animate-in fade-in zoom-in-95">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h3>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm clientSecret={clientSecret!} onSuccess={() => {
                    setOrderCreated(true);
                    clearCart();
                  }} />
                </Elements>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Order Summary</h3>
              <div className="space-y-5 mb-8">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 text-lg">{item.name}</p>
                      <p className="text-gray-500 text-sm mb-1">Qty: {item.quantity}</p>
                      {item.customText && (
                        <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-600">
                          <span className="font-medium">Text:</span> "{item.customText}" <br/>
                          <span className="font-medium">Color:</span> 
                          <span className="inline-block w-3 h-3 rounded-full ml-1 align-middle border" style={{backgroundColor: item.customColor}}></span>
                        </div>
                      )}
                    </div>
                    <p className="font-bold text-gray-900 text-lg whitespace-nowrap">AED {item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-6 flex justify-between items-center text-xl">
                <span className="font-extrabold text-gray-900">Total</span>
                <span className="font-extrabold text-blue-600 text-2xl">AED {subtotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
