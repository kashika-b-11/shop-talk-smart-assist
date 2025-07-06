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
    { id: 11, name: "Ethnic Kurta Set", category: "Fashion", price: 2499, rating: 4.3, inStock: true, image: "https://images.unsplash.com/photo-1583391733956-6c78e0bb7bdd?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Ethnic kurta set" },
    { id: 12, name: "Running Shoes", category: "Fashion", price: 3499, rating: 4.4, inStock: true, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Running shoes" },
    { id: 13, name: "Formal Blazer", category: "Fashion", price: 4999, rating: 4.1, inStock: true, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Formal blazer" },
    { id: 14, name: "Summer Dress", category: "Fashion", price: 1799, rating: 4.2, inStock: true, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Summer dress" },
    
    // Groceries
    { id: 15, name: "Basmati Rice 5kg", category: "Groceries", price: 899, rating: 4.3, inStock: true, image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "High-quality basmati rice" },
    { id: 16, name: "Cooking Oil 1L", category: "Groceries", price: 199, rating: 4.1, inStock: true, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "High-quality cooking oil" },
    { id: 17, name: "Toor Dal 1kg", category: "Groceries", price: 149, rating: 4.2, inStock: true, image: "https://images.unsplash.com/photo-1596040048717-d1aedc64af95?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Toor dal" },
    { id: 18, name: "Whole Wheat Flour 10kg", category: "Groceries", price: 449, rating: 4.0, inStock: true, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Whole wheat flour" },
    { id: 19, name: "Green Tea Bags", category: "Groceries", price: 299, rating: 4.4, inStock: true, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Green tea bags" },
    { id: 20, name: "Organic Honey 500g", category: "Groceries", price: 399, rating: 4.5, inStock: true, image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Organic honey" },
    
    // Beauty
    { id: 21, name: "Anti-Aging Face Cream", category: "Beauty", price: 799, rating: 4.2, inStock: true, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Anti-aging face cream" },
    { id: 22, name: "Herbal Shampoo 400ml", category: "Beauty", price: 349, rating: 4.1, inStock: true, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Herbal shampoo" },
    { id: 23, name: "Long Lasting Lipstick", category: "Beauty", price: 599, rating: 4.3, inStock: true, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Long-lasting lipstick" },
    { id: 24, name: "Sunscreen SPF 50", category: "Beauty", price: 499, rating: 4.4, inStock: true, image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Sunscreen SPF 50" },
    { id: 25, name: "Hair Oil 200ml", category: "Beauty", price: 299, rating: 4.0, inStock: true, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Hair oil" },
    
    // Home & Kitchen
    { id: 26, name: "Non-Stick Cookware Set", category: "Home & Kitchen", price: 2999, rating: 4.3, inStock: true, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Non-stick cookware set" },
    { id: 27, name: "Electric Kettle 1.5L", category: "Home & Kitchen", price: 1299, rating: 4.2, inStock: true, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Electric kettle" },
    { id: 28, name: "Microwave Oven 20L", category: "Home & Kitchen", price: 8999, rating: 4.1, inStock: true, image: "https://images.unsplash.com/photo-1585515656892-c6c6cd3b4b8b?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Microwave oven" },
    { id: 29, name: "Air Fryer 3L", category: "Home & Kitchen", price: 5999, rating: 4.4, inStock: true, image: "https://images.unsplash.com/photo-1585515656892-c6c6cd3b4b8b?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Air fryer" },
    { id: 30, name: "Vacuum Cleaner", category: "Home & Kitchen", price: 7999, rating: 4.0, inStock: true, image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop", storeAvailability: "Available", onlineAvailability: "In Stock", description: "Vacuum cleaner" },
  ];

  // Generate additional products by duplicating and modifying
  const additionalProducts: Product[] = [];
  for (let i = 0; i < 50; i++) {
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
  
  const normalizedCategory = category.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const filteredProducts = allProducts.filter(product => {
    const productCategory = product.category.toLowerCase().replace(/[^a-z0-9]/g, '');
    return productCategory.includes(normalizedCategory) || normalizedCategory.includes(productCategory);
  });

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
