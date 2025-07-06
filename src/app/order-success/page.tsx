'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          অর্ডার সফল হয়েছে! 🎉
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব এবং 
          ৩-৭ দিনের মধ্যে পণ্যটি ডেলিভারি করা হবে।
        </p>

        {/* Order Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">অর্ডার আইডি</p>
          <p className="font-bold text-gray-800">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            হোম পেজে ফিরে যান
          </button>
          
          <button
            onClick={() => router.push('/shop')}
            className="w-full border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-all duration-300"
          >
            আরো কেনাকাটা করুন
          </button>
        </div>

        {/* Auto redirect message */}
        <p className="text-xs text-gray-500 mt-4">
          ৫ সেকেন্ড পর স্বয়ংক্রিয়ভাবে হোম পেজে চলে যাবে...
        </p>
      </div>
    </div>
  );
}
