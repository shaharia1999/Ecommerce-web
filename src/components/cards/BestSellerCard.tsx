// import Image from "next/image";

import Image from "next/image";

type Props = {
  title: string;
  price: number;
  oldPrice: number;
  image: string;
};

const BestSellerCard = ({ title, price, oldPrice, image }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col items-center shadow border hover:scale-[1.02] transition min-h-[340px]">
      <div className="bg-gray-50 rounded-xl w-full flex items-center justify-center h-40 mb-4">
        {/* <img src={image} alt={title} className="object-contain h-36" /> */}

         <div className="w-24 h-24 mb-2 rounded-full relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-full"
          sizes="96px"
        />
      </div>
      </div>
      <h3 className="font-semibold text-lg text-center mb-2">{title}</h3>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl font-bold text-yellow-500">
          ${price.toFixed(2)}
        </span>
        <span className="text-gray-400 line-through text-base">
          ${oldPrice.toFixed(2)}
        </span>
      </div>
      <button className="mt-auto border-b-2 border-yellow-400 text-yellow-600 font-semibold flex items-center gap-1">
        Buy Now <span>↗</span>
      </button>
    </div>
  );
};

export default BestSellerCard;
