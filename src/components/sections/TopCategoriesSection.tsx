'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProducts } from '@/src/utils/useproducts';
import NewArrivalCard from '../cards/NewArrivalCard';
import Link from 'next/link';

const topCategoriesData = [
  { id: 1, category: 'Electronics', image: '/images/cat1.jpg' },
  { id: 2, category: 'Fashion', image: '/images/cat1.jpg' },
  { id: 3, category: 'Sports', image: '/images/cat1.jpg' },
  { id: 4, category: 'Trending', image: '/images/cat1.jpg' },
];

const TopCategoriesWithProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get('category') || '';

  const [activeCategory, setActiveCategory] = useState(selectedCategory);

  useEffect(() => {
    setActiveCategory(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('category', category);
    router.replace(`?${params.toString()}`, { scroll: false });

    // Smooth scroll to product section
    setTimeout(() => {
      document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const { data, isLoading, isError } = useProducts({ category: activeCategory, limit: 12 });

  const products = data?.products || [];

  return (
    <section className="my-10 px-4">
      {/* Top Categories Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topCategoriesData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCategoryClick(item.category)}
              className={`cursor-pointer border rounded p-4 text-center transition hover:shadow-md ${activeCategory === item.category ? 'bg-purple-100 border-purple-500' : ''
                }`}
            >
              <img
                src={item.image}
                alt={item.category}
                className="w-full h-28 object-cover mb-2 rounded"
              />
              <h3 className="text-sm font-semibold">{item.category}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Filtered Product Section */}
      <div id="product-section">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-1xl font-bold">
            <span className="relative">
              <span className="text-black">{activeCategory || 'All'} </span>
              <span className="absolute left-0 -bottom-1 w-full h-2 mt-1 bg-red-200 rounded-full -z-10"></span>
            </span>
            Products
          </h2>
          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>⏰</span>
              <span>Limited Time Offer</span>
              <Link
                href={{
                  pathname: '/Viewall',
                  query: {
                    sortBy: 'createdAt',
                    sortOrder: 'desc',
                    category: activeCategory,
                    limit: 14,
                  },
                }}
                className="text-blue-600 hover:underline"
              >
                View All →
              </Link>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : isError || products.length === 0 ? (
          <div className="text-center text-red-500">No products found</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((item: any) => (
              <NewArrivalCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.discountedPrice ?? item.originalPrice}
                image={item.mainImg}
                rating={item.rating || 4}
                reviews={item.reviews || 0}
                isNew={item.isNew ?? true}
                colors={item.filters?.color || []}
                discount={item.discount || 0}
                oldPrice={item.originalPrice}
                slug={item.slug}
                stock={item.stock || 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopCategoriesWithProducts;
