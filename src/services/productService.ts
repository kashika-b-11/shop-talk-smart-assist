
import { Product } from '@/types/product';

// Enhanced product database with detailed descriptions and accurate categorization
const products: Product[] = [
  // Electronics - Smartphones
  {
    id: 1,
    name: 'Apple iPhone 13',
    category: 'Electronics',
    price: 52999,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    rating: 4.6,
    inStock: true,
    brand: 'Apple',
    storeAvailability: 'Available at 8 nearby stores',
    onlineAvailability: 'Express delivery in 2-3 hours',
    description: 'iPhone 13 features a 6.1-inch Super Retina XDR display, A15 Bionic chip with 6-core CPU, advanced dual-camera system with 12MP Wide and Ultra Wide cameras, and all-day battery life. Available in multiple colors with 128GB, 256GB, and 512GB storage options.'
  },
  {
    id: 2,
    name: 'Samsung Galaxy M35 5G',
    category: 'Electronics',
    price: 17999,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
    rating: 4.3,
    inStock: true,
    brand: 'Samsung',
    storeAvailability: 'Available at 12 nearby stores',
    onlineAvailability: 'Same-day delivery available',
    description: 'Samsung Galaxy M35 5G with 6.6-inch FHD+ sAMOLED display, Exynos 1380 processor, 6GB/8GB RAM options, 50MP triple camera setup, 6000mAh battery with 25W fast charging, and Android 14 with One UI 6.1.'
  },
  {
    id: 3,
    name: 'OnePlus Nord CE3 Lite 5G',
    category: 'Electronics',
    price: 19999,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
    rating: 4.4,
    inStock: true,
    brand: 'OnePlus',
    storeAvailability: 'Available at 6 nearby stores',
    onlineAvailability: 'Express delivery in 4-6 hours',
    description: 'OnePlus Nord CE3 Lite 5G features Snapdragon 695 5G processor, 8GB LPDDR4X RAM, 128GB UFS 2.2 storage, 108MP triple camera system, 67W SUPERVOOC fast charging, and OxygenOS 13.1 based on Android 13.'
  },
  
  // Electronics - Laptops
  {
    id: 4,
    name: 'HP Pavilion 15 Laptop',
    category: 'Electronics',
    price: 45999,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    rating: 4.2,
    inStock: true,
    brand: 'HP',
    storeAvailability: 'Available at 4 nearby stores',
    onlineAvailability: 'Standard delivery in 2-3 days',
    description: 'HP Pavilion 15 with Intel Core i5-12th Gen processor, 8GB DDR4 RAM, 512GB SSD, 15.6-inch FHD display, Intel Iris Xe graphics, backlit keyboard, and Windows 11 Home. Perfect for work, study, and entertainment.'
  },
  {
    id: 5,
    name: 'Dell Inspiron 15 3000',
    category: 'Electronics',
    price: 38999,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
    rating: 4.1,
    inStock: true,
    brand: 'Dell',
    storeAvailability: 'Available at 7 nearby stores',
    onlineAvailability: 'Express delivery available',
    description: 'Dell Inspiron 15 3000 featuring AMD Ryzen 5 processor, 8GB RAM, 256GB SSD, 15.6-inch HD display, integrated AMD Radeon graphics, and comprehensive connectivity options. Ideal for everyday computing needs.'
  },

  // Fashion
  {
    id: 6,
    name: 'Cotton Casual Shirt - Blue',
    category: 'Fashion',
    price: 899,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
    rating: 4.3,
    inStock: true,
    brand: 'FashionHub',
    storeAvailability: 'Available at 15 nearby stores',
    onlineAvailability: 'Same-day delivery in metro cities',
    description: '100% pure cotton casual shirt with regular fit, button-down collar, chest pocket, and machine washable fabric. Available in sizes S to XXL. Perfect for office wear and casual occasions.'
  },
  {
    id: 7,
    name: 'Denim Blue Jeans - Slim Fit',
    category: 'Fashion',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    rating: 4.4,
    inStock: true,
    brand: 'DenimCraft',
    storeAvailability: 'Available at 20 nearby stores',
    onlineAvailability: 'Express delivery available',
    description: 'Premium quality denim jeans with slim fit design, five-pocket styling, belt loops, and comfortable stretch fabric. Pre-washed for softness and durability. Available in waist sizes 28-40.'
  },
  
  // Groceries
  {
    id: 8,
    name: 'Basmati Rice Premium 5kg',
    category: 'Groceries',
    price: 450,
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=400&fit=crop',
    rating: 4.5,
    inStock: true,
    brand: 'IndiaGate',
    storeAvailability: 'Available at 25 nearby stores',
    onlineAvailability: 'Same-day delivery available',
    description: 'Premium aged Basmati rice with extra long grains, authentic aroma, and fluffy texture. Naturally gluten-free, low in fat, and rich in carbohydrates. Perfect for biryani, pulao, and daily meals.'
  },
  {
    id: 9,
    name: 'Cooking Oil - Sunflower 1L',
    category: 'Groceries',
    price: 120,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
    rating: 4.2,
    inStock: true,
    brand: 'Fortune',
    storeAvailability: 'Available at 30 nearby stores',
    onlineAvailability: 'Express delivery in 2-4 hours',
    description: 'Pure sunflower oil rich in Vitamin E and low in saturated fat. Light texture, neutral taste, and high smoke point make it perfect for all types of cooking including deep frying, sautéing, and baking.'
  },

  // Home & Kitchen
  {
    id: 10,
    name: 'Air Fryer 3.5L Digital',
    category: 'Home & Kitchen',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    rating: 4.4,
    inStock: true,
    brand: 'Philips',
    storeAvailability: 'Available at 8 nearby stores',
    onlineAvailability: 'Standard delivery in 1-2 days',
    description: 'Digital air fryer with 3.5L capacity, rapid air technology for 90% less fat cooking, 7 preset cooking programs, digital touch panel with LED display, non-stick removable basket, and automatic shut-off feature.'
  },

  // Beauty Products
  {
    id: 11,
    name: 'Anti-Aging Face Cream 50ml',
    category: 'Beauty',
    price: 799,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    rating: 4.3,
    inStock: true,
    brand: 'Olay',
    storeAvailability: 'Available at 18 nearby stores',
    onlineAvailability: 'Same-day delivery available',
    description: 'Advanced anti-aging face cream with Retinol, Niacinamide, and peptides. Reduces fine lines, improves skin texture, provides 24-hour hydration, and suitable for all skin types. Dermatologist tested and non-comedogenic.'
  },

  // Sports & Fitness
  {
    id: 12,
    name: 'Yoga Mat Premium 6mm',
    category: 'Sports',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    rating: 4.5,
    inStock: true,
    brand: 'Reebok',
    storeAvailability: 'Available at 12 nearby stores',
    onlineAvailability: 'Express delivery available',
    description: 'Premium 6mm thick yoga mat with superior grip, non-slip surface, eco-friendly NBR material, lightweight and portable design. Includes carrying strap and perfect for yoga, pilates, and home workouts.'
  }
];

