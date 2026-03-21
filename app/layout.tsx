import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'BalloonsMall – Premium Customized Balloons in Dubai',
  description: 'Shop premium customized balloons and event decorations in Dubai. Live text previews, scheduled delivery, and seamless checkout.',
  keywords: 'balloons, Dubai, custom balloons, event decoration, birthday balloons, helium balloons, UAE',
  openGraph: {
    title: 'BalloonsMall – Premium Customized Balloons',
    description: 'Celebrate every moment with BalloonsMall – bespoke balloons and event decoration delivered to your door in Dubai.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
