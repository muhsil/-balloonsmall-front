import type { Metadata } from 'next';
import { wooApi } from '@/lib/woocommerce';
import { getStoreSettings } from '@/lib/store-settings';
import ProductCard from '@/components/ui/ProductCard';
import EmptyState from '@/components/ui/EmptyState';
import CategoryIconPill from '@/components/ui/CategoryIconPill';
import TrustBanner from '@/components/ui/TrustBanner';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Shop Balloons & Decorations',
  description: 'Browse our full collection of premium balloons, balloon arches, garland kits, and event decorations. Birthday, wedding, baby shower balloons with same-day delivery in Dubai.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop Balloons & Decorations | BalloonsMall Dubai',
    description: 'Browse premium balloons for every occasion. Same-day delivery across Dubai.',
  },
};

const CATEGORY_ICONS: Record<string, string> = {
  birthday: '🎂', wedding: '💒', 'baby-shower': '👶',
  events: '🎉', anniversary: '💝', graduation: '🎓',
  default: '🎈',
};

async function getProducts(search?: string, category?: string) {
  try {
    const params: Record<string, any> = { per_page: 30, status: 'publish' };
    if (search) params.search = search;
    if (category) {
      const { data: cats } = await wooApi.get('/products/categories', { params: { slug: category } });
      if (cats?.[0]?.id) params.category = cats[0].id;
    }
    const { data } = await wooApi.get('/products', { params });
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

export default async function ShopPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ search?: string; category?: string; featured?: string }>;
}) {
  const searchParams = await searchParamsPromise;
  const [products, categories, settings] = await Promise.all([
    getProducts(searchParams.search, searchParams.category),
    getCategories(),
    getStoreSettings(),
  ]);
  const { currency } = settings;

  const isFeatured = searchParams.featured === 'true';
  const displayProducts = isFeatured
    ? products.filter((p: any) => p.featured || p.on_sale)
    : products;

  const topCategories = categories.filter((c: any) => c.count > 0).slice(0, 8);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
      ]} />
      <TrustBanner />

      <div className="max-w-7xl mx-auto px-4 max-md:px-3 pb-8 max-md:pb-20">
        {/* Mobile search */}
        <form method="GET" action="/shop" className="md:hidden pt-3 mb-3">
          <div className="flex rounded-full overflow-hidden bg-[#f5f5f5] border border-[#e8e8e8] focus-within:border-[#E53935]">
            <input
              name="search"
              defaultValue={searchParams.search || ''}
              placeholder="Search balloons..."
              className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
            />
            <button type="submit" className="bg-[#E53935] text-white px-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Category pills */}
        {topCategories.length > 0 && (
          <div className="flex gap-2 max-md:gap-1 overflow-x-auto no-scrollbar py-3">
            <CategoryIconPill icon="🎈" label="All" href="/shop" active={!searchParams.category} />
            {topCategories.map((cat: any) => (
              <CategoryIconPill
                key={cat.id}
                icon={CATEGORY_ICONS[cat.slug] || CATEGORY_ICONS.default}
                label={cat.name}
                href={`/shop?category=${cat.slug}`}
                active={searchParams.category === cat.slug}
              />
            ))}
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-3 mt-1">
          <p className="text-xs text-[#999]">
            {displayProducts.length} {displayProducts.length === 1 ? 'item' : 'items'}
            {isFeatured && <> — Deals &amp; Featured</>}
            {searchParams.search && <> for &quot;{searchParams.search}&quot;</>}
            {searchParams.category && <> in {searchParams.category}</>}
          </p>
        </div>

        {/* Product Grid */}
        {displayProducts.length === 0 ? (
          <EmptyState
            icon="🎈"
            title={isFeatured ? 'No deals right now' : 'No balloons found'}
            description={isFeatured ? 'Check back soon for new deals.' : 'Try a different search or browse all categories.'}
            actionLabel="Browse All"
            actionHref="/shop"
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 max-md:gap-1.5">
            {displayProducts.map((p: any) => (
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
                currency={currency}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
