'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ZoomImage from './ZoomIn';
import { useCart } from '@/src/context/CartContext';

// Define the interface to match what the Server Page sends
interface ProductData {
  id: string;
  title: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  mainImg: string;
  stock: number;
  slug: string;
  description?: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
}

export default function ProductClient({ product }: { product: ProductData }) {
  const router = useRouter();
  const { addToCart } = useCart();

  // States
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.mainImg);

  // Constants
  const discountPercentage = product.originalPrice > 0
    ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
    : 0;

  const handleBuyNow = () => {
    const checkoutData = {
      ...product,
      price: product.discountedPrice,
      selectedSize,
      selectedColor: product.colors?.[selectedColor] || 'Default',
      quantity,
    };

    router.push(`/checkout?product=${encodeURIComponent(JSON.stringify(checkoutData))}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section / Breadcrumbs */}
      <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 py-6 md:py-10 mt-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
            Shop Details
          </h1>
          <div className="flex flex-wrap items-center justify-center space-x-1 sm:space-x-2 text-gray-600 text-xs sm:text-base">
            <span>Home</span>
            <span>›</span>
            <span>Shop</span>
            <span>›</span>
            <span className="text-gray-800 font-medium">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

          {/* Left: Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100">
              <ZoomImage src={mainImage || product.mainImg} alt={product.title} />
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {(product.images || [product.mainImg]).slice(0, 5).map((imgSrc, idx) => (
                <div
                  key={idx}
                  onClick={() => setMainImage(imgSrc)}
                  className={`cursor-pointer bg-white rounded-lg p-1 shadow border-2 transition-all duration-200 ${mainImage === imgSrc ? 'border-orange-500 scale-105' : 'border-gray-200 hover:border-orange-200'
                    }`}
                  style={{ width: 70, height: 70 }}
                >
                  <Image
                    src={imgSrc}
                    alt={`${product.title} thumb ${idx}`}
                    width={70}
                    height={70}
                    className="object-contain h-full w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Information */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <p className="text-orange-500 text-xs sm:text-sm font-semibold uppercase tracking-wide mb-1">
                {product.category}
              </p>
              <h1 className="text-1xl sm:text-1xl lg:text-3xl font-bold text-gray-800 mb-2 mt-2">
                {product.title}
              </h1>

              {/* Stock status */}
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                  {product.stock > 0 ? '● In Stock' : '○ Out of Stock'} ({product.stock})
                </span>
              </div>

              {/* Quantity and Actions */}
              <div className="flex  gap-2 lg:gap-4 mb-8">
                <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white shadow-sm
                 lg:w-[150px] w-[120px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="lg:px-4 px-2 lg:py-3 py-2 text-gray-600 hover:text-orange-500 lg:font-bold lg:text-xl cursor-pointer disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 min-w-[50px] text-center lg:font-bold text-gray-800 border-x-2 border-gray-100">
                    {quantity.toString().padStart(2, '0')}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="lg:px-4 px-2 lg:py-3 py-2 text-gray-600 hover:text-orange-500 lg:font-bold lg:text-xl cursor-pointer disabled:opacity-30"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 bg-green-600 text-white lg:font-bold lg:py-3 py-1 lg:px-6 px-1 rounded-xl hover:bg-green-700 hover:shadow-lg transition-all disabled:bg-gray-300 cursor-pointer"
                >
                  Buy Now
                </button>

                <button
                  disabled={product.stock === 0}
                  onClick={() => addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.discountedPrice,
                    mainImg: product.mainImg,
                    quantity: quantity,
                    stock: product.stock,
                  })}
                  className="flex-1 bg-orange-500 text-white lg:font-bold lg:py-3 py-2 lg:px-6 px-1 rounded-xl hover:bg-orange-600 hover:shadow-lg transition-all disabled:bg-gray-300 cursor-pointer"
                >
                  Add To Cart
                </button>
              </div>

              {/* Price */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="lg:text-3xl text-2xl font-bold text-gray-900">
                  TK {product.discountedPrice.toFixed(2)}
                </span>
                {discountPercentage > 0 && (
                  <>
                    <span className="lg:text-xs text-2xl text-gray-400 line-through">
                      TK {product.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-1xl lg:text-xs font-bold">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              <div className="text-gray-600 mb-6 text-[15px] sm:text-base border-b border-gray-100 pb-6 space-y-4">
                {(product.description || "No description available for this product.")
                  .split("\n")
                  .map((line, index) => (
                    <p key={index} className="leading-8">
                      {line}
                    </p>
                  ))}
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Color:</label>
                  <div className="flex gap-3">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(idx)}
                        className={`w-9 h-9 rounded-full border-2 transition-all ${selectedColor === idx ? 'border-orange-500 scale-110 shadow-md' : 'border-transparent shadow-sm'
                          }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Size:</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2 border-2 rounded-xl font-bold transition-all ${selectedSize === size
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-orange-200'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="py-6 border-t border-gray-100 space-y-2 text-sm">
                <div className="flex">
                  <span className="font-bold text-gray-500 w-24 uppercase">SKU:

                  </span>
                  {/* <span className="text-gray-800">{product.id.slice(-8).toUpperCase()}</span> */}
                </div>
                <div className="flex">
                  <span className="font-bold text-gray-500 w-24 uppercase">Category:</span>
                  <span className="text-gray-800">{product.category}</span>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}