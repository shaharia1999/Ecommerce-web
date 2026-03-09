import FlashSaleSection from '../components/sections/FlashSaleSection';
import SpecialBrandsSection from '../components/sections/SpecialBrandsSection';
import NewArrivalsSection from '../components/sections/NewArrivalsSection';
import BannerSection from '../components/sections/BannerSection';
import Banner from '../components/banner/MainBanner';
import TopCategoriesWithProducts from '../components/sections/TopCategoriesSection';
import { Suspense } from 'react';
import { productAPI } from '@/src/utils/productApi';
import { BackendProduct } from '@/src/utils/type';


export default async function HomePage() {
  const [
    flashSaleResponse,
    newArrivalsResponse,
    specialBrandsResponse,
    topCategoriesResponse
  ] = await Promise.all([
    productAPI.getProducts({ discount: true }),
    productAPI.getProducts({ sortBy: 'createdAt', sortOrder: 'desc', limit: 14 }),
    productAPI.getProducts({ discount: true }),
    productAPI.getProducts(),
  ]);

  const flashSaleData: BackendProduct[] = Array.isArray(flashSaleResponse)
    ? flashSaleResponse
    : flashSaleResponse.products || [];

  const newArrivalsData: BackendProduct[] = Array.isArray(newArrivalsResponse)
    ? newArrivalsResponse
    : newArrivalsResponse.products || [];

  const specialBrandsData: BackendProduct[] = Array.isArray(specialBrandsResponse)
    ? specialBrandsResponse
    : specialBrandsResponse.products || [];

  const topCategoriesData: BackendProduct[] = Array.isArray(topCategoriesResponse)
    ? topCategoriesResponse
    : topCategoriesResponse.products || [];

  return (
    <div className=" pb-6  px-4 max-w-[1285px] mx-auto"> {/* pt-20 because Navbar is fixed */}
      <Banner></Banner>
      {/* <BannerSection /> */}
      <FlashSaleSection products={flashSaleData} />
      <SpecialBrandsSection specialBrandsData={specialBrandsData} />
      <NewArrivalsSection products={newArrivalsData} />
      <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
        <TopCategoriesWithProducts products={topCategoriesData} />
      </Suspense>
    </div>
  );
}

