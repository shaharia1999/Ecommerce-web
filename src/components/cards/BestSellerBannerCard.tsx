type Props = {
  title: string;
  price: number;
  oldPrice: number;
  image: string;
};

const BestSellerBannerCard = ({ title, price, oldPrice, image }: Props) => {
  return (
    <div className="bg-blue-100 rounded-2xl p-8 flex flex-col justify-between h-full relative overflow-hidden min-h-[340px]">
      <h3 className="font-bold text-2xl mb-4">{title}</h3>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-3xl font-bold text-yellow-500">${price.toFixed(2)}</span>
        <span className="text-gray-400 line-through text-xl">${oldPrice.toFixed(2)}</span>
      </div>
      <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-8 py-3 rounded-lg shadow transition flex items-center gap-2 mb-4">
        Buy Now <span>↗</span>
      </button>
      <img
        src={image}
        alt={title}
        className="absolute bottom-0 right-4 w-40 object-contain"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      />
    </div>
  );
};

export default BestSellerBannerCard;