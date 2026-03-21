import BalloonCustomizer from '@/components/customizer/BalloonCustomizer';
import { wooApi } from '@/lib/woocommerce';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import EmptyState from '@/components/ui/EmptyState';
import SectionHeader from '@/components/ui/SectionHeader';

export const revalidate = 60;

const PRODUCT_HIGHLIGHTS = [
  { icon: '🎨', title: 'Customizable', description: 'Add your own text & colors' },
  { icon: '⚡', title: 'Same-Day', description: 'Order before 2 PM' },
  { icon: '🌟', title: 'Premium', description: 'Finest quality balloons' },
  { icon: '💬', title: 'WhatsApp', description: 'Instant support' },
];

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

export default async function ProductPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = await paramsPromise;
  const product = await getProduct(params.slug);
  const related = product ? await getRelated(product.categories?.map((c: any) => c.id)) : [];
  const similarProducts = related.filter((p: any) => p.slug !== params.slug).slice(0, 3);

  if (!product) {
    return (
      <EmptyState
        icon="🎈"
        title="Product Not Found"
        description="This balloon may have floated away! Browse our full collection."
        actionLabel="Browse All Balloons"
        actionHref="/shop"
      />
    );
  }

  const price = parseFloat(product.price || '0');
  const regularPrice = product.regular_price ? parseFloat(product.regular_price) : null;

  return (
    <div className="py-10 max-md:py-4 px-4 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 max-md:mb-4 max-md:text-xs overflow-x-auto no-scrollbar">
        <Link href="/" className="hover:text-violet-600 transition-colors shrink-0">Home</Link>
        <span className="shrink-0">›</span>
        <Link href="/shop" className="hover:text-violet-600 transition-colors shrink-0">Shop</Link>
        <span className="shrink-0">›</span>
        <span className="text-gray-700 font-medium truncate">{product.name}</span>
      </nav>

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-md:gap-6 mb-20 max-md:mb-10">
        {/* Left: Images */}
        <div>
          <div className="rounded-3xl max-md:rounded-2xl overflow-hidden bg-gradient-to-br from-violet-50 to-pink-50 aspect-square flex items-center justify-center shadow-sm">
            {product.images?.[0]?.src
              ? <img src={product.images[0].src} alt={product.name} className="w-full h-full object-cover" />
              : <span className="text-[120px] max-md:text-[80px]">🎈</span>
            }
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3 max-md:gap-2 mt-4 max-md:mt-3 overflow-x-auto no-scrollbar">
              {product.images.slice(1, 5).map((img: any) => (
                <img key={img.id} src={img.src} alt={product.name}
                  className="w-20 h-20 max-md:w-16 max-md:h-16 rounded-xl max-md:rounded-lg object-cover border-2 border-transparent hover:border-violet-400 cursor-pointer transition-all shrink-0" />
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          {product.categories?.length > 0 && (
            <div className="flex gap-2 mb-4 max-md:mb-3">
              {product.categories.slice(0, 2).map((cat: any) => (
                <span key={cat.id} className="badge badge-brand text-xs">{cat.name}</span>
              ))}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 max-md:mb-3 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-3 mb-6 max-md:mb-4">
            <span className="text-3xl max-md:text-2xl font-extrabold gradient-text">AED {price.toFixed(0)}</span>
            {product.on_sale && regularPrice && (
              <span className="text-gray-400 text-lg max-md:text-base line-through">AED {regularPrice.toFixed(0)}</span>
            )}
            {product.on_sale && <span className="badge badge-pink">On Sale!</span>}
          </div>
          {product.short_description && (
            <div className="text-gray-500 text-sm leading-relaxed mb-6 max-md:mb-4 prose"
              dangerouslySetInnerHTML={{ __html: product.short_description }} />
          )}

          {/* Stock badge */}
          <div className="flex items-center gap-2 mb-8 max-md:mb-5">
            <div className={`w-2 h-2 rounded-full ${product.in_stock !== false ? 'bg-green-500' : 'bg-red-400'}`} />
            <span className="text-sm font-medium text-gray-600">{product.in_stock !== false ? 'In Stock – Ready for delivery' : 'Out of Stock'}</span>
          </div>

          {/* Highlights - 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 max-md:gap-2 mb-8 max-md:mb-5">
            {PRODUCT_HIGHLIGHTS.map((h) => (
              <div key={h.title} className="flex items-center gap-2 bg-violet-50 rounded-xl max-md:rounded-lg px-3 py-2 max-md:px-2.5 max-md:py-1.5">
                <span className="text-base max-md:text-sm">{h.icon}</span>
                <span className="text-xs font-medium text-violet-800 max-md:text-[11px]">{h.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customizer Section */}
      <div className="mb-20 max-md:mb-10">
        <div className="text-center mb-8 max-md:mb-5">
          <SectionHeader
            badge="Make It Personal 🎨"
            badgeVariant="brand"
            title="Customize Your"
            highlight="Balloon"
            subtitle="Add your own text and choose a color – see the live preview before adding to cart!"
          />
        </div>
        <div className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-3xl max-md:rounded-2xl p-4 md:p-8">
          <BalloonCustomizer productId={product.id} price={price} name={product.name} />
        </div>
      </div>

      {/* Product Description */}
      {product.description && (
        <div className="mb-20 max-md:mb-10 bg-white rounded-3xl max-md:rounded-2xl p-8 max-md:p-5 shadow-sm">
          <h3 className="text-xl max-md:text-lg font-bold text-gray-900 mb-4 max-md:mb-3">Product Description</h3>
          <div className="prose text-gray-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      )}

      {/* Related Products */}
      {similarProducts.length > 0 && (
        <div className="max-md:mb-6">
          <h2 className="text-2xl max-md:text-xl font-bold text-gray-900 mb-8 max-md:mb-4">You Might Also Love</h2>

          {/* Desktop grid */}
          <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((p: any) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                price={parseFloat(p.price || '0')}
                imageSrc={p.images?.[0]?.src}
                variant="compact"
              />
            ))}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="md:hidden mobile-scroll-x">
            {similarProducts.map((p: any) => (
              <div key={p.id} className="w-[70vw] min-w-[220px]">
                <ProductCard
                  slug={p.slug}
                  name={p.name}
                  price={parseFloat(p.price || '0')}
                  imageSrc={p.images?.[0]?.src}
                  variant="compact"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
