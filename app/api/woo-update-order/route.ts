import { NextResponse } from 'next/server';
import axios from 'axios';

export async function PUT(req: Request) {
  try {
    const { orderId, status, paymentIntentId, paymentMethod, testMode } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};

    if (status) {
      updateData.status = status;
    }

    // Build meta_data array with payment details
    const metaData: Array<{ key: string; value: string }> = [];

    if (paymentIntentId) {
      metaData.push({ key: '_ziina_payment_intent_id', value: paymentIntentId });
    }
    if (paymentMethod) {
      metaData.push({ key: '_ziina_payment_method', value: paymentMethod });
    }
    if (testMode !== undefined) {
      metaData.push({ key: '_ziina_test_mode', value: String(testMode) });
    }

    if (metaData.length > 0) {
      updateData.meta_data = metaData;
    }

    if (status === 'completed') {
      updateData.set_paid = true;
      updateData.date_paid = new Date().toISOString();
    }

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/v3/orders/${orderId}`,
      updateData,
      {
        auth: {
          username: process.env.WC_CONSUMER_KEY!,
          password: process.env.WC_CONSUMER_SECRET!,
        },
      }
    );

    return NextResponse.json({
      success: true,
      orderId: response.data.id,
      status: response.data.status,
    });
  } catch (error) {
    console.error('Order update failed:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
