import { NextResponse } from 'next/server';
import axios from 'axios';

// Ziina webhook endpoint for real-time payment status notifications
// Per Ziina docs: webhooks deliver events like payment success or failure
// Register this URL at: POST https://api-v2.ziina.com/api/webhook

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const { payment_intent_id, status } = payload;

    if (!payment_intent_id || !status) {
      return NextResponse.json(
        { error: 'Missing payment_intent_id or status' },
        { status: 400 }
      );
    }

    console.log(`Ziina webhook received: payment_intent_id=${payment_intent_id}, status=${status}`);

    // Per Ziina docs statuses: completed, failed, pending, requires_user_action, requires_payment_instrument
    if (status === 'completed') {
      // Try to find and update the WooCommerce order with this payment intent
      // The payment_intent_id is stored in order meta when the order is created
      try {
        // Search WooCommerce orders by meta_data for matching payment intent
        const searchRes = await axios.get(
          `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/v3/orders`,
          {
            params: { status: 'pending', per_page: 20, orderby: 'date', order: 'desc' },
            auth: {
              username: process.env.WC_CONSUMER_KEY!,
              password: process.env.WC_CONSUMER_SECRET!,
            },
          }
        );

        const orders = searchRes.data;
        // Find the order that has this payment intent ID in its message or meta
        const matchedOrder = orders.find((order: { meta_data?: Array<{ key: string; value: string }> }) =>
          order.meta_data?.some(
            (m: { key: string; value: string }) =>
              m.key === 'ziina_payment_intent_id' && m.value === payment_intent_id
          )
        );

        if (matchedOrder) {
          const isTestMode =
            process.env.ZIINA_TEST_MODE === 'true' ||
            process.env.NODE_ENV !== 'production';

          await axios.put(
            `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/v3/orders/${matchedOrder.id}`,
            {
              status: 'completed',
              set_paid: true,
              date_paid: new Date().toISOString(),
              meta_data: [
                { key: 'ziina_payment_intent_id', value: payment_intent_id },
                { key: 'ziina_payment_method', value: 'Ziina Payment (Card/Apple Pay/Google Pay)' },
                { key: 'ziina_test_mode', value: String(isTestMode) },
                { key: 'ziina_webhook_confirmed', value: 'true' },
              ],
            },
            {
              auth: {
                username: process.env.WC_CONSUMER_KEY!,
                password: process.env.WC_CONSUMER_SECRET!,
              },
            }
          );

          console.log(`Webhook: Updated WooCommerce order #${matchedOrder.id} to completed`);
        } else {
          console.log(`Webhook: No pending WooCommerce order found for payment_intent_id=${payment_intent_id}`);
        }
      } catch (wooError) {
        console.error('Webhook: Failed to update WooCommerce order:', wooError);
      }
    } else if (status === 'failed') {
      console.log(`Webhook: Payment failed for payment_intent_id=${payment_intent_id}`);
    }

    // Always acknowledge webhook receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Ziina webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
