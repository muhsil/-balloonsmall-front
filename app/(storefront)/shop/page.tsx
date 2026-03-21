import { wooApi } from '@/lib/woocommerce';
import Link from 'next/link';

export const revalidate = 60; // ISR: revalidate every 60 seconds

async function getProducts() {
  try {
    const { data } = await wooApi.get('/products', {
      params: { per_page: 20, status: 'publish' }
    });
    return data as any[];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="py-8 animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop Balloons</h1>
        <p className="text-gray-500">Customize and schedule your balloon deliveries.</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-6xl mb-4">🎈</div>
          <p className="text-xl font-semibold">No products found yet.</p>
          <p className="text-sm mt-2">Add products in your WooCommerce dashboard at <a href="https://cms.balloonsmall.com/wp-admin" className="text-blue-500 underline" target="_blank">cms.balloonsmall.com/wp-admin</a></p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
              <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                {product.images?.[0]?.src ? (
                  <img
                    src={product.images[0].src}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-7xl">🎈</span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">AED {parseFloat(product.price || '0').toFixed(2)}</p>
                <Link
                  href={`/product/${product.slug}`}
                  className="block w-full text-center bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-700 font-medium py-2 rounded-lg transition-colors border border-gray-200 hover:border-blue-600"
                >
                  Customize & Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
