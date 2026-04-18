import { MetadataRoute } from 'next';
import { wooApi } from '@/lib/woocommerce';

export const revalidate = 3600;

const SITE_URL = 'https://balloonsmall.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/shipping`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic product pages with image sitemaps
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const { data: products } = await wooApi.get('/products', {
      params: { per_page: 100, status: 'publish' },
    });
    productPages = (products as any[]).map((product) => ({
      url: `${SITE_URL}/product/${product.slug}`,
      lastModified: new Date(product.date_modified || product.date_created),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      images: (product.images as any[])
        ?.map((img: any) => img.src)
        .filter(Boolean),
    }));
  } catch {
    // If WooCommerce API fails, return only static pages
  }

  // Dynamic category pages
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const { data: categories } = await wooApi.get('/products/categories', {
      params: { per_page: 50, hide_empty: true },
    });
    categoryPages = (categories as any[]).map((cat) => ({
      url: `${SITE_URL}/shop?category=${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // If WooCommerce API fails, skip category pages
  }

  return [...staticPages, ...productPages, ...categoryPages];
}
