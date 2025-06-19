import TopCategoryCard from '../cards/TopCategoryCard';
import topCategoriesData from '../../data/topCategoriesData';

const TopCategoriesSection = () => {
  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-4">Top Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topCategoriesData.map(item => (
          <TopCategoryCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default TopCategoriesSection;
