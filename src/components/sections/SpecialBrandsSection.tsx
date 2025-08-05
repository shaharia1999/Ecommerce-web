
'use client'
import { useProducts } from '@/src/utils/useproducts';
import SpecialBrandCard from '../cards/SpecialBrandCard';
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
  rating?: number;
};
const SpecialBrandsSection = () => {
  const { data, isLoading, isError } = useProducts({ discount: true });
  // Filter products with discount up to 25%
  const filteredProducts = data?.products?.filter(
    (product: Product) => {
      const original = product.originalPrice;
      const discounted = product.discountedPrice;
      const actualDiscountPercent = ((original - discounted) / original) * 100;
      return actualDiscountPercent <= 25;
    }
  ) || [];
  // console.log(filteredProducts);
  return (
    <section className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Banner/CTA */}
        <div className="bg-pink-100 rounded-2xl flex flex-col justify-center items-start p-8 min-h-[400px] relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
            Make Your Fashion Look
            <br />
            More Changing
          </h2>
          <p className="text-gray-600 mb-6">
            Get 50% Off on Selected Clothing Items
          </p>
          <Link href='/FlashSaleCardDiscount'>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow transition flex items-center gap-2 cursor-pointer">
              Shop Now <span>➔</span>
            </button>
          </Link>
        </div>

        {/* Brands Grid */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isLoading && (
            <>
              {[...Array(4)].map((_, index) => (
                <div key={index} className="border-1 border-gray-300 rounded-lg p-4 space-y-3 animate-pulse bg-white">
                  <div className="h-40 bg-gray-200 rounded-md w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mt-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="flex gap-2 mt-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </>
          )}

          {isError && <p>Failed to load products.</p>}
          {filteredProducts.length === 0 && !isLoading && <p>No special brands found.</p>}

          {filteredProducts.map((item: Product) => (
            <SpecialBrandCard
              key={item.id}
              title={item.title}
              slug={item.slug}
              image={item.mainImg}
              price={item.discountedPrice}
              oldPrice={item.originalPrice}
              rating={item.rating ?? 4}
              save={item.originalPrice - item.discountedPrice}
            />
          ))}

        </div>
      </div>
    </section>
  );
};

export default SpecialBrandsSection;

