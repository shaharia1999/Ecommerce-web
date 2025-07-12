'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import Image from 'next/image';
import { useCreateOrder, type OrderData } from '../../utils/api';

interface ProductData {
  id: string; // Real MongoDB ObjectId from backend
  title: string;
  price: number;
  mainImage: string;
  selectedSize?: string;
  quantity?: number;
}

interface FormData {
  name: string;
  mobile: string;
  district: string;
  address: string;
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productParam = searchParams.get('product');
  
  const createOrderMutation = useCreateOrder();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    district: '',
    address: ''
  });

  let productData: ProductData | null = null;
  
  if (productParam) {
    try {
      productData = JSON.parse(decodeURIComponent(productParam));
    } catch (error) {
      console.error('Error parsing product data:', error);
    }
  }

  if (!productData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">চেকআউট</h1>
          <p className="text-gray-600">কোন পণ্য নির্বাচিত নয়। দয়া করে প্রথমে একটি পণ্য নির্বাচন করুন।</p>
        </div>
      </div>
    );
  }

  // Calculate prices
  const itemPrice = productData.price * (productData.quantity || 1);
  const subTotal = itemPrice;
  const deliveryCharge = 109;
  const total = subTotal + deliveryCharge;

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle order confirmation
  const handleOrderConfirm = async () => {
    // Validate form
    if (!formData.name || !formData.mobile || !formData.district || !formData.address) {
      alert('সব তথ্য পূরণ করুন');
      return;
    }

    // Order data with real product ID
    const orderData: OrderData = {
      address: `${formData.address}, ${formData.district}, Bangladesh`,
      mobile: formData.mobile,
      products: [
        {
          product: productData.id, // Real MongoDB ObjectId
          quantity: productData.quantity || 1
        }
      ],
      totalAmount: total,
      deliveryCharge: deliveryCharge,
      status: "pending"
    };

    console.log('Order Data:', JSON.stringify(orderData, null, 2));

    createOrderMutation.mutate(orderData, {
      onSuccess: (response) => {
        console.log('✅ Order created:', response);
        alert('🎉 অর্ডার সফলভাবে সম্পন্ন হয়েছে!');
        router.push('/order-success');
      },
      onError: (error: Error) => {
        console.error('❌ Order failed:', error);
        alert('❌ অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
    });
  };

  const districts = [
    'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">চেকআউট</h1>
          <div className="flex items-center space-x-2 text-gray-600 mt-2">
            <span>Home</span>
            <span>››</span>
            <span className="text-gray-800">checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Billing Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">বিলিং ডিটেইল</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    আপনার নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="নাম লিখুন"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    মোবাইল নাম্বার <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="01xxxxxxxxx"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    জেলা <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                  >
                    <option value="">জেলা নির্বাচন করুন</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="সম্পূর্ণ ঠিকানা লিখুন"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">অর্ডার সামারি</h3>
              
              {/* Product */}
              <div className="flex items-start space-x-4 pb-4 border-b border-gray-200">
                {productData.mainImage ? (
                  <Image
                    src={productData.mainImage}
                    alt={productData.title}
                    width={80}
                    height={80}
                    className="object-contain bg-gray-50 rounded-lg p-2"
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-200 text-gray-400 text-xs rounded">
                    No Image
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm mb-1">
                    {productData.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    Size: {productData.selectedSize || 'M'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Qty: {productData.quantity || 1}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">৳{itemPrice}</p>
                </div>
              </div>

              {/* Price Summary */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">সাব-টোটাল</span>
                  <span className="font-medium">৳{subTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ডেলিভারি চার্জ</span>
                  <span className="font-medium">৳{deliveryCharge}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>মোট</span>
                    <span>৳{total}</span>
                  </div>
                </div>
              </div>

              {/* Order Button */}
              <button
                onClick={handleOrderConfirm}
                disabled={createOrderMutation.isPending}
                className={`w-full mt-6 py-3 px-6 rounded-lg font-bold text-white transition-all ${
                  createOrderMutation.isPending 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
              >
                {createOrderMutation.isPending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>প্রক্রিয়াধীন...</span>
                  </div>
                ) : (
                  `🛒 অর্ডার কনফার্ম করুন ৳${total}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}