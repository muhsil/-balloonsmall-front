import BalloonCustomizer from '@/components/customizer/BalloonCustomizer';
import { wooApi } from '@/lib/woocommerce';

export const revalidate = 60;

async function getProduct(slug: string) {
  try {
    const { data } = await wooApi.get('/products', { params: { slug } });
    return data?.[0] as any;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎈</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h1>
        <p className="text-gray-500">This product may have been removed or the URL is incorrect.</p>
      </div>
    );
  }

  return (
    <div className="py-8 animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-xl text-blue-600 font-semibold">AED {parseFloat(product.price || '0').toFixed(2)}</p>
        {product.short_description && (
          <div className="mt-3 text-gray-500 text-sm prose prose-sm" dangerouslySetInnerHTML={{ __html: product.short_description }} />
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
        <BalloonCustomizer
          productId={product.id}
          price={parseFloat(product.price || '0')}
          name={product.name}
        />
      </div>
    </div>
  );
}
