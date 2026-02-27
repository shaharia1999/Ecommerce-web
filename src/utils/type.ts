export interface OrderData {
  user?: string;
  _id?: string; // Optional, if you want to include user ID
  address: string;
  name: string;
  mobile: string;
  products: Array<{
    product: string;
    quantity: number;
  }>;
  totalAmount: number;
  deliveryCharge: number;
  status?: string;
}
export interface BackendProduct {
  id: string;
  _id: string;
  title: string;
  slug: string;
  stock: number;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  mainImg: string;
  description?: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  discount?: number;
  size?: string[];
  color?: string[];
  filters?: {
    size?: string[];
    color?: string[];
  };
}
// type.ts or where your types are defined


export interface ProductQueryParams {
  search?: string;
  category?: string;
  color?: string;
  size?: string;
  priceMin?: number | string;
  priceMax?: number | string;
  createdAfter?: string;  // ISO date string
  createdBefore?: string; // ISO date string
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  discount?: boolean;
}

export interface AuthResponse {
  message: string;
  token?: string;
  userId?: string; // Optional, if your backend returns user ID
}

// Add types for user, login/register payloads, etc.
export interface UserCredentials {
  email: string;
  password: string;
}

