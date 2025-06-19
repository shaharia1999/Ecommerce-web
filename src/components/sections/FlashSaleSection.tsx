import FlashSaleCard from '../cards/FlashSaleCard';
import flashSaleData from '../../data/flashSaleData';

const FlashSaleSection = () => {
  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-4">Flash Sale</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {flashSaleData.map(item => (
          <FlashSaleCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default FlashSaleSection;
