'use client';
import { useState } from "react";
import TrendingProductCard from '../cards/TrendingProductCard';
import trendingProductsData from '../../data/trendingProductsData';

const categories = ["Western", "Tops", "Bags", "Shoes"];

const TrendingProductsSection = () => {
  const [selected, setSelected] = useState("Western");

  const filtered = trendingProductsData.filter(
    (item) => item.category === selected
  );

  return (
    <section className="my-10">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold">
          <span className="relative">
            <span className="text-black">Trending</span>
            <span className="absolute left-0 -bottom-1 w-full h-2 bg-yellow-200 rounded-full -z-10"></span>
          </span>{" "}
          Products
        </h2>
        <div className="flex gap-2 ml-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1 rounded-full border text-sm font-semibold transition ${
                selected === cat
                  ? "bg-yellow-100 border-yellow-400 text-yellow-700"
                  : "bg-white border-gray-200 text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setSelected(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <TrendingProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default TrendingProductsSection;
