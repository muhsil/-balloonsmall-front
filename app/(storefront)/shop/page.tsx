import Link from 'next/link';
import { wooApi } from '@/lib/woocommerce';

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
      params: { per_page: 10, hide_empty: false, exclude: [15] }  // 15 is usually Uncategorized ID
    });
    return (data as any[]).filter((c: any) => c.slug !== 'uncategorized');
  } catch { return []; }
}

export default async function ShopPage({ searchParams }: { searchParams: { category?: string; search?: string; sort?: string } }) {
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
      <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fce7f3 100%)' }} className="py-16 px-4 text-center">
        <div className="badge badge-brand mb-4 mx-auto">🛍️ Our Collection</div>
        <h1 className="section-title mb-3">Shop <span className="gradient-text">Premium Balloons</span></h1>
        <p className="text-gray-500 max-w-md mx-auto">Handcrafted balloon arrangements for every occasion in Dubai. Customize, order, and we deliver.</p>
        
        {/* Search bar */}
        <form method="GET" className="mt-8 flex gap-3 max-w-lg mx-auto">
          {searchParams.sort && <input type="hidden" name="sort" value={searchParams.sort} />}
          {searchParams.category && <input type="hidden" name="category" value={searchParams.category} />}
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input name="search" defaultValue={searchParams.search || ''} placeholder="Search balloons, occasions..." className="input pl-11 rounded-full shadow-sm" />
          </div>
          <button type="submit" className="btn-primary px-6 py-3 rounded-full text-sm">Search</button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ── Category Pills ── */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            <Link href="/shop" className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all ${!searchParams.category ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-200' : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-700'}`}>
              🎈 All
            </Link>
            {categories.map((cat: any) => {
              const icon = CATEGORY_ICONS[cat.slug] || '🎈';
              const isActive = searchParams.category === cat.slug;
              return (
                <Link key={cat.id} href={`/shop?category=${cat.slug}`}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all ${isActive ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-200' : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-700'}`}>
                  {icon} {cat.name}
                  {cat.count > 0 && <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>{cat.count}</span>}
                </Link>
              );
            })}
          </div>
        )}

        {/* ── Sort bar ── */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-500 font-medium">
            {products.length > 0 ? `Showing ${products.length} product${products.length !== 1 ? 's' : ''}` : ''}
            {searchParams.search ? ` for "${searchParams.search}"` : ''}
            {searchParams.category ? ` in ${categories.find((c:any) => c.slug === searchParams.category)?.name || searchParams.category}` : ''}
          </p>
          <form method="GET">
            {searchParams.category && <input type="hidden" name="category" value={searchParams.category} />}
            {searchParams.search && <input type="hidden" name="search" value={searchParams.search} />}
            <select name="sort" className="input w-auto text-sm py-2" defaultValue={searchParams.sort || 'date'}
              onChange={undefined}>
              <option value="date">✨ Newest First</option>
              <option value="price_asc">⬆️ Price: Low to High</option>
              <option value="price_desc">⬇️ Price: High to Low</option>
            </select>
          </form>
        </div>

        {/* ── Product Grid ── */}
        {products.length === 0 ? (
          <div className="text-center py-28 space-y-4">
            <div className="text-7xl">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800">No Products Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchParams.search ? `We couldn't find anything matching "${searchParams.search}".` : 'No products in this category yet.'}
            </p>
            <Link href="/shop" className="btn-primary mt-4 inline-flex">Browse All Balloons</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {products.map((product: any, index: number) => {
              const catSlug = product.categories?.[0]?.slug || 'uncategorized';
              const gradient = CATEGORY_GRADIENTS[catSlug] || CATEGORY_GRADIENTS['uncategorized'];
              const catIcon = CATEGORY_ICONS[catSlug] || '🎈';
              const price = parseFloat(product.price || '0');
              const regularPrice = product.regular_price ? parseFloat(product.regular_price) : null;
              const isLarge = index === 0;

              return (
                <Link key={product.id} href={`/product/${product.slug}`}
                  className={`product-card group block ${isLarge ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ paddingBottom: isLarge ? '56%' : '72%' }}>
                    <div className="absolute inset-0">
                      {product.images?.[0]?.src ? (
                        <img src={product.images[0].src} alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                          <span className="text-8xl opacity-60">{catIcon}</span>
                        </div>
                      )}
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-1 duration-300">
                        <span className="bg-white text-violet-700 text-sm font-bold px-5 py-2 rounded-full shadow-lg inline-block">
                          Customize & Order ✨
                        </span>
                      </div>
                    </div>
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.on_sale && <span className="badge badge-pink text-xs">🔥 Sale</span>}
                      {product.featured && <span className="badge badge-accent text-xs">⭐ Featured</span>}
                      {index === 0 && <span className="badge badge-brand text-xs">✨ Trending</span>}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        {product.categories?.[0] && (
                          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-brand)' }}>
                            {catIcon} {product.categories[0].name}
                          </span>
                        )}
                        <h3 className="font-extrabold text-gray-900 mt-0.5 text-lg leading-snug line-clamp-2">{product.name}</h3>
                      </div>
                    </div>
                    {product.short_description && (
                      <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: product.short_description }} />
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-extrabold gradient-text">AED {price.toFixed(0)}</span>
                        {product.on_sale && regularPrice && (
                          <span className="text-gray-400 text-sm line-through">AED {regularPrice.toFixed(0)}</span>
                        )}
                      </div>
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform text-white text-lg`}>
                        →
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
