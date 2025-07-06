import BestSellerCard from '../cards/BestSellerCard';
import BestSellerBannerCard from '../cards/BestSellerBannerCard';
import bestSellersData, { bestSellerBanner } from '../../data/bestSellersData';

const BestSellersSection = () => {
  return (
    <section className="my-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold">
          Our{' '}
          <span className="relative inline-block">
            <span className="text-black">Best</span>
            <span className="absolute left-0 -bottom-1 w-full h-2 bg-yellow-200 rounded-full -z-10"></span>
          </span>
          {' '}Selling Products
        </h2>
        <a
          href="#"
          className="text-lg text-gray-700 hover:text-black flex items-center gap-1 font-medium"
        >
          View All <span className="inline-block">→</span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {bestSellersData.map(item => (
          <BestSellerCard key={item.title} {...item} />
        ))}
        <BestSellerBannerCard {...bestSellerBanner} />
      </div>
    </section>
  );
};

export default BestSellersSection;
