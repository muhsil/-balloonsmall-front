import BalloonCustomizer from '@/components/customizer/BalloonCustomizer';
import { wooApi } from '@/lib/woocommerce';
import Link from 'next/link';

export const revalidate = 60;

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
      params: { category: categoryIds[0], per_page: 4, status: 'publish' }
    });
    return data as any[];
  } catch { return []; }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  const related = product ? await getRelated(product.categories?.map((c: any) => c.id)) : [];
  const similarProducts = related.filter((p: any) => p.slug !== params.slug).slice(0, 3);

  if (!product) {
    return (
      <div className="text-center py-28 px-4">
        <div className="text-7xl mb-6">🎈</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Product Not Found</h1>
        <p className="text-gray-500 mb-8">This balloon may have floated away! Browse our full collection.</p>
        <Link href="/shop" className="btn-primary">Browse All Balloons</Link>
      </div>
    );
  }

  const price = parseFloat(product.price || '0');
  const regularPrice = product.regular_price ? parseFloat(product.regular_price) : null;

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
        <span>›</span>
        <Link href="/shop" className="hover:text-violet-600 transition-colors">Shop</Link>
        <span>›</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">
        {/* Left: Images */}
        <div>
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-violet-50 to-pink-50 aspect-square flex items-center justify-center shadow-sm">
            {product.images?.[0]?.src
              ? <img src={product.images[0].src} alt={product.name} className="w-full h-full object-cover" />
              : <span className="text-[120px]">🎈</span>
            }
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {product.images.slice(1, 5).map((img: any) => (
                <img key={img.id} src={img.src} alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover border-2 border-transparent hover:border-violet-400 cursor-pointer transition-all" />
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          {product.categories?.length > 0 && (
            <div className="flex gap-2 mb-4">
              {product.categories.slice(0, 2).map((cat: any) => (
                <span key={cat.id} className="badge badge-brand text-xs">{cat.name}</span>
              ))}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-extrabold gradient-text">AED {price.toFixed(0)}</span>
            {product.on_sale && regularPrice && (
              <span className="text-gray-400 text-lg line-through">AED {regularPrice.toFixed(0)}</span>
            )}
            {product.on_sale && <span className="badge badge-pink">On Sale!</span>}
          </div>
          {product.short_description && (
            <div className="text-gray-500 text-sm leading-relaxed mb-6 prose"
              dangerouslySetInnerHTML={{ __html: product.short_description }} />
          )}

          {/* Stock badge */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`w-2 h-2 rounded-full ${product.in_stock !== false ? 'bg-green-500' : 'bg-red-400'}`} />
            <span className="text-sm font-medium text-gray-600">{product.in_stock !== false ? 'In Stock – Ready for delivery' : 'Out of Stock'}</span>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {['🎨 Fully Customizable', '⚡ Same-Day Delivery', '🌟 Premium Quality', '💬 WhatsApp Support'].map(f => (
              <div key={f} className="flex items-center gap-2 bg-violet-50 rounded-xl px-3 py-2 text-xs font-medium text-violet-800">{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Customizer Section */}
      <div className="mb-20">
        <div className="text-center mb-8">
          <div className="badge badge-brand mb-3">Make It Personal 🎨</div>
          <h2 className="section-title text-2xl md:text-3xl">Customize Your <span className="gradient-text">Balloon</span></h2>
          <p className="text-gray-500 mt-2 text-sm">Add your own text and choose a color – see the live preview before adding to cart!</p>
        </div>
        <div className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-3xl p-4 md:p-8">
          <BalloonCustomizer productId={product.id} price={price} name={product.name} />
        </div>
      </div>

      {/* Product Description Tabs */}
      {product.description && (
        <div className="mb-20 bg-white rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
          <div className="prose text-gray-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      )}

      {/* Related Products */}
      {similarProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Love 💜</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((p: any) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="product-card group block">
                <div className="aspect-video overflow-hidden bg-gray-50">
                  {p.images?.[0]?.src
                    ? <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-6xl">🎈</div>
                  }
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 text-sm">{p.name}</h3>
                  <p className="text-violet-600 font-bold">AED {parseFloat(p.price || '0').toFixed(0)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
