'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Updated Types according to NEW backend requirements
export interface OrderData {
  user?: string;                    // Optional: only if user is logged in
  address: string;
  mobile: string;
  products: Array<{
    product: string;                // Product ID (MongoDB ObjectId)
    quantity: number;
  }>;
  totalAmount: number;
  deliveryCharge: number;
  status?: string;                  // Optional: backend will set to 'pending' by default
}

// Keep existing interfaces for frontend use
export interface Customer {
  name: string;
  mobile: string;
  district: string;
  address: string;
}

export interface ProductFilters {
  size: string[];
  color: string[];
}

export interface Product {
  title: string;
  description?: string;
  category?: string;
  price: number;
  discount?: number;
  stock?: number;
  mainImage: string;
  images?: string[];
  filters?: ProductFilters;
  // Additional fields for frontend
  oldPrice?: number;
  isNew?: boolean;
  rating?: number;
  reviews?: number;
  selectedSize?: string;
  selectedColor?: string;
  quantity?: number;
}

// API Configuration - FIXED
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    ORDERS: '/orders',
    ORDER_BY_ID: (id: string) => `/orders/${id}`,
    UPDATE_ORDER_STATUS: (id: string) => `/orders/${id}/status`
  }
};

// ✅ NEW: Backend Product Interface - Real structure
export interface BackendProduct {
  _id: string;                    // ✅ Real MongoDB ObjectId
  title: string;
  slug: string;
  description?: string;
  category: string;
  price: number;
  discount?: number;
  stock: number;
  mainImage: string;
  images?: string[];
  filters?: ProductFilters;
  rating?: number;
  reviews?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// API functions using fetch - FIXED
export const orderAPI = {
  // Create order using fetch - POST http://localhost:5000/orders
  createOrder: async (orderData: OrderData) => {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDERS}`;
    
    console.log('🚀 Sending POST request to:', url);
    console.log('📦 Order data:', orderData);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`❌ HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Backend response:', data);
      return data;
      
    } catch (error) {
      console.error('❌ Order API Error:', error);
      
      // Check if it's a network error (backend not running)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Backend server is not running. Please check if http://localhost:5000 is accessible.');
      }
      
      throw error;
    }
  },

  // Get order by ID - GET http://localhost:5000/orders/:id
  getOrderById: async (orderId: string) => {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDER_BY_ID(orderId)}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get Order Error:', error);
      throw error;
    }
  },

  // Update order status - PATCH http://localhost:5000/orders/:id/status
  updateOrderStatus: async (orderId: string, status: string) => {
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPDATE_ORDER_STATUS(orderId)}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update Order Status Error:', error);
      throw error;
    }
  },

  // Get all orders - GET http://localhost:5000/orders
  getAllOrders: async (params?: { page?: number; limit?: number; status?: string }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.status) queryParams.append('status', params.status);

      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ORDERS}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get All Orders Error:', error);
      throw error;
    }
  }
};

// ✅ NEW: Product API
export const productAPI = {
  getProductBySlug: async (slug: string): Promise<BackendProduct> => {
    const url = `${API_CONFIG.BASE_URL}/products/${slug}`;
    
    console.log('🚀 Fetching product from:', url);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Product data with real ID:', data);
      console.log('Real Product ID:', data._id);
      return data;
      
    } catch (error) {
      console.error('❌ Product fetch error:', error);
      throw error;
    }
  },

  // ✅ NEW: Get products with category filtering
  getProducts: async (params?: {
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    total: number;
    page: number;
    pages: number;
    products: BackendProduct[];
  }> => {
    const queryParams = new URLSearchParams();
    
    if (params?.category) queryParams.append('category', params.category);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `${API_CONFIG.BASE_URL}/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    
    console.log('🚀 Fetching products from:', url);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Products data:', data);
      return data;
      
    } catch (error) {
      console.error('❌ Products fetch error:', error);
      throw error;
    }
  }
};

// React Query Keys
export const QUERY_KEYS = {
  ORDERS: 'orders',
  ORDER: 'order',
  PRODUCTS: 'products', // ✅ NEW
  PRODUCT: 'product',   // ✅ NEW
} as const;

// TanStack Query Hooks - FIXED
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderData: OrderData) => orderAPI.createOrder(orderData),
    onSuccess: (data) => {
      console.log('✅ Order created successfully:', data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
    },
    onError: (error) => {
      console.error('❌ Order creation failed:', error);
    },
  });
};

export const useOrder = (orderId: string, enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, orderId],
    queryFn: () => orderAPI.getOrderById(orderId),
    enabled: enabled && !!orderId,
  });
};

export const useOrders = (params?: { page?: number; limit?: number; status?: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS, params],
    queryFn: () => orderAPI.getAllOrders(params),
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      orderAPI.updateOrderStatus(orderId, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDER, variables.orderId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
    },
  });
};

// ✅ NEW: Products Query Hook
export const useProducts = (params?: {
  category?: string;
  page?: number;
  limit?: number;
}, enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productAPI.getProducts(params),
    enabled: enabled,
  });
};

// ✅ UPDATE: Product Query Hook (existing এর key update করুন)
export const useProduct = (slug: string, enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, slug], // Updated key
    queryFn: () => productAPI.getProductBySlug(slug),
    enabled: enabled && !!slug,
  });
};
