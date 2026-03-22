export default function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto pb-10 max-md:pb-24 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex gap-2 px-4 py-3 max-md:px-3">
        <div className="h-3 w-10 skeleton" />
        <div className="h-3 w-3 skeleton" />
        <div className="h-3 w-10 skeleton" />
        <div className="h-3 w-3 skeleton" />
        <div className="h-3 w-32 skeleton" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-md:gap-0 px-4 max-md:px-0 mb-10">
        {/* Image */}
        <div className="aspect-square skeleton rounded-xl max-md:rounded-none" />

        {/* Info */}
        <div className="flex flex-col gap-3 max-md:px-3 max-md:pt-3">
          <div className="flex gap-1.5">
            <div className="h-5 w-16 skeleton rounded" />
            <div className="h-5 w-16 skeleton rounded" />
          </div>
          <div className="h-7 w-3/4 skeleton" />
          <div className="h-4 w-40 skeleton" />
          <div className="h-16 w-full skeleton rounded-lg" />
          <div className="h-4 w-full skeleton" />
          <div className="h-4 w-2/3 skeleton" />
          <div className="h-4 w-32 skeleton" />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 skeleton rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
