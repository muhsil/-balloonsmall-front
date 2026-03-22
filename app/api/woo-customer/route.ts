import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';

export async function GET() {
  try {
    // Get the most recent customer (guest orders use customer_id=0)
    // For a real auth system, you'd get the customer ID from session
    const response = await wooApi.get('/customers', {
      params: { per_page: 1, orderby: 'id', order: 'desc' },
    });
    const customers = response.data;
    if (customers.length > 0) {
      return NextResponse.json({ customer: customers[0] });
    }
    return NextResponse.json({ customer: null });
  } catch (error) {
    console.error('Failed to fetch customer:', error);
    return NextResponse.json({ customer: null }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    // For now, update the most recent customer
    const listRes = await wooApi.get('/customers', {
      params: { per_page: 1, orderby: 'id', order: 'desc' },
    });
    const customers = listRes.data;
    if (customers.length === 0) {
      return NextResponse.json({ error: 'No customer found' }, { status: 404 });
    }
    const customerId = customers[0].id;
    const response = await wooApi.put(`/customers/${customerId}`, body);
    return NextResponse.json({ customer: response.data });
  } catch (error) {
    console.error('Failed to update customer:', error);
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}
