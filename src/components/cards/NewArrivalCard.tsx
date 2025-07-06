'use client';
import { useState } from "react";

type Props = {
  title: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  colors?: string[];
};

const NewArrivalCard = ({
  title,
  price,
  image,
  rating = 5,
  reviews = 20,
  isNew = true,
  colors = ["#D32F2F", "#388E3C", "#1976D2", "#FFB300"],
}: Props) => {
  const [hovered, setHovered] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col shadow border hover:scale-[1.02] transition min-h-[380px] relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setHoveredIcon(null);
      }}
    >
      <div className="bg-gray-50 rounded-xl w-full flex items-center justify-center h-48 mb-4 relative">
        {isNew && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            New
          </span>
        )}
        <img src={image} alt={title} className="object-contain h-40" />
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
              <button className="bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg shadow">
                {icon === "shuffle" && <span>🔄</span>}
                {icon === "love" && <span>🤍</span>}
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
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <span className="text-orange-500 font-bold text-xl mb-1">${price.toFixed(2)}</span>
      <div className="flex items-center gap-1 mb-1 mt-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={i <= rating ? "text-orange-400" : "text-gray-300"}>★</span>
        ))}
        <span className="text-gray-400 text-sm ml-1">({reviews} Reviews)</span>
      </div>
      <div className="flex gap-2 mt-2">
        {colors.map((color, idx) => (
          <span
            key={idx}
            className="w-5 h-5 rounded-full border-2 border-white shadow"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default NewArrivalCard;
