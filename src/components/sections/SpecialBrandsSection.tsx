import SpecialBrandCard from '../cards/SpecialBrandCard';
import specialBrandsData from '../../data/specialBrandsData';
import Image from 'next/image';

const SpecialBrandsSection = () => {
  return (
    <section className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Banner/CTA */}
        <div className="bg-pink-100 rounded-2xl flex flex-col justify-center items-start p-8 min-h-[400px] relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
            Make Your Fashion Look
            <br />
            More Changing
          </h2>
          <p className="text-gray-600 mb-6">
            Get 50% Off on Selected Clothing Items
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow transition flex items-center gap-2">
            Shop Now <span>➔</span>
          </button>
          <Image
            src="https://images.unsplash.com/photo-1517472292914-9570a594783b?q=80&w=1133&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fashion Banner"
            width={256}
            height={256}
            className="absolute bottom-0 left-0 w-56 md:w-64 object-contain"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          />
        </div>
        {/* Brands Grid */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {specialBrandsData.map(item => (
            <SpecialBrandCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialBrandsSection;
