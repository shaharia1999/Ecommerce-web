import BannerCard from '../cards/BannerCard';
import bannerData from '../../data/bannerData';

const BannerSection = () => {
  return (
    <section className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {bannerData.map(item => {
  // console.log(item);
  return <BannerCard key={item.id} {...item} />;
})}
      </div>
    </section>
  );
};

export default BannerSection;
