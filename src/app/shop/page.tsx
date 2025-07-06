'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import Image from 'next/image';

interface ProductData {
  title: string;
  description?: string;
  category?: string;
  price: number;
  discount?: number;
  stock?: number;
  mainImage: string;
  images?: string[];
  filters?: {
    size: string[];
    color: string[];
  };
  // Additional frontend props
  oldPrice?: number;
  isNew?: boolean;
  rating?: number;
  reviews?: number;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productParam = searchParams.get('product');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  let productData: ProductData | null = null;
  
  if (productParam) {
    try {
      productData = JSON.parse(decodeURIComponent(productParam));
    } catch (error) {
      console.error('Error parsing product data:', error);
    }
  }

  // Handle Buy Now click - navigate to checkout
  const handleBuyNow = () => {
    if (productData) {
      const checkoutData = {
        ...productData,
        selectedSize,
        selectedColor: colorOptions[selectedColor],
        quantity
      };
      router.push(`/checkout?product=${encodeURIComponent(JSON.stringify(checkoutData))}`);
    }
  };

  if (!productData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-20 flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Shop Details</h1>
            <p className="text-gray-600">No product selected. Please select a product from the home page.</p>
          </div>
        </div>
      </div>
    );
  }

  // Helper to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colorOptions = productData.filters?.color || ['#FF0000', '#FFA500', '#008000', '#000000'];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 py-16 mt-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Shop Details</h1>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <span>Home</span>
            <span>›</span>
            <span>Shop</span>
            <span>›</span>
            <span className="text-gray-800">Shop Details</span>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="relative bg-gray-50 rounded-xl flex items-center justify-center h-96">
                {productData.discount && productData.discount > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-2 rounded-full z-10">
                    -{productData.discount}%
                  </span>
                )}
                {productData.isNew && (
                  <span className="absolute top-16 left-4 bg-blue-600 text-white text-sm font-bold px-3 py-2 rounded-full z-10">
                    New
                  </span>
                )}
                <Image
                  src={productData.mainImage}
                  alt={productData.title}
                  width={300}
                  height={300}
                  className="object-contain max-h-80"
                />
              </div>
            </div>
            
            {/* Thumbnail images */}
            <div className="flex space-x-4">
              {(productData.images || [productData.mainImage]).slice(0, 4).map((imgSrc, idx) => (
                <div key={idx} className="bg-white rounded-lg p-2 shadow border-2 border-orange-200">
                  <Image
                    src={imgSrc}
                    alt={`${productData.title} ${idx + 1}`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Information */}
          <div className="space-y-6">
            <div>
              <p className="text-orange-500 text-sm font-medium mb-2">{productData.category || 'Product'}</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{productData.title}</h1>
              
              {/* Stock status */}
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  (productData.stock || 0) > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {(productData.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'} 
                  {productData.stock && ` (${productData.stock})`}
                </span>
                <div className="flex items-center space-x-1">
                  {renderStars(Math.round(productData.rating || 0))}
                  <span className="text-gray-500 text-sm ml-2">({productData.reviews || 0} Reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-gray-800">${productData.price.toFixed(2)}</span>
                {productData.oldPrice && (
                  <span className="text-xl text-gray-400 line-through">${productData.oldPrice.toFixed(2)}</span>
                )}
                {productData.discount && productData.discount > 0 && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                    {productData.discount}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {productData.description || 'Auctor urna nunc id cursus. Scelerisque purus semper eget duis at pharetra vel turpis nunc eget. Auctor urna nunc id cursus Scelerisque purus.'}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Color :</label>
                <div className="flex space-x-3">
                  {colorOptions.map((color: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === idx ? 'border-gray-800 scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Size :</label>
                <div className="flex space-x-3">
                  {(productData.filters?.size || sizes).map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 font-medium">{quantity.toString().padStart(2, '0')}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300"
                >
                  Buy Now
                </button>
                
                <button className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-300">
                  Add To Cart
                </button>
              </div>

              {/* Additional Actions */}
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-8">
                <button className="flex items-center space-x-2 hover:text-orange-500">
                  <span>♡</span>
                  <span>Add Wishlist</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-orange-500">
                  <span>⚖</span>
                  <span>Compare</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-orange-500">
                  <span>?</span>
                  <span>Ask a question</span>
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-20">SKU:</span>
                  <span className="text-gray-600">HRYUSG67EG</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-20">Category:</span>
                  <span className="text-gray-600">Fashion</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-20">Tag:</span>
                  <span className="text-gray-600">Clothing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Sold by</h3>
              <h4 className="text-xl font-bold text-orange-500 mb-4">Zapier Gallery</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">• Positive Seller Ratings</span>
                  <span className="font-medium">4.5 (320)</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">• Ship on Time</span>
                  <span className="font-medium">100%</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">• Chat Response Rate</span>
                  <span className="font-medium">90%</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300">
                Go To Store
              </button>
              <button className="ml-3 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300">
                Chat Now
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <div className="text-orange-500 text-2xl mb-3">🚚</div>
            <h4 className="font-semibold text-gray-800 mb-2">Shipping Worldwide</h4>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <div className="text-orange-500 text-2xl mb-3">✓</div>
            <h4 className="font-semibold text-gray-800 mb-2">Always Authentic</h4>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <div className="text-orange-500 text-2xl mb-3">💰</div>
            <h4 className="font-semibold text-gray-800 mb-2">Cash On Delivery Available</h4>
          </div>
        </div>

        {/* Return & Warranty */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Return & Warranty</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-orange-500">↩</span>
              <span className="text-gray-600">14 Days Easy Return</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-orange-500">⚠</span>
              <span className="text-gray-600">Warranty Not Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
