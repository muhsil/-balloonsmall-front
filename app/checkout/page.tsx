"use client";

import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { toast } from '@/components/ui/Toast';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import PersonalInfoForm, { CustomerInfo } from '@/components/checkout/PersonalInfoForm';
import DeliveryScheduler from '@/components/checkout/DeliveryScheduler';
import OrderSummary from '@/components/checkout/OrderSummary';
import OrderSuccess from '@/components/checkout/OrderSuccess';
import EmptyCart from '@/components/checkout/EmptyCart';
import SupportBox from '@/components/checkout/SupportBox';
import PaymentButton from '@/components/checkout/PaymentButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SectionCard from '@/components/ui/SectionCard';
import PaymentMethodCard from '@/components/ui/PaymentMethodCard';
import PriceDisplay from '@/components/ui/PriceDisplay';

const CHECKOUT_DATA_KEY = 'balloonsmall-checkout';

interface CheckoutData {
  customer: CustomerInfo;
  deliveryDate: string;
  deliveryTime: string;
}

function saveCheckoutData(data: CheckoutData) {
  sessionStorage.setItem(CHECKOUT_DATA_KEY, JSON.stringify(data));
}

function loadCheckoutData(): CheckoutData | null {
  const raw = sessionStorage.getItem(CHECKOUT_DATA_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function clearCheckoutData() {
  sessionStorage.removeItem(CHECKOUT_DATA_KEY);
}

function CheckoutContent() {
  const { items, deliveryDate, deliveryTime, clearCart } = useCartStore();
  const searchParams = useSearchParams();

  const [orderCreated, setOrderCreated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [savedDeliveryDate, setSavedDeliveryDate] = useState<string | null>(null);
  const [savedDeliveryTime, setSavedDeliveryTime] = useState<string | null>(null);

  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: 'Dubai',
  });

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const isDeliverySelected = !!(deliveryDate && deliveryTime);
  const isFormValid = customer.firstName && customer.email && customer.address && isDeliverySelected;

  const verifyPayment = useCallback(async (paymentIntentId: string) => {
    setIsVerifying(true);
    try {
      const res = await fetch(`/api/verify-payment?id=${paymentIntentId}`);
      const data = await res.json();

      if (data.status === 'completed') {
        const saved = loadCheckoutData();
        if (saved) {
          setCustomer(saved.customer);
          setSavedDeliveryDate(saved.deliveryDate);
          setSavedDeliveryTime(saved.deliveryTime);
        }
        setOrderCreated(true);
        clearCart();
        clearCheckoutData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (data.status === 'failed') {
        toast('Payment failed. Please try again.', 'error');
      } else if (data.status === 'pending' || data.status === 'requires_user_action') {
        toast('Payment is still processing. Please wait...', 'info');
      } else {
        toast('Payment was not completed. Please try again.', 'error');
      }
    } catch (err) {
      console.error('Payment verification error:', err);
      toast('Could not verify payment. Please contact support.', 'error');
    } finally {
      setIsVerifying(false);
    }
  }, [clearCart]);

  useEffect(() => {
    const paymentIntentId = searchParams.get('payment_intent_id');
    const status = searchParams.get('status');

    if (paymentIntentId && status === 'success') {
      verifyPayment(paymentIntentId);
    } else if (status === 'cancelled') {
      toast('Payment was cancelled. You can try again.', 'error');
    }
  }, [searchParams, verifyPayment]);

  const handleCreateOrder = async () => {
    if (!isFormValid) {
      toast('Please complete all delivery and contact details', 'error');
      return;
    }

    try {
      setIsInitializing(true);

      const resWoo = await fetch('/api/woo-create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: 'ziina',
          paymentMethodTitle: 'Ziina Payment',
          isPaid: false,
          items,
          deliveryDate,
          deliveryTime,
          billing: {
            first_name: customer.firstName,
            last_name: customer.lastName,
            email: customer.email,
            address_1: customer.address,
            city: customer.city,
          },
          shipping: {
            first_name: customer.firstName,
            last_name: customer.lastName,
            address_1: customer.address,
            city: customer.city,
          },
        }),
      });

      if (!resWoo.ok && resWoo.status === 500) {
        console.warn('WooCommerce order creation failed, continuing with payment...');
      }

      saveCheckoutData({
        customer,
        deliveryDate: deliveryDate!,
        deliveryTime: deliveryTime!,
      });

      const origin = window.location.origin;
      const resPayment = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: subtotal,
          message: `BalloonsMall Order - ${customer.firstName} ${customer.lastName}`,
          successUrl: `${origin}/checkout?status=success&payment_intent_id={PAYMENT_INTENT_ID}`,
          cancelUrl: `${origin}/checkout?status=cancelled`,
        }),
      });

      const data = await resPayment.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error(data.error || 'No redirect URL returned');
      }
    } catch (err) {
      console.error(err);
      toast('Checkout error: ' + (err as Error).message, 'error');
    } finally {
      setIsInitializing(false);
    }
  };

  if (isVerifying) {
    return <LoadingSpinner title="Verifying Payment" subtitle="Please wait while we confirm your payment..." size="lg" />;
  }

  if (items.length === 0 && !orderCreated) {
    return <EmptyCart />;
  }

  if (orderCreated) {
    return (
      <OrderSuccess
        deliveryDate={deliveryDate || savedDeliveryDate || new Date().toISOString()}
        deliveryTime={deliveryTime || savedDeliveryTime || ''}
        customer={customer}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-6 max-md:py-4 max-md:pb-36">
      <div className="max-w-5xl mx-auto px-6 max-md:px-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <a href="/shop" className="p-1.5 rounded-lg hover:bg-white transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <h1 className="text-lg font-extrabold text-gray-900">Checkout</h1>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-100">
            <PriceDisplay amount={subtotal} size="md" />
          </div>
        </div>

        <CheckoutSteps paymentReady={false} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 items-start">
          <div className="lg:col-span-8 space-y-5">
            <PersonalInfoForm customer={customer} onChange={setCustomer} />

            <SectionCard icon="📅" title="Delivery Schedule">
              <DeliveryScheduler />
            </SectionCard>

            <SectionCard icon="💳" title="Payment Method">
              <PaymentMethodCard selected />
              <div className="mt-3 p-3 bg-[#E8F8F0] rounded-lg border border-[#00B578]/20">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#00B578] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="text-xs text-[#00B578] font-medium">
                    Secure payment via Ziina. You&apos;ll be redirected to complete payment.
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* Desktop payment button */}
            <div className="max-md:hidden">
              <PaymentButton
                onClick={handleCreateOrder}
                disabled={!isFormValid || isInitializing}
                isLoading={isInitializing}
              />
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-20">
            <OrderSummary items={items} subtotal={subtotal} />
            <SupportBox />
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom payment button */}
      <div className="md:hidden mobile-sticky-bottom">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-400">Total</span>
          <span className="text-lg font-extrabold text-[#F26522]">AED {subtotal.toFixed(0)}</span>
        </div>
        <button
          onClick={handleCreateOrder}
          disabled={!isFormValid || isInitializing}
          className="btn-primary w-full py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isInitializing ? 'Preparing Payment...' : 'Pay with Ziina 💳'}
        </button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={<LoadingSpinner title="Loading Checkout" subtitle="Please wait..." size="lg" />}
    >
      <CheckoutContent />
    </Suspense>
  );
}
