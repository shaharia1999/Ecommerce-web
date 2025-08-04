'use client';

import NewArrivalCard from '../cards/NewArrivalCard';
import { useProducts } from '@/src/utils/useproducts';
import Link from 'next/link';
type Product = {
  id: string;
  title: string;
  slug: string;
  stock: number;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  mainImg: string;
  // Optional fields jodi thake:
  isNew?: boolean;
  filters?: {
    color?: string[];
    size?: string[];
  };
  discount?: number;
  rating?: number;
  reviews?: number;
};
const NewArrivalsSection = () => {
  const { data, isLoading, isError } = useProducts({ sortBy: 'createdAt', sortOrder: 'desc', limit: 14 });

if (isLoading) {
  return (
    <section className="my-10 px-4">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-60 bg-orange-100 rounded animate-pulse"></div>
      </div>

      {/* Skeleton Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3 animate-pulse">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="flex gap-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


  if (isError || !data) {
    return <div className="my-10 px-4 text-center text-red-500">Failed to load new arrivals</div>;
  }

  const products = data.products || [];
// console.log(products);
  return (
    <section className="my-10 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="md:text-3xl font-bold">
          <span className="relative">
            <span className="text-black">NEW </span>
            <span className="absolute left-0 -bottom-1 w-full h-2 bg-red-200 rounded-full -z-10"></span>
          </span>{" "}
          ARRIVALS
        </h2>
        <div className="flex items-center gap-2 px-2  rounded-xl bg-orange-100 text-gray-800 shadow-sm w-fit">
          <div className="text-orange-500 text-lg">⏰</div>
          <span className="font-medium text-[14px] ml-2 lg:text-[20px] md:text-[20px]">Limited Time Offer</span>
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
      </div>

      <div className="mb-4 text-sm text-gray-500">
        Products loaded: {products.length}
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((item: Product) => (
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
    </section>
  );
};

export default NewArrivalsSection;



{/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((item: any) => {

  return (
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
  );
})}

      </div> */}

