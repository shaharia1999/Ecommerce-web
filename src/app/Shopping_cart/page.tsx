'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
const handleCheckout = () => {
  // Save cart items to localStorage (already done on load)
  // localStorage.setItem('cart', JSON.stringify(cartItems));
  window.location.href = '/checkout'; // Navigate to checkout
};
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-4 border-b"
            >
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="object-cover rounded border"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded border text-gray-400">
                    No Image
                  </div>
                )}

                {/* Product Info */}
                <div>
                  <div className="font-semibold text-lg">{item.name}</div>
                  <div className="text-gray-500 text-sm">
                    Quantity: {item.quantity}
                  </div>
                  <div className="text-gray-500 text-sm">
                    Unit Price: ৳ {item.price}
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <div className="font-bold text-purple-700">
                ৳ {item.price * item.quantity}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 font-semibold text-right">
        Total: <span className="text-purple-700">৳ {total}</span>
      </div>

      {/* Checkout Button */}
    <button
  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition"
  disabled={cartItems.length === 0}
  onClick={handleCheckout}
>
  Proceed to Checkout
</button>
    </div>
  );
};

export default CartPage;
