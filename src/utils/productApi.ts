import { useQuery } from '@tanstack/react-query';

export interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  discount?: number;
  stock: number;
  mainImage: string;
  images?: string[];
  description?: string;
  rating?: number;
  reviews?: number;
  slug?: string;
}

const apiFetch = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`http://localhost:5000/${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
};

export const useProduct = (slug: string) => {
  return useQuery<Product, Error>({
    queryKey: ['product', slug],
    queryFn: () => apiFetch<Product>(`products/${slug}`),
    enabled: !!slug,
  });
};