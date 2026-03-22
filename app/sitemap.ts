import { MetadataRoute } from 'next';
import { wooApi } from '@/lib/woocommerce';

const SITE_URL = 'https://balloonsmall.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/shipping`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic product pages
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
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // If WooCommerce API fails, skip category pages
  }

  return [...staticPages, ...productPages, ...categoryPages];
}
