import Link from 'next/link';
import { wooApi } from '@/lib/woocommerce';
import ShopSortBar from '@/components/shop/ShopSortBar';
import ProductCard from '@/components/ui/ProductCard';
import EmptyState from '@/components/ui/EmptyState';

export const revalidate = 60;

const CATEGORY_ICONS: Record<string, string> = {
  birthday: '🎂', wedding: '💍', 'baby-shower': '👶', events: '🎉', custom: '🎨', uncategorized: '🎈'
};
const CATEGORY_GRADIENTS: Record<string, string> = {
  birthday: 'from-orange-400 to-pink-500',
  wedding: 'from-pink-300 to-rose-500',
  'baby-shower': 'from-sky-400 to-blue-500',
  events: 'from-violet-400 to-purple-600',
  custom: 'from-amber-400 to-orange-500',
  uncategorized: 'from-gray-400 to-gray-600'
};

async function getProducts(params: Record<string, any> = {}) {
  try {
    const { data } = await wooApi.get('/products', {
      params: { per_page: 20, status: 'publish', ...params }
    });
    return data as any[];
  } catch { return []; }
}

async function getCategories() {
  try {
    const { data } = await wooApi.get('/products/categories', {
      params: { per_page: 10, hide_empty: false, exclude: [15] }
    });
    return (data as any[]).filter((c: any) => c.slug !== 'uncategorized');
  } catch { return []; }
}

export default async function ShopPage({ searchParams: searchParamsPromise }: { searchParams: Promise<{ category?: string; search?: string; sort?: string }> }) {
  const searchParams = await searchParamsPromise;
  const [products, categories] = await Promise.all([
    getProducts({
      category: searchParams.category,
      search: searchParams.search,
      orderby: searchParams.sort === 'price_asc' ? 'price' : searchParams.sort === 'price_desc' ? 'price' : 'date',
      order: searchParams.sort === 'price_asc' ? 'asc' : 'desc',
    }),
    getCategories()
  ]);

  return (
    <div>
      {/* ── Page Header ── */}
      <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fce7f3 100%)' }} className="py-16 max-md:py-10 px-4 text-center">
        <div className="badge badge-brand mb-4 mx-auto">Our Collection</div>
        <h1 className="section-title mb-3">Shop <span className="gradient-text">Premium Balloons</span></h1>
        <p className="text-gray-500 max-w-md mx-auto max-md:text-sm">Handcrafted balloon arrangements for every occasion in Dubai. Customize, order, and we deliver.</p>
        
        {/* Search bar */}
        <form method="GET" className="mt-8 max-md:mt-5 flex gap-3 max-md:gap-2 max-w-lg mx-auto">
          {searchParams.sort && <input type="hidden" name="sort" value={searchParams.sort} />}
          {searchParams.category && <input type="hidden" name="category" value={searchParams.category} />}
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input name="search" defaultValue={searchParams.search || ''} placeholder="Search balloons, occasions..." className="input pl-11 rounded-full shadow-sm max-md:text-sm" />
          </div>
          <button type="submit" className="btn-primary px-6 py-3 max-md:px-4 max-md:py-2.5 rounded-full text-sm">Search</button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 max-md:py-6">
        {/* ── Category Pills ── */}
        {categories.length > 0 && (
          <div className="flex flex-wrap max-md:flex-nowrap max-md:overflow-x-auto gap-3 max-md:gap-2 mb-10 max-md:mb-6 justify-center max-md:justify-start no-scrollbar max-md:pb-2">
            <Link href="/shop" className={`flex items-center gap-2 px-5 max-md:px-3.5 py-2.5 max-md:py-2 rounded-full text-sm max-md:text-xs font-bold border-2 transition-all shrink-0 ${!searchParams.category ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-200' : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-700'}`}>
              🎈 All
            </Link>
            {categories.map((cat: any) => {
              const icon = CATEGORY_ICONS[cat.slug] || '🎈';
              const isActive = searchParams.category === cat.slug;
              return (
                <Link key={cat.id} href={`/shop?category=${cat.slug}`}
                  className={`flex items-center gap-2 max-md:gap-1.5 px-5 max-md:px-3.5 py-2.5 max-md:py-2 rounded-full text-sm max-md:text-xs font-bold border-2 transition-all shrink-0 ${isActive ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-200' : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-700'}`}>
                  {icon} {cat.name}
                  {cat.count > 0 && <span className={`text-xs max-md:text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>{cat.count}</span>}
                </Link>
              );
            })}
          </div>
        )}

        {/* ── Sort bar ── */}
        <div className="flex items-center justify-between mb-8 max-md:mb-4">
          <p className="text-sm max-md:text-xs text-gray-500 font-medium">
            {products.length > 0 ? `Showing ${products.length} product${products.length !== 1 ? 's' : ''}` : ''}
            {searchParams.search ? ` for "${searchParams.search}"` : ''}
            {searchParams.category ? ` in ${categories.find((c:any) => c.slug === searchParams.category)?.name || searchParams.category}` : ''}
          </p>
          <ShopSortBar currentSort={searchParams.sort} currentCategory={searchParams.category} currentSearch={searchParams.search} />
        </div>

        {/* ── Product Grid ── */}
        {products.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No Products Found"
            description={searchParams.search ? `We couldn't find anything matching "${searchParams.search}".` : 'No products in this category yet.'}
            actionLabel="Browse All Balloons"
            actionHref="/shop"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-md:gap-3">
            {products.map((product: any, index: number) => {
              const catSlug = product.categories?.[0]?.slug || 'uncategorized';
              const gradient = CATEGORY_GRADIENTS[catSlug] || CATEGORY_GRADIENTS['uncategorized'];
              const catIcon = CATEGORY_ICONS[catSlug] || '🎈';
              const price = parseFloat(product.price || '0');
              const regularPrice = product.regular_price ? parseFloat(product.regular_price) : null;

              return (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  name={product.name}
                  price={price}
                  regularPrice={regularPrice}
                  imageSrc={product.images?.[0]?.src}
                  categoryName={product.categories?.[0]?.name}
                  categoryIcon={catIcon}
                  categoryGradient={gradient}
                  onSale={product.on_sale}
                  featured={product.featured}
                  trending={index === 0}
                  shortDescription={product.short_description}
                  variant={index === 0 ? 'featured' : 'default'}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
