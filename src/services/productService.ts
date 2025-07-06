
import { Product } from '@/types/product';

// Enhanced product data with better image matching
const generateProducts = (): Product[] => {
  const baseProducts = [
    // Electronics
    { id: 1, name: "Samsung Galaxy M35 5G", category: "Electronics", price: 17999, rating: 4.2, inStock: true, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Latest Samsung smartphone with 5G connectivity" },
    { id: 2, name: "OnePlus Nord CE3 Lite", category: "Electronics", price: 19999, rating: 4.3, inStock: true, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Affordable OnePlus smartphone" },
    { id: 3, name: "Redmi Note 13 Pro", category: "Electronics", price: 23999, rating: 4.4, inStock: true, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Feature-rich Redmi smartphone" },
    { id: 4, name: "Apple iPhone 13", category: "Electronics", price: 54999, rating: 4.6, inStock: true, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Premium Apple iPhone" },
    { id: 5, name: "HP Pavilion Laptop", category: "Electronics", price: 45999, rating: 4.1, inStock: true, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Reliable HP laptop for work and study" },
    { id: 6, name: "Dell Inspiron 15", category: "Electronics", price: 42999, rating: 4.0, inStock: true, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Dell's latest laptop" },
    { id: 7, name: "Sony WH-1000XM4 Headphones", category: "Electronics", price: 24999, rating: 4.7, inStock: true, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "High-quality Sony headphones" },
    { id: 8, name: "JBL Flip 5 Speaker", category: "Electronics", price: 7999, rating: 4.5, inStock: true, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "JBL's latest speaker" },
    
    // Fashion
    { id: 9, name: "Cotton Casual Shirt", category: "Fashion", price: 1299, rating: 4.0, inStock: true, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Comfortable cotton shirt" },
    { id: 10, name: "Denim Blue Jeans", category: "Fashion", price: 1999, rating: 4.2, inStock: true, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Classic denim jeans" },
    { id: 11, name: "Ethnic Kurta Set", category: "Fashion", price: 2499, rating: 4.3, inStock: true, image: "/lovable-uploads/2654e465-c460-4b85-ad1f-77f7b2cb7ea1.png", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Traditional ethnic kurta set" },
    { id: 12, name: "Running Shoes", category: "Fashion", price: 3499, rating: 4.4, inStock: true, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Comfortable running shoes" },
    { id: 13, name: "Formal Blazer", category: "Fashion", price: 4999, rating: 4.1, inStock: true, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Professional formal blazer" },
    { id: 14, name: "Summer Dress", category: "Fashion", price: 1799, rating: 4.2, inStock: true, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Light summer dress" },
    
    // Groceries
    { id: 15, name: "Basmati Rice 5kg", category: "Groceries", price: 899, rating: 4.3, inStock: true, image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Premium basmati rice" },
    { id: 16, name: "Cooking Oil 1L", category: "Groceries", price: 199, rating: 4.1, inStock: true, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Pure cooking oil" },
    { id: 17, name: "Toor Dal 1kg", category: "Groceries", price: 149, rating: 4.2, inStock: true, image: "https://images.unsplash.com/photo-1596040048717-d1aedc64af95?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Fresh toor dal" },
    { id: 18, name: "Whole Wheat Flour 10kg", category: "Groceries", price: 449, rating: 4.0, inStock: true, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Fresh wheat flour" },
    { id: 19, name: "Green Tea Bags", category: "Groceries", price: 299, rating: 4.4, inStock: true, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Organic green tea" },
    { id: 20, name: "Organic Honey 500g", category: "Groceries", price: 399, rating: 4.5, inStock: true, image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Pure organic honey" },
    
    // Beauty
    { id: 21, name: "Anti-Aging Face Cream", category: "Beauty", price: 799, rating: 4.2, inStock: true, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Effective anti-aging cream" },
    { id: 22, name: "Herbal Shampoo 400ml", category: "Beauty", price: 349, rating: 4.1, inStock: true, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Natural herbal shampoo" },
    { id: 23, name: "Long Lasting Lipstick", category: "Beauty", price: 599, rating: 4.3, inStock: true, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Matte finish lipstick" },
    { id: 24, name: "Sunscreen SPF 50", category: "Beauty", price: 499, rating: 4.4, inStock: true, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Broad spectrum sunscreen" },
    { id: 25, name: "Hair Oil 200ml", category: "Beauty", price: 299, rating: 4.0, inStock: true, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Nourishing hair oil" },
    
    // Home & Kitchen
    { id: 26, name: "Non-Stick Cookware Set", category: "Home & Kitchen", price: 2999, rating: 4.3, inStock: true, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Complete cookware set" },
    { id: 27, name: "Electric Kettle 1.5L", category: "Home & Kitchen", price: 1299, rating: 4.2, inStock: true, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Fast boiling kettle" },
    { id: 28, name: "Microwave Oven 20L", category: "Home & Kitchen", price: 8999, rating: 4.1, inStock: true, image: "https://images.unsplash.com/photo-1585515656892-c6c6cd3b4b8b?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Digital microwave oven" },
    { id: 29, name: "Air Fryer 3L", category: "Home & Kitchen", price: 5999, rating: 4.4, inStock: true, image: "https://images.unsplash.com/photo-1585515656892-c6c6cd3b4b8b?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Healthy air fryer" },
    { id: 30, name: "Vacuum Cleaner", category: "Home & Kitchen", price: 7999, rating: 4.0, inStock: true, image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Powerful vacuum cleaner" },
    
    // Sports
    { id: 31, name: "Cricket Bat", category: "Sports", price: 1999, rating: 4.3, inStock: true, image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Professional cricket bat" },
    { id: 32, name: "Football", category: "Sports", price: 899, rating: 4.2, inStock: true, image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "FIFA approved football" },
    { id: 33, name: "Yoga Mat", category: "Sports", price: 799, rating: 4.4, inStock: true, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Non-slip yoga mat" },
    { id: 34, name: "Basketball", category: "Sports", price: 1299, rating: 4.1, inStock: true, image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Professional basketball" },
    { id: 35, name: "Tennis Racket", category: "Sports", price: 2499, rating: 4.5, inStock: true, image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Lightweight tennis racket" },
    
    // Books
    { id: 36, name: "Programming Book", category: "Books", price: 599, rating: 4.6, inStock: true, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Learn programming basics" },
    { id: 37, name: "Business Strategy", category: "Books", price: 799, rating: 4.4, inStock: true, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Business management guide" },
    { id: 38, name: "Self Help Book", category: "Books", price: 399, rating: 4.2, inStock: true, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Personal development book" },
    { id: 39, name: "Cookbook", category: "Books", price: 699, rating: 4.5, inStock: true, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Indian cuisine recipes" },
    { id: 40, name: "Novel", category: "Books", price: 299, rating: 4.3, inStock: true, image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Bestselling fiction novel" },
    
    // Toys
    { id: 41, name: "LEGO Building Set", category: "Toys", price: 2999, rating: 4.7, inStock: true, image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Creative building blocks" },
    { id: 42, name: "Remote Control Car", category: "Toys", price: 1999, rating: 4.4, inStock: true, image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Fast RC racing car" },
    { id: 43, name: "Board Game", category: "Toys", price: 899, rating: 4.3, inStock: true, image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Family board game" },
    { id: 44, name: "Puzzle 1000 pieces", category: "Toys", price: 599, rating: 4.2, inStock: true, image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Challenging jigsaw puzzle" },
    { id: 45, name: "Action Figure", category: "Toys", price: 1299, rating: 4.5, inStock: true, image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Superhero action figure" },
  ];

  // Generate additional products by duplicating and modifying
  const additionalProducts: Product[] = [];
  for (let i = 0; i < 35; i++) {
    const baseProduct = baseProducts[i % baseProducts.length];
    additionalProducts.push({
      ...baseProduct,
      id: baseProducts.length + i + 1,
      name: `${baseProduct.name} ${i + 2}`,
      price: baseProduct.price + Math.floor(Math.random() * 1000),
      rating: +(Math.random() * 1 + 4).toFixed(1),
    });
  }

  return [...baseProducts, ...additionalProducts];
};

const allProducts = generateProducts();

// Enhanced search function with better matching
export const searchProducts = async (query: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
  
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return [];

  // Multi-criteria search
  const results = allProducts.filter(product => {
    const productName = product.name.toLowerCase();
    const productCategory = product.category.toLowerCase();
    
    // Exact match gets highest priority
    if (productName.includes(searchTerm)) return true;
    
    // Category match
    if (productCategory.includes(searchTerm)) return true;
    
    // Word matching
    const searchWords = searchTerm.split(' ');
    const productWords = productName.split(' ');
    
    return searchWords.some(searchWord => 
      productWords.some(productWord => 
        productWord.includes(searchWord) || searchWord.includes(productWord)
      )
    );
  });
  
  // Sort by relevance (exact matches first)
  return results.sort((a, b) => {
    const aExact = a.name.toLowerCase().includes(searchTerm);
    const bExact = b.name.toLowerCase().includes(searchTerm);
    
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    
    return b.rating - a.rating; // Then by rating
  });
};

export const getProductsByCategory = async (category: string, page: number = 1, limit: number = 8): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  console.log('Filtering products for category:', category);
  
  // Normalize category names for better matching
  const categoryMap: { [key: string]: string[] } = {
    'electronics': ['electronics'],
    'fashion': ['fashion'],
    'groceries': ['groceries'],
    'beauty': ['beauty'],
    'home-and-kitchen': ['home & kitchen', 'home', 'kitchen'],
    'sports': ['sports'],
    'books': ['books'],
    'toys': ['toys']
  };
  
  const normalizedCategory = category.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const searchTerms = categoryMap[normalizedCategory] || [category.toLowerCase()];
  
  console.log('Normalized category:', normalizedCategory);
  console.log('Search terms:', searchTerms);
  
  const filteredProducts = allProducts.filter(product => {
    const productCategory = product.category.toLowerCase();
    return searchTerms.some(term => 
      productCategory.includes(term) || term.includes(productCategory)
    );
  });

  console.log('Filtered products count:', filteredProducts.length);

  // Implement pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return filteredProducts.slice(startIndex, endIndex);
};

export const getAllProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return allProducts;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return allProducts.find(product => product.id === id) || null;
};
