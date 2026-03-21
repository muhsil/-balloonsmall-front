import Link from 'next/link';
import { wooApi } from '@/lib/woocommerce';

export const revalidate = 60;

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
      params: { per_page: 10, hide_empty: false }
    });
    return data as any[];
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
    <div className="py-10 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="badge badge-brand mb-3">Our Collection</div>
        <h1 className="section-title">Shop <span className="gradient-text">Balloons</span></h1>
        <p className="text-gray-500 mt-2">Discover and customize premium balloons for every occasion in Dubai.</p>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        {/* Search */}
        <form method="GET" className="flex-1 flex gap-2">
          <input
            name="search"
            defaultValue={searchParams.search || ''}
            placeholder="Search balloons..."
            className="input flex-1"
          />
          <button type="submit" className="btn-primary px-5 py-3 rounded-xl text-sm">Search</button>
        </form>
        
        {/* Sort */}
        <form method="GET">
          {searchParams.category && <input type="hidden" name="category" value={searchParams.category} />}
          {searchParams.search && <input type="hidden" name="search" value={searchParams.search} />}
          <select name="sort" onChange="this.form.submit()" className="input w-auto"
            defaultValue={searchParams.sort || 'date'}>
            <option value="date">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </form>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Categories */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-4">Categories</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/shop" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!searchParams.category ? 'bg-violet-50 text-violet-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  🎈 All Balloons
                </Link>
              </li>
              {categories.map((cat: any) => (
                <li key={cat.id}>
                  <Link href={`/shop?category=${cat.slug}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${searchParams.category === cat.slug ? 'bg-violet-50 text-violet-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {cat.name}
                    <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-7xl mb-6">🎈</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Products Found</h3>
              <p className="text-gray-500 mb-8">
                {searchParams.search ? `No results for "${searchParams.search}"` : 'Add balloons in your WooCommerce dashboard to start selling!'}
              </p>
              <Link href="/shop" className="btn-primary">View All Products</Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-6">{products.length} products found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product: any) => (
                  <Link key={product.id} href={`/product/${product.slug}`} className="product-card group block">
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      {product.images?.[0]?.src
                        ? <img src={product.images[0].src} alt={product.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-8xl">🎈</div>
                      }
                      {product.on_sale && (
                        <span className="absolute top-3 left-3 badge badge-pink">Sale 🔥</span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                      {product.short_description && (
                        <p className="text-gray-400 text-xs mb-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: product.short_description }} />
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          {product.on_sale && product.regular_price && (
                            <span className="text-gray-400 text-xs line-through mr-2">AED {parseFloat(product.regular_price).toFixed(0)}</span>
                          )}
                          <span className="text-violet-700 font-extrabold text-xl">AED {parseFloat(product.price || '0').toFixed(0)}</span>
                        </div>
                        <span className="text-sm text-violet-600 font-semibold group-hover:underline">Customize →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
