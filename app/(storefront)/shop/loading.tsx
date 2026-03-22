import CategoryPillsSkeleton from '@/components/ui/skeletons/CategoryPillsSkeleton';
import ProductGridSkeleton from '@/components/ui/skeletons/ProductGridSkeleton';

export default function ShopLoading() {
  return (
    <>
      {/* Trust banner skeleton */}
      <div className="h-12 max-md:h-8 skeleton w-full" />

      <div className="max-w-7xl mx-auto px-4 max-md:px-2 pb-10 max-md:pb-20">
        {/* Mobile search skeleton */}
        <div className="md:hidden pt-3 mb-3">
          <div className="h-10 skeleton rounded-full" />
        </div>

        {/* Category pills skeleton */}
        <div className="pb-3 pt-3 md:pt-4">
          <CategoryPillsSkeleton />
        </div>

        {/* Results header skeleton */}
        <div className="flex items-center justify-between mb-2 mt-1">
          <div className="h-3 w-16 skeleton" />
        </div>

        {/* Product grid skeleton */}
        <ProductGridSkeleton count={12} />
      </div>
    </>
  );
}
