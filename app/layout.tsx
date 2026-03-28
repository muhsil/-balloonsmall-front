import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { OrganizationJsonLd, WebSiteJsonLd, LocalBusinessJsonLd } from '@/components/seo/JsonLd';
import GoogleAnalytics from '@/components/seo/GoogleAnalytics';
import { GoogleTagManagerScript, GoogleTagManagerNoScript } from '@/components/seo/GoogleTagManager';
import StoreSettingsProvider from '@/components/providers/StoreSettingsProvider';
import { getStoreSettings } from '@/lib/store-settings';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://balloonsmall.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#E53935',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BalloonsMall – Premium Balloons & Decorations in Dubai | Same-Day Delivery',
    template: '%s | BalloonsMall Dubai',
  },
  description: 'Shop premium balloons and event decorations in Dubai. Wide variety of birthday, wedding, baby shower balloons. Same-day delivery across Dubai. Order now!',
  keywords: [
    'balloons Dubai', 'balloon delivery Dubai', 'birthday balloons UAE',
    'event decoration Dubai', 'helium balloons Dubai', 'balloon bouquet Dubai',
    'wedding balloons UAE', 'baby shower balloons', 'balloon arch Dubai',
    'foil balloons Dubai', 'party decorations Dubai', 'same day balloon delivery',
    'balloon garland kit', 'custom balloon arrangements', 'balloon shop Dubai',
  ],
  authors: [{ name: 'BalloonsMall', url: SITE_URL }],
  creator: 'BalloonsMall',
  publisher: 'BalloonsMall',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'BalloonsMall – Premium Balloons & Decorations in Dubai',
    description: 'Celebrate every moment with BalloonsMall. Premium balloons and event decorations delivered to your door in Dubai. Same-day delivery available!',
    type: 'website',
    locale: 'en_AE',
    url: SITE_URL,
    siteName: 'BalloonsMall',
    images: [{
      url: '/hero-balloons.png',
      width: 1200,
      height: 630,
      alt: 'BalloonsMall – Premium Balloons & Decorations in Dubai',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BalloonsMall – Premium Balloons & Decorations in Dubai',
    description: 'Premium balloons for every celebration. Same-day delivery across Dubai!',
    images: ['/hero-balloons.png'],
    creator: '@balloonsmall',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  category: 'shopping',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getStoreSettings();

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <GoogleTagManagerNoScript />
        <GoogleTagManagerScript />
        <GoogleAnalytics />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd currency={settings.currency} />
        <StoreSettingsProvider currency={settings.currency} numDecimals={settings.numDecimals}>
          {children}
        </StoreSettingsProvider>
      </body>
    </html>
  );
}
