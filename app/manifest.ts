import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BalloonsMall - Premium Balloons & Decorations in Dubai',
    short_name: 'BalloonsMall',
    description: 'Shop premium balloons and event decorations in Dubai. Same-day delivery available.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#F26522',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['shopping', 'lifestyle'],
  };
}
