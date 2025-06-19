import NewArrivalCard from '../cards/NewArrivalCard';
import newArrivalsData from '../../data/newArrivalsData';

const NewArrivalsSection = () => {
  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {newArrivalsData.map(item => (
          <NewArrivalCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;
