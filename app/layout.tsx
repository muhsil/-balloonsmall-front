import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'BalloonsMall – Premium Customized Balloons in Dubai',
    template: '%s | BalloonsMall',
  },
  description: 'Shop premium customized balloons and event decorations in Dubai. Live text previews, same-day delivery, and seamless checkout. Order now!',
  keywords: 'balloons Dubai, custom balloons, birthday balloons UAE, event decoration Dubai, helium balloons, balloon delivery',
  openGraph: {
    title: 'BalloonsMall – Premium Customized Balloons in Dubai',
    description: 'Celebrate every moment with BalloonsMall – bespoke balloons and event decoration delivered to your door in Dubai.',
    type: 'website',
    locale: 'en_AE',
    images: [{ url: '/hero-balloons.png', width: 1200, height: 630, alt: 'BalloonsMall Premium Balloons' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BalloonsMall – Premium Customized Balloons in Dubai',
    description: 'Discover premium customized balloons for every celebration. Same-day delivery across Dubai!',
    images: ['/hero-balloons.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
