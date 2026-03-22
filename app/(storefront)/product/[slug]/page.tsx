import type { Metadata } from 'next';
import { wooApi } from '@/lib/woocommerce';
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

const PRODUCT_HIGHLIGHTS = [
  { icon: '⚡', title: 'Same-Day', description: 'Order before 2 PM' },
  { icon: '🌟', title: 'Premium', description: 'Finest quality balloons' },
  { icon: '🚚', title: 'Free Delivery', description: 'Orders over AED 100' },
  { icon: '💬', title: 'WhatsApp', description: 'Instant support' },
];

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
        icon="🎈"
        title="Product Not Found"
        description="This balloon may have floated away! Browse our full collection."
        actionLabel="Browse All Balloons"
        actionHref="/shop"
      />
    );
  }

  const [variations, related] = await Promise.all([
    product.type === 'variable' ? getVariations(product.id) : Promise.resolve([]),
    getRelated(product.categories?.map((c: any) => c.id)),
  ]);
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
              <span className="text-2xl max-md:text-xl font-bold text-[#E53935]">AED {price.toFixed(0)}</span>
              {product.on_sale && regularPrice && (
                <>
                  <span className="text-sm text-[#999] line-through">AED {regularPrice.toFixed(0)}</span>
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
            {PRODUCT_HIGHLIGHTS.map((h) => (
              <div key={h.title} className="flex items-center gap-2 bg-white border border-[#f0f0f0] rounded-lg px-3 py-2">
                <span className="text-sm">{h.icon}</span>
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
