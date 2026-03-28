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
    default: 'BalloonsMall – Premium Balloon Decorations & Delivery in Dubai, UAE | Same-Day Delivery',
    template: '%s | BalloonsMall – Balloon Delivery Dubai & UAE',
  },
  description: 'Order premium balloons and event decorations online in Dubai, Abu Dhabi & across the UAE. Birthday, wedding, baby shower & custom balloon arrangements with same-day delivery. Trusted by 1000+ customers in the GCC.',
  keywords: [
    'balloons Dubai', 'balloon delivery Dubai', 'birthday balloons UAE',
    'event decoration Dubai', 'helium balloons Dubai', 'balloon bouquet Dubai',
    'wedding balloons UAE', 'baby shower balloons Dubai', 'balloon arch Dubai',
    'foil balloons Dubai', 'party decorations Dubai', 'same day balloon delivery Dubai',
    'balloon garland kit UAE', 'custom balloon arrangements Dubai', 'balloon shop Dubai',
    'balloons Abu Dhabi', 'balloon delivery Sharjah', 'party supplies UAE',
    'balloon decoration UAE', 'event balloons GCC', 'balloons online UAE',
    'birthday party decorations Dubai', 'wedding decorations UAE',
    'baby shower decorations Dubai', 'graduation balloons Dubai',
    'balloon bouquet delivery Abu Dhabi', 'helium balloons UAE',
    'balloon shop near me Dubai', 'party balloons Sharjah',
    'balloon delivery Saudi Arabia', 'balloons Kuwait', 'balloons Bahrain',
    'balloon delivery Oman', 'balloons Qatar', 'GCC balloon delivery',
    'balloon arrangements Gulf', 'event decorations GCC',
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
    title: 'BalloonsMall – Premium Balloon Decorations & Delivery in Dubai, UAE',
    description: 'Order premium balloons and event decorations online in Dubai, Abu Dhabi & across the UAE. Same-day delivery available. Trusted by 1000+ customers in the GCC.',
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
    title: 'BalloonsMall – Premium Balloon Decorations & Delivery in Dubai, UAE',
    description: 'Order premium balloons online in Dubai & UAE. Birthday, wedding, baby shower decorations with same-day delivery across the GCC.',
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'T-lkfUmRMEleqb_qAZ-QUihAOyNjxu1SLrrE6kfVpkQ',
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
