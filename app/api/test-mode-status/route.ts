import { NextResponse } from 'next/server';

export async function GET() {
  const isTestMode =
    process.env.ZIINA_TEST_MODE === 'true' ||
    process.env.NODE_ENV !== 'production';

  return NextResponse.json({ testMode: isTestMode });
}
