'use client';
import { useHandleBuyNow } from "@/src/utils/commonfunction";
import Image from "next/image";

type Props = {
  title: string;
  slug: string; // Add slug prop
  image: string;
  price: number;
  oldPrice: number;
  rating: number;
  save: number;
};

const SpecialBrandCard = ({ title, image, price, oldPrice, rating, save,slug }: Props) => {
  const handleBuyNow = useHandleBuyNow(); 
  return (
    <div className="relative flex items-center gap-6 bg-white rounded-2xl border p-4 shadow hover:scale-[1.02] transition cursor-pointer" onClick={() => handleBuyNow({ title, slug })}>
      {/* Save badge */}
      <span className="absolute top-3 right-3 bg-red-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
        Save ${save}
      </span>
      {/* Image */}
      <div className="bg-gray-50 rounded-xl flex items-center justify-center w-28 h-28">
        <Image 
          src={image} 
          alt={title} 
          width={96}
          height={96}
          className="object-contain w-24 h-24" 
        />
      </div>
      {/* Info */}
      <div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        {/* Stars */}
        <div className="flex items-center gap-1 mb-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={i <= rating ? "text-orange-400" : "text-gray-300"}>★</span>
          ))}
        </div>
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-800">${price.toFixed(2)}</span>
          <span className="text-gray-400 line-through text-base">${oldPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default SpecialBrandCard;
