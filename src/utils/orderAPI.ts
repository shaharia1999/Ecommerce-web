// import { OrderData } from './api';
import { API_CONFIG } from './apiConfig';
import { OrderData } from './type';
// import { OrderData } from './types/order';

export const orderAPI = {
  createOrder: async (orderData: OrderData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDERS}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    return await response.json();
  },

getOrderById: async ( token: string) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDER_BY_ID()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // 🔐 Include token here
    },
  });

  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
  return await response.json();
},


};
