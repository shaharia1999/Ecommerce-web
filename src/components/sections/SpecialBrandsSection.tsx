'use client'
import { useProducts } from '@/src/utils/useproducts';
import SpecialBrandCard from '../cards/SpecialBrandCard';
import Link from 'next/link';
import { BackendProduct } from '@/src/utils/type';

interface SpecialBrandsSectionProps {
  specialBrandsData: BackendProduct[];
}

const SpecialBrandsSection: React.FC<SpecialBrandsSectionProps> = ({ specialBrandsData }) => {
  // Filter products with discount up to 25%
  const filteredProducts = specialBrandsData.filter((product: BackendProduct) => {
    const original = product?.originalPrice;
    const discounted = product?.discountedPrice;
    const actualDiscountPercent = ((original - discounted) / original) * 100;
    return actualDiscountPercent <= 25;
  });

  return (
    <section className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Banner/CTA */}
        <div className="bg-pink-100 rounded-2xl flex flex-col justify-center items-start p-8 min-h-[400px] relative overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
            Make Your Fashion Look
            <br />
            More Changing
          </h2>
          <p className="text-gray-600 mb-6">
            Discover the latest trends in fashion and elevate your style with our exclusive collection.
          </p>
          <Link
            href="/shop"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all"
          >
            Shop Now
          </Link>
        </div>

        {/* Product Cards */}
        {filteredProducts?.map((product) => (
          <SpecialBrandCard
            key={product.id}
            // id={product.id}
            title={product.title}
            slug={product.slug}
            // stock={product.stock}
            price={product.originalPrice}
            oldPrice={product.discountedPrice}
            rating={product.rating || 4}
            save={product.originalPrice - product.discountedPrice}
            image={product.mainImg}
          
            // category={product.category}
            // originalPrice={product.originalPrice}
            // discountedPrice={product.discountedPrice}
   
              
            
          />
        ))}
      </div>
    </section>
  );
};

export default SpecialBrandsSection;

