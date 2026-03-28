import type { Metadata } from 'next';
import React from 'react';
import { wooApi } from '@/lib/woocommerce';
import { getStoreSettings } from '@/lib/store-settings';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import EmptyState from '@/components/ui/EmptyState';
import RatingStars from '@/components/ui/RatingStars';
import SoldCount from '@/components/ui/SoldCount';
import DealBadge from '@/components/ui/DealBadge';
import ShippingBadge from '@/components/ui/ShippingBadge';
import ProductImageGallery from '@/components/ui/ProductImageGallery';
import StickyAddToCart from '@/components/ui/StickyAddToCart';
import ProductVariationPicker from '@/components/ui/ProductVariationPicker';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const revalidate = 60;

const HIGHLIGHT_ICONS: Record<string, React.ReactNode> = {
  'same-day': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  premium: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  delivery: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
  whatsapp: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
};

function getProductHighlights(currency: string) {
  return [
    { key: 'same-day', title: 'Same-Day', description: 'Order before 2 PM' },
    { key: 'premium', title: 'Premium', description: 'Finest quality balloons' },
    { key: 'delivery', title: 'Free Delivery', description: `Orders over ${currency} 100` },
    { key: 'whatsapp', title: 'WhatsApp', description: 'Instant support' },
  ];
}

async function getProduct(slug: string) {
  try {
    const { data } = await wooApi.get('/products', { params: { slug } });
    return data?.[0] as any;
  } catch { return null; }
}

async function getVariations(productId: number) {
  try {
    const { data } = await wooApi.get(`/products/${productId}/variations`, {
      params: { per_page: 50 }
    });
    return data as any[];
  } catch { return []; }
}

async function getRelated(categoryIds: number[]) {
  try {
    if (!categoryIds?.length) return [];
    const { data } = await wooApi.get('/products', {
      params: { category: categoryIds[0], per_page: 6, status: 'publish' }
    });
    return data as any[];
  } catch { return []; }
}

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await paramsPromise;
  try {
    const { data } = await wooApi.get('/products', { params: { slug: params.slug } });
    const product = data?.[0] as any;
    if (!product) return { title: 'Product Not Found' };
    const desc = (product.short_description || product.description || '').replace(/<[^>]*>/g, '').slice(0, 160);
    return {
      title: product.name,
      description: desc || `Buy ${product.name} from BalloonsMall. Premium balloons delivered in Dubai.`,
      alternates: { canonical: `/product/${params.slug}` },
      openGraph: {
        title: `${product.name} | BalloonsMall Dubai`,
        description: desc || `Buy ${product.name} from BalloonsMall Dubai.`,
        type: 'website',
        images: product.images?.[0]?.src ? [{ url: product.images[0].src, width: 800, height: 800, alt: product.name }] : [],
      },
    };
  } catch {
    return { title: 'Product' };
  }
}

