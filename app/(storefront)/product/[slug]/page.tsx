import BalloonCustomizer from '@/components/customizer/BalloonCustomizer';

// Mock function to simulate fetching product by slug
function getProductBySlug(slug: string) {
  const MOCK_PRODUCTS = [
    { id: 1, name: 'Classic Gold Birthday', price: 150, slug: 'classic-gold', customizable: true },
    { id: 2, name: 'Romantic Red Hearts', price: 200, slug: 'romantic-red', customizable: true },
    { id: 3, name: 'Pastel Baby Shower', price: 180, slug: 'pastel-baby', customizable: true },
    { id: 4, name: 'Elegant Black & Silver', price: 160, slug: 'black-silver', customizable: true },
  ];
  return MOCK_PRODUCTS.find(p => p.slug === slug);
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="py-8 animate-in fade-in duration-500">
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-xl text-blue-600 font-semibold">AED {product.price}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
        {product.customizable ? (
          <BalloonCustomizer 
            productId={product.id} 
            price={product.price}
            name={product.name}
          />
        ) : (
          <div className="p-8 text-center text-gray-500">
            This product is not customizable. Add to Cart buttons will appear here.
          </div>
        )}
      </div>
    </div>
  );
}
