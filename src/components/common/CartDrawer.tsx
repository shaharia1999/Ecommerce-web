'use client';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, subtotal, open, setOpen } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-[9998] transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[9999] transition-transform duration-300 transform ${
  open ? 'translate-x-0' : 'translate-x-full'
} flex flex-col`}
        style={{ maxWidth: '100vw', right: 0, left: 'auto', padding: 0, margin: 0 }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
         <button onClick={() => setOpen(false)} className="text-2xl">&times;</button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto hide-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">Your cart is empty</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center mb-6 border-b pb-4">
                <Image src={item.mainImg} alt={item.title} width={60} height={60} className="rounded" />
                <div className="ml-3 flex-1">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-gray-500">৳{item.price} x {item.quantity}</div>
                  <div className="flex items-center mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2">-</button>
                    <span className="px-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 text-xs">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between font-semibold mb-3">
            <span>Subtotal</span>
            <span>৳{subtotal}</span>
          </div>
          <Link href="/order">
            <button
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition"
              onClick={() => setOpen(false)}
            >
              View Cart
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
