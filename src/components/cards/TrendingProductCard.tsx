import { useState } from "react";

type Props = {
  title: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  discount?: number;
  colors?: string[];
};

const TrendingProductCard = ({
  title,
  price,
  image,
  rating = 0,
  reviews = 0,
  isNew = false,
  discount,
  colors = [],
}: Props) => {
  const [hovered, setHovered] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <div
      className="border rounded-2xl p-4 shadow hover:scale-105 transition bg-white relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setHoveredIcon(null);
      }}
    >
      <div className="relative flex justify-center items-center bg-gray-50 rounded-xl h-40 mb-4">
        {discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            - {discount}%
          </span>
        )}
        {isNew && (
          <span className="absolute top-12 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            New
          </span>
        )}
        <img src={image} alt={title} className="h-32 object-contain" />
        {/* Hover Icons */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5 pointer-events-none"
          }`}
        >
          {["shuffle", "love", "cart"].map((icon) => (
            <div
              key={icon}
              className="relative group"
              onMouseEnter={() => setHoveredIcon(icon)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <button className="bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center">
                {icon === "shuffle" && <span>🔄</span>}
                {icon === "love" && <span>❤️</span>}
                {icon === "cart" && <span>🛒</span>}
              </button>
              {hoveredIcon === icon && (
                <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-white border rounded shadow px-3 py-1 text-xs z-10">
                  {icon === "shuffle" && "Compare"}
                  {icon === "love" && "Add to Wishlist"}
                  {icon === "cart" && "Add to Cart"}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <h3 className="font-bold text-base mb-1">{title}</h3>
      <span className="text-orange-500 font-bold text-lg">${price.toFixed(2)}</span>
      <div className="flex items-center gap-1 mb-1 mt-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={i <= rating ? "text-orange-400" : "text-gray-300"}>★</span>
        ))}
        <span className="text-gray-400 text-xs ml-1">({reviews} Reviews)</span>
      </div>
      <div className="flex gap-2 mt-2">
        {colors.map((color, idx) => (
          <span
            key={idx}
            className="w-4 h-4 rounded-full border-2 border-white shadow"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingProductCard;