// Generate more products to reach 50+ items
const generateAdditionalProducts = (): Product[] => {
  const baseProducts = [...products];
  const additionalProducts: Product[] = [];
  const categories = ['Electronics', 'Fashion', 'Groceries', 'Home & Kitchen', 'Beauty', 'Sports'];
  
  // Electronics variants
  const electronicsBrands = ['Samsung', 'Apple', 'OnePlus', 'Xiaomi', 'Realme', 'Vivo', 'OPPO'];
  const laptopBrands = ['HP', 'Dell', 'Lenovo', 'Asus', 'Acer'];
  
  for (let i = 0; i < 15; i++) {
    const brand = electronicsBrands[i % electronicsBrands.length];
    additionalProducts.push({
      id: baseProducts.length + additionalProducts.length + 1,
      name: `${brand} Smartphone Pro ${i + 1}`,
      category: 'Electronics',
      price: Math.floor(Math.random() * 30000) + 15000,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      rating: 4.0 + Math.random() * 0.8,
      inStock: Math.random() > 0.1,
      brand: brand,
      storeAvailability: `Available at ${Math.floor(Math.random() * 20) + 5} nearby stores`,
      onlineAvailability: Math.random() > 0.5 ? 'Same-day delivery available' : 'Express delivery in 2-4 hours',
      description: `${brand} smartphone with advanced features, high-resolution camera, fast processor, long battery life, and premium build quality. Perfect for photography, gaming, and productivity.`
    });
  }

  // Fashion items
  const fashionItems = ['T-Shirt', 'Jeans', 'Shirt', 'Dress', 'Jacket', 'Shoes', 'Sneakers'];
  for (let i = 0; i < 10; i++) {
    const item = fashionItems[i % fashionItems.length];
    additionalProducts.push({
      id: baseProducts.length + additionalProducts.length + 1,
      name: `${item} Premium ${i + 1}`,
      category: 'Fashion',
      price: Math.floor(Math.random() * 2000) + 500,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
      rating: 4.0 + Math.random() * 0.8,
      inStock: Math.random() > 0.05,
      brand: 'FashionHub',
      storeAvailability: `Available at ${Math.floor(Math.random() * 25) + 10} nearby stores`,
      onlineAvailability: 'Same-day delivery in metro cities',
      description: `Premium quality ${item.toLowerCase()} with modern design, comfortable fit, durable materials, and stylish appearance. Perfect for casual and formal occasions.`
    });
  }

  // Grocery items
  const groceryItems = ['Rice', 'Dal', 'Oil', 'Flour', 'Sugar', 'Tea', 'Coffee', 'Spices'];
  for (let i = 0; i < 12; i++) {
    const item = groceryItems[i % groceryItems.length];
    additionalProducts.push({
      id: baseProducts.length + additionalProducts.length + 1,
      name: `${item} Premium Quality ${i + 1}kg`,
      category: 'Groceries',
      price: Math.floor(Math.random() * 300) + 50,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop',
      rating: 4.2 + Math.random() * 0.6,
      inStock: Math.random() > 0.02,
      brand: 'Premium Brand',
      storeAvailability: `Available at ${Math.floor(Math.random() * 30) + 15} nearby stores`,
      onlineAvailability: 'Express delivery available',
      description: `High-quality ${item.toLowerCase()} sourced from premium suppliers. Fresh, nutritious, and perfect for daily cooking needs. Packaged hygienically for long shelf life.`
    });
  }

  // Home & Kitchen
  const homeItems = ['Mixer', 'Microwave', 'Kettle', 'Toaster', 'Blender', 'Cookware Set'];
  for (let i = 0; i < 8; i++) {
    const item = homeItems[i % homeItems.length];
    additionalProducts.push({
      id: baseProducts.length + additionalProducts.length + 1,
      name: `${item} Deluxe ${i + 1}`,
      category: 'Home & Kitchen',
      price: Math.floor(Math.random() * 5000) + 1000,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
      rating: 4.1 + Math.random() * 0.7,
      inStock: Math.random() > 0.08,
      brand: 'HomeMax',
      storeAvailability: `Available at ${Math.floor(Math.random() * 15) + 5} nearby stores`,
      onlineAvailability: 'Standard delivery in 1-3 days',
      description: `Premium ${item.toLowerCase()} with advanced features, energy efficiency, durable construction, and user-friendly design. Perfect for modern kitchens and daily use.`
    });
  }

  return additionalProducts;
};

