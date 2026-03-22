import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Construct the payload for WooCommerce
    const orderData: Record<string, unknown> = {
      payment_method: body.paymentMethod,
      payment_method_title: body.paymentMethodTitle,
      set_paid: body.isPaid,
      billing: body.billing,
      shipping: body.shipping,
      ...(body.customerId ? { customer_id: body.customerId } : {}),
      line_items: body.items.map((item: { productId?: number; id: number; quantity: number; variant?: string }) => ({
        product_id: item.productId || item.id,
        ...(item.productId ? { variation_id: item.id } : {}),
        quantity: item.quantity,
        meta_data: item.variant ? [
          { key: 'Variation', value: item.variant }
        ] : []
      })),
      meta_data: [
        { key: 'delivery_date', value: body.deliveryDate },
        { key: 'delivery_time', value: body.deliveryTime }
      ],
    };

    if (body.customerNote) {
      orderData.customer_note = body.customerNote;
    }

    const ALLOWED_STATUSES = ['pending', 'processing'];
    if (body.status && ALLOWED_STATUSES.includes(body.status)) {
      orderData.status = body.status;
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/v3/orders`,
      orderData,
      {
        auth: {
          username: process.env.WC_CONSUMER_KEY!,
          password: process.env.WC_CONSUMER_SECRET!
        }
      }
    );

    return NextResponse.json({ success: true, orderId: response.data.id }, { status: 201 });

  } catch (error) {
    console.error('Order creation failed:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
