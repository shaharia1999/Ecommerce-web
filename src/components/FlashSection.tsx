// updated code for FlashSection component
'use client';

import { useProducts } from '../utils/api';
import FlashCard from './FlashCard';

interface FlashSectionProps {
  title: string;
  category?: string;
  limit?: number;
  className?: string;
}

export default function FlashSection({ 
  title, 
  category, 
  limit = 8,
  className = ""
}: FlashSectionProps) {
  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useProducts({
    category,
    limit,
    page: 1
  });

  if (isLoading) {
    return (
      <section className={`py-12 ${className}`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {title}
            </h2>
            {category && (
              <p className="text-gray-600 capitalize">
                Browse our {category} collection
              </p>
            )}
          </div>

          {/* Loading Skeleton */}
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
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={`py-12 ${className}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {title}
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to load products</h3>
              <p className="text-red-600 text-sm">
                {error instanceof Error ? error.message : 'Something went wrong. Please try again.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data?.products || data.products.length === 0) {
    return (
      <section className={`py-12 ${className}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {title}
            </h2>
            <p className="text-gray-500">No products found</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          {category && (
            <p className="text-gray-600 capitalize">
              Browse our {category} collection
            </p>
          )}
          
          {/* Results count */}
          <p className="text-sm text-gray-500 mt-2">
            Showing {data.products.length} of {data.total} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.products.map((product) => (
            <FlashCard key={product.id || product._id} product={product as any} />
          ))}
        </div>
{/*  */}
        {/* View More Button */}
        {data.total > data.products.length && (
          <div className="text-center mt-10">
            <button className="bg-orange-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-orange-600 transition-all duration-300">
              View More Products ({data.total - data.products.length} more)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}