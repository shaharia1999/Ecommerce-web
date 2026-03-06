'use client';
import FlashSaleCard from '../cards/FlashSaleCard';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
import Link from 'next/link';
import { BackendProduct } from '@/src/utils/type';

type FlashSaleSectionProps = {
  products: BackendProduct[];
};

const FlashSaleSection = ({ products }: FlashSaleSectionProps) => {
  if (!products || products.length === 0) {
    return <div className="my-10 px-4 text-center text-gray-500">No products found</div>;
  }

  return (
    <section className="my-10 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="sm:text-2xl md:text-3xl font-bold">
          <span className="relative">
            <span className="text-black">Flash Sale</span>
            <span className="absolute left-0 -bottom-1 w-full h-1 bg-red-200 rounded-full -z-10"></span>
          </span>{" "}
        </h2>
        <div className="flex items-center gap-2 px-2 rounded-xl bg-orange-100 text-gray-800 shadow-sm w-fit">
          <div className="text-orange-500 text-lg">⏰</div>
          <span className="font-medium text-[14px] ml-2 lg:text-[20px] md:text-[20px]">Limited Time Offer</span>
          <Link
            href="/FlashSaleCardDiscount"
            className="text-[14px] lg:text-[20px] md:text-[20px] text-blue-600 hover:underline font-semibold"
          >
            View All →
          </Link>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-500">
        Products loaded: {products.length}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {products.map((product, index) => (
          <div key={product._id || index}>
            <FlashSaleCard
              id={product._id}
              title={product.title}
              description={product.description}
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
              rating={product.rating || 4}
              reviews={product.reviews || 0}
              filters={{
                size: product.filters?.size || [],
                color: product.filters?.color || [],
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlashSaleSection;
