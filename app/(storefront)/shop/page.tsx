import type { Metadata } from 'next';
import { wooApi } from '@/lib/woocommerce';
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
  custom: '🎨', default: '🎈',
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  birthday: 'from-pink-400 to-rose-500',
  wedding: 'from-violet-400 to-purple-500',
  'baby-shower': 'from-blue-300 to-cyan-400',
  events: 'from-amber-400 to-orange-500',
  anniversary: 'from-red-400 to-pink-500',
  graduation: 'from-indigo-400 to-blue-500',
  custom: 'from-emerald-400 to-teal-500',
  default: 'from-gray-400 to-gray-600',
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
  const [products, categories] = await Promise.all([
    getProducts(searchParams.search, searchParams.category),
    getCategories(),
  ]);

  // Filter to featured/on-sale products when Deals tab is active
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

      <div className="max-w-7xl mx-auto px-4 max-md:px-2 pb-10 max-md:pb-20">
        {/* Search Bar */}
        {/* Mobile search bar - desktop uses navbar search */}
        <form method="GET" action="/shop" className="md:hidden pt-3 mb-3">
          <div className="flex border-2 border-[#F26522] rounded-full overflow-hidden bg-white">
            <input
              name="search"
              defaultValue={searchParams.search || ''}
              placeholder="Search balloons, occasions..."
              className="flex-1 px-3 py-2.5 text-xs outline-none"
            />
            <button type="submit" className="bg-[#F26522] text-white px-3 font-bold text-sm hover:bg-[#D4520F] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Category Pills */}
        {topCategories.length > 0 && (
          <div className="flex gap-4 max-md:gap-1.5 overflow-x-auto no-scrollbar pb-3 pt-3 md:pt-4">
            <CategoryIconPill
              icon="🎈"
              label="All"
              href="/shop"
              active={!searchParams.category}
            />
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

        {/* Results header */}
        <div className="flex items-center justify-between mb-2 mt-1">
          <p className="text-xs text-gray-500 font-medium">
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
            description={isFeatured ? 'Check back soon for new deals and featured products.' : 'Try a different search or browse all categories.'}
            actionLabel="Browse All"
            actionHref="/shop"
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-md:gap-1.5">
            {displayProducts.map((p: any) => {
              const catSlug = p.categories?.[0]?.slug || 'default';
              return (
                <ProductCard
                  key={p.id}
                  slug={p.slug}
                  name={p.name}
                  price={parseFloat(p.price || '0')}
                  regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
                  imageSrc={p.images?.[0]?.src}
                  categoryName={p.categories?.[0]?.name}
                  categoryIcon={CATEGORY_ICONS[catSlug] || '🎈'}
                  categoryGradient={CATEGORY_GRADIENTS[catSlug] || CATEGORY_GRADIENTS.default}
                  onSale={p.on_sale}
                  featured={p.featured}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
