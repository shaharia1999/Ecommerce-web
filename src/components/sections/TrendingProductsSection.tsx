import TrendingProductCard from '../cards/TrendingProductCard';
import trendingProductsData from '../../data/trendingProductsData';

const TrendingProductsSection = () => {
  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-4">Trending Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trendingProductsData.map(item => (
          <TrendingProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default TrendingProductsSection;
