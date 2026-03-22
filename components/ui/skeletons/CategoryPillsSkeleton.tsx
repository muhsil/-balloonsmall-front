export default function CategoryPillsSkeleton() {
  return (
    <div className="flex gap-6 max-md:gap-2 overflow-x-auto no-scrollbar pb-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 min-w-[56px]">
          <div className="w-14 h-14 max-md:w-10 max-md:h-10 rounded-full skeleton" />
          <div className="h-2.5 w-10 skeleton" />
        </div>
      ))}
    </div>
  );
}
