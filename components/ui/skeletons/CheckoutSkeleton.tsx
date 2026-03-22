export default function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] py-6 max-md:py-4 animate-pulse">
      <div className="max-w-5xl mx-auto px-6 max-md:px-3">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 skeleton rounded-lg" />
          <div className="h-6 w-24 skeleton" />
        </div>
        <div className="h-10 w-full skeleton rounded-lg mb-4" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
          <div className="lg:col-span-8 space-y-5">
            <div className="h-64 skeleton rounded-xl" />
            <div className="h-48 skeleton rounded-xl" />
            <div className="h-32 skeleton rounded-xl" />
          </div>
          <div className="lg:col-span-4">
            <div className="h-72 skeleton rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
