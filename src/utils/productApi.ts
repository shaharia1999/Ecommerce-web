import { BackendProduct, ProductQueryParams } from './type';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const productAPI = {
  getProductBySlug: async (slug: string): Promise<BackendProduct> => {
    const res = await fetch(`${BASE_URL}/products/${slug}`);
    if (!res.ok) throw new Error(`Failed to fetch product ${slug}`);
    return res.json();
  },

getProducts: async (params?: ProductQueryParams) => {
  const query = new URLSearchParams();

  // Add string or number params if they have a value (including 0)
  if (params?.search) query.append('search', params.search);
  if (params?.category) query.append('category', params.category);
  if (params?.color) query.append('color', params.color);
  if (params?.size) query.append('size', params.size);
  if (params?.priceMin !== undefined && params.priceMin !== '') query.append('priceMin', String(params.priceMin));
  if (params?.priceMax !== undefined && params.priceMax !== '') query.append('priceMax', String(params.priceMax));
  if (params?.createdAfter) query.append('createdAfter', params.createdAfter);
  if (params?.createdBefore) query.append('createdBefore', params.createdBefore);

  // Sort params with defaults
  query.append('sortBy', params?.sortBy ?? 'createdAt');
  query.append('sortOrder', params?.sortOrder ?? 'desc');

  // Pagination with defaults
  query.append('page', String(params?.page ?? 1));
  query.append('limit', String(params?.limit ?? 10));

  // Discount boolean, only add if true
  if (params?.discount) query.append('discount', 'true');

  const url = `${BASE_URL}/products${query.toString() ? `?${query.toString()}` : ''}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch products`);

  return res.json();
}

};
