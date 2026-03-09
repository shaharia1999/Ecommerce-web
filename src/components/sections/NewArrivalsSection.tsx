'use client';

import Link from 'next/link';
import NewArrivalCard from '../cards/NewArrivalCard';
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

type NewArrivalsSectionProps = {
  products: Product[];
};

const NewArrivalsSection = ({ products }: NewArrivalsSectionProps) => {
  if (!products || products.length === 0) {
    return <div className="my-10 px-4 text-center text-gray-500">No new arrivals found</div>;
  }

  return (
    <section className="my-10 ">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className=" text-1xl md:text-3xl font-bold">
          <span className="relative">
            <span className="text-black">NEW </span>
            <span className="absolute left-0 -bottom-1 w-full h-2 bg-red-200 rounded-full -z-10"></span>
          </span>{" "}
          ARRIVALS
        </h2>
        <div className="flex items-center gap-2 px-2  rounded-xl bg-orange-100 text-gray-800 shadow-sm w-fit">
          <div className="text-orange-500 text-lg">⏰</div>
          {/* <span className="font-medium text-[14px] ml-2 lg:text-[20px] md:text-[20px]">Limited Time Offer</span> */}
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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

