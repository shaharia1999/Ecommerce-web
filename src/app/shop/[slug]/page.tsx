'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import Image from 'next/image';
import { useProduct } from '@/src/utils/useproducts';
import ZoomImage from './ZoomIn';


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
  rating?: number;
  reviews?: number;
  selectedSize?: string;
  selectedColor?: string;
  quantity?: number;
  colors?: string[]; // <-- Add this line
  sizes?: string[];  // <-- And this line
}

function ShopContent() {
  const params = useParams();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Use React Query to fetch product
  const {
    data: product,
    isLoading,
    isError

  } = useProduct(params.slug as string);
  console.log(product);
  // Transform product data to match your interface - FIXED
  const productData: ProductData | null = product ? {
    id: product._id,
    title: product.title,
    category: product.category,
    // Fix the price calculation
    originalPrice: Number(product.originalPrice) || 0,
    discountedPrice: Number(product.discountedPrice) * (1 - (Number(product.discount) || 0) / 100) || 0,
    mainImg: product.mainImg,
    stock: product.stock,
    slug: product.slug || params.slug as string,
    description: product.description,
    images: product.images || [product.mainImg],
    rating: product.rating || 4.5,
    reviews: product.reviews || 0,

    colors: product.filters?.color || [],   // <-- eta add korun
    sizes: product.filters?.size || [],     // <-- eta add korun

  } : null;

  const [mainImage, setMainImage] = useState(productData?.mainImg || '');

  // Debug করার জন্য console log যোগ করুন
  console.log('=== PRICE CALCULATION DEBUG ===');
  console.log('Original product.price:', product?.originalPrice, typeof product?.originalPrice);
  console.log('Original product.discount:', product?.discount, typeof product?.discount);
  if (productData) {
    console.log('Calculated originalPrice:', productData.originalPrice);
    console.log('Calculated discountedPrice:', productData.discountedPrice);
  }

  // api fetch new


  const handleBuyNow = () => {
    if (productData) {
      const checkoutData = {
        ...productData,
        // ✅ Real product ID backend থেকে
        id: product?._id, // Real MongoDB ObjectId
        price: productData.discountedPrice,
        originalPrice: productData.originalPrice,
        selectedSize,
        selectedColor: colorOptions[selectedColor],
        quantity
      };

      console.log('=== CHECKOUT DATA WITH REAL ID ===');
      console.log('Product ID from backend:', product?._id);
      console.log('Checkout data:', checkoutData);

      router.push(`/checkout?product=${encodeURIComponent(JSON.stringify(checkoutData))}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (isError || !productData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-20 flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600">The product you are looking for does not exist.</p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colorOptions = ['#FF0000', '#FFA500', '#008000', '#000000'];

  // Fix discount percentage calculation
  const discountPercentage = productData ? Number(product?.discount) || 0 : 0;

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
            <span className="text-gray-800">{productData.title}</span>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-8 shadow-lg">

              <ZoomImage src={mainImage || productData.mainImg} alt={productData.title} />


            </div>


            <div className="flex space-x-4">
              {(productData.images || [productData.mainImg]).slice(0, 4).map((imgSrc, idx) => (
                <div
                  key={idx}
                  onClick={() => setMainImage(imgSrc)}
                  className={`cursor-pointer bg-white rounded-lg p-2 shadow border-2 ${mainImage === imgSrc ? 'border-orange-500' : 'border-orange-200'
                    }`}
                >
                  <Image
                    src={imgSrc}
                    alt={`${productData.title} ${idx + 1}`}
                    width={80}
                    height={80}
                    className="object-contain h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Information */}
          <div className="space-y-6">
            <div>
              <p className="text-orange-500 text-sm font-medium mb-2">{productData.category}</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{productData.title}</h1>

              {/* Stock status */}
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${productData.stock > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
                  {productData.stock > 0 ? 'In Stock' : 'Out of Stock'} ({productData.stock})
                </span>
              </div>

              {/* Price - FIXED */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-gray-800">
                  ${productData.discountedPrice.toFixed(2)}
                </span>
                {discountPercentage > 0 && (
                  <span className="text-xl text-gray-400 line-through">
                    ${productData.originalPrice.toFixed(2)}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {productData.description || 'High quality product with excellent features and durability.'}
              </p>

              {/* Color Selection */}
              {productData.colors && productData.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Color :</label>
                  <div className="flex space-x-3">
                    {productData.colors.map((color: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(idx)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === idx ? 'border-gray-800 scale-110' : 'border-gray-300'
                          }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {productData.sizes && productData.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Size :</label>
                  <div className="flex space-x-3">
                    {productData.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg font-medium transition-all ${selectedSize === size
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
                    onClick={() => setQuantity(Math.min(productData.stock, quantity + 1))}
                    disabled={quantity >= productData.stock}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={productData.stock === 0}
                  className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400"
                >
                  Buy Now
                </button>

                <button
                  disabled={productData.stock === 0}
                  className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-300 disabled:bg-gray-400"
                >
                  Add To Cart
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-20">SKU:</span>
                  <span className="text-gray-600">{productData.id.slice(-8).toUpperCase()}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-20">Category:</span>
                  <span className="text-gray-600">{productData.category}</span>
                </div>
              </div>
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
