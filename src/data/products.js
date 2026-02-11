export const staticProducts = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and 40-hour battery life.",
    price: 299.99,
    rating: 4.8,
    category: "electronics",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"]
  },
  {
    id: 2,
    title: "Modern Smart Watch",
    description: "Track your fitness, heart rate, and sleep with this sleek and stylish smart watch.",
    price: 199.99,
    rating: 4.5,
    category: "electronics",
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"]
  },
  {
    id: 3,
    title: "Leather Backpack",
    description: "Durable and spacious leather backpack, perfect for daily use and travel.",
    price: 89.99,
    rating: 4.2,
    category: "fashion",
    thumbnail: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"]
  },
  {
    id: 4,
    title: "Designer Sunglasses",
    description: "Protect your eyes with these stylish and lightweight designer sunglasses.",
    price: 129.99,
    rating: 4.7,
    category: "fashion",
    thumbnail: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80"]
  },
  {
    id: 5,
    title: "Mechanical Keyboard",
    description: "Professional mechanical keyboard with RGB lighting and tactile switches.",
    price: 149.99,
    rating: 4.9,
    category: "electronics",
    thumbnail: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80"]
  },
  {
    id: 6,
    title: "Minimalist Desk Lamp",
    description: "Elegant desk lamp with adjustable brightness and color temperature controls.",
    price: 59.99,
    rating: 4.4,
    category: "home-living",
    thumbnail: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&q=80"]
  },
  {
    id: 7,
    title: "Ceramic Coffee Set",
    description: "Handcrafted ceramic coffee set including four cups and a stylish pour-over dripper.",
    price: 74.99,
    rating: 4.6,
    category: "home-living",
    thumbnail: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1517705008128-361805f42e86?w=800&q=80"]
  },
  {
    id: 8,
    title: "Cotton Comfort Hoodie",
    description: "Ultra-soft cotton hoodie with a modern fit, available in multiple colors.",
    price: 49.99,
    rating: 4.3,
    category: "fashion",
    thumbnail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"]
  },
  {
    id: 9,
    title: "Ergonomic Office Chair",
    description: "Maintain perfect posture with our fully adjustable ergonomic office chair.",
    price: 349.99,
    rating: 4.8,
    category: "home-living",
    thumbnail: "https://images.unsplash.com/photo-1505797149-43b0076649d7?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1505797149-43b0076649d7?w=800&q=80"]
  },
  {
    id: 10,
    title: "Portable SSD 1TB",
    description: "Lightning-fast portable SSD for secure data storage and quick file transfers.",
    price: 119.99,
    rating: 4.7,
    category: "electronics",
    thumbnail: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?w=800&q=80"]
  },
  {
    id: 11,
    title: "Fitness Yoga Mat",
    description: "Extra-thick non-slip yoga mat for maximum comfort during your workouts.",
    price: 34.99,
    rating: 4.5,
    category: "sports",
    thumbnail: "https://images.unsplash.com/photo-1592432676551-78759fc9949f?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1592432676551-78759fc9949f?w=800&q=80"]
  },
  {
    id: 12,
    title: "Insulated Water Bottle",
    description: "Keep your drinks cold for 24 hours or hot for 12 hours with this stainless steel bottle.",
    price: 24.99,
    rating: 4.6,
    category: "sports",
    thumbnail: "https://images.unsplash.com/photo-1602143307185-84e672399127?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1602143307185-84e672399127?w=800&q=80"]
  }
];

export const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=100');
    const data = await response.json();
    return data.products.length > 0 ? data.products : staticProducts;
  } catch (error) {
    console.error('Error fetching products, using static data:', error);
    return staticProducts;
  }
};

export const fetchProductById = async (id) => {
  // If id is small, it might be one of our static products
  const numericId = parseInt(id);
  if (numericId <= 12) {
    const staticProd = staticProducts.find(p => p.id === numericId);
    if (staticProd) return staticProd;
  }

  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return staticProducts.find(p => p.id === numericId) || null;
  }
};
