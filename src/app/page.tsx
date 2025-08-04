import FlashSaleSection from '../components/sections/FlashSaleSection';
import SpecialBrandsSection from '../components/sections/SpecialBrandsSection';
import NewArrivalsSection from '../components/sections/NewArrivalsSection';
import BannerSection from '../components/sections/BannerSection';
import Banner from '../components/banner/MainBanner';
import TopCategoriesWithProducts from '../components/sections/TopCategoriesSection';
import { Suspense } from 'react';
export default function HomePage() {
  return (
    <div className="pt-1 px-2 py-6 max-w-[1285px] mx-auto "> {/* pt-20 because Navbar is fixed */}
      <Banner></Banner>
      <BannerSection />
      <FlashSaleSection />
      <SpecialBrandsSection />
      <NewArrivalsSection />
       <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
           <TopCategoriesWithProducts/>
          </Suspense>
      
    
    </div>
  );
}
