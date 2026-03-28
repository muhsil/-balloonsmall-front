"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { toast } from '@/components/ui/Toast';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import PersonalInfoForm, { CustomerInfo } from '@/components/checkout/PersonalInfoForm';
import BillingAddressForm, { BillingInfo } from '@/components/checkout/BillingAddressForm';
import OrderNotes from '@/components/checkout/OrderNotes';
import DeliveryScheduler from '@/components/checkout/DeliveryScheduler';
import OrderSummary from '@/components/checkout/OrderSummary';
import OrderSuccess from '@/components/checkout/OrderSuccess';
import EmptyCart from '@/components/checkout/EmptyCart';
import SupportBox from '@/components/checkout/SupportBox';
import PaymentButton from '@/components/checkout/PaymentButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SectionCard from '@/components/ui/SectionCard';
import PriceDisplay from '@/components/ui/PriceDisplay';
import { useStoreSettings } from '@/components/providers/StoreSettingsProvider';
import { useAuthStore } from '@/store/useAuthStore';


function CheckoutContent() {
  const { items, deliveryDate, deliveryTime, clearCart } = useCartStore();
  const { currency } = useStoreSettings();
  const authCustomer = useAuthStore((s) => s.customer);

  const [orderCreated, setOrderCreated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [savedDeliveryDate, setSavedDeliveryDate] = useState<string | null>(null);
  const [savedDeliveryTime, setSavedDeliveryTime] = useState<string | null>(null);
  const [orderNotes, setOrderNotes] = useState('');
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: authCustomer?.firstName || '',
    lastName: authCustomer?.lastName || '',
    email: authCustomer?.email || '',
    phone: authCustomer?.phone || '',
    countryCode: '+971',
    address: '',
    city: 'Dubai',
    state: '',
    country: 'AE',
  });

  // Fix: Zustand persist hydration — authCustomer is null on first render,
  // so we update form fields once hydration completes
  useEffect(() => {
    if (authCustomer) {
      setCustomer((prev) => ({
        ...prev,
        firstName: prev.firstName || authCustomer.firstName || '',
        lastName: prev.lastName || authCustomer.lastName || '',
        email: prev.email || authCustomer.email || '',
        phone: prev.phone || authCustomer.phone || '',
      }));
    }
  }, [authCustomer]);

  const [billing, setBilling] = useState<BillingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+971',
    address: '',
    city: '',
    state: '',
    country: 'AE',
  });

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const isDeliverySelected = !!(deliveryDate && deliveryTime);
  const isFormValid = customer.firstName && customer.email && customer.phone && customer.address && customer.city && customer.country && isDeliverySelected;

  const handleCreateOrder = async () => {
    if (!isFormValid) {
      toast('Please complete all delivery and contact details', 'error');
      return;
    }

    try {
      setIsInitializing(true);

      const billingData = sameAsShipping
        ? {
            first_name: customer.firstName,
            last_name: customer.lastName,
            email: customer.email,
            phone: `${customer.countryCode}${customer.phone}`,
            address_1: customer.address,
            city: customer.city,
            state: customer.state,
            country: customer.country,
          }
        : {
            first_name: billing.firstName,
            last_name: billing.lastName,
            email: billing.email,
            phone: `${billing.countryCode}${billing.phone}`,
            address_1: billing.address,
            city: billing.city,
            state: billing.state,
            country: billing.country,
          };

      const shippingData = {
        first_name: customer.firstName,
        last_name: customer.lastName,
        phone: `${customer.countryCode}${customer.phone}`,
        address_1: customer.address,
        city: customer.city,
        state: customer.state,
        country: customer.country,
      };

      // COD flow: create order directly and mark as processing
      const resWoo = await fetch('/api/woo-create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: 'cod',
          paymentMethodTitle: 'Cash on Delivery',
          isPaid: false,
          status: 'processing',
          items,
          deliveryDate,
          deliveryTime,
          customerNote: orderNotes,
          customerId: authCustomer?.id || 0,
          billing: billingData,
          shipping: shippingData,
        }),
      });

      if (!resWoo.ok) {
        throw new Error('Failed to create order');
      }

      setOrderCreated(true);
      setSavedDeliveryDate(deliveryDate);
      setSavedDeliveryTime(deliveryTime);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      toast('Checkout error: ' + (err as Error).message, 'error');
    } finally {
      setIsInitializing(false);
    }
  };

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

            <BillingAddressForm
              sameAsShipping={sameAsShipping}
              onSameAsShippingChange={setSameAsShipping}
              billing={billing}
              onChange={setBilling}
            />

            <SectionCard title="Delivery Schedule">
              <DeliveryScheduler />
            </SectionCard>

            <OrderNotes value={orderNotes} onChange={setOrderNotes} />

            <SectionCard title="Payment Method">
              <div className="w-full text-left p-4 max-md:p-3 rounded-lg border-2 border-[#E53935] bg-[#FFEBEE]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 max-md:w-8 max-md:h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm max-md:text-xs">Cash on Delivery</p>
                      <p className="text-[10px] text-gray-400">Pay when you receive your order</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-[#E53935] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-xs text-amber-700 font-medium">
                    Pay cash when your order is delivered. Please have the exact amount ready.
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
                label="Place Order (Cash on Delivery)"
                loadingLabel="Placing Order..."
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
          <span className="text-lg font-extrabold text-[#E53935]">{currency} {subtotal.toFixed(0)}</span>
        </div>
        <button
          onClick={handleCreateOrder}
          disabled={!isFormValid || isInitializing}
          className="btn-primary w-full py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isInitializing
            ? 'Processing...'
            : 'Place Order (Cash on Delivery)'}
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
