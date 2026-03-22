import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Search for customer by email using WooCommerce REST API
    const response = await wooApi.get('/customers', {
      params: { email, per_page: 1 },
    });

    const customers = response.data;

    if (customers.length === 0) {
      return NextResponse.json(
        { error: 'No account found with this email' },
        { status: 404 }
      );
    }

    const customer = customers[0];

    // Verify password via WordPress REST API authentication
    const wpAuthRes = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/jwt-auth/v1/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      }
    );

    if (!wpAuthRes.ok) {
      // JWT auth plugin may not be installed; fall back to simple email match
      // For security, we still check the meta_data for a stored password hash
      // If no JWT plugin, use a simple check (WooCommerce doesn't expose password verification)
      // In production, install JWT Authentication plugin for proper auth
      const meta = customer.meta_data || [];
      const storedHash = meta.find((m: { key: string; value: string }) => m.key === '_balloonsmall_password');

      if (!storedHash) {
        return NextResponse.json(
          { error: 'Please use the password you registered with, or register a new account' },
          { status: 401 }
        );
      }

      // Simple comparison (in production, use bcrypt)
      if (storedHash.value !== password) {
        return NextResponse.json(
          { error: 'Incorrect password' },
          { status: 401 }
        );
      }
    }

    return NextResponse.json({
      customer: {
        id: customer.id,
        firstName: customer.first_name || '',
        lastName: customer.last_name || '',
        email: customer.email,
        phone: customer.billing?.phone || '',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
