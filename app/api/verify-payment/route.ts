import { NextResponse } from 'next/server';

const ZIINA_API_URL = 'https://api-v2.ziina.com/api';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentIntentId = searchParams.get('id');

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      );
    }

    // Validate paymentIntentId to prevent path traversal
    if (!/^[a-zA-Z0-9_-]+$/.test(paymentIntentId)) {
      return NextResponse.json(
        { error: 'Invalid payment intent ID' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${ZIINA_API_URL}/payment_intent/${paymentIntentId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.ZIINA_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Ziina verify error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to verify payment' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      id: data.id,
      status: data.status,
      amount: data.amount,
      currencyCode: data.currency_code,
    });
  } catch (error) {
    console.error('Ziina verify payment error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
