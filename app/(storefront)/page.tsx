import Link from 'next/link';
import { wooApi } from '@/lib/woocommerce';
import ProductCard from '@/components/ui/ProductCard';
import TrustBanner from '@/components/ui/TrustBanner';
import PromoBanner from '@/components/ui/PromoBanner';
import CategoryIconPill from '@/components/ui/CategoryIconPill';
import PromoStrip from '@/components/ui/PromoStrip';

export const revalidate = 60;

const CATEGORY_ICONS: Record<string, string> = {
  birthday: '🎂', wedding: '💒', 'baby-shower': '👶',
  events: '🎉', anniversary: '💝', graduation: '🎓',
  custom: '🎨', default: '🎈',
};

const PROMO_MESSAGES = [
  'Free Delivery on orders over AED 100',
  'Same-Day Delivery available - Order before 2 PM',
  'Premium Quality Balloons - Dubai #1 Balloon Store',
  'Custom designs available - Make it personal!',
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

  return (
    <>
      {/* Promo Strip */}
      <PromoStrip messages={PROMO_MESSAGES} />

      {/* Trust Banner */}
      <TrustBanner />

      {/* Hero Banner */}
      <section className="px-4 pt-4 max-md:px-2 max-md:pt-2 max-w-7xl mx-auto">
        <PromoBanner
          title="Celebrate Every Moment"
          subtitle="Premium balloon decorations delivered to your door in Dubai"
          ctaLabel="Shop All Balloons"
          ctaHref="/shop"
          discount="UP TO 30% OFF"
        />
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

      {/* Customize Your Balloon CTA */}
      <section className="px-4 pt-6 max-md:px-2 max-md:pt-4 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl max-md:rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#F26522] p-6 max-md:p-4">
          <div className="absolute top-0 right-0 w-40 h-40 max-md:w-28 max-md:h-28 opacity-20 text-[100px] max-md:text-[70px] leading-none pointer-events-none select-none">
            🎈
          </div>
          <div className="relative z-10">
            <div className="inline-block bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              New Feature
            </div>
            <h2 className="text-xl max-md:text-lg font-extrabold text-white mb-1">
              Customize Your Balloon 🎨
            </h2>
            <p className="text-white/80 text-sm max-md:text-xs mb-4 max-md:mb-3 max-w-md">
              Choose size, color, add personal text &amp; save with bundle deals. Make every celebration unique!
            </p>
            <div className="flex flex-wrap gap-2 mb-4 max-md:mb-3">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-md">10 Colors</span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-md">4 Sizes</span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-md">Custom Text</span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-md">Bundle &amp; Save</span>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-[#7C3AED] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-gray-50 transition-all active:scale-[0.98] shadow-lg"
            >
              Start Customizing →
            </Link>
          </div>
        </div>
      </section>

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
