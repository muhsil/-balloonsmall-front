import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';
import { verifyPassword } from '@/lib/password';

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
    // Note: use 'search' param instead of 'email' because axios URL-encodes '@' to '%40'
    // which WooCommerce's email filter doesn't decode, returning 0 results.
    const response = await wooApi.get('/customers', {
      params: { search: email, per_page: 10 },
    });

    // Filter to exact email match (search is a text search that can match partials)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customers = (response.data as any[]).filter(
      (c) => c.email?.toLowerCase() === email.toLowerCase()
    );

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
      const storedHash = meta.find((m: { key: string; value: string }) => m.key === 'balloonsmall_password');

      if (!storedHash) {
        return NextResponse.json(
          { error: 'Please use the password you registered with, or register a new account' },
          { status: 401 }
        );
      }

      // Verify password against stored hash (supports both PBKDF2 and legacy plaintext)
      if (!verifyPassword(password, storedHash.value)) {
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
