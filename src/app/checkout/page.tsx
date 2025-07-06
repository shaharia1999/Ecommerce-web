'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import Image from 'next/image';
import { useCreateOrder, type OrderData, generateProductId } from '../../utils/api';

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
  selectedSize?: string;
  selectedColor?: string;
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
  
  // React Query mutation for order creation
  const createOrderMutation = useCreateOrder();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    district: '',
    address: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [promoCode, setPromoCode] = useState('');

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

  // Handle order confirmation - UPDATED FOR NEW BACKEND FORMAT
const handleOrderConfirm = async () => {
  // Validate form
  if (!formData.name || !formData.mobile || !formData.district || !formData.address) {
    alert('সকল ক্ষেত্র পূরণ করুন');
    return;
  }

  // Prepare order data in NEW BACKEND FORMAT
  const orderData: OrderData = {
    // user: "64fe1a1234567890abcdef12", // Optional: only if user is logged in
    address: `${formData.address}, ${formData.district}, Bangladesh`,
    mobile: formData.mobile,
    products: [
      {
        product: generateProductId(productData.title), // Product ID
        quantity: productData.quantity || 1
      }
    ],
    totalAmount: total,
    deliveryCharge: deliveryCharge,
    status: "pending" // Backend বলেছে এটা optional কিন্তু পাঠানো যায়
  };

  console.log('=== SENDING TO BACKEND (NEW FORMAT) ===');
  console.log('URL: http://localhost:5000/orders');
  console.log('Method: POST');
  console.log('Data:', JSON.stringify(orderData, null, 2));
  console.log('=== EXACT BACKEND FORMAT ===');
  console.log(`{
  "user": "64fe1a1234567890abcdef12",       // Optional: only if user is logged in
  "address": "${orderData.address}",
  "mobile": "${orderData.mobile}",
  "products": [
    {
      "product": "${orderData.products[0].product}",
      "quantity": ${orderData.products[0].quantity}
    }
  ],
  "totalAmount": ${orderData.totalAmount},
  "deliveryCharge": ${orderData.deliveryCharge},
  "status": "${orderData.status}"   // Optional: backend will set to 'pending' by default
}`);

  // Use TanStack Query mutation
  createOrderMutation.mutate(orderData, {
    onSuccess: (response) => {
      console.log('✅ SUCCESS - Backend response:', response);
      alert('🎉 অর্ডার সফলভাবে সম্পন্ন হয়েছে!');
      router.push('/order-success');
    },
    onError: (error: Error) => {
      console.error('❌ FAILED - Order submission error:', error);
      
      // Show specific error message
      if (error.message.includes('Backend server is not running')) {
        alert('❌ ব্যর্থ! Backend server চালু নেই। দয়া করে http://localhost:5000/orders চেক করুন।');
      } else if (error.message.includes('HTTP error')) {
        alert('❌ ব্যর্থ! Server এ সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      } else {
        alert('❌ ব্যর্থ! অর্ডার পাঠাতে সমস্যা হয়েছে।');
      }
      
      // Don't navigate to success page on error
      console.log('Order will NOT be processed due to error.');
    }
  });
};


  const districts = [
    'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ',
    'গাজীপুর', 'নারায়ণগঞ্জ', 'কুমিল্লা', 'ফরিদপুর', 'কিশোরগঞ্জ', 'মানিকগঞ্জ'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">চেকআউট</h1>
              <div className="flex items-center space-x-2 text-gray-600 mt-2">
                <span>Home</span>
                <span>››</span>
                <span className="text-gray-800">checkout</span>
              </div>
            </div>
            <div className="text-right">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Completed
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Billing Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Order Message */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-center text-lg font-medium text-gray-800 border-b border-dashed border-gray-300 pb-4">
                অর্ডার করতে সঠিক তথ্য দিয়ে নিচের ফরম পূরণ করুন
              </p>
            </div>

            {/* Billing Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">বিলিং ডিটেইল</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    আপনার নাম লিখুন <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Test"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    আপনার মোবাইল নাম্বার লিখুন <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="01766666666"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    জেলা সিলেক্ট করুন <span className="text-red-500">*</span>
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
          <div className="space-y-6">
            
            {/* Product Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">প্রোডাক্ট ডিটেইল</h3>
              
              <div className="flex items-start space-x-4 pb-4 border-b border-gray-200">
                <div className="flex-shrink-0">
                  <Image
                    src={productData.mainImage}
                    alt={productData.title}
                    width={80}
                    height={80}
                    className="object-contain bg-gray-50 rounded-lg p-2"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm mb-1">
                    {productData.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">Size: {productData.selectedSize || 'XL'}</p>
                  <p className="text-sm text-gray-600 mb-1">Product ID: {generateProductId(productData.title).substring(0, 12)}...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Qty: {productData.quantity || 2}</span>
                    <button className="text-red-500 text-sm hover:underline">Remove</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">TK. {itemPrice}</p>
                </div>
              </div>

              {/* Backend Data Preview */}
              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Backend Order Format:</h4>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap">
{JSON.stringify({
  address: `${formData.address || 'Full Address'}, ${formData.district || 'District'}, Bangladesh`,
  mobile: formData.mobile || '01712345678',
  products: [{
    product: generateProductId(productData.title),
    quantity: productData.quantity || 1
  }],
  totalAmount: total,
  deliveryCharge: deliveryCharge
}, null, 2)}
                </pre>
              </div>

              {/* Price Summary */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">সাব-টোটাল (+)</span>
                  <span className="font-medium">TK. {subTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ডেলিভারি চার্জ (+)</span>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="delivery" 
                        name="delivery" 
                        checked 
                        readOnly
                        className="w-4 h-4"
                      />
                      <label htmlFor="delivery" className="text-sm">ঢাকা সিটির বাহিরে</label>
                    </div>
                    <span className="font-medium">TK. {deliveryCharge}</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>টোটাল</span>
                    <span>TK. {total}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <input 
                    type="radio" 
                    id="cod" 
                    name="payment" 
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="cod" className="flex items-center space-x-2 text-sm font-medium">
                    <span>Cash on delivery</span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">🚚</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2 bg-gray-100 p-3 rounded">
                  ৩-৭ দিনের মধ্যে হোম ডেলিভারি করা হবে। এর মধ্যে কোন দেয়া হবে না
                </p>
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="If you have a Promo Code, Enter Here"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm"
                  />
                  <button className="bg-orange-500 text-white px-6 py-2 rounded-r-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                    Apply
                  </button>
                </div>
              </div>

              {/* Order Confirm Button */}
              <button
                onClick={handleOrderConfirm}
                disabled={createOrderMutation.isPending}
                className={`w-full mt-6 py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 ${
                  createOrderMutation.isPending 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-black hover:bg-gray-800'
                }`}
              >
                {createOrderMutation.isPending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>প্রক্রিয়াধীন...</span>
                  </div>
                ) : (
                  `🛒 অর্ডার কনফার্ম করুন TK. ${total}`
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">চেকআউট পেজ লোড হচ্ছে...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}