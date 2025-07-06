'use client';
import FlashSaleCard from '../cards/FlashSaleCard';
import flashSaleData from '../../data/flashSaleDataNew';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const FlashSaleSection = () => {
  return (
    <section className="my-10 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">
          <span className="relative">
            <span className="text-black">Flash</span>
            <span className="absolute left-0 -bottom-1 w-full h-2 bg-red-200 rounded-full -z-10"></span>
          </span>{" "}
          Sale
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>⏰</span>
          <span>Limited Time Offer</span>
        </div>
      </div>

      {/* Swiper Container */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={4}
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
          loop
          className="!pb-4"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {flashSaleData.map((item, index) => (
            <SwiperSlide key={index}>
              <FlashSaleCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white  shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-gray-600 hover:text-yellow-600 hover:shadow-xl transition-all duration-300 -ml-6 border border-gray-100 hover:border-yellow-200 hover:bg-amber-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-gray-600 hover:text-orange-500 hover:shadow-xl transition-all duration-300 -mr-6 hover:bg-amber-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

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
