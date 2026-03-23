import { NextResponse } from 'next/server';
import { wooApi } from '@/lib/woocommerce';

let cachedGateways: { id: string; title: string; description: string; enabled: boolean }[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    const now = Date.now();
    if (cachedGateways && now - cacheTimestamp < CACHE_TTL) {
      return NextResponse.json(
        { gateways: cachedGateways },
        { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' } }
      );
    }

    // Add cache-busting param to bypass LiteSpeed Cache on WooCommerce server
    const response = await wooApi.get(`/payment_gateways?_=${Date.now()}`);
    const allGateways = response.data as {
      id: string;
      title: string;
      description: string;
      enabled: boolean;
    }[];

    // Only return enabled gateways
    cachedGateways = allGateways
      .filter((g) => g.enabled)
      .map((g) => ({
        id: g.id,
        title: g.title,
        description: g.description,
        enabled: g.enabled,
      }));
    cacheTimestamp = now;

    return NextResponse.json(
      { gateways: cachedGateways },
      { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' } }
    );
  } catch (error) {
    console.error('Failed to fetch payment gateways:', error);
    return NextResponse.json({ gateways: [] }, { status: 500 });
  }
}
