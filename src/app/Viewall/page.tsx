'use client';
import { Suspense } from 'react';
import FlashSaleCardPage from './component/FlashSaleCardPage';
// import CheckoutContent from './Checkout';
// Wrap only the actual rendering part
export default function Wrapper() {
  return (
    <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
      <FlashSaleCardPage />
    </Suspense>
  );
}
