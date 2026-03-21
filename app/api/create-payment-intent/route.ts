import { NextResponse } from 'next/server';

const ZIINA_API_URL = 'https://api-v2.ziina.com/api';

export async function POST(req: Request) {
  try {
    const { amount, successUrl, cancelUrl, message } = await req.json();

    const response = await fetch(`${ZIINA_API_URL}/payment_intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ZIINA_API_KEY}`,
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Ziina expects amount in fils (base currency unit)
        currency_code: 'AED',
        message: message || 'BalloonsMall Order',
        success_url: successUrl,
        cancel_url: cancelUrl,
        test: process.env.NODE_ENV !== 'production',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Ziina API error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to create payment intent' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      paymentIntentId: data.id,
      redirectUrl: data.redirect_url,
    });
  } catch (error) {
    console.error('Ziina payment intent error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
