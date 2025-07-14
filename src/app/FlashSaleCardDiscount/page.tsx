'use client';

import FlashSaleCard from '../../components/cards/FlashSaleCard';
import { useProducts } from '../../utils/api';

export default function FlashSaleCardPage() {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) {
    return <div className="py-16 text-center text-lg">Loading...</div>;
  }
  if (isError || !data) {
    return <div className="py-16 text-center text-lg text-red-500">Failed to load products</div>;
  }

  const products = data.products || [];
  console.log(products[0]);
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-700">All Flash Sale Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
          {products.map((product) => (
            <FlashSaleCard
              key={product.id}
              title={product.title}
              description={product.description || ""}
              category={product.category}
              price={product.discountedPrice}
              discount={
                product.discount ??
                (product.originalPrice
                  ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
                  : 0)
              }
              stock={product.stock}
              slug={product.slug}
              mainImg={product.mainImg}
              images={product.images || []}
              oldPrice={product.originalPrice}
              rating={product.rating ?? 0}
              reviews={product.reviews ?? 0}
              filters={{
                size: product.size || [],
                color: product.color || []
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No products found</div>
      )}
    </section>
  );
}