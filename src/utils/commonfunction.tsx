"use client";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  slug?: string;
};

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// ✅ This is a hook that returns the handler function
export const useHandleBuyNow = () => {
  const router = useRouter();

  return ({ title, slug }: Props) => {
    const productSlug = slug || generateSlug(title);
    router.push(`/shop/${productSlug}`);
  };
};
