import Link from 'next/link';
import { wooApi } from '@/lib/woocommerce';
import ProductCard from '@/components/ui/ProductCard';
import TrustBanner from '@/components/ui/TrustBanner';
import CategoryIconPill from '@/components/ui/CategoryIconPill';
import PromoStrip from '@/components/ui/PromoStrip';

export const revalidate = 60;

const CATEGORY_ICONS: Record<string, string> = {
  birthday: '🎂', wedding: '💒', 'baby-shower': '👶',
  events: '🎉', anniversary: '💝', graduation: '🎓',
  default: '🎈',
};

const PROMO_MESSAGES = [
  'Free Delivery on orders over AED 100',
  'Same-Day Delivery available - Order before 2 PM',
  'Premium Quality Balloons - Dubai #1 Balloon Store',
  'Wide variety of balloon styles for every occasion!',
];

async function getFeaturedProducts() {
  try {
    const { data } = await wooApi.get('/products', {
      params: { featured: true, per_page: 8, status: 'publish' },
    });
    return data as any[];
  } catch { return []; }
}

async function getCategories() {
  try {
    const { data } = await wooApi.get('/products/categories', {
      params: { per_page: 20, hide_empty: true },
    });
    return data as any[];
  } catch { return []; }
}

async function getAllProducts() {
  try {
    const { data } = await wooApi.get('/products', {
      params: { per_page: 12, status: 'publish', orderby: 'date' },
    });
    return data as any[];
  } catch { return []; }
}

export default async function HomePage() {
  const [featured, categories, allProducts] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getAllProducts(),
  ]);

  const topCategories = categories.filter((c: any) => c.count > 0).slice(0, 8);

  // Pick hero images from featured products or all products
  const heroProducts = (featured.length > 0 ? featured : allProducts).filter(
    (p: any) => p.images?.[0]?.src
  );

  return (
    <>
      {/* Promo Strip */}
      <PromoStrip messages={PROMO_MESSAGES} />

      {/* Trust Banner */}
      <TrustBanner />

      {/* Hero Banner with Product Images */}
      <section className="px-4 pt-4 max-md:px-2 max-md:pt-2 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl max-md:rounded-xl bg-gradient-to-r from-[#F26522] to-[#FF4747]">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            {/* Text side */}
            <div className="px-8 py-10 max-md:px-5 max-md:py-6 relative z-10">
              <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                UP TO 30% OFF
              </span>
              <h1 className="text-3xl max-md:text-xl font-extrabold text-white mb-2 leading-tight">
                Celebrate Every Moment
              </h1>
              <p className="text-white/80 text-sm max-md:text-xs mb-5 max-w-md leading-relaxed">
                Premium balloon decorations delivered to your door in Dubai. Same-day delivery available!
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-white text-[#F26522] font-bold text-sm px-6 py-2.5 rounded-full hover:bg-gray-50 transition-all active:scale-[0.98] shadow-lg"
                >
                  Shop All Balloons
                </Link>
                <Link
                  href="/shop?category=birthday"
                  className="inline-flex items-center gap-2 bg-white/20 text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-white/30 transition-all max-md:hidden"
                >
                  Birthday Specials
                </Link>
              </div>
            </div>

            {/* Image collage side - desktop */}
            <div className="hidden md:grid grid-cols-2 gap-2 p-4">
              {heroProducts.slice(0, 4).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="relative overflow-hidden rounded-xl aspect-square">
                    <img
                      src={p.images[0].src}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-bold line-clamp-1 drop-shadow">{p.name}</p>
                      <p className="text-white/90 text-xs font-semibold">AED {parseFloat(p.price || '0').toFixed(0)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Image strip - mobile */}
            <div className="md:hidden flex gap-2 px-5 pb-5 overflow-x-auto no-scrollbar">
              {heroProducts.slice(0, 3).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="flex-shrink-0 w-20">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-white/30">
                    <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white text-[9px] font-semibold mt-1 line-clamp-1 text-center">AED {parseFloat(p.price || '0').toFixed(0)}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-2 right-4 opacity-10 text-7xl pointer-events-none select-none max-md:hidden">🎈</div>
        </div>
      </section>

      {/* Categories Row */}
      {topCategories.length > 0 && (
        <section className="px-4 pt-6 max-md:px-2 max-md:pt-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4 max-md:mb-3">
            <h2 className="text-lg font-extrabold text-gray-900 max-md:text-sm">Categories</h2>
            <Link href="/shop" className="text-xs font-semibold text-[#F26522]">See All &gt;</Link>
          </div>
          <div className="flex gap-6 max-md:gap-2 overflow-x-auto no-scrollbar pb-2">
            <CategoryIconPill
              icon="🎈"
              label="All"
              href="/shop"
            />
            {topCategories.map((cat: any) => (
              <CategoryIconPill
                key={cat.id}
                icon={CATEGORY_ICONS[cat.slug] || CATEGORY_ICONS.default}
                label={cat.name}
                href={`/shop?category=${cat.slug}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Flash Deals / Featured */}
      {featured.length > 0 && (
        <section className="px-4 pt-6 max-md:px-2 max-md:pt-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-[#FF4747] max-md:text-sm deal-pulse">⚡ Flash Deals</span>
            </div>
            <Link href="/shop" className="text-xs font-semibold text-[#F26522]">See All &gt;</Link>
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="hidden md:grid grid-cols-4 gap-4">
            {featured.slice(0, 4).map((p: any) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                price={parseFloat(p.price || '0')}
                regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
                imageSrc={p.images?.[0]?.src}
                categoryName={p.categories?.[0]?.name}
                categoryIcon={CATEGORY_ICONS[p.categories?.[0]?.slug] || '🎈'}
                onSale={p.on_sale}
                featured
                variant="compact"
              />
            ))}
          </div>
          <div className="md:hidden mobile-scroll-x">
            {featured.slice(0, 6).map((p: any) => (
              <div key={p.id} className="w-[42vw] min-w-[150px]">
                <ProductCard
                  slug={p.slug}
                  name={p.name}
                  price={parseFloat(p.price || '0')}
                  regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
                  imageSrc={p.images?.[0]?.src}
                  onSale={p.on_sale}
                  featured
                  variant="compact"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Products Grid */}
      {allProducts.length > 0 && (
        <section className="px-4 pt-6 pb-10 max-md:px-2 max-md:pt-4 max-md:pb-20 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4 max-md:mb-3">
            <h2 className="text-lg font-extrabold text-gray-900 max-md:text-sm">Just For You</h2>
            <Link href="/shop" className="text-xs font-semibold text-[#F26522]">See All &gt;</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-md:gap-1.5">
            {allProducts.map((p: any) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                price={parseFloat(p.price || '0')}
                regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
                imageSrc={p.images?.[0]?.src}
                categoryName={p.categories?.[0]?.name}
                categoryIcon={CATEGORY_ICONS[p.categories?.[0]?.slug] || '🎈'}
                onSale={p.on_sale}
                featured={p.featured}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
