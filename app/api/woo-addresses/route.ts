import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';

export interface SavedAddress {
  id: string;
  label: string;
  first_name: string;
  last_name: string;
  phone: string;
  address_1: string;
  city: string;
  state: string;
  country: string;
  is_default?: boolean;
}

const META_KEY = 'balloonsmall_addresses';

// GET: Fetch saved addresses for a customer
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customer_id');

    if (!customerId) {
      return NextResponse.json({ error: 'Customer ID required' }, { status: 400 });
    }

    const response = await wooApi.get(`/customers/${customerId}`);
    const customer = response.data;

    // Get addresses from customer meta
    const metaEntry = customer.meta_data?.find(
      (m: { key: string; value: string }) => m.key === META_KEY
    );

    let addresses: SavedAddress[] = [];
    if (metaEntry?.value) {
      try {
        addresses = typeof metaEntry.value === 'string'
          ? JSON.parse(metaEntry.value)
          : metaEntry.value;
      } catch {
        addresses = [];
      }
    }

    // Always include billing and shipping as base addresses
    const billing = customer.billing;
    const shipping = customer.shipping;

    const baseAddresses: SavedAddress[] = [];

    if (billing?.address_1) {
      baseAddresses.push({
        id: 'billing',
        label: 'Billing Address',
        first_name: billing.first_name || '',
        last_name: billing.last_name || '',
        phone: billing.phone || '',
        address_1: billing.address_1 || '',
        city: billing.city || '',
        state: billing.state || '',
        country: billing.country || '',
      });
    }

    if (shipping?.address_1) {
      baseAddresses.push({
        id: 'shipping',
        label: 'Shipping Address',
        first_name: shipping.first_name || '',
        last_name: shipping.last_name || '',
        phone: shipping.phone || '',
        address_1: shipping.address_1 || '',
        city: shipping.city || '',
        state: shipping.state || '',
        country: shipping.country || '',
      });
    }

    return NextResponse.json({ addresses: [...baseAddresses, ...addresses] });
  } catch (error) {
    console.error('Failed to fetch addresses:', error);
    return NextResponse.json({ addresses: [] }, { status: 500 });
  }
}

// POST: Add a new address
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerId, address } = body as { customerId: number; address: SavedAddress };

    if (!customerId || !address) {
      return NextResponse.json({ error: 'Customer ID and address required' }, { status: 400 });
    }

    // Fetch current addresses
    const response = await wooApi.get(`/customers/${customerId}`);
    const customer = response.data;

    const metaEntry = customer.meta_data?.find(
      (m: { key: string; value: string }) => m.key === META_KEY
    );

    let addresses: SavedAddress[] = [];
    if (metaEntry?.value) {
      try {
        addresses = typeof metaEntry.value === 'string'
          ? JSON.parse(metaEntry.value)
          : metaEntry.value;
      } catch {
        addresses = [];
      }
    }

    // Generate ID if not present
    if (!address.id) {
      address.id = `addr_${Date.now()}`;
    }

    addresses.push(address);

    // Save back to WooCommerce
    await wooApi.put(`/customers/${customerId}`, {
      meta_data: [{ key: META_KEY, value: JSON.stringify(addresses) }],
    });

    return NextResponse.json({ success: true, address });
  } catch (error) {
    console.error('Failed to add address:', error);
    return NextResponse.json({ error: 'Failed to add address' }, { status: 500 });
  }
}

// PUT: Update an address
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { customerId, address } = body as { customerId: number; address: SavedAddress };

    if (!customerId || !address?.id) {
      return NextResponse.json({ error: 'Customer ID and address ID required' }, { status: 400 });
    }

    // Handle billing/shipping updates natively
    if (address.id === 'billing') {
      await wooApi.put(`/customers/${customerId}`, {
        billing: {
          first_name: address.first_name,
          last_name: address.last_name,
          phone: address.phone,
          address_1: address.address_1,
          city: address.city,
          state: address.state,
          country: address.country,
        },
      });
      return NextResponse.json({ success: true });
    }

    if (address.id === 'shipping') {
      await wooApi.put(`/customers/${customerId}`, {
        shipping: {
          first_name: address.first_name,
          last_name: address.last_name,
          phone: address.phone,
          address_1: address.address_1,
          city: address.city,
          state: address.state,
          country: address.country,
        },
      });
      return NextResponse.json({ success: true });
    }

    // Update custom address in meta
    const response = await wooApi.get(`/customers/${customerId}`);
    const customer = response.data;

    const metaEntry = customer.meta_data?.find(
      (m: { key: string; value: string }) => m.key === META_KEY
    );

    let addresses: SavedAddress[] = [];
    if (metaEntry?.value) {
      try {
        addresses = typeof metaEntry.value === 'string'
          ? JSON.parse(metaEntry.value)
          : metaEntry.value;
      } catch {
        addresses = [];
      }
    }

    const idx = addresses.findIndex((a) => a.id === address.id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    addresses[idx] = address;

    await wooApi.put(`/customers/${customerId}`, {
      meta_data: [{ key: META_KEY, value: JSON.stringify(addresses) }],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update address:', error);
    return NextResponse.json({ error: 'Failed to update address' }, { status: 500 });
  }
}

// DELETE: Remove an address
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customer_id');
    const addressId = searchParams.get('address_id');

    if (!customerId || !addressId) {
      return NextResponse.json({ error: 'Customer ID and address ID required' }, { status: 400 });
    }

    // Cannot delete billing/shipping base addresses
    if (addressId === 'billing' || addressId === 'shipping') {
      return NextResponse.json({ error: 'Cannot delete default billing/shipping address' }, { status: 400 });
    }

    const response = await wooApi.get(`/customers/${customerId}`);
    const customer = response.data;

    const metaEntry = customer.meta_data?.find(
      (m: { key: string; value: string }) => m.key === META_KEY
    );

    let addresses: SavedAddress[] = [];
    if (metaEntry?.value) {
      try {
        addresses = typeof metaEntry.value === 'string'
          ? JSON.parse(metaEntry.value)
          : metaEntry.value;
      } catch {
        addresses = [];
      }
    }

    addresses = addresses.filter((a) => a.id !== addressId);

    await wooApi.put(`/customers/${customerId}`, {
      meta_data: [{ key: META_KEY, value: JSON.stringify(addresses) }],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete address:', error);
    return NextResponse.json({ error: 'Failed to delete address' }, { status: 500 });
  }
}
