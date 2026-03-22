import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customer_id');

    const params: Record<string, string | number> = {
      per_page: 20,
      orderby: 'date',
      order: 'desc',
    };

    if (customerId) {
      params.customer = Number(customerId);
    }

    const response = await wooApi.get('/orders', { params });
    return NextResponse.json(
      { orders: response.data },
      {
        headers: {
          'Cache-Control': 'private, max-age=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ orders: [] }, { status: 500 });
  }
}
