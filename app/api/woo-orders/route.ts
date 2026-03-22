import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';

export async function GET() {
  try {
    const response = await wooApi.get('/orders', {
      params: { per_page: 20, orderby: 'date', order: 'desc' },
    });
    return NextResponse.json({ orders: response.data });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ orders: [] }, { status: 500 });
  }
}
