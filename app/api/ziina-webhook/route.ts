import { NextResponse } from 'next/server';
import axios from 'axios';
import crypto from 'crypto';

// Ziina webhook endpoint for real-time payment status notifications
// Per Ziina docs: webhooks deliver events like payment success or failure
// Register this URL at: POST https://api-v2.ziina.com/api/webhook

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const computed = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature));
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();

    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.ZIINA_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = req.headers.get('x-ziina-signature') || req.headers.get('x-webhook-signature') || '';
      if (!signature) {
        console.error('Webhook: Missing signature header');
        return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
      }

      try {
        if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
          console.error('Webhook: Invalid signature');
          return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }
      } catch {
        console.error('Webhook: Signature verification failed');
        return NextResponse.json({ error: 'Signature verification failed' }, { status: 401 });
      }
    } else {
      console.warn('Webhook: ZIINA_WEBHOOK_SECRET not configured - skipping signature verification');
    }

    const payload = JSON.parse(rawBody);
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
      // Find the WooCommerce order with this payment intent ID stored at creation time
      try {
        const searchRes = await axios.get(
          `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/v3/orders`,
          {
            params: { status: 'pending', per_page: 50, orderby: 'date', order: 'desc' },
            auth: {
              username: process.env.WC_CONSUMER_KEY!,
              password: process.env.WC_CONSUMER_SECRET!,
            },
          }
        );

        const orders = searchRes.data;
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
          console.log(`Webhook: No pending order found for payment_intent_id=${payment_intent_id}`);
        }
      } catch (wooError) {
        console.error('Webhook: Failed to update WooCommerce order:', wooError);
      }
    } else if (status === 'failed') {
      console.log(`Webhook: Payment failed for payment_intent_id=${payment_intent_id}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Ziina webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