export default async function ProductPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = await paramsPromise;
  const product = await getProduct(params.slug);

  if (!product) {
    return (
      <EmptyState
        title="Product Not Found"
        description="This balloon may have floated away! Browse our full collection."
        actionLabel="Browse All Balloons"
        actionHref="/shop"
      />
    );
  }

  const [variations, related, settings] = await Promise.all([
    product.type === 'variable' ? getVariations(product.id) : Promise.resolve([]),
    getRelated(product.categories?.map((c: any) => c.id)),
    getStoreSettings(),
  ]);
  const { currency } = settings;
  const similarProducts = related.filter((p: any) => p.slug !== params.slug).slice(0, 4);

  const price = parseFloat(product.price || '0');
  const regularPrice = product.regular_price ? parseFloat(product.regular_price) : null;
  const discount = product.on_sale && regularPrice ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;
  const hash = params.slug.split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0);
  const soldNum = Math.floor((hash * 7 + price * 3) % 900 + 100);
  const reviewCount = Math.floor(price * 2 + 30);
  const mainImage = product.images?.[0]?.src || '';

  return (
    <div className="max-w-7xl mx-auto pb-10 max-md:pb-24">
      <ProductJsonLd
        name={product.name}
        description={product.short_description || product.description || ''}
        image={mainImage}
        price={price}
        slug={params.slug}
        inStock={product.in_stock !== false}
        category={product.categories?.[0]?.name}
        currency={currency}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: product.name, href: `/product/${params.slug}` },
      ]} />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#999] px-4 py-3 max-md:px-3 overflow-x-auto no-scrollbar">
        <Link href="/" className="hover:text-[#E53935] transition-colors shrink-0">Home</Link>
        <span className="shrink-0">&gt;</span>
        <Link href="/shop" className="hover:text-[#E53935] transition-colors shrink-0">Shop</Link>
        <span className="shrink-0">&gt;</span>
        <span className="text-[#191919] font-medium truncate">{product.name}</span>
      </nav>

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-md:gap-0 px-4 max-md:px-0 mb-10 max-md:mb-6">
        {/* Left: Image Gallery */}
        <ProductImageGallery
          images={product.images || []}
          name={product.name}
          discount={discount}
        />

        {/* Right: Info */}
        <div className="flex flex-col max-md:px-3 max-md:pt-3">
          {/* Categories */}
          {product.categories?.length > 0 && (
            <div className="flex gap-1.5 mb-2">
              {product.categories.slice(0, 2).map((cat: any) => (
                <span key={cat.id} className="text-[10px] font-medium bg-[#FFEBEE] text-[#E53935] px-2 py-0.5 rounded">{cat.name}</span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-[#191919] mb-2 leading-tight">{product.name}</h1>

          {/* Rating + Sold */}
          <div className="flex items-center gap-3 mb-3">
            <RatingStars rating={4.8} count={reviewCount} size="md" />
            <SoldCount count={soldNum} className="text-xs" />
          </div>

          {/* Price Block - AliExpress style */}
          <div className="bg-[#FFEBEE] rounded-lg p-3 mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl max-md:text-xl font-bold text-[#E53935]">{currency} {price.toFixed(0)}</span>
              {product.on_sale && regularPrice && (
                <>
                  <span className="text-sm text-[#999] line-through">{currency} {regularPrice.toFixed(0)}</span>
                  <DealBadge text={`${discount}% OFF`} variant="red" />
                </>
              )}
            </div>
            <div className="flex gap-2 mt-2">
              <ShippingBadge variant="free" />
              <ShippingBadge variant="same-day" />
            </div>
          </div>

          {/* Short description */}
          {product.short_description && (
            <div className="text-[#666] text-sm leading-relaxed mb-3 prose"
              dangerouslySetInnerHTML={{ __html: product.short_description }} />
          )}

          {/* Stock badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-2 h-2 rounded-full ${product.in_stock !== false ? 'bg-[#00B578]' : 'bg-red-400'}`} />
            <span className="text-xs font-medium text-[#666]">
              {product.in_stock !== false ? 'In Stock — Ready for delivery' : 'Out of Stock'}
            </span>
          </div>

          {/* Variations / Add to Cart */}
          <ProductVariationPicker
            productId={product.id}
            productName={product.name}
            basePrice={price}
            image={mainImage}
            attributes={product.attributes || []}
            variations={variations}
          />

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {getProductHighlights(currency).map((h) => (
              <div key={h.title} className="flex items-center gap-2 bg-white border border-[#f0f0f0] rounded-lg px-3 py-2">
                <span className="text-[#E53935]">{HIGHLIGHT_ICONS[h.key]}</span>
                <div>
                  <span className="text-xs font-semibold text-[#191919]">{h.title}</span>
                  <p className="text-[10px] text-[#999]">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Description */}
      {product.description && (
        <div className="mx-4 max-md:mx-3 mb-10 max-md:mb-6 bg-white rounded-lg p-5 max-md:p-4 border border-[#f0f0f0]">
          <h3 className="text-base font-bold text-[#191919] mb-3">Product Details</h3>
          <div className="prose text-[#666] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      )}

      {/* Related Products */}
      {similarProducts.length > 0 && (
        <div className="mx-4 max-md:mx-3 mb-10 max-md:mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-[#191919]">You May Also Like</h2>
            <Link href="/shop" className="text-xs text-[#999] hover:text-[#E53935]">See All &gt;</Link>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-4 gap-2">
            {similarProducts.map((p: any) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                price={parseFloat(p.price || '0')}
                regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
                imageSrc={p.images?.[0]?.src}
                variant="compact"
                currency={currency}
              />
            ))}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="md:hidden flex overflow-x-auto no-scrollbar gap-1.5">
            {similarProducts.map((p: any) => (
              <div key={p.id} className="w-[42vw] min-w-[145px] shrink-0">
                <ProductCard
                  slug={p.slug}
                  name={p.name}
                  price={parseFloat(p.price || '0')}
                  regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
                  imageSrc={p.images?.[0]?.src}
                  variant="compact"
                  currency={currency}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Add to Cart (only for simple products) */}
      {product.type !== 'variable' && (
        <StickyAddToCart productId={product.id} name={product.name} price={price} image={mainImage} />
      )}
    </div>
  );
}
