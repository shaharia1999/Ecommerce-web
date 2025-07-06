// Sample product data according to backend requirements
export const sampleProducts = [
  {
    title: "Premium Sports Shoes",
    description: "Comfortable sports shoes perfect for running and daily activities",
    category: "Shoes",
    price: 650,
    discount: 20,
    stock: 30,
    mainImage: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg",
    images: [
      "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg",
      "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg",
      "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg"
    ],
    filters: {
      size: ["XL", "M", "L", "S", "XXL"],
      color: ["red", "blue", "black", "white"]
    },
    // Additional frontend fields
    oldPrice: 812.5,
    isNew: true,
    rating: 4.5,
    reviews: 128
  },
  {
    title: "Cotton T-Shirt",
    description: "High quality cotton t-shirt with comfortable fit",
    category: "Clothing",
    price: 299,
    discount: 15,
    stock: 50,
    mainImage: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
    images: [
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg"
    ],
    filters: {
      size: ["M", "L", "XL"],
      color: ["blue", "black", "gray"]
    },
    oldPrice: 351.76,
    isNew: false,
    rating: 4.2,
    reviews: 89
  },
  {
    title: "Wireless Headphones",
    description: "Premium wireless headphones with noise cancellation",
    category: "Electronics",
    price: 1250,
    discount: 25,
    stock: 15,
    mainImage: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"
    ],
    filters: {
      size: ["One Size"],
      color: ["black", "white", "silver"]
    },
    oldPrice: 1666.67,
    isNew: true,
    rating: 4.8,
    reviews: 256
  },
  {
    title: "Smart Watch",
    description: "Latest smart watch with fitness tracking and heart rate monitor",
    category: "Electronics",
    price: 850,
    discount: 10,
    stock: 25,
    mainImage: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg"
    ],
    filters: {
      size: ["38mm", "42mm", "44mm"],
      color: ["black", "silver", "gold"]
    },
    oldPrice: 944.44,
    isNew: false,
    rating: 4.6,
    reviews: 178
  }
];

// Function to convert backend data to frontend format
export const formatProductForFrontend = (backendProduct: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  return {
    ...backendProduct,
    // Calculate oldPrice from price and discount if not provided
    oldPrice: backendProduct.oldPrice || (
      backendProduct.discount > 0 
        ? backendProduct.price / (1 - backendProduct.discount / 100)
        : undefined
    ),
    // Add default frontend values
    rating: backendProduct.rating || 4.0,
    reviews: backendProduct.reviews || 0,
    isNew: backendProduct.isNew || false
  };
};

// Function to prepare data for backend API
export const formatProductForBackend = (frontendProduct: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const {
    // Remove frontend-only fields (not used in backend)
    oldPrice, // eslint-disable-line @typescript-eslint/no-unused-vars
    isNew, // eslint-disable-line @typescript-eslint/no-unused-vars
    rating, // eslint-disable-line @typescript-eslint/no-unused-vars
    reviews, // eslint-disable-line @typescript-eslint/no-unused-vars
    selectedSize, // eslint-disable-line @typescript-eslint/no-unused-vars
    selectedColor, // eslint-disable-line @typescript-eslint/no-unused-vars
    quantity, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...backendData
  } = frontendProduct;

  return {
    title: backendData.title,
    description: backendData.description || "",
    category: backendData.category || "",
    price: backendData.price,
    discount: backendData.discount || 0,
    stock: backendData.stock || 0,
    mainImage: backendData.mainImage,
    images: backendData.images || [],
    filters: backendData.filters || { size: [], color: [] }
  };
};
