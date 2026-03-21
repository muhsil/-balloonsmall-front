import BalloonCustomizer from '@/components/customizer/BalloonCustomizer';
import { wooApi } from '@/lib/woocommerce';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import EmptyState from '@/components/ui/EmptyState';
import RatingStars from '@/components/ui/RatingStars';
import SoldCount from '@/components/ui/SoldCount';
import DealBadge from '@/components/ui/DealBadge';
import ShippingBadge from '@/components/ui/ShippingBadge';

export const revalidate = 60;

const PRODUCT_HIGHLIGHTS = [
  { icon: '🎨', title: 'Customizable', description: 'Add your own text & colors' },
  { icon: '⚡', title: 'Same-Day', description: 'Order before 2 PM' },
  { icon: '🌟', title: 'Premium', description: 'Finest quality balloons' },
  { icon: '💬', title: 'WhatsApp', description: 'Instant support' },
];

async function getProduct(slug: string) {
  try {
    const { data } = await wooApi.get('/products', { params: { slug } });
    return data?.[0] as any;
  } catch { return null; }
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

export default async function ProductPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = await paramsPromise;
  const product = await getProduct(params.slug);
  const related = product ? await getRelated(product.categories?.map((c: any) => c.id)) : [];
  const similarProducts = related.filter((p: any) => p.slug !== params.slug).slice(0, 4);

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

  const price = parseFloat(product.price || '0');
  const regularPrice = product.regular_price ? parseFloat(product.regular_price) : null;
  const discount = product.on_sale && regularPrice ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;
  // Deterministic pseudo-random matching ProductCard formula
  const hash = params.slug.split('').reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0);
  const soldNum = Math.floor((hash * 7 + price * 3) % 900 + 100);
  const reviewCount = Math.floor(price * 2 + 30);

  return (
    <div className="max-w-7xl mx-auto pb-10 max-md:pb-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 px-4 py-3 max-md:px-3 overflow-x-auto no-scrollbar">
        <Link href="/" className="hover:text-[#F26522] transition-colors shrink-0">Home</Link>
        <span className="shrink-0">&gt;</span>
        <Link href="/shop" className="hover:text-[#F26522] transition-colors shrink-0">Shop</Link>
        <span className="shrink-0">&gt;</span>
        <span className="text-gray-600 font-medium truncate">{product.name}</span>
      </nav>

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-md:gap-0 px-4 max-md:px-0 mb-10 max-md:mb-6">
        {/* Left: Image */}
        <div className="max-md:mb-0">
          <div className="rounded-2xl max-md:rounded-none overflow-hidden bg-gray-50 aspect-square flex items-center justify-center relative">
            {product.images?.[0]?.src
              ? <img src={product.images[0].src} alt={product.name} className="w-full h-full object-cover" />
              : <span className="text-[100px] max-md:text-[70px]">🎈</span>
            }
            {discount > 0 && (
              <div className="absolute top-3 left-3 max-md:top-2 max-md:left-2">
                <DealBadge text={`-${discount}%`} variant="red" size="md" />
              </div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2 mt-3 max-md:mt-2 px-0 max-md:px-3 overflow-x-auto no-scrollbar">
              {product.images.slice(0, 5).map((img: any) => (
                <img key={img.id} src={img.src} alt={product.name}
                  className="w-16 h-16 max-md:w-14 max-md:h-14 rounded-lg object-cover border-2 border-transparent hover:border-[#F26522] cursor-pointer transition-all shrink-0" />
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col max-md:px-3 max-md:pt-3">
          {/* Categories */}
          {product.categories?.length > 0 && (
            <div className="flex gap-1.5 mb-2">
              {product.categories.slice(0, 2).map((cat: any) => (
                <span key={cat.id} className="badge badge-brand text-[10px]">{cat.name}</span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2 leading-tight">{product.name}</h1>

          {/* Rating + Sold */}
          <div className="flex items-center gap-3 mb-3">
            <RatingStars rating={4.8} count={reviewCount} size="md" />
            <SoldCount count={soldNum} className="text-xs" />
          </div>

          {/* Price Block - Temu style */}
          <div className="bg-[#FFF3EC] rounded-lg p-3 mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl max-md:text-xl font-extrabold text-[#F26522]">AED {price.toFixed(0)}</span>
              {product.on_sale && regularPrice && (
                <>
                  <span className="text-sm text-gray-400 line-through">AED {regularPrice.toFixed(0)}</span>
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
            <div className="text-gray-500 text-sm leading-relaxed mb-3 prose"
              dangerouslySetInnerHTML={{ __html: product.short_description }} />
          )}

          {/* Stock badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-2 h-2 rounded-full ${product.in_stock !== false ? 'bg-[#00B578]' : 'bg-red-400'}`} />
            <span className="text-xs font-medium text-gray-600">
              {product.in_stock !== false ? 'In Stock - Ready for delivery' : 'Out of Stock'}
            </span>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {PRODUCT_HIGHLIGHTS.map((h) => (
              <div key={h.title} className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-2">
                <span className="text-sm">{h.icon}</span>
                <div>
                  <span className="text-xs font-bold text-gray-800">{h.title}</span>
                  <p className="text-[10px] text-gray-400">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customizer Section */}
      <div className="mx-4 max-md:mx-3 mb-10 max-md:mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-extrabold text-gray-900 max-md:text-base">Customize Your Balloon 🎨</h2>
          <p className="text-xs text-gray-400 mt-1">Add your own text and choose a color</p>
        </div>
        <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-100">
          <BalloonCustomizer productId={product.id} price={price} name={product.name} />
        </div>
      </div>

      {/* Product Description */}
      {product.description && (
        <div className="mx-4 max-md:mx-3 mb-10 max-md:mb-6 bg-white rounded-xl p-5 max-md:p-4 border border-gray-100">
          <h3 className="text-base font-bold text-gray-900 mb-3">Product Details</h3>
          <div className="prose text-gray-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      )}

      {/* Related Products */}
      {similarProducts.length > 0 && (
        <div className="mx-4 max-md:mx-3 mb-10 max-md:mb-6">
          <div className="flex items-center justify-between mb-4 max-md:mb-3">
            <h2 className="text-lg font-extrabold text-gray-900 max-md:text-sm">You May Also Like</h2>
            <Link href="/shop" className="text-xs font-semibold text-[#F26522]">See All &gt;</Link>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-4 gap-4">
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
          <div className="md:hidden mobile-scroll-x">
            {similarProducts.map((p: any) => (
              <div key={p.id} className="w-[42vw] min-w-[150px]">
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
    </div>
  );
}
