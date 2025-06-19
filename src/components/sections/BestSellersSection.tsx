import BestSellerCard from '../cards/BestSellerCard';
import bestSellersData from '../../data/bestSellersData';

const BestSellersSection = () => {
  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bestSellersData.map(item => (
          <BestSellerCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default BestSellersSection;
