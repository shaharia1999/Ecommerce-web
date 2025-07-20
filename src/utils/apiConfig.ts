export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    ORDERS: '/orders',
    ORDER_BY_ID: () => `/orders/user`,
    UPDATE_ORDER_STATUS: (id: string) => `/orders/${id}/status`,
    PRODUCTS: '/products',
    PRODUCT_BY_SLUG: (slug: string) => `/products/${slug}`,
  }
};


