'use client';
import FlashSaleCard from '../cards/FlashSaleCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import { useProducts } from '@/src/utils/useproducts';
// import { useProducts } from '../../utils/api';

type Product = {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  category?: string;
  discountedPrice: number;
  originalPrice: number;
  discount?: number;
  stock?: number;
  slug: string;
  mainImg: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  filters?: {
    size?: string[];
    color?: string[];
  };
};
const FlashSaleSection = () => {
  // const { data, isLoading, isError } = useProducts();
  const { data, isLoading, isError } = useProducts({ discount: true });
    if (isLoading) {
  return (
    <section className="my-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-60 bg-orange-100 rounded animate-pulse"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="border rounded-lg shadow-sm p-4 space-y-3 animate-pulse"
          >
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
    return <div className="my-10 px-4 text-center text-red-500">Failed to load products</div>;
  }

  const products = data.products || [];
  console.log('Sample product:', products[0]);
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
        <div className="flex items-center gap-2 px-2  rounded-xl bg-orange-100 text-gray-800 shadow-sm w-fit">
          <div className="text-orange-500 text-lg">⏰</div>
          <span className=" font-medium text-[14px] ml-2 lg:text-[20px] md:text-[20px]">Limited Time Offer</span>
          <Link
            href="/FlashSaleCardDiscount"
            className="text-[14px]  lg:text-[20px] md:text-[20px] text-blue-600 hover:underline font-semibold"
          >
            View All →
          </Link>
        </div>

      </div>

      <div className="mb-4 text-sm text-gray-500">
        Products loaded: {products.length}
      </div>

      {products.length > 0 ? (
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={products.length > 3}
            className="!pb-4"
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
          >
            {products.map((product: Product, index: number) => (
              <SwiperSlide key={product._id || index}>
                <FlashSaleCard
                 id={product._id || product.id || ''}
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
                    color: product.filters?.color || []
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className=" swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10  flex items-center justify-center text-gray-600 hover:text-yellow-600 hover:shadow-xl transition-all duration-300 -ml-6  border-gray-100 hover:border-yellow-200 hover:bg-amber-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10  flex items-center justify-center text-gray-600 hover:text-orange-500 hover:shadow-xl transition-all duration-300 -mr-6 hover:bg-amber-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-500">No products found</div>
      )}

      {/* Progress Bar (Optional) */}
      <div className="mt-6 flex justify-center">
        <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection;
