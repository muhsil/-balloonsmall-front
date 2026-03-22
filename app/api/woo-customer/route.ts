import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('id');

    if (customerId) {
      // Fetch specific customer by ID (authenticated user)
      const response = await wooApi.get(`/customers/${customerId}`);
      return NextResponse.json({ customer: response.data });
    }

    // Fallback: get most recent customer
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
    const customerId = body.customerId;

    if (customerId) {
      // Update specific customer (authenticated user)
      const { customerId: _id, ...updateData } = body;
      const response = await wooApi.put(`/customers/${customerId}`, updateData);
      return NextResponse.json({ customer: response.data });
    }

    // Fallback: update most recent customer
    const listRes = await wooApi.get('/customers', {
      params: { per_page: 1, orderby: 'id', order: 'desc' },
    });
    const customers = listRes.data;
    if (customers.length === 0) {
      return NextResponse.json({ error: 'No customer found' }, { status: 404 });
    }
    const fallbackId = customers[0].id;
    const response = await wooApi.put(`/customers/${fallbackId}`, body);
    return NextResponse.json({ customer: response.data });
  } catch (error) {
    console.error('Failed to update customer:', error);
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}
