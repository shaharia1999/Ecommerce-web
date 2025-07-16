'use client';

import { useQuery } from '@tanstack/react-query';
// import { productAPI } from './productAPI';
// import { BackendProduct } from './types';
import { QUERY_KEYS } from './queryKeys';
import { productAPI } from './productApi';
import { BackendProduct, ProductQueryParams } from './type';

// export const useProducts = (
//   params?: { category?: string; page?: number; limit?: number,discount?: boolean },
//   enabled = true
// ) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.PRODUCTS, params],
//     queryFn: () => productAPI.getProducts(params),
//     enabled,
//   });
// };

export const useProducts = (
  params?: ProductQueryParams,
  enabled = true
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productAPI.getProducts(params),
    enabled,
  });
};

export const useProduct = (slug: string, enabled = true) => {
  return useQuery<BackendProduct>({
    queryKey: [QUERY_KEYS.PRODUCT, slug],
    queryFn: () => productAPI.getProductBySlug(slug),
    enabled: enabled && !!slug,
  });
};
