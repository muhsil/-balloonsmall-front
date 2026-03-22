import { NextResponse } from 'next/server';

const ZIINA_API_URL = 'https://api-v2.ziina.com/api';

// Per Ziina docs, possible payment intent statuses:
// - failed: Payment has failed (check latest_error for details)
// - completed: Payment is complete
// - requires_user_action: User must complete an action (e.g., 3-D Secure)
// - pending: Payment is processing
// - requires_payment_instrument: Customer has not yet attempted payment

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

    if (!process.env.ZIINA_API_KEY) {
      return NextResponse.json(
        { error: 'Payment gateway is not configured' },
        { status: 503 }
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
      console.error('Ziina verify error:', JSON.stringify(data));
      return NextResponse.json(
        { error: data.message || data.error || 'Failed to verify payment' },
        { status: response.status }
      );
    }

    const isTestMode =
      process.env.ZIINA_TEST_MODE === 'true' ||
      process.env.NODE_ENV !== 'production';

    return NextResponse.json({
      id: data.id,
      status: data.status,
      amount: data.amount,
      currencyCode: data.currency_code,
      message: data.message,
      testMode: isTestMode,
      // Per Ziina docs: latest_error is available when status is 'failed'
      latestError: data.latest_error || null,
    });
  } catch (error) {
    console.error('Ziina verify payment error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
