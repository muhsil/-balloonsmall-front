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

      {/* Second Promo Banner */}
      <section className="px-4 pt-6 max-md:px-2 max-md:pt-4 max-w-7xl mx-auto">
        <PromoBanner
          title="Custom Balloon Designs"
          subtitle="Add your personal text and choose colors"
          ctaLabel="Start Customizing"
          ctaHref="/shop"
          bgColor="bg-gradient-to-r from-[#7C3AED] to-[#EC4899]"
          discount="PERSONALIZE IT"
        />
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
