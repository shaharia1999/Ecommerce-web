'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/src/utils/useproducts';
import FlashSaleCard from '@/src/components/cards/FlashSaleCard';
import FilterSidebar from '../FlashSaleCardDiscount/components/FilterSidebar';
import Pagination from '../FlashSaleCardDiscount/components/Pagination';
import SearchAndSortBar from './component/SearchAndSortBar';
// import { Params } from './types'; // adjust path accordingly
export type Params = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  search: string;
  category: string;
  size: string;
  color: string;
  priceMin: string;
  priceMax: string;
  discount: boolean;
};
export default function FlashSaleCardPage() {
  const searchParams = useSearchParams();

  // Read values from search params
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';
  const limit = parseInt(searchParams.get('limit') || '8');
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const size = searchParams.get('size') || '';
  const color = searchParams.get('color') || '';
  const priceMin = searchParams.get('priceMin') || '';
  const priceMax = searchParams.get('priceMax') || '';
  const discount = searchParams.get('discount') === 'true';

  // Initialize state with shared Params type
  const [params, setParams] = useState<Params>({
    page: 1,
    limit: 8,
    sortBy,
    sortOrder,
    search,
    category,
    size,
    color,
    priceMin,
    priceMax,
    discount,
  });

  const [searchInput, setSearchInput] = useState(search);
  const [products, setProducts] = useState<any[]>([]);

  const { data, isLoading, isError } = useProducts(params);

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
    }
  }, [params, data]);

  const handleParamChange = (newParams: Partial<Params>) => {
    const resetPageKeys = ['search', 'category', 'size', 'color', 'priceMin', 'priceMax', 'discount'];
    const shouldResetPage = Object.keys(newParams).some((key) => resetPageKeys.includes(key));
    setParams((prev:any) => ({
      ...prev,
      ...newParams,
      page: shouldResetPage ? 1 : prev.page,
    }));
    setProducts([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleParamChange({ search: searchInput });
  };

  if (isError || !data)
    return <div className="py-16 text-center text-lg text-red-500">Failed to load products</div>;

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-700">All Flash Sale Products</h1>

      <div className="flex gap-8">
        <div className="w-72">
          <FilterSidebar params={params} onChange={handleParamChange} />
        </div>

        <div className="flex-1">
          <SearchAndSortBar
            params={params}
            onChange={handleParamChange}
           
          />

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: limit }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="bg-gray-200 h-64"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {!isLoading && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <FlashSaleCard
                  key={product._id}
                  id={product._id}
                  title={product.title}
                  description={product.description || ''}
                  category={product.category}
                  price={product.discountedPrice}
                  discount={
                    product.discount ??
                    (product.originalPrice
                      ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
                      : 0)
                  }
                  stock={product.stock}
                  slug={product.slug}
                  mainImg={product.mainImg}
                  images={product.images || []}
                  oldPrice={product.originalPrice}
                  rating={product.rating ?? 0}
                  reviews={product.reviews ?? 0}
                  filters={{
                    size: product.size || [],
                    color: product.color || [],
                  }}
                />
              ))}
            </div>
          ) : (
            !isLoading && <div className="text-center text-gray-500 py-8">No products found</div>
          )}

          <Pagination
            page={data.page ?? 1}
            totalPages={data.pages ?? 1}
            onPageChange={(newPage) => setParams((prev:any) => ({ ...prev, page: newPage }))}
          />
        </div>
      </div>
    </section>
  );
}
