'use client';

import { useEffect, useState } from 'react';
import { useProducts } from '@/src/utils/useproducts';
import FilterSidebar from './components/FilterSidebar';
import SearchAndSortBar from './components/SearchAndSortBar';
import FlashSaleCard from '@/src/components/cards/FlashSaleCard';
import Pagination from './components/Pagination';
import { useRouter } from "next/navigation";
import { BackendProduct } from '@/src/utils/type';
import { FaFilter, FaTimes } from "react-icons/fa";
type ParamsType = {
  page: number;
  limit: number;
  sortBy: 'createdAt' | 'discountedPrice';
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
  
  const [params, setParams] = useState<ParamsType>({
    page: 1,
    limit: 8,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: '',
    category: '',
    size: '',
    color: '',
    priceMin: '',
    priceMax: '',
    discount: false,
  });

  const router = useRouter();
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [manualLoading, setManualLoading] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false); // Mobile filter toggle state

  const { data, isLoading } = useProducts(params);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data?.products) {
        setProducts(data.products);
      }
      setManualLoading(false);
    }, 100); // small delay to avoid flicker

    return () => clearTimeout(timer);
  }, [params, data]);

  const handleParamChange = (newParams: Partial<ParamsType>) => {
    const resetPageKeys: (keyof ParamsType)[] = [
      'search',
      'category',
      'size',
      'color',
      'priceMin',
      'priceMax',
      'discount',
    ];

    const shouldResetPage = Object.keys(newParams).some((key) =>
      resetPageKeys.includes(key as keyof ParamsType)
    );

    setParams((prev) => ({
      ...prev,
      ...newParams,
      page: shouldResetPage ? 1 : prev.page,
    }));

    setProducts([]); // Clear old products immediately
  };


  const { limit } = params;

  return (
    <section className="py-8 px-3 md:px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Flash Sale Products</h1>

      <div className='flex justify-between items-center mb-4'>
        <div className='items-center text-center flex w-full h-full'>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
          >
            ← Back
          </button>
        </div>
        <div className='block md:hidden'>
          <button 
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 "
          >
            {showMobileFilter ? (
              <FaTimes className=' text-gray-600' />
            ) : (
              <FaFilter className=' text-gray-600' />
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap mx-auto">
        {/* Desktop Filter Sidebar */}
        <div className="w-72 mx-auto hidden md:block">
          <FilterSidebar params={params} onChange={handleParamChange} />
        </div>

        {/* Mobile Filter Sidebar - Toggle visibility */}
        {showMobileFilter && (
          <div className="w-full md:hidden mb-4 bg-white rounded-lg p-4 shadow-lg">
            <FilterSidebar params={params} onChange={handleParamChange} />
          </div>
        )}

        <div className="flex-1">
          <SearchAndSortBar params={params} onChange={handleParamChange} />

          {(isLoading || manualLoading) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: limit }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
                >
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

          {!isLoading && !manualLoading && products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {products.map((product) => (
                <FlashSaleCard
                  key={product._id}
                  id={product._id}
                  title={product.title}
                  description={product.description || ''}
                  category={product.category}
                  price={product.discountedPrice}
                  discount={
                    product.discount ?? (
                      product.originalPrice
                        ? Math.round(
                          ((product.originalPrice - product.discountedPrice) /
                            product.originalPrice) * 100
                        )
                        : 0
                    )
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
            !isLoading &&
            !manualLoading && (
              <div className="text-center text-gray-500 py-8">No products found</div>
            )
          )}

          {data && (
            <Pagination
              page={data.page ?? 1}
              totalPages={data.pages ?? 1}
              onPageChange={(newPage) => {
                setManualLoading(true);
                setParams((prev) => ({ ...prev, page: newPage }));
              }}
            />
          )}

        </div>
      </div>
    </section>
  );
}
