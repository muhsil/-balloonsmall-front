import { NextResponse } from 'next/server';
import { getStoreSettings } from '@/lib/store-settings';

const ZIINA_API_URL = 'https://api-v2.ziina.com/api';
const MIN_AMOUNT_FILS = 200; // Minimum 2 AED per Ziina docs

export async function POST(req: Request) {
  try {
    const { amount, successUrl, cancelUrl, message } = await req.json();

    // Amount must be in fils (base currency unit): 100 AED = 10000 fils
    const amountInFils = Math.round(amount * 100);

    if (amountInFils < MIN_AMOUNT_FILS) {
      return NextResponse.json(
        { error: `Minimum payment amount is 2 AED. Got ${(amountInFils / 100).toFixed(2)} AED.` },
        { status: 400 }
      );
    }

    if (!process.env.ZIINA_API_KEY) {
      console.error('ZIINA_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'Payment gateway is not configured' },
        { status: 503 }
      );
    }

    const isTestMode = process.env.ZIINA_TEST_MODE === 'true' || process.env.NODE_ENV !== 'production';
    const storeSettings = await getStoreSettings();

    // Per Ziina docs: success_url and cancel_url support {PAYMENT_INTENT_ID} placeholder
    const response = await fetch(`${ZIINA_API_URL}/payment_intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ZIINA_API_KEY}`,
      },
      body: JSON.stringify({
        amount: amountInFils,
        currency_code: storeSettings.currency,
        message: message || 'BalloonsMall Order',
        success_url: successUrl,
        cancel_url: cancelUrl,
        test: isTestMode,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Ziina API error:', JSON.stringify(data));
      return NextResponse.json(
        { error: data.message || data.error || 'Failed to create payment intent' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      paymentIntentId: data.id,
      redirectUrl: data.redirect_url,
      testMode: isTestMode,
    });
  } catch (error) {
    console.error('Ziina payment intent error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
