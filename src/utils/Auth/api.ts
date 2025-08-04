
// const API_BASE_URL = 'http://localhost:5000'; // Replace with your actual backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ; // Replace with your actual backend URL
interface ApiOptions extends Omit<RequestInit, 'body'> {
  headers?: Record<string, string>;
  token?: string;
json?: Record<string, unknown>; // use this instead of any // use this instead of body
}


export async function apiFetch<T>(
  endpoint: string,
  options?: ApiOptions
): Promise<T> {
  const { headers, token, json, ...rest } = options || {};

  const config: RequestInit = {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (token) {
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  if (json) {
    config.body = JSON.stringify(json); // only assign JSON string here
  }

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Something went wrong' }));
    throw new Error(errorData.message || `API error: ${response.statusText}`);
  }

  return response.json();
}


// Example usage:
// apiFetch<ProductsApiResponse>('products?page=1&limit=10');
// apiFetch<Product>('products/some-slug', { method: 'POST', body: newProductData, token: 'jwt_token_here' });