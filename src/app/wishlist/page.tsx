'use client';
import React from "react";
import { useWishlist } from "@/src/context/WishlistContext";
import { useCart } from "@/src/context/CartContext";
import Image from "next/image";

const WishlistPage = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
            {wishlist.length === 0 ? (
                <p>No items in wishlist.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                        <div key={item.id} className="border-1 border-gray-300 rounded-lg py-4 flex flex-col items-center shadow bg-white ">

                            <Image
                                width={150}
                                height={128}
                                src={item.mainImg}
                                alt={item.title}
                                className="h-36 object-contain mb-2 w-full px-2 "
                            />


                            <h2 className="font-semibold text-lg">{item.title}</h2>
                            <p className="text-orange-500 font-bold text-xl">${item.price.toFixed(2)}</p>
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => addToCart({ ...item, quantity: 1 })}
                                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => removeFromWishlist(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;