const allProducts = [...products, ...generateAdditionalProducts()];

export const getAllProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return allProducts;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 150));
  return allProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (!query || query.trim().length === 0) {
    return allProducts.slice(0, 20);
  }

  const searchTerms = query.toLowerCase().split(' ');
  
  return allProducts.filter(product => {
    const searchText = `${product.name} ${product.category} ${product.brand || ''} ${product.description}`.toLowerCase();
    
    return searchTerms.some(term => {
      // Exact brand matches get priority
      if (product.brand?.toLowerCase().includes(term)) return true;
      
      // Product name matches
      if (product.name.toLowerCase().includes(term)) return true;
      
      // Category matches
      if (product.category.toLowerCase().includes(term)) return true;
      
      // Description matches
      if (product.description.toLowerCase().includes(term)) return true;
      
      return false;
    });
  }).sort((a, b) => {
    // Prioritize by relevance score
    const aScore = calculateRelevanceScore(a, searchTerms);
    const bScore = calculateRelevanceScore(b, searchTerms);
    return bScore - aScore;
  });
};

const calculateRelevanceScore = (product: Product, searchTerms: string[]): number => {
  let score = 0;
  const productText = `${product.name} ${product.brand || ''} ${product.category}`.toLowerCase();
  
  searchTerms.forEach(term => {
    // Exact brand match
    if (product.brand?.toLowerCase() === term) score += 10;
    
    // Brand contains term
    if (product.brand?.toLowerCase().includes(term)) score += 8;
    
    // Name starts with term
    if (product.name.toLowerCase().startsWith(term)) score += 6;
    
    // Name contains term
    if (product.name.toLowerCase().includes(term)) score += 4;
    
    // Category match
    if (product.category.toLowerCase().includes(term)) score += 3;
    
    // Description match
    if (product.description.toLowerCase().includes(term)) score += 1;
  });
  
  return score;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return allProducts.find(product => product.id === id) || null;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return allProducts.filter(product => product.rating >= 4.3).slice(0, 8);
};

export const getProductsByPriceRange = async (minPrice: number, maxPrice: number): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 150));
  return allProducts.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  );
};
