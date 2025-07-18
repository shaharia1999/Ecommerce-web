'use client';

import NewArrivalCard from '../cards/NewArrivalCard';
import { useProducts } from '@/src/utils/useproducts';
import Link from 'next/link';

const NewArrivalsSection = () => {
  const { data, isLoading, isError } = useProducts({ sortBy: 'createdAt', sortOrder: 'desc', limit: 14 });

  if (isLoading) {
    return <div className="my-10 px-4 text-center">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="my-10 px-4 text-center text-red-500">Failed to load new arrivals</div>;
  }

  const products = data.products || [];

  return (
    <section className="my-10 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">
          <span className="relative">
            <span className="text-black">NEW </span>
            <span className="absolute left-0 -bottom-1 w-full h-2 bg-red-200 rounded-full -z-10"></span>
          </span>{" "}
           ARRIVALS
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>⏰</span>
          <span>Limited Time Offer</span>
<Link
  href={{
    pathname: '/Viewall',
    query: {
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit: 14,
    },
  }}
  className="text-blue-600 hover:underline"
>
  View All →
</Link>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-500">
        Products loaded: {products.length}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((item: any) => {
  // console.log("Product ID:", item); // ✅ Logs each product ID

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

      </div>
    </section>
  );
};

export default NewArrivalsSection;
