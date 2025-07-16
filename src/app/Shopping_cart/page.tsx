'use client';
import React from 'react';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
  } = useCart();

  const router = useRouter();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    router.push('/checkout');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-4 border-b"
            >
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                { item.mainImg ? (
                  <Image
                    src={ item.mainImg}
                    alt={ item.title}
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
                  <div className="font-semibold text-lg">
                    { item.title}
                  </div>
                  <div className="text-gray-500 text-sm">
                    ৳ {item.price} x {item.quantity}
                  </div>
                  <div className="flex items-center mt-1 space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      title="Remove item"
                    >
                      {/* Trash icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 4a2 2 0 012-2h4a2 2 0 012 2v1h3a1 1 0 110 2h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7H3a1 1 0 110-2h3V4zm2 1v10h2V5H8zm4 0v10h2V5h-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
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

      {/* Subtotal */}
      <div className="mt-6 font-semibold text-right">
        Total: <span className="text-purple-700">৳ {subtotal}</span>
      </div>

      {/* Checkout Button */}
      <button
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition mt-4"
        disabled={cart.length === 0}
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartPage;
