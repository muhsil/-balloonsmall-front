import Link from 'next/link';
import { wooApi } from '@/lib/woocommerce';
import ProductCard from '@/components/ui/ProductCard';
import TrustBanner from '@/components/ui/TrustBanner';
import CategoryIconPill from '@/components/ui/CategoryIconPill';
import PromoStrip from '@/components/ui/PromoStrip';
import DealSection from '@/components/ui/DealSection';
import CountdownTimer from '@/components/ui/CountdownTimer';

export const revalidate = 60;

const CATEGORY_ICONS: Record<string, string> = {
  birthday: '🎂', wedding: '💒', 'baby-shower': '👶',
  events: '🎉', anniversary: '💝', graduation: '🎓',
  default: '🎈',
};

const PROMO_MESSAGES = [
  'Free Delivery on orders over AED 100',
  'Same-Day Delivery — Order before 2 PM',
  'Premium Quality Balloons — Dubai #1 Balloon Store',
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
  const heroProducts = (featured.length > 0 ? featured : allProducts).filter(
    (p: any) => p.images?.[0]?.src
  );

  return (
    <>
      <PromoStrip messages={PROMO_MESSAGES} />
      <TrustBanner />

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-4 max-md:pt-3">
        <div className="bg-[#E53935] rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            {/* Text */}
            <div className="px-6 py-8 max-md:px-4 max-md:py-5">
              <span className="inline-block bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2 uppercase tracking-wider">
                UP TO 30% OFF
              </span>
              <h1 className="text-2xl max-md:text-lg font-bold text-white mb-2 leading-tight">
                Celebrate Every Moment
              </h1>
              <p className="text-white/80 text-sm max-md:text-xs mb-4 leading-relaxed max-w-md">
                Premium balloon decorations delivered to your door in Dubai. Same-day delivery available!
              </p>
              <div className="flex gap-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center bg-white text-[#E53935] font-bold text-sm px-5 py-2 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Shop All
                </Link>
                <Link
                  href="/shop?featured=true"
                  className="hidden md:inline-flex items-center bg-white/20 text-white font-semibold text-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  Today&apos;s Deals
                </Link>
              </div>
            </div>

            {/* Image grid - desktop */}
            <div className="hidden md:grid grid-cols-2 gap-2 p-4">
              {heroProducts.slice(0, 4).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="relative overflow-hidden rounded-lg aspect-square bg-white/10">
                    <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                      <p className="text-white text-xs font-medium line-clamp-1">{p.name}</p>
                      <p className="text-white/90 text-xs">AED {parseFloat(p.price || '0').toFixed(0)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Image strip - mobile */}
            <div className="md:hidden flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
              {heroProducts.slice(0, 4).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="shrink-0 w-[72px]">
                  <div className="w-[72px] h-[72px] rounded-lg overflow-hidden bg-white/10">
                    <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white text-[9px] font-medium mt-1 text-center line-clamp-1">AED {parseFloat(p.price || '0').toFixed(0)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {topCategories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-4">
          <div className="bg-white rounded-lg border border-[#f0f0f0] p-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-[#191919]">Categories</h2>
              <Link href="/shop" className="text-xs text-[#999] hover:text-[#E53935]">See All &gt;</Link>
            </div>
            <div className="flex gap-3 max-md:gap-1 overflow-x-auto no-scrollbar">
              <CategoryIconPill icon="🎈" label="All" href="/shop" />
              {topCategories.map((cat: any) => (
                <CategoryIconPill
                  key={cat.id}
                  icon={CATEGORY_ICONS[cat.slug] || CATEGORY_ICONS.default}
                  label={cat.name}
                  href={`/shop?category=${cat.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Flash Deals / SuperDeals */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-4">
          <DealSection
            title="SuperDeals"
            href="/shop?featured=true"
            products={featured.slice(0, 8)}
            icon="⚡"
            accentColor="#E53935"
          >
            <CountdownTimer hours={12} />
          </DealSection>
        </section>
      )}

      {/* More to love - Product Grid */}
      {allProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-4 pb-8 max-md:pb-20">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-[#191919]">More to love</h2>
            <Link href="/shop" className="text-xs text-[#999] hover:text-[#E53935]">See All &gt;</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 max-md:gap-1.5">
            {allProducts.map((p: any) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                price={parseFloat(p.price || '0')}
                regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
                imageSrc={p.images?.[0]?.src}
                categoryName={p.categories?.[0]?.name}
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
