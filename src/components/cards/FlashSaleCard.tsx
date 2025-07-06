import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  description?: string;
  category?: string;
  price: number;
  discount?: number;
  stock?: number;
  mainImage: string;
  images?: string[];
  filters?: {
    size: string[];
    color: string[];
  };
  // Additional frontend props
  oldPrice?: number;
  isNew?: boolean;
  rating?: number;
  reviews?: number;
};

const FlashSaleCard = ({
  title,
  description,
  category,
  price,
  discount = 0,
  stock,
  mainImage,
  images = [],
  filters,
  oldPrice,
  isNew = false,
  rating = 0,
  reviews = 0,
}: Props) => {

  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  // Handle buy now click
  const handleBuyNow = () => {
    const productData = {
      title,
      description,
      category,
      price,
      discount,
      stock,
      mainImage,
      images,
      filters,
      oldPrice,
      isNew,
      rating,
      reviews
    };
    
    // Navigate to shop page with product details
    router.push(`/shop?product=${encodeURIComponent(JSON.stringify(productData))}`);
  };

  // Helper to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      className="border rounded-2xl p-4 shadow hover:scale-105 transition bg-white max-w-xs mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);

      }}
    >
      <div className="relative flex justify-center items-center bg-gray-50 rounded-xl h-48 mb-4">
        {/* Discount badge */}
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          - {discount}%
        </span>
        {/* New badge */}
        {isNew && (
          <span className="absolute top-12 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            New
          </span>
        )}
        <Image
          src={mainImage}
          alt={title}
          width={160}
          height={160}
          className="h-40 object-contain"
        />
        {/* Dropdown Icons */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5 pointer-events-none"
            }`}
        >
          {["shuffle", "love", "cart"].map((icon) => (
            <div
              key={icon}
              className="relative group"

            >
              <button className="bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-orange-300 hover:text-white transition-all duration-500 ease-in-out">
                {icon === "shuffle" && <span>🔄</span>}
                {icon === "love" && <span>❤️</span>}
                {icon === "cart" && <span>🛒</span>}
              </button>
            </div>
          ))}
        </div>
      </div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-orange-500 font-bold text-xl">${price.toFixed(2)}</span>
        {typeof oldPrice === "number" && (
          <span className="text-gray-400 line-through text-base">${oldPrice.toFixed(2)}</span>
        )}
      </div>
      <div className="flex items-center gap-1 mb-2">
        {renderStars(Math.round(rating))}
        <span className="text-gray-400 text-sm ml-1">({reviews} Reviews)</span>
      </div>
      <div className="flex gap-2 mt-2">
        {filters?.color?.map((color: string, idx: number) => (
          <span
            key={idx}
            className="w-5 h-5 rounded-full border-2 border-white shadow"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="mt-4">
        <button 
          onClick={handleBuyNow}
          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          Buy Now
          <span className="text-sm">🛒</span>
        </button>
      </div>
    </div>
  );
};

export default FlashSaleCard;
