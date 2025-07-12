'use client';

import Image from 'next/image';
import Link from 'next/link';

interface FlashCardProps {
  product: {
    id: string;
    title: string;
    slug: string;
    category: string;
    originalPrice: number;
    discountedPrice: number;
    mainImg: string;
    stock: number;
    rating?: number;
  };
}

export default function FlashCard({ product }: FlashCardProps) {
  // Discount percentage calculate করুন
  const discountPercentage = product.originalPrice
    ? Math.round(100 - (product.discountedPrice / product.originalPrice) * 100)
    : 0;

  // মূল্য ও ডিসকাউন্ট মূল্য
  const price = product.originalPrice || 0;
  const discountedPrice = product.discountedPrice || price;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
      <Link href={`/shop/${product.slug}`}>
        <div className="relative">
          {/* Product Image */}
          <div className="relative bg-gray-50 p-6 flex items-center justify-center h-64">
            {discountPercentage > 0 && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                -{discountPercentage}%
              </span>
            )}

            {/* Stock badge */}
            {product.stock === 0 && (
              <span className="absolute top-3 right-3 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                Out of Stock
              </span>
            )}

            {/* Image rendering with fallback */}
            {product.mainImg ? (
              <Image
                src={product.mainImg}
                alt={product.title}
                width={200}
                height={200}
                className="object-contain max-h-48 group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-200 text-gray-400 text-sm rounded">
                No Image
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <p className="text-xs text-orange-500 font-medium mb-1 uppercase tracking-wide">
              {product.category}
            </p>
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
              {product.title}
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-800">
                  ৳{discountedPrice.toFixed(0)}
                </span>
                {discountPercentage > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    ৳{price.toFixed(0)}
                  </span>
                )}
              </div>
              {product.rating && (
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                  <span className="text-xs text-gray-600">{product.rating}</span>
                </div>
              )}
            </div>
            <button 
              disabled={product.stock === 0}
              className={`w-full mt-4 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600 group-hover:bg-orange-600'
              }`}
            >
              {product.stock === 0 ? 'Out of Stock' : 'View Details'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}