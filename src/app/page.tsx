import FlashSaleSection from '../components/sections/FlashSaleSection';
import TrendingProductsSection from '../components/sections/TrendingProductsSection';
import SpecialBrandsSection from '../components/sections/SpecialBrandsSection';
import NewArrivalsSection from '../components/sections/NewArrivalsSection';
import BestSellersSection from '../components/sections/BestSellersSection';
import TopCategoriesSection from '../components/sections/TopCategoriesSection';
import BannerSection from '../components/sections/BannerSection';
import Banner from '../components/banner/MainBanner';

export default function HomePage() {
  return (
    <div className="pt-1"> {/* pt-20 because Navbar is fixed */}
    <Banner></Banner>
    <BannerSection />
       <FlashSaleSection />
       <SpecialBrandsSection />
      <TrendingProductsSection />
      <BestSellersSection />
      <NewArrivalsSection />
      
      <TopCategoriesSection />
      
    </div>
  );
}
