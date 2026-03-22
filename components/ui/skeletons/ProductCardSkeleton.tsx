export default function ProductCardSkeleton() {
  return (
    <div className="product-card">
      <div className="aspect-square skeleton" />
      <div className="p-3 max-md:p-2 space-y-2">
        <div className="h-4 w-20 skeleton" />
        <div className="h-3 w-full skeleton" />
        <div className="h-3 w-3/4 skeleton" />
        <div className="h-3 w-16 skeleton" />
      </div>
    </div>
  );
}
