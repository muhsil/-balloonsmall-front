export default function ContentPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 max-md:px-3 max-md:py-6 max-md:pb-20">
      {/* Breadcrumb skeleton */}
      <div className="flex gap-2 mb-6">
        <div className="h-3 w-10 skeleton rounded" />
        <div className="h-3 w-3 skeleton rounded" />
        <div className="h-3 w-16 skeleton rounded" />
      </div>

      {/* Card skeleton */}
      <div className="bg-white rounded-2xl p-8 max-md:p-5 border border-gray-100 space-y-6">
        {/* Title */}
        <div className="h-8 w-64 max-md:w-48 skeleton rounded" />

        {/* Subtitle */}
        <div className="space-y-2">
          <div className="h-4 w-full skeleton rounded" />
          <div className="h-4 w-3/4 skeleton rounded" />
        </div>

        {/* Content blocks */}
        <div className="space-y-4 pt-4">
          <div className="h-5 w-40 skeleton rounded" />
          <div className="h-3 w-full skeleton rounded" />
          <div className="h-3 w-full skeleton rounded" />
          <div className="h-3 w-5/6 skeleton rounded" />
        </div>

        <div className="space-y-4 pt-4">
          <div className="h-5 w-36 skeleton rounded" />
          <div className="h-3 w-full skeleton rounded" />
          <div className="h-3 w-full skeleton rounded" />
          <div className="h-3 w-4/5 skeleton rounded" />
        </div>

        <div className="space-y-4 pt-4">
          <div className="h-5 w-44 skeleton rounded" />
          <div className="h-3 w-full skeleton rounded" />
          <div className="h-3 w-3/4 skeleton rounded" />
        </div>
      </div>
    </div>
  );
}
