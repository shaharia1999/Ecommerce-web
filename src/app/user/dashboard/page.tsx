'use client';
import React, { useState, useEffect } from 'react';
import { GetCookies, GetCookiesId } from '@/src/utils/Cookies/Set-Cookies';
import { useOrder } from '@/src/utils/useOrder';

// --------------------
// ✅ TYPE DEFINITIONS
// --------------------
interface Product {
  _id: string;
  title: string;
  price: number;
  discount: number;
  mainImage: string;
}

interface OrderProduct {
  _id: string;
  product: Product;
  quantity: number;
}

interface Order {
  _id: string;
  user: string;
  address: string;
  mobile: string;
  products: OrderProduct[];
  totalAmount: number;
  deliveryCharge: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderApiResponse {
  total: number;
  page: number;
  pages: number;
  orders: Order[];
}

// --------------------
// ✅ COMPONENT
// --------------------
const Page = () => {
  const [token, setToken] = useState<string | null>('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCookies() {
      const t = await GetCookies();
      const u = await GetCookiesId();
      setToken(t);
      setUserId(u);
    }
    fetchCookies();
  }, []);

  const { data, isLoading, error } = useOrder(token as string) as {
    data: OrderApiResponse | undefined;
    isLoading: boolean;
    error: unknown;
  };

  if (!userId || !token) return <div className="p-4">Loading orders info...</div>;
  if (isLoading) return <div className="p-4">Loading orders...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {(error as Error).message}</div>;

  if (!data || !data.orders || data.orders.length === 0) {
    return <div className="p-4 text-center text-gray-600">No orders found.</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-orange-500">My Orders</h1>

      {data.orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-200 rounded-lg p-4 mb-8 shadow"
        >
          {order.products.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.mainImage}
                  alt={item.product.title}
                  className="w-14 h-14 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium">{item.product.title}</h4>
                  <p className="text-sm text-gray-500">
                    ৳{item.product.price} × {item.quantity}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Status:</span>{' '}
                    <span className="text-green-600 capitalize">{order.status}</span>
                  </p>
                </div>
              </div>
              <p className="font-semibold text-purple-600">
                ৳{(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="text-right mt-4 font-semibold">
            Total:{' '}
            <span className="text-purple-600">
              ৳{order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
