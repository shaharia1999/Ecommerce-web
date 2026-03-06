"use client";

import Image from "next/image";
import ZoomImage from "./ZoomIn";

export default function ProductClient({ product }: any) {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div>
          <ZoomImage src={product.mainImg} alt={product.title} />

          <div className="flex gap-3 mt-4">
            {(product.images || [product.mainImg]).map((img: string, i: number) => (
              <Image
                key={i}
                src={img}
                width={70}
                height={70}
                alt=""
                className="cursor-pointer border"
              />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">
              TK {product.discountedPrice}
            </span>

            {product.discount > 0 && (
              <span className="line-through text-gray-400">
                TK {product.originalPrice}
              </span>
            )}
          </div>

          {/* SIZE */}
          {product.filters?.size?.length > 0 && (
            <div className="mb-4">
              <p className="mb-2">Size</p>
              <div className="flex gap-2">
                {product.filters.size.map((s: string) => (
                  <button
                    key={s}
                    className="px-4 py-2 border"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* COLOR */}
          {product.filters?.color?.length > 0 && (
            <div className="mb-4">
              <p className="mb-2">Color</p>
              <div className="flex gap-2">
                {product.filters.color.map((c: string, i: number) => (
                  <button
                    key={i}
                    style={{ backgroundColor: c }}
                    className="w-8 h-8 rounded-full border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div className="flex items-center gap-3 mb-6">
            <button className="px-3 py-2 border">-</button>
            <span>1</span>
            <button className="px-3 py-2 border">+</button>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded">
              Buy Now
            </button>

            <button className="bg-orange-500 text-white px-6 py-3 rounded">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}