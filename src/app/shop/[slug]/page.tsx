import ProductClient from "./ShopClientContent";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 300;

/**
 * 1. EXISTING FETCHING FUNCTION
 */
async function getProduct(slug: string) {
  // Note: Using your specific endpoint structure
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) return null;

  const data = await res.json();

  // Adjust according to your API structure
  return data.product || data.data || data;
}

/**
 * 2. METADATA (Uses the same fetching func)
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.title} | Easyshop-e-commerce`,
    description: product.description?.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.mainImg],
    },
  };
}

/**
 * 3. MAIN PAGE
 */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // 🔹 Unwrap params promise
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Ensure the product data matches the "ProductData" interface expected by ProductClient
  // If your API returns _id, we map it to id here for the component
  const formattedProduct = {
    ...product,
    id: product._id || product.id, 
  };

  return <ProductClient product={formattedProduct} />;
}

/**
 * 4. STATIC PARAMS (Optional but recommended for ISR)
 */
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const data = await res.json();
    const products = data.products || data.data || data;

    if (!Array.isArray(products)) return [];

    return products.map((p: any) => ({
      slug: p.slug,
    }));
  } catch (e) {
    return [];
  }
}