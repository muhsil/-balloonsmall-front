import HeroSkeleton from '@/components/ui/skeletons/HeroSkeleton';
import CategoryPillsSkeleton from '@/components/ui/skeletons/CategoryPillsSkeleton';
import ProductGridSkeleton from '@/components/ui/skeletons/ProductGridSkeleton';

export default function HomeLoading() {
  return (
    <>
      {/* Promo strip skeleton */}
      <div className="h-8 skeleton w-full" />

      {/* Trust banner skeleton */}
      <div className="h-12 max-md:h-8 skeleton w-full" />

      {/* Hero skeleton */}
      <HeroSkeleton />

      {/* Categories skeleton */}
      <section className="px-4 pt-6 max-md:px-2 max-md:pt-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-24 skeleton" />
          <div className="h-4 w-14 skeleton" />
        </div>
        <CategoryPillsSkeleton />
      </section>

      {/* Flash Deals skeleton */}
      <section className="px-4 pt-6 max-md:px-2 max-md:pt-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 w-28 skeleton" />
          <div className="h-4 w-14 skeleton" />
        </div>
        <ProductGridSkeleton count={4} />
      </section>

      {/* CTA skeleton */}
      <section className="px-4 pt-6 max-md:px-2 max-md:pt-4 max-w-7xl mx-auto">
        <div className="h-40 max-md:h-32 skeleton rounded-2xl" />
      </section>

      {/* Products grid skeleton */}
      <section className="px-4 pt-6 pb-10 max-md:px-2 max-md:pt-4 max-md:pb-20 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-24 skeleton" />
          <div className="h-4 w-14 skeleton" />
        </div>
        <ProductGridSkeleton count={8} />
      </section>
    </>
  );
}
