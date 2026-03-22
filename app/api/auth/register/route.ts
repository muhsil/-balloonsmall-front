import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';
import { hashPassword } from '@/lib/password';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, phone } = await req.json();

    if (!email || !password || !firstName) {
      return NextResponse.json(
        { error: 'First name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if customer already exists
    // Note: use 'search' param instead of 'email' because axios URL-encodes '@' to '%40'
    // which WooCommerce's email filter doesn't decode, returning 0 results.
    const existingRes = await wooApi.get('/customers', {
      params: { search: email, per_page: 10 },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = (existingRes.data as any[]).filter(
      (c) => c.email?.toLowerCase() === email.toLowerCase()
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please log in.' },
        { status: 409 }
      );
    }

    // Create new WooCommerce customer
    const response = await wooApi.post('/customers', {
      email,
      first_name: firstName,
      last_name: lastName || '',
      billing: {
        first_name: firstName,
        last_name: lastName || '',
        email,
        phone: phone || '',
      },
      shipping: {
        first_name: firstName,
        last_name: lastName || '',
      },
      // Store hashed password in meta for simple auth (no JWT plugin needed)
      meta_data: [
        { key: 'balloonsmall_password', value: hashPassword(password) },
      ],
    });

    const customer = response.data;

    return NextResponse.json({
      customer: {
        id: customer.id,
        firstName: customer.first_name || '',
        lastName: customer.last_name || '',
        email: customer.email,
        phone: customer.billing?.phone || '',
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
