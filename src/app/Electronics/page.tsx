'use client';

import { useProducts } from '../../utils/api';
import FlashCard from '../../components/FlashCard';

export default function ElectronicsPage() {
  const { data, isLoading, isError } = useProducts({ category: 'Electronics' });

  if (isLoading) {
    return <div className="py-16 text-center text-lg">Loading...</div>;
  }
  if (isError || !data) {
    return <div className="py-16 text-center text-lg text-red-500">Failed to load products</div>;
  }

  const products = data.products || [];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-700">All Electronics Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {products.map((product) => (
            <FlashCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No products found</div>
      )}
    </section>
  );
}