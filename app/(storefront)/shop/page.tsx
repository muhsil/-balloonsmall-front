import Link from 'next/link';

// Mocked products for frontend testing
const MOCK_PRODUCTS = [
  { id: 1, name: 'Classic Gold Birthday', price: 150, slug: 'classic-gold', customizable: true, image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Romantic Red Hearts', price: 200, slug: 'romantic-red', customizable: true, image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Pastel Baby Shower', price: 180, slug: 'pastel-baby', customizable: true, image: 'https://via.placeholder.com/300' },
  { id: 4, name: 'Elegant Black & Silver', price: 160, slug: 'black-silver', customizable: true, image: 'https://via.placeholder.com/300' },
];

export default function ShopPage() {
  return (
    <div className="py-8 animate-in fade-in duration-500">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop Balloons</h1>
      <p className="text-gray-500 mb-8">Customize and schedule your balloon deliveries.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-blue-600 font-semibold mb-4">AED {product.price}</p>
              <Link 
                href={`/product/${product.slug}`}
                className="block w-full text-center bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-700 font-medium py-2 rounded-lg transition-colors border border-gray-200 hover:border-blue-600"
              >
                {product.customizable ? 'Customize & Order' : 'View Details'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
