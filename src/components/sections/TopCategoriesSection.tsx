'use client';

import { useRouter } from 'next/navigation';
import NewArrivalCard from '../cards/NewArrivalCard';
import Link from 'next/link';
import Image from 'next/image';
import { BackendProduct } from '@/src/utils/type';
import { useState } from 'react';

interface Props {
  products: BackendProduct[];
}

const topCategoriesData = [
  { id: 1, category: 'Electronics', image: '/images/cat1.jpg' },
  { id: 2, category: 'Fashion', image: '/images/cat1.jpg' },
  { id: 3, category: 'Sports', image: '/images/cat1.jpg' },
  { id: 4, category: 'Trending', image: '/images/cat1.jpg' },
];

const TopCategoriesWithProducts = ({ products }: Props) => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category === activeCategory ? 'All' : category);
  };

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((product) => product.category === activeCategory);

  return (
    <section className="my-10 px-4">
      {/* Category Icons */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {topCategoriesData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCategoryClick(item.category)}
              className={`cursor-pointer group border-2 rounded-xl p-4 text-center transition-all duration-300 
                ${activeCategory === item.category ? 'bg-purple-50 border-purple-400' : 'border-gray-200 bg-white'}`}
            >
              <div className="relative w-full h-28 mb-3 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.category}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className={`text-sm font-medium ${activeCategory === item.category ? 'text-purple-700' : 'text-gray-700'}`}>
                {item.category}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div id="product-section">
        <div className="flex items-center justify-between mb-6">
          <h2 className="md:text-xl font-bold">
            {activeCategory} Products
          </h2>
        <Link
            href={{
              pathname: '/Viewall',
              query: {
                sortBy: 'createdAt',
                sortOrder: 'desc',
                limit: 14,
              },
            }}
            className="text-[14px]  lg:text-[20px] md:text-[20px] text-blue-600 hover:underline font-semibold"
          >
            View All →
          </Link>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No products found in this category.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map((item) => (
              <NewArrivalCard
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.discountedPrice ?? item.originalPrice}
                image={item.mainImg}
                slug={item.slug}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopCategoriesWithProducts;