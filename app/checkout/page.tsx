"use client";

import React, { useState, useMemo } from 'react';
import { useCartStore } from '@/store/useCartStore';
import DeliveryScheduler from '@/components/checkout/DeliveryScheduler';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Link from 'next/link';
import { toast } from '@/components/ui/Toast';

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
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
        <PaymentElement options={{ layout: 'tabs' }} />
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 animate-bounce">
          ⚠️ {error}
        </div>
      )}

      <button 
        disabled={isProcessing || !stripe || !elements}
        className="btn-primary w-full py-5 text-lg shadow-xl shadow-violet-200"
      >
        {isProcessing ? (
          <span className="flex items-center gap-3">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Securely...
          </span>
        ) : 'Complete Purchase ✨'}
      </button>
      <p className="text-center text-xs text-gray-400">
        🔒 SSL Encrypted & Secure Stripe Payment
      </p>
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
    city: 'Dubai'
  });

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.price * item.quantity), 0), [items]);
  const isDeliverySelected = !!(deliveryDate && deliveryTime);
  const isFormValid = customer.firstName && customer.email && customer.address && isDeliverySelected;

  const handleCreateOrder = async () => {
    if (!isFormValid) {
      toast("Please complete all delivery and contact details", "error");
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(data.error || "No client secret returned");
      }
    } catch (err) {
      console.error(err);
      toast("Checkout error: " + (err as Error).message, "error");
    } finally {
      setIsInitializing(false);
    }
  };

  if (items.length === 0 && !orderCreated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="text-8xl mb-8 animate-bounce">🎈</div>
        <h1 className="section-title mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-sm">It looks like you haven&apos;t added any magic to your cart yet.</p>
        <Link href="/shop" className="btn-primary">
          Discover Balloons 🛍️
        </Link>
      </div>
    );
  }

  if (orderCreated) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-white to-violet-50">
        <div className="max-w-2xl w-full bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-violet-100 border border-violet-50 relative overflow-hidden">
          {/* Confetti effect background elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400" />
          
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-inner animate-in zoom-in-50 duration-500">
            ✓
          </div>
          
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Woohoo! Order Confirmed</h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">
            Your customized balloons are being prepared with love and will arrive on 
            <span className="text-violet-600 block sm:inline"> {new Date(deliveryDate!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} </span> 
            at <span className="text-violet-600">{deliveryTime}</span>.
          </p>

          <div className="bg-gray-50 p-6 rounded-2xl mb-10 text-left border border-gray-100">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Delivery To</h4>
            <p className="font-bold text-gray-800 text-lg">{customer.firstName} {customer.lastName}</p>
            <p className="text-gray-600">{customer.address}, {customer.city}</p>
          </div>

          <div className="mb-8 p-6 bg-violet-50 rounded-2xl border border-violet-100 flex items-start gap-4">
            <span className="text-2xl">💡</span>
            <p className="text-sm text-violet-700 leading-relaxed font-medium">
              Need help with your order? Our team is available on WhatsApp to assist you with customization or any questions you may have.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = "/"}
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

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16">
      <div className="section-wrapper">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <Link href="/shop" className="text-sm font-bold text-violet-600 hover:text-violet-700 transition-colors flex items-center gap-2 mb-2">
              ← Back to Shop
            </Link>
            <h1 className="section-title">Checkout <span className="gradient-text">Details</span></h1>
          </div>
          <div className="flex items-center gap-6 px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
             <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Amount</p>
                <p className="text-2xl font-black gradient-text">AED {subtotal}</p>
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-12 xl:col-span-8 space-y-8">
            
            {/* Steps Visual (Indicative) */}
            <div className="flex items-center gap-4 mb-4 overflow-x-auto pb-2 no-scrollbar">
              {[
                { n: 1, label: 'Contact', active: true },
                { n: 2, label: 'Delivery', active: true },
                { n: 3, label: 'Payment', active: !!clientSecret }
              ].map(s => (
                <div key={s.n} className="flex items-center gap-2 shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${s.active ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' : 'bg-gray-200 text-gray-500'}`}>
                    {s.n}
                  </div>
                  <span className={`text-sm font-bold ${s.active ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</span>
                  {s.n < 3 && <div className="w-8 h-0.5 bg-gray-200 mx-1" />}
                </div>
              ))}
            </div>

            {!clientSecret ? (
              <>
                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 animate-in fade-in duration-500">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center text-xl font-bold">👤</div>
                    <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">First Name</label>
                      <input type="text" value={customer.firstName} onChange={e => setCustomer({...customer, firstName: e.target.value})} 
                        className="form-input" placeholder="e.g. Sarah" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Last Name</label>
                      <input type="text" value={customer.lastName} onChange={e => setCustomer({...customer, lastName: e.target.value})} 
                        className="form-input" placeholder="e.g. Al Maktoum" />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                    <input type="email" value={customer.email} onChange={e => setCustomer({...customer, email: e.target.value})} 
                      className="form-input" placeholder="your@email.com" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Street Address (Dubai Only)</label>
                    <input type="text" value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} 
                      className="form-input" placeholder="Building/Villa No, Street, Community" />
                  </div>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 animate-in fade-in duration-500 delay-100">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center text-xl font-bold">📅</div>
                    <h3 className="text-2xl font-bold text-gray-900">Delivery Schedule</h3>
                  </div>
                  <DeliveryScheduler />
                </div>

                <div className="px-4">
                  <button 
                    onClick={handleCreateOrder}
                    disabled={!isFormValid || isInitializing}
                    className="btn-primary w-full py-6 text-xl shadow-2xl shadow-violet-200 mt-4 disabled:grayscale"
                  >
                    {isInitializing ? (
                      <span className="flex items-center justify-center gap-3">
                         <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Preparing Payment...
                      </span>
                    ) : (
                      'Continue to Payment 💳'
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-6 font-medium">By proceeding, you agree to our terms of service and delivery policy.</p>
                </div>
              </>
            ) : (
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border-2 border-violet-100 animate-in zoom-in-95 duration-500">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg shadow-violet-200">🔒</div>
                    <h3 className="text-2xl font-black text-gray-900">Secure Payment</h3>
                  </div>
                  <button onClick={() => setClientSecret(null)} className="text-xs font-bold text-gray-400 hover:text-violet-600 underline underline-offset-4">
                    Change Details
                  </button>
                </div>
                
                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe', variables: { colorPrimary: '#7C3AED' } } }}>
                  <CheckoutForm clientSecret={clientSecret} onSuccess={() => {
                    setOrderCreated(true);
                    clearCart();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} />
                </Elements>
              </div>
            )}
          </div>

          {/* Sticky Order Summary Sidebar */}
          <div className="lg:col-span-12 xl:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-50 rounded-bl-[4rem] -z-10 opacity-50" />
              
              <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
                Order Summary <span className="text-violet-600">({items.length})</span>
              </h3>
              
              <div className="space-y-6 mb-10 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform border border-gray-100">
                      🎈
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-extrabold text-gray-900 text-sm leading-tight truncate">{item.name}</p>
                        <p className="font-bold text-violet-600 text-sm whitespace-nowrap">AED {item.price * item.quantity}</p>
                      </div>
                      <p className="text-gray-400 text-xs font-medium mt-1">Quantity: {item.quantity}</p>
                      {item.customText && (
                        <div className="mt-2 text-[10px] bg-violet-50 text-violet-700 px-2 py-1.5 rounded-lg border border-violet-100/50 inline-block max-w-full italic">
                          "{item.customText}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-dashed border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-bold uppercase tracking-wider">Subtotal</span>
                  <span className="text-gray-900 font-bold">AED {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-bold uppercase tracking-wider">Delivery</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-gray-900 font-black text-lg">Total</span>
                  <span className="text-3xl font-black gradient-text">AED {subtotal}</span>
                </div>
              </div>

              {/* Promo code mockup */}
              <div className="mt-8 flex gap-2">
                <input type="text" placeholder="Promo code" className="form-input text-xs py-2 bg-gray-50/50 border-gray-100" />
                <button className="text-xs font-bold text-violet-600 border border-violet-100 px-4 rounded-xl hover:bg-violet-50">Apply</button>
              </div>
            </div>

            {/* Support box */}
            <div className="mt-6 p-6 bg-gradient-to-br from-violet-600 to-pink-500 rounded-[2rem] text-white shadow-xl shadow-violet-200">
               <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">Need help?</p>
               <p className="text-lg font-bold mb-4 leading-tight">Expert assistance is just a message away.</p>
               <a href="https://wa.me/971500000000" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all text-sm">
                 WhatsApp Support 💬
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
