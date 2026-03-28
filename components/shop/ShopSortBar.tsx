"use client";
import { useRouter } from 'next/navigation';

// We need this page to be a separate client component for the sort select
export default function ShopSortBar({ currentSort, currentCategory, currentSearch }: {
  currentSort?: string; currentCategory?: string; currentSearch?: string;
}) {
  const router = useRouter();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams();
    if (currentCategory) params.set('category', currentCategory);
    if (currentSearch) params.set('search', currentSearch);
    if (e.target.value && e.target.value !== 'date') params.set('sort', e.target.value);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <select onChange={handleSort} defaultValue={currentSort || 'date'}
      className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm bg-white text-gray-700 focus:border-violet-400 outline-none cursor-pointer">
      <option value="date">Newest First</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
    </select>
  );
}
