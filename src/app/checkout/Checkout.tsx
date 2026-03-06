'use client';
import { useCart } from '../../context/CartContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCreateOrder } from '@/src/utils/useOrder';
import { OrderData } from '@/src/utils/type';
import { GetCookiesId } from '@/src/utils/Cookies/Set-Cookies';
import { AxiosError } from 'axios';

interface FormData {
  name: string;
  mobile: string;
  district: string;
  address: string;
}

export default function CheckoutContent() {
  const { cart, subtotal } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const createOrderMutation = useCreateOrder();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    district: '',
    address: '',
  });
  interface ProductItem {
    id: string;
    title: string;
    mainImg: string;
    price: number;
    selectedSize?: string;
    quantity?: number;
  }

  const [singleProduct, setSingleProduct] = useState<ProductItem | null>(null);

  const deliveryCharge = 0;
  const total = (singleProduct?.price || subtotal) + deliveryCharge;
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await GetCookiesId();
      if (id) {
        setUserId(id);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const encoded = searchParams.get('product');
    if (encoded) {
      try {
        const decoded = JSON.parse(decodeURIComponent(encoded));
        setSingleProduct(decoded);
      } catch (err) {
        console.error('Invalid product format in query params:', err);
      }
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrderConfirm = () => {
    if (!formData.name || !formData.mobile || !formData.address) {
      alert('Please fill in all the information');
      return;
    }

    const orderData: OrderData = {
      address: `${formData.address}, ${formData.district}, Bangladesh`,
      mobile: formData.mobile,
      name: formData.name,
      products: singleProduct
        ? [{ product: singleProduct.id, quantity: singleProduct.quantity || 1 }]
        : cart.map(item => ({
          product: item.id,
          quantity: item.quantity || 1,
        })),
      totalAmount: total,
      deliveryCharge,
      status: 'pending',
      user: userId || undefined,
    };

    createOrderMutation.mutate(orderData, {
      onSuccess: () => {
        alert('🎉 Order completed successfully!');
        localStorage.removeItem('cart');
        router.push('/order-success');
      },
      onError: (error) => {
        let message = '❌ There was a problem placing the order. Please try again.';

        if ((error as AxiosError)?.isAxiosError) {
          const axiosError = error as AxiosError<{ message?: string }>;
          message = axiosError.response?.data?.message || axiosError.message || message;
        } else {
          message = error.message || message;
        }

        console.log('Mutation Error:', error);
        alert(`❌ ${'Product is out of stock or there was an issue with your order. Please try again.' + message}`);
      },
    });

  };

  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">চেকআউট</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">বিলিং বিবরণ</h2>
              <div className="space-y-4">
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="আপনার নাম লিখুন" className="w-full px-4 py-3 border rounded-lg" />
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="০১xxxxxxxxx" className="w-full px-4 py-3 border rounded-lg" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                  rows={4}
                  className="w-full px-4 py-3 border rounded-lg resize-none"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">অর্ডার সারাংশ</h3>

              {/* Single Product View */}
              {singleProduct ? (
                <div className="flex items-start space-x-4 pb-4 border-b border-gray-200">
                  <Image
                    src={singleProduct.mainImg}
                    alt={singleProduct.title}
                    width={80}
                    height={80}
                    className="object-contain bg-gray-50 rounded-lg p-2"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm mb-1">{singleProduct.title}</h4>
                    <p className="text-sm text-gray-600 mb-1">সাইজ: {singleProduct.selectedSize}</p>
                    <p className="text-sm text-gray-600">পরিমাণ: {singleProduct.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">TK{Math.floor(singleProduct.price * (singleProduct.quantity || 1))}</p>
                  </div>
                </div>
              ) : (
                // Multiple Products View (Cart)
                cart.length === 0 ? (
                  <p className="text-center text-gray-500">আপনার কার্ট খালি।</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-start space-x-4 pb-4 border-b border-gray-200">
                      <Image
                        src={item.mainImg}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-contain bg-gray-50 rounded-lg p-2"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-sm mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">সাইজ: {item.selectedSize || 'M'}</p>
                        <p className="text-sm text-gray-600">পরিমাণ: {item.quantity || 1}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">TK{Math.floor(item.price * (item.quantity || 1))}</p>
                      </div>
                    </div>
                  ))
                )
              )}

              {/* Price Summary */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">সাবটোটাল</span>
                  <span className="font-medium">TK{singleProduct ? Math.floor(singleProduct.price) : Math.floor(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ডেলিভারি চার্জ</span>
                  <span className="font-medium">TK{Math.floor(deliveryCharge)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>মোট</span>
                    <span>TK{Math.floor(total)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleOrderConfirm}
                disabled={createOrderMutation.isPending}
                className={`w-full mt-6 py-3 px-6 rounded-lg font-bold text-white transition-all ${createOrderMutation.isPending
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600'
                  }`}
              >
                {createOrderMutation.isPending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>প্রসেসিং...</span>
                  </div>
                ) : (
                  `🛒 অর্ডার নিশ্চিত করুন TK${Math.floor(total)}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
