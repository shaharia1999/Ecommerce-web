'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense, useCallback  } from 'react';
import Image from 'next/image';

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
}

function ShopContent() {
  const params = useParams();
  const router = useRouter();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);


const fetchProductData = useCallback(async () => {
  try {
    setLoading(true);
    // Debug করার জন্য console log
    console.log('Fetching product with slug:', params.slug);
    
    // Temporary: Mock data for testing
    const mockProduct = {
      id: "686be7a556179a6b3ae462bc",
      title: "Quis quia atque 19",
      category: "Amet reprehenderit",
      originalPrice: 400,
      discountedPrice: 400,
      mainImg: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg",
      stock: 4,
      slug: "quis-quia-atque-19",
      description: "High quality product with excellent features and durability.",
      rating: 4.5,
      reviews: 120
    };
    
    setProductData(mockProduct);
    setLoading(false);
    
    // Real API call (comment out for now)
    // const response = await fetch(`/api/products/${params.slug}`);
    // if (response.ok) {
    //   const data = await response.json();
    //   setProductData(data);
    // } else {
    //   console.error('Product not found');
    // }
  } catch (error) {
    console.error('Error fetching product:', error);
    setLoading(false);
  }
}, [params.slug]);

useEffect(() => {
  fetchProductData();
}, [fetchProductData]);
// ...existing code...

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!productData) {
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
  const discountPercentage = Math.round(((productData.originalPrice - productData.discountedPrice) / productData.originalPrice) * 100);

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
              <div className="relative bg-gray-50 rounded-xl flex items-center justify-center h-96">
                {discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-2 rounded-full z-10">
                    -{discountPercentage}%
                  </span>
                )}
                <Image
                  src={productData.mainImg}
                  alt={productData.title}
                  width={300}
                  height={300}
                  className="object-contain max-h-80"
                />
              </div>
            </div>
            
            {/* Thumbnail images */}
            <div className="flex space-x-4">
              {(productData.images || [productData.mainImg]).slice(0, 4).map((imgSrc, idx) => (
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
              <p className="text-orange-500 text-sm font-medium mb-2">{productData.category}</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{productData.title}</h1>
              
              {/* Stock status */}
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  productData.stock > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {productData.stock > 0 ? 'In Stock' : 'Out of Stock'} ({productData.stock})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-gray-800">${productData.discountedPrice}</span>
                {productData.originalPrice !== productData.discountedPrice && (
                  <span className="text-xl text-gray-400 line-through">${productData.originalPrice}</span>
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
                  {sizes.map((size: string) => (
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
