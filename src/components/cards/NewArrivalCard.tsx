'use client';

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/src/context/CartContext";
import { useHandleBuyNow } from "@/src/utils/commonfunction";
import { useWishlist } from "@/src/context/WishlistContext";
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
  const { addToWishlist } = useWishlist();
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
      className="border-2 border-gray-300 rounded-2xl p-2 shadow hover:scale-100 transition bg-white h-[420px] flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex justify-center items-center bg-gray-50 rounded-xl h-48 mb-4">
        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
            -{discount}%
          </span>
        )}
        {/* New badge */}
        {isNew && (
          <span className="absolute top-12 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
            New
          </span>
        )}
        {/* Icons */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 z-20 ${
            hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5 pointer-events-none"
          }`}
        >
          {["shuffle", "love", "cart"].map((icon) => (
            <div key={icon} className="relative group">
              <button
                className="text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-orange-300 hover:text-white transition-all duration-500 ease-in-out"
                onClick={() => {
                  if (icon === "cart") {
                    addToCart({
                      id,
                      title,
                      price,
                      mainImg: image,
                      quantity: 1,
                      stock: stock ?? 1,
                    });
                  }
                  if (icon === "love") {
                    addToWishlist({
                      id,
                      title,
                      price,
                      mainImg: image,
                      stock: stock ?? 1,
                    });
                  }
                }}
                title={
                  icon === "cart"
                    ? "Add to Cart"
                    : icon === "love"
                    ? "Add to Wishlist"
                    : ""
                }
              >
                {icon === "shuffle" && <span>🔄</span>}
                {icon === "love" && <span>❤️</span>}
                {icon === "cart" && <span>🛒</span>}
              </button>
            </div>
          ))}
        </div>
        {/* Image */}
        <div className="relative w-full h-[140px] rounded-[5px] overflow-hidden flex items-center justify-center bg-white">
          <Image
            src={image}
            alt={title}
            fill
            className="hover:scale-105 rounded-lg transition-transform duration-300 z-10"
          />
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
        {colors.map((color, idx) => (
          <span
            key={idx}
            className="w-5 h-5 rounded-full border-2 border-white shadow"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={() => handleBuyNow({ title, slug })}
          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          Buy Now
          <span className="text-sm">🛒</span>
        </button>
      </div>
    </div>
  );
};

export default NewArrivalCard;
