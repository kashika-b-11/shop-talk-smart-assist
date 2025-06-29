
import { Product } from '@/types/product';

const productTemplates = {
  Electronics: [
    { name: "iPhone 15 Pro Max", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop", basePrice: 129900 },
    { name: "Samsung Galaxy S24 Ultra", image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop", basePrice: 124999 },
    { name: "MacBook Air M3", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop", basePrice: 114900 },
    { name: "Sony WH-1000XM5 Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", basePrice: 29990 },
    { name: "iPad Pro 12.9 inch", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop", basePrice: 112900 },
  ],
  Fashion: [
    { name: "Nike Air Jordan Sneakers", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", basePrice: 12999 },
    { name: "Levi's Denim Jacket", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=400&fit=crop", basePrice: 4999 },
    { name: "Ray-Ban Sunglasses", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", basePrice: 8999 },
    { name: "Adidas Running Shoes", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", basePrice: 7999 },
    { name: "Cotton Casual T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", basePrice: 899 },
  ],
  "Home & Kitchen": [
    { name: "KitchenAid Stand Mixer", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", basePrice: 35999 },
    { name: "Nespresso Coffee Machine", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop", basePrice: 18999 },
    { name: "Ceramic Dinner Set", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop", basePrice: 2999 },
    { name: "Non-Stick Cookware Set", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", basePrice: 4999 },
    { name: "LED Table Lamp", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", basePrice: 1999 },
  ],
  Groceries: [
    { name: "Fresh Red Apples (1kg)", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop", basePrice: 180 },
    { name: "Basmati Rice (5kg)", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop", basePrice: 650 },
    { name: "Fresh Milk (1 Litre)", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop", basePrice: 65 },
    { name: "Whole Wheat Bread", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop", basePrice: 45 },
    { name: "Mixed Vegetables (2kg)", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop", basePrice: 120 },
  ],
  Beauty: [
    { name: "Lakme Foundation", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop", basePrice: 899 },
    { name: "L'Oreal Shampoo", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop", basePrice: 459 },
    { name: "Nivea Face Cream", image: "https://images.unsplash.com/photo-1556228578-dd6c8c3dbe3e?w=400&h=400&fit=crop", basePrice: 299 },
    { name: "Maybelline Mascara", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", basePrice: 649 },
    { name: "Himalaya Face Wash", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", basePrice: 185 },
  ],
  Sports: [
    { name: "Yoga Mat Premium", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop", basePrice: 1299 },
    { name: "Cricket Bat MRF", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=400&fit=crop", basePrice: 2999 },
    { name: "Football Adidas", image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&h=400&fit=crop", basePrice: 1599 },
    { name: "Badminton Racket", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop", basePrice: 2499 },
    { name: "Gym Dumbbells Set", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop", basePrice: 3999 },
  ],
  Books: [
    { name: "The Alchemist Novel", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop", basePrice: 299 },
    { name: "Rich Dad Poor Dad", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop", basePrice: 399 },
    { name: "Harry Potter Collection", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", basePrice: 1999 },
    { name: "Wings of Fire Biography", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop", basePrice: 249 },
    { name: "Atomic Habits Book", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop", basePrice: 449 },
  ],
  Toys: [
    { name: "LEGO Building Blocks", image: "https://images.unsplash.com/photo-1558877385-5b2b0c9b5b95?w=400&h=400&fit=crop", basePrice: 2999 },
    { name: "Remote Control Car", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", basePrice: 1899 },
    { name: "Barbie Doll Set", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop", basePrice: 1299 },
    { name: "Educational Puzzle", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", basePrice: 699 },
    { name: "Action Figure Superhero", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop", basePrice: 899 },
  ]
};

const locations = [
  'MG Road Store, Bangalore',
  'Connaught Place, Delhi',
  'Marine Drive, Mumbai',
  'Park Street, Kolkata',
  'Anna Nagar, Chennai'
];

const generateProductId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const generateRandomProducts = (count: number = 8): Product[] => {
  const allCategories = Object.keys(productTemplates);
  const products: Product[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)] as keyof typeof productTemplates;
    const categoryProducts = productTemplates[randomCategory];
    const randomProduct = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
    
    const priceVariation = 0.8 + Math.random() * 0.4; // 80% to 120% of base price
    const finalPrice = Math.round(randomProduct.basePrice * priceVariation);
    
    products.push({
      id: generateProductId(),
      name: randomProduct.name,
      price: finalPrice,
      image: randomProduct.image,
      inStock: Math.random() > 0.1, // 90% chance of being in stock
      storeAvailability: locations[Math.floor(Math.random() * locations.length)],
      onlineAvailability: 'Delivery in 2-3 hours',
      rating: 3.5 + Math.random() * 1.5,
      description: `Premium quality ${randomProduct.name.toLowerCase()} with excellent features and competitive pricing.`
    });
  }
  
  return products;
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase().trim();
  console.log('Searching for:', searchTerm);
  
  // Find matching category or generate products based on search
  const matchingCategory = Object.keys(productTemplates).find(category => 
    category.toLowerCase().includes(searchTerm) || 
    searchTerm.includes(category.toLowerCase())
  ) as keyof typeof productTemplates;
  
  if (matchingCategory) {
    // Generate products from the matching category
    const categoryProducts = productTemplates[matchingCategory];
    return categoryProducts.map(template => ({
      id: generateProductId(),
      name: template.name,
      price: Math.round(template.basePrice * (0.8 + Math.random() * 0.4)),
      image: template.image,
      inStock: Math.random() > 0.1,
      storeAvailability: locations[Math.floor(Math.random() * locations.length)],
      onlineAvailability: 'Delivery in 2-3 hours',
      rating: 3.5 + Math.random() * 1.5,
      description: `High-quality ${template.name.toLowerCase()} with great features and value for money.`
    }));
  }
  
  // If no category match, generate random products
  return generateRandomProducts(8);
};

export const getProductsByCategory = (category: string): Product[] => {
  const categoryKey = category as keyof typeof productTemplates;
  if (productTemplates[categoryKey]) {
    const categoryProducts = productTemplates[categoryKey];
    return categoryProducts.map(template => ({
      id: generateProductId(),
      name: template.name,
      price: Math.round(template.basePrice * (0.8 + Math.random() * 0.4)),
      image: template.image,
      inStock: Math.random() > 0.1,
      storeAvailability: locations[Math.floor(Math.random() * locations.length)],
      onlineAvailability: 'Delivery in 2-3 hours',
      rating: 3.5 + Math.random() * 1.5,
      description: `Premium ${template.name.toLowerCase()} with excellent build quality and performance.`
    }));
  }
  return generateRandomProducts(8);
};
