'use client';

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/src/context/CartContext";
import { useHandleBuyNow } from "@/src/utils/commonfunction";

type Props = {
  id: string;
  title: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  colors?: string[];
  discount?: number;
  oldPrice?: number;
  slug: string;
  stock?: number;
};

const NewArrivalCard = ({
  id,
  title,
  price,
  image,
  rating = 5,
  reviews = 20,
  isNew = true,
  colors = ["#D32F2F", "#388E3C", "#1976D2", "#FFB300"],
  discount = 0,
  oldPrice,
  slug,
  stock = 1,
}: Props) => {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();
  const handleBuyNow = useHandleBuyNow();
console.log(id);
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
      className="bg-white rounded-2xl p-4 flex flex-col shadow border hover:scale-[1.02] transition h-[430px] relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image section */}
      <div className="bg-gray-50 rounded-xl w-full flex items-center justify-center h-48 mb-4 relative">
        {/* Badges */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {isNew && (
          <span className="absolute top-12 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            New
          </span>
        )}
        <Image src={image} alt={title} width={160} height={160} className="h-40 object-contain" />

        {/* Hover Actions */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5 pointer-events-none"
            }`}
        >
          {["shuffle", "love", "cart"].map((icon) => (
            <div key={icon} className="relative group">
              <button
                className="bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-orange-300 hover:text-white transition-all duration-500"
                onClick={() => {
                  console.log("Add to cart ID:",);
                  if (icon === "cart") {
                    addToCart({
                      id,
                      title,
                      price,
                      mainImg: image,
                      quantity: 1,
                      stock,
                    });

                  }
                }}
                title={
                  icon === "cart"
                    ? "Add to Cart"
                    : icon === "love"
                      ? "Add to Wishlist"
                      : "Compare"
                }
              >
                {icon === "shuffle" && <span>🔄</span>}
                {icon === "love" && <span>❤️</span>}
                {icon === "cart" && <span>🛒</span>}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Title & Price */}
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-orange-500 font-bold text-xl">${price.toFixed(2)}</span>
        {typeof oldPrice === "number" && (
          <span className="text-gray-400 line-through text-base">${oldPrice.toFixed(2)}</span>
        )}
      </div>

      {/* Ratings */}
      <div className="flex items-center gap-1 mb-1 mt-1">
        {renderStars(Math.round(rating))}
        <span className="text-gray-400 text-sm ml-1">({reviews} Reviews)</span>
      </div>

      {/* Color Options */}
      <div className="flex gap-2 mt-1 mb-2">
        {colors.map((color, idx) => (
          <span
            key={idx}
            className="w-5 h-5 rounded-full border-2 border-white shadow"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Buy Now */}
      <div className="mt-auto">
        <button
          onClick={() => handleBuyNow({ title, slug })}
          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          Buy Now
          <span>🛒</span>
        </button>
      </div>
    </div>
  );
};

export default NewArrivalCard;
