// Updated flash sale data with backend format
const flashSaleData = [
  {
    title: "Premium Sports Shoes",
    description: "Comfortable sports shoes perfect for running and daily activities",
    category: "Shoes",
    price: 650,
    discount: 20,
    stock: 30,
    mainImage: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    filters: {
      size: ["XL", "M", "L", "S", "XXL"],
      color: ["red", "blue", "black", "white"]
    },
    // Frontend additional fields
    oldPrice: 812.5,
    isNew: true,
    rating: 4.5,
    reviews: 128
  },
  {
    title: "Cotton T-Shirt Premium",
    description: "High quality cotton t-shirt with comfortable fit and modern design",
    category: "Clothing",
    price: 299,
    discount: 15,
    stock: 50,
    mainImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=compress&cs=tinysrgb&w=800",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=compress&cs=tinysrgb&w=800"
    ],
    filters: {
      size: ["M", "L", "XL", "XXL"],
      color: ["blue", "black", "gray", "white"]
    },
    oldPrice: 351.76,
    isNew: false,
    rating: 4.2,
    reviews: 89
  },
  {
    title: "Wireless Headphones Pro",
    description: "Premium wireless headphones with active noise cancellation and superior sound quality",
    category: "Electronics",
    price: 1250,
    discount: 25,
    stock: 15,
    mainImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=compress&cs=tinysrgb&w=800",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=compress&cs=tinysrgb&w=800"
    ],
    filters: {
      size: ["One Size"],
      color: ["black", "white", "silver", "red"]
    },
    oldPrice: 1666.67,
    isNew: true,
    rating: 4.8,
    reviews: 256
  },
  {
    title: "Smart Watch Series 8",
    description: "Latest smart watch with fitness tracking, heart rate monitor, and GPS functionality",
    category: "Electronics",
    price: 850,
    discount: 10,
    stock: 25,
    mainImage: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=compress&cs=tinysrgb&w=800",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=compress&cs=tinysrgb&w=800"
    ],
    filters: {
      size: ["38mm", "42mm", "44mm"],
      color: ["black", "silver", "gold", "rose-gold"]
    },
    oldPrice: 944.44,
    isNew: false,
    rating: 4.6,
    reviews: 178
  },
  {
    title: "Gaming Laptop Ultra",
    description: "High-performance gaming laptop with latest graphics card and fast processor",
    category: "Electronics",
    price: 45000,
    discount: 12,
    stock: 8,
    mainImage: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=compress&cs=tinysrgb&w=800",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=compress&cs=tinysrgb&w=800"
    ],
    filters: {
      size: ["15.6 inch", "17.3 inch"],
      color: ["black", "silver"]
    },
    oldPrice: 51136.36,
    isNew: true,
    rating: 4.7,
    reviews: 94
  },
  {
    title: "Women's Summer Dress",
    description: "Elegant summer dress perfect for casual and formal occasions",
    category: "Clothing",
    price: 450,
    discount: 30,
    stock: 40,
    mainImage: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=compress&cs=tinysrgb&w=800",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=compress&cs=tinysrgb&w=800"
    ],
    filters: {
      size: ["S", "M", "L", "XL"],
      color: ["red", "blue", "pink", "yellow"]
    },
    oldPrice: 642.86,
    isNew: false,
    rating: 4.4,
    reviews: 203
  },
  {
    title: "Bluetooth Speaker Portable",
    description: "Waterproof portable bluetooth speaker with excellent bass and long battery life",
    category: "Electronics", 
    price: 750,
    discount: 18,
    stock: 35,
    mainImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=compress&cs=tinysrgb&w=800",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=compress&cs=tinysrgb&w=800"
    ],
    filters: {
      size: ["Compact", "Medium", "Large"],
      color: ["black", "blue", "red", "green"]
    },
    oldPrice: 914.63,
    isNew: true,
    rating: 4.3,
    reviews: 167
  },
  {
    title: "Men's Casual Jacket",
    description: "Stylish casual jacket for men, perfect for winter and autumn seasons",
    category: "Clothing",
    price: 950,
    discount: 22,
    stock: 20,
    mainImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=compress&cs=tinysrgb&w=800",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=compress&cs=tinysrgb&w=800"
    ],
    filters: {
      size: ["M", "L", "XL", "XXL"],
      color: ["black", "brown", "navy", "gray"]
    },
    oldPrice: 1217.95,
    isNew: false,
    rating: 4.5,
    reviews: 142
  }
];

export default flashSaleData;
