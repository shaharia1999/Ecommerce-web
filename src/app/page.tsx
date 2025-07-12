import FlashSaleSection from '../components/sections/FlashSaleSection';
import TrendingProductsSection from '../components/sections/TrendingProductsSection';
import SpecialBrandsSection from '../components/sections/SpecialBrandsSection';
import NewArrivalsSection from '../components/sections/NewArrivalsSection';
import BestSellersSection from '../components/sections/BestSellersSection';
import TopCategoriesSection from '../components/sections/TopCategoriesSection';
import BannerSection from '../components/sections/BannerSection';
import Banner from '../components/banner/MainBanner';
import FlashSection from '../components/FlashSection';

export default function HomePage() {
  return (
    <div className="pt-1 p-6"> {/* pt-20 because Navbar is fixed */}
      <Banner></Banner>
      <BannerSection />
      <FlashSaleSection />
      <SpecialBrandsSection />
      <TrendingProductsSection />
      <BestSellersSection />
      <NewArrivalsSection />
      <TopCategoriesSection />
      <main>
        {/* অন্যান্য সেকশন */}
      <FlashSection 
  title="Electronics Collection"
  category="Electronics Collection" // ঠিক spelling, ক্যাপিটালাইজেশন, স্পেস সহ
  limit={8}
/>
        <FlashSection 
          title="Fashion Items" 
          category="fashion" 
          limit={6}
        />
        <FlashSection 
          title="All Latest Products" 
          limit={12}
        />
      </main>
    </div>
  );
}